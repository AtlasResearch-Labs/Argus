#!/usr/bin/env node
/**
 * Argus CLI — Standalone Local Code & Diff Auditor
 * Autonomous Code Guardian & PR Reviewer
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { parseGitDiff } from '../src/core/parser.js';
import { ArgusReviewer } from '../src/core/reviewer.js';
import { scanDiffForSecrets } from '../src/core/security.js';
import { synthesizeTests } from '../src/core/testGen.js';

const VERSION = '1.0.1';
const args = process.argv.slice(2);
const command = args[0] || 'review';

function printHelp() {
 console.log(`\n️ === ARGUS // AUTONOMOUS CODE SENTINEL ===\n
Version: ${VERSION}

Usage:
 argus [command] [options]

Commands:
 review [branch] Deep AI review + secret & vulnerability sentry
 scan [branch] Instant offline secret, credential & vulnerability scan
 test <file> [runner] Synthesize automated unit tests (jest, vitest, pytest, go)
 version, --version, -v Display Argus version
 help, --help, -h Display this help manual

Options:
 --api-key <key> Override API key (Powerbox, OpenAI, or Gemini)
 --model <model> Override model (e.g. google/gemini-2.5-flash, gpt-4o-mini)
 --base-url <url> Override inference base URL (e.g. Ollama localhost)
 --json Output structured JSON for CI/CD pipelines
`);
}

function getDiff(targetBranch) {
 let gitDiffCommand = 'git diff HEAD';
 if (targetBranch && !targetBranch.startsWith('--')) {
 gitDiffCommand = `git diff ${targetBranch}...HEAD`;
 }

 try {
 return execSync(gitDiffCommand, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
 } catch (err) {
 // If HEAD diff is empty, try unstaged git diff
 try {
 return execSync('git diff', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
 } catch (_) {
 throw new Error('Failed to execute git diff. Ensure you are inside a valid git repository.');
 }
 }
}

function parseCliOptions(args) {
 const options = {
 apiKey: '',
 model: '',
 baseURL: '',
 json: false
 };

 for (let i = 0; i < args.length; i++) {
 if (args[i] === '--api-key' && args[i + 1]) {
 options.apiKey = args[++i];
 } else if (args[i] === '--model' && args[i + 1]) {
 options.model = args[++i];
 } else if (args[i] === '--base-url' && args[i + 1]) {
 options.baseURL = args[++i];
 } else if (args[i] === '--json') {
 options.json = true;
 }
 }

 return options;
}

async function main() {
 if (['version', '--version', '-v', '-V'].includes(command)) {
 console.log(`Argus version ${VERSION}`);
 return;
 }

 if (['help', '--help', '-h'].includes(command)) {
 printHelp();
 return;
 }

 const options = parseCliOptions(args);

 if (!options.json) {
 console.log('\n️ === ARGUS // AUTONOMOUS CODE SENTINEL ===\n');
 }

 // 1. FAST OFFLINE SCAN COMMAND
 if (command === 'scan') {
 const targetBranch = args[1] && !args[1].startsWith('--') ? args[1] : '';
 const rawDiff = getDiff(targetBranch);

 if (!rawDiff || rawDiff.trim().length === 0) {
 if (options.json) {
 console.log(JSON.stringify({ status: 'clean', findings: [] }));
 } else {
 console.log(' No modified files detected in current git tree. Everything is clean!\n');
 }
 return;
 }

 const parsedFiles = parseGitDiff(rawDiff);
 const findings = scanDiffForSecrets(parsedFiles);

 if (options.json) {
 console.log(JSON.stringify({
 status: findings.length === 0 ? 'clean' : 'blocked',
 filesScanned: parsedFiles.length,
 findings
 }, null, 2));
 return;
 }

 console.log(` Static Security Sentry scanned ${parsedFiles.length} file(s):`);
 if (findings.length === 0) {
 console.log(' 0 leaked credentials or code vulnerabilities found. Clean!\n');
 } else {
 console.log(` DETECTED ${findings.length} SECURITY ALERT(S):`);
 for (const f of findings) {
 console.log(` [${f.severity}] ${f.file}:${f.line} -> ${f.title}`);
 console.log(` ↳ ${f.details}`);
 }
 console.log('');
 process.exitCode = 1;
 }
 return;
 }

 // 2. UNIT TEST SYNTHESIZER
 if (command === 'test') {
 const targetFile = args[1];
 if (!targetFile || targetFile.startsWith('--')) {
 console.error(' Error: Please specify a target file (e.g. argus test src/math.js)');
 process.exit(1);
 }

 const testRunner = args[2] && !args[2].startsWith('--') ? args[2] : 'jest';
 const resolvedPath = path.resolve(process.cwd(), targetFile);

 if (!fs.existsSync(resolvedPath)) {
 console.error(` Error: File not found at ${resolvedPath}`);
 process.exit(1);
 }

 const content = fs.readFileSync(resolvedPath, 'utf8');
 console.log(` Synthesizing automated ${testRunner} unit tests for ${targetFile}...`);

 const testCode = await synthesizeTests(targetFile, content, testRunner, options);
 console.log('\n--------------------------------------------------');
 console.log(testCode);
 console.log('--------------------------------------------------\n');
 return;
 }

 // 3. FULL REVIEW PIPELINE
 const targetBranch = command !== 'review' ? command : (args[1] && !args[1].startsWith('--') ? args[1] : '');
 const rawDiff = getDiff(targetBranch);

 if (!rawDiff || rawDiff.trim().length === 0) {
 if (options.json) {
 console.log(JSON.stringify({ grade: 'PASS', summary: 'Clean git tree.', comments: [] }));
 } else {
 console.log(' No modified files detected in current git tree. Everything is clean!\n');
 }
 return;
 }

 const parsedFiles = parseGitDiff(rawDiff);
 if (!options.json) {
 console.log(` Inspecting ${parsedFiles.length} modified code file(s)...`);
 }

 const reviewer = new ArgusReviewer(options);
 const startTime = Date.now();
 const result = await reviewer.reviewDiff(parsedFiles);
 const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

 if (options.json) {
 console.log(JSON.stringify({ ...result, elapsedSeconds: Number(elapsed) }, null, 2));
 if (result.grade === 'CRITICAL_BLOCKED') process.exitCode = 1;
 return;
 }

 console.log(`--------------------------------------------------`);
 console.log(` Verdict: [${result.grade}] (Completed in ${elapsed}s)`);
 console.log(` Summary: ${result.summary}\n`);

 if (result.securityFindings && result.securityFindings.length > 0) {
 console.log(` SECURITY FINDINGS (${result.securityFindings.length}):`);
 for (const sec of result.securityFindings) {
 console.log(` [${sec.severity}] ${sec.file}:${sec.line} -> ${sec.title}`);
 console.log(` ↳ ${sec.details}`);
 }
 console.log('');
 }

 if (result.comments && result.comments.length > 0) {
 console.log(` ACTIONABLE CODE FINDINGS (${result.comments.length}):`);
 for (const c of result.comments) {
 console.log(`\n• [${c.severity}] ${c.file}:${c.line} — ${c.title}`);
 console.log(` Explanation: ${c.explanation}`);
 if (c.suggestion) {
 console.log(` Suggested Fix:`);
 console.log(` ${c.suggestion.split('\n').join('\n ')}`);
 }
 }
 } else {
 console.log(' No bugs or vulnerabilities detected. Ready to merge!');
 }

 console.log(`\n--------------------------------------------------\n`);
 if (result.grade === 'CRITICAL_BLOCKED') {
 process.exitCode = 1;
 }
}

main().catch(err => {
 console.error(' Argus CLI Error:', err.message);
 process.exit(1);
});
