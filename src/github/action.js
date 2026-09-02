/**
 * Argus GitHub Action Entrypoint
 * Executes on `pull_request` events, parses diffs, and posts inline review comments
 */

import { parseGitDiff } from '../core/parser.js';
import { ArgusReviewer } from '../core/reviewer.js';

export async function runGitHubAction() {
  const token = process.env.GITHUB_TOKEN;
  const powerboxKey = process.env.POWERBOX_API_KEY || process.env.ATLAS_API_KEY;
  const eventPath = process.env.GITHUB_EVENT_PATH;

  if (!token) {
    console.error('❌ Argus Error: GITHUB_TOKEN environment variable is required.');
    process.exit(1);
  }

  // Read GitHub Event Payload
  const fs = await import('fs');
  let eventPayload = {};
  if (eventPath && fs.existsSync(eventPath)) {
    eventPayload = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  }

  const pr = eventPayload.pull_request;
  if (!pr) {
    console.log('ℹ️ Argus: No pull_request object found in GitHub event. Skipping.');
    return;
  }

  const owner = eventPayload.repository?.owner?.login;
  const repo = eventPayload.repository?.name;
  const pullNumber = pr.number;
  const commitId = pr.head.sha;

  console.log(`👁️ Argus watching PR #${pullNumber} on ${owner}/${repo} [Commit: ${commitId.slice(0, 7)}]`);

  // Fetch PR Diff from GitHub API
  const diffUrl = pr.diff_url;
  const diffResponse = await fetch(diffUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3.diff'
    }
  });

  if (!diffResponse.ok) {
    throw new Error(`Failed to fetch PR diff: HTTP ${diffResponse.status}`);
  }

  const rawDiff = await diffResponse.text();
  const parsedFiles = parseGitDiff(rawDiff);

  console.log(`📦 Parsed ${parsedFiles.length} modified code file(s). Running Argus analysis...`);

  // Run Argus Review
  const reviewer = new ArgusReviewer({ apiKey: powerboxKey });
  const reviewResult = await reviewer.reviewDiff(parsedFiles);

  console.log(`📊 Verdict: ${reviewResult.grade} | Comments: ${reviewResult.comments.length}`);

  // Format and Post Inline Comments to GitHub API
  const commentsToPost = reviewResult.comments.map(c => {
    let body = `### 👁️ **Argus Code Review** [${c.severity}]\n\n**${c.title}**\n\n${c.explanation}\n`;
    if (c.suggestion) {
      body += `\n\`\`\`suggestion\n${c.suggestion}\n\`\`\`\n`;
    }
    body += `\n---\n*⚡ Reviewed autonomously by [Argus](https://atlasresearchlabs.online) powered by Atlas Powerbox*`;

    return {
      path: c.file,
      line: c.line,
      body
    };
  });

  // Post Review Summary via GitHub API
  const reviewSummaryBody = `## 👁️ Argus Sentinel PR Audit

**Verdict:** ${reviewResult.grade === 'PASS' ? '✅ **CLEAN / APPROVED**' : reviewResult.grade === 'CRITICAL_BLOCKED' ? '🛑 **CRITICAL ISSUES DETECTED**' : '⚠️ **NEEDS ATTENTION**'}

> ${reviewResult.summary}

| Category | Status |
|---|---|
| **Security & Secrets** | ${reviewResult.securityFindings.length === 0 ? '🛡️ 0 Leaks Detected' : `🚨 ${reviewResult.securityFindings.length} Leak(s) Found`} |
| **Logic & Concurrency** | ${reviewResult.comments.length === 0 ? '✨ Clean Codebase' : `🔍 ${reviewResult.comments.length} Actionable Finding(s)`} |
| **Inference Cost** | ~500 Battery Cells (₹0.04) |

---
*Autonomous Sentinel by [Atlas Labs](https://atlasresearchlabs.online)*`;

  const reviewApiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`;
  
  const postResponse = await fetch(reviewApiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Argus-Sentinel-Bot'
    },
    body: JSON.stringify({
      commit_id: commitId,
      body: reviewSummaryBody,
      event: reviewResult.grade === 'PASS' ? 'COMMENT' : 'REQUEST_CHANGES',
      comments: commentsToPost
    })
  });

  if (!postResponse.ok) {
    const postErr = await postResponse.text();
    console.error(`Failed to submit PR review: HTTP ${postResponse.status}: ${postErr}`);
  } else {
    console.log(`✅ Argus PR review posted successfully to PR #${pullNumber}!`);
  }
}
