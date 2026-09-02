/**
 * Argus AI Code Reviewer Engine
 * Synthesizes high-density, zero-fluff, actionable PR reviews with 1-click suggestions
 */

import { PowerboxClient } from './powerboxClient.js';
import { scanDiffForSecrets } from './security.js';

const SYSTEM_PROMPT = `You are Argus, the elite autonomous code reviewer and security sentry from Atlas Labs.

YOUR PRINCIPLES:
1. ZERO CONVERSATIONAL FLUFF. Do not say "Nice work!", "LGTM!", or "Here is my review".
2. HIGH-DENSITY ACTIONABLE SIGNAL ONLY. Only flag actual logic errors, edge-case crashes, memory leaks, async race conditions, off-by-one errors, or severe performance bottlenecks.
3. If code is clean and has no real bugs, RETURN AN EMPTY LIST OF COMMENTS. Do not invent minor nitpicks or stylistic preferences.
4. When suggesting a fix, ALWAYS provide a concrete replacement code block formatted for 1-click GitHub commit suggestions.

OUTPUT FORMAT:
You must respond with valid, parseable JSON matching this exact schema:
{
  "summary": "1-2 sentence executive verdict of the changes (e.g. 'Clean refactor of auth module with 1 critical null-dereference fix in token refresh.')",
  "grade": "PASS" | "NEEDS_FIXES" | "CRITICAL_BLOCKED",
  "comments": [
    {
      "file": "path/to/file.ts",
      "line": 42,
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "INFO",
      "title": "Brief 3-6 word issue title",
      "explanation": "Concise technical explanation of why this will fail in runtime or production.",
      "suggestion": "Exact replacement code for the changed line(s)"
    }
  ]
}`;

export class ArgusReviewer {
  constructor(options = {}) {
    this.client = new PowerboxClient(options);
  }

  async reviewDiff(parsedFiles) {
    if (!parsedFiles || parsedFiles.length === 0) {
      return {
        summary: 'No code changes detected in diff.',
        grade: 'PASS',
        comments: [],
        securityFindings: []
      };
    }

    // 1. Instant static security scan
    const securityFindings = scanDiffForSecrets(parsedFiles);

    // 2. Format diff for LLM
    const diffContext = parsedFiles.map(file => {
      return `--- File: ${file.newPath} ---\n${file.hunks.map(h => `${h.header}\n${h.lines.join('\n')}`).join('\n\n')}`;
    }).join('\n\n====================\n\n');

    const prompt = `Review the following unified pull request diff. Identify real logic bugs, safety issues, and performance flaws:\n\n${diffContext}`;

    try {
      const rawResponse = await this.client.complete({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        jsonMode: true,
        temperature: 0.1
      });

      let parsed = {};
      try {
        parsed = JSON.parse(rawResponse);
      } catch (jsonErr) {
        // Fallback cleanup if model wrapped in markdown
        const match = rawResponse.match(/\{[\s\S]*\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error(`Failed to parse Argus JSON response: ${jsonErr.message}`);
        }
      }

      // Merge static security findings into comments
      for (const sec of securityFindings) {
        parsed.comments = parsed.comments || [];
        parsed.comments.unshift({
          file: sec.file,
          line: sec.line,
          severity: sec.severity,
          title: `🛡️ Security Alert: ${sec.title}`,
          explanation: sec.details,
          suggestion: null
        });
        parsed.grade = 'CRITICAL_BLOCKED';
      }

      return {
        summary: parsed.summary || 'Review completed by Argus.',
        grade: parsed.grade || (securityFindings.length > 0 ? 'CRITICAL_BLOCKED' : 'PASS'),
        comments: parsed.comments || [],
        securityFindings
      };
    } catch (err) {
      return {
        summary: `Argus analysis error: ${err.message}`,
        grade: 'NEEDS_FIXES',
        comments: [],
        securityFindings
      };
    }
  }
}
