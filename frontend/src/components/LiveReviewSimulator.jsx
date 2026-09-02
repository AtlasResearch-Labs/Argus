import React, { useState } from 'react';
import { Check, CheckCircle2, FileCode, GitCommit, AlertTriangle } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'null-check',
    title: 'Missing Null Check',
    file: 'src/auth/session.ts',
    line: 24,
    issue: 'The function accesses properties of token without verifying if it is null, causing unhandled TypeErrors on empty authorization headers.',
    originalCode: `export async function verifyUserSession(token: string | null) {
  // Bug: throws TypeError if token is null
  const payload = decodeToken(token);
  return { userId: payload.id, valid: true };
}`,
    suggestion: `export async function verifyUserSession(token: string | null) {
  if (!token) return { userId: null, valid: false };
  const payload = decodeToken(token);
  return { userId: payload.id, valid: true };
}`,
    diffBefore: [
      { type: 'context', text: 'export async function verifyUserSession(token: string | null) {' },
      { type: 'delete', text: '-  const payload = decodeToken(token);' },
      { type: 'delete', text: '-  return { userId: payload.id, valid: true };' },
      { type: 'add', text: '+  if (!token) return { userId: null, valid: false };' },
      { type: 'add', text: '+  const payload = decodeToken(token);' },
      { type: 'add', text: '+  return { userId: payload.id, valid: true };' },
      { type: 'context', text: '}' }
    ]
  },
  {
    id: 'hardcoded-secret',
    title: 'Hardcoded API Key',
    file: 'src/services/s3.ts',
    line: 12,
    issue: 'A hardcoded AWS Access Key ID was detected in source code. Credentials should be stored in environment variables.',
    originalCode: `const s3Client = new S3Client({
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
});`,
    suggestion: `const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});`,
    diffBefore: [
      { type: 'context', text: 'const s3Client = new S3Client({' },
      { type: 'delete', text: '-  accessKeyId: "AKIAIOSFODNN7EXAMPLE",' },
      { type: 'delete', text: '-  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"' },
      { type: 'add', text: '+  accessKeyId: process.env.AWS_ACCESS_KEY_ID,' },
      { type: 'add', text: '+  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY' },
      { type: 'context', text: '});' }
    ]
  },
  {
    id: 'sql-injection',
    title: 'SQL String Concatenation',
    file: 'src/db/users.ts',
    line: 18,
    issue: 'Raw string concatenation in SQL queries creates SQL injection vulnerabilities. Parameterized queries must be used.',
    originalCode: `export async function findUser(id: string) {
  // Bug: SQL Injection vulnerability
  return db.query("SELECT * FROM users WHERE id = '" + id + "'");
}`,
    suggestion: `export async function findUser(id: string) {
  return db.query("SELECT * FROM users WHERE id = $1", [id]);
}`,
    diffBefore: [
      { type: 'context', text: 'export async function findUser(id: string) {' },
      { type: 'delete', text: '-  return db.query("SELECT * FROM users WHERE id = \'" + id + "\'");' },
      { type: 'add', text: '+  return db.query("SELECT * FROM users WHERE id = $1", [id]);' },
      { type: 'context', text: '}' }
    ]
  }
];

export default function LiveReviewSimulator() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [appliedFix, setAppliedFix] = useState(false);

  const scenario = SCENARIOS[activeScenarioIndex];

  const handleScenarioChange = (idx) => {
    setActiveScenarioIndex(idx);
    setAppliedFix(false);
  };

  return (
    <section id="demo" className="py-24 bg-[#050505] border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            See how Argus comments on pull requests.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            Select a sample code diff below to see the inline comment and committable suggestion block.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8 font-mono text-xs">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(idx)}
              className={`px-4 py-2.5 rounded-sm transition border ${
                activeScenarioIndex === idx
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0a0a0a] border-[#222] text-neutral-400 hover:text-white hover:border-[#333]'
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>

        {/* Wide Review Box */}
        <div className="rounded-md bg-[#0a0a0a] border border-[#222] overflow-hidden shadow-2xl">
          
          {/* File Header Bar */}
          <div className="px-5 py-3.5 bg-[#111111] border-b border-[#222] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-neutral-300">
              <FileCode className="w-4 h-4 text-neutral-400" />
              <span>{scenario.file}</span>
              <span className="text-neutral-500">Line {scenario.line}</span>
            </div>

            <div className="text-neutral-400 text-[11px]">
              Status: <span className="text-white font-bold">{appliedFix ? 'Suggestion Applied' : 'Review Comment'}</span>
            </div>
          </div>

          {/* Unified Diff Box */}
          <div className="p-6 font-mono text-xs space-y-6">
            <div className="rounded-sm bg-black border border-[#1a1a1a] p-4 space-y-1 text-[13px] leading-relaxed overflow-x-auto">
              <div className="text-neutral-500 text-[11px] mb-2">// Git Diff</div>
              {appliedFix ? (
                <div>
                  <div className="text-neutral-500">// Applied 1-click suggestion</div>
                  <pre className="text-neutral-200 mt-2">{scenario.suggestion}</pre>
                </div>
              ) : (
                scenario.diffBefore.map((line, i) => (
                  <div 
                    key={i} 
                    className={`py-0.5 px-2 rounded-sm ${
                      line.type === 'delete' 
                        ? 'bg-red-950/40 text-red-300 border-l-2 border-red-500' 
                        : line.type === 'add' 
                        ? 'bg-neutral-800 text-neutral-100 border-l-2 border-white' 
                        : 'text-neutral-500'
                    }`}
                  >
                    {line.text}
                  </div>
                ))
              )}
            </div>

            {/* Inline Review Comment */}
            <div className="rounded-sm bg-[#111111] border border-[#262626] p-5 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-sm bg-black border border-[#333] p-1 flex items-center justify-center">
                    <img src="/branding/argus-dark.png" alt="Argus" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-white">argus-bot</span>
                  <span className="text-neutral-500 text-[11px]">commented</span>
                </div>

                {appliedFix ? (
                  <span className="flex items-center gap-1.5 text-white text-xs">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Applied to branch</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setAppliedFix(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition"
                  >
                    <GitCommit className="w-3.5 h-3.5" />
                    <span>Apply Suggestion</span>
                  </button>
                )}
              </div>

              <div className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {scenario.issue}
              </div>

              {/* GitHub Committable Suggestion Block */}
              <div className="rounded-sm bg-black border border-[#222] p-3.5 font-mono text-xs space-y-2">
                <div className="text-neutral-500 text-[11px]">Suggested Change:</div>
                <pre className="text-neutral-200 bg-[#0d0d0d] p-3 rounded-sm border border-[#1a1a1a] overflow-x-auto text-[12px]">
                  {scenario.suggestion}
                </pre>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
