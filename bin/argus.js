#!/usr/bin/env node
/**
 * Argus CLI — Standalone Local Code & Diff Auditor
 */

import { execSync } from 'child_process';
import { parseGitDiff } from '../src/core/parser.js';
import { ArgusReviewer } from '../src/core/reviewer.js';

const command = process.argv[2] || 'review';

async function main() {
  console.log('\n👁️  === ARGUS // AUTONOMOUS CODE SENTINEL ===\n');

  if (command === 'help' || command === '--help') {
    console.log(`Usage:
  argus review            Audit local unstaged & staged git diffs
  argus review <branch>   Audit diff against a target branch (e.g. argus review main)
  argus scan              Fast static secret & vulnerability scan only
  argus test <file>       Synthesize unit tests for a specific file
`);
    return;
  }

  let diffTarget = '';
  if (process.argv[3]) {
    diffTarget = process.argv[3];
  }

  let gitDiffCommand = 'git diff HEAD';
  if (diffTarget) {
    gitDiffCommand = `git diff ${diffTarget}...HEAD`;
  }

  console.log(`📡 Inspecting git diff: [${gitDiffCommand}]...`);

  let rawDiff = '';
  try {
    rawDiff = execSync(gitDiffCommand, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (err) {
    console.error('❌ Failed to execute git diff. Ensure you are in a git repository.');
    process.exit(1);
  }

  if (!rawDiff || rawDiff.trim().length === 0) {
    console.log('✨ No modified files detected in current git tree. Everything is clean!\n');
    return;
  }

  const parsedFiles = parseGitDiff(rawDiff);
  console.log(`📦 Found ${parsedFiles.length} modified code file(s). Running Argus analysis...\n`);

  const reviewer = new ArgusReviewer();
  const startTime = Date.now();
  const result = await reviewer.reviewDiff(parsedFiles);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`--------------------------------------------------`);
  console.log(`📊 Verdict: [${result.grade}] (Completed in ${elapsed}s)`);
  console.log(`📝 Summary: ${result.summary}\n`);

  if (result.securityFindings && result.securityFindings.length > 0) {
    console.log(`🚨 SECURITY FINDINGS (${result.securityFindings.length}):`);
    for (const sec of result.securityFindings) {
      console.log(`  [${sec.severity}] ${sec.file}:${sec.line} -> ${sec.title}`);
      console.log(`    ↳ ${sec.details}`);
    }
    console.log('');
  }

  if (result.comments && result.comments.length > 0) {
    console.log(`🔍 ACTIONABLE CODE FINDINGS (${result.comments.length}):`);
    for (const c of result.comments) {
      console.log(`\n• [${c.severity}] ${c.file}:${c.line} — ${c.title}`);
      console.log(`  Explanation: ${c.explanation}`);
      if (c.suggestion) {
        console.log(`  Suggested Fix:`);
        console.log(`    ${c.suggestion.split('\n').join('\n    ')}`);
      }
    }
  } else {
    console.log('✨ No bugs or vulnerabilities detected. Ready to merge!');
  }

  console.log(`\n--------------------------------------------------\n`);
}

main().catch(err => {
  console.error('❌ Argus CLI Error:', err.message);
  process.exit(1);
});
