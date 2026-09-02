import React, { useState } from 'react';
import { Check, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, FileCode, GitCommit, ArrowRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'null-check',
    title: 'Null Pointer & Edge Case',
    file: 'src/auth/session.ts',
    line: 24,
    badge: 'LOGIC BUG',
    severity: 'HIGH',
    issue: 'Missing null check before accessing token payload properties causes unhandled rejection.',
    originalCode: `export async function verifyUserSession(token: string | null) {
  // Vulnerable to null dereference if token is missing
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
    ],
    testsGenerated: `describe('verifyUserSession', () => {
  it('returns valid: false when token is null', async () => {
    const res = await verifyUserSession(null);
    expect(res.valid).toBe(false);
  });
});`
  },
  {
    id: 'security-leak',
    title: 'Hardcoded Secret & Credential Leak',
    file: 'src/services/s3.ts',
    line: 12,
    badge: 'SECURITY LEAK',
    severity: 'CRITICAL',
    issue: 'Hardcoded AWS Access Key ID detected in client diff. Key must be moved to environment variables.',
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
    ],
    testsGenerated: `describe('S3 Configuration', () => {
  it('reads credentials from environment variables', () => {
    expect(process.env.AWS_ACCESS_KEY_ID).toBeDefined();
  });
});`
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection Vulnerability',
    file: 'src/db/users.ts',
    line: 18,
    badge: 'SECURITY VULN',
    severity: 'HIGH',
    issue: 'Raw string concatenation in SQL query allows arbitrary parameter injection.',
    originalCode: `export async function findUser(id: string) {
  // Vulnerable to SQL injection
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
    ],
    testsGenerated: `describe('findUser', () => {
  it('sanitizes input with parameterized query parameters', async () => {
    const maliciousInput = "1' OR '1'='1";
    await expect(findUser(maliciousInput)).resolves.not.toThrow();
  });
});`
  }
];

export default function LiveReviewSimulator() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [appliedFix, setAppliedFix] = useState(false);
  const [activeTab, setActiveTab] = useState('diff'); // 'diff' | 'tests'

  const scenario = SCENARIOS[activeScenarioIndex];

  const handleScenarioChange = (idx) => {
    setActiveScenarioIndex(idx);
    setAppliedFix(false);
    setActiveTab('diff');
  };

  const handleApplyFix = () => {
    setAppliedFix(true);
  };

  return (
    <section id="simulator" className="py-20 bg-[#020202] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            // INTERACTIVE SENTINEL SIMULATOR
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See Argus Review a Live Pull Request
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            Select a scenario below to inspect how Argus identifies defects, generates committable suggestions, and synthesizes test suites.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(idx)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs transition border flex items-center gap-2 ${
                activeScenarioIndex === idx
                  ? 'bg-[#141414] border-neutral-300 text-white font-bold'
                  : 'bg-[#080808] border-[#1f1f1f] text-neutral-400 hover:text-white hover:border-[#333]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${sc.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-neutral-300'}`} />
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* GitHub Mock Review Card */}
        <div className="rounded-2xl bg-[#050505] border border-[#1a1a1a] overflow-hidden shadow-2xl">
          
          {/* PR Header Bar */}
          <div className="p-4 bg-[#0a0a0a] border-b border-[#171717] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            
            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 rounded bg-[#171717] border border-[#262626] text-neutral-300 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-neutral-400" />
                <span>{scenario.file}</span>
              </div>
              <span className="text-neutral-500">Line {scenario.line}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                scenario.severity === 'CRITICAL' ? 'bg-red-950/80 text-red-300 border border-red-800/60' : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
              }`}>
                {scenario.badge}
              </span>

              <div className="flex items-center gap-1 text-neutral-400">
                <span className="text-[11px]">Verdict:</span>
                <span className="text-white font-bold">{appliedFix ? 'PASS' : 'CHANGES_REQUESTED'}</span>
              </div>
            </div>

          </div>

          {/* Sub-Tabs: Diff vs Unit Tests */}
          <div className="px-4 pt-3 border-b border-[#171717] flex items-center justify-between bg-[#080808]">
            <div className="flex items-center gap-4 font-mono text-xs">
              <button
                onClick={() => setActiveTab('diff')}
                className={`pb-2.5 border-b-2 transition ${
                  activeTab === 'diff' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Pull Request Diff & Review
              </button>

              <button
                onClick={() => setActiveTab('tests')}
                className={`pb-2.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'tests' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-neutral-300" />
                <span>Synthesized Unit Tests</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
              Inference: Powerbox Flash · Cost: 500 Cells (~₹0.04)
            </div>
          </div>

          {/* Tab Content Body */}
          <div className="p-4 sm:p-6 font-mono text-xs">
            {activeTab === 'diff' ? (
              <div className="space-y-6">
                
                {/* Code Diff Box */}
                <div className="rounded-xl bg-[#000000] border border-[#171717] overflow-hidden">
                  <div className="px-4 py-2 bg-[#0d0d0d] border-b border-[#171717] text-neutral-400 flex items-center justify-between text-[11px]">
                    <span>Original Diff</span>
                    <span>{appliedFix ? 'Status: Resolved' : 'Status: Needs Fix'}</span>
                  </div>

                  <div className="p-4 space-y-1 overflow-x-auto text-[13px] leading-relaxed">
                    {appliedFix ? (
                      <div>
                        <div className="text-neutral-400">// Fixed state applied to branch</div>
                        <pre className="text-neutral-200 mt-2">{scenario.suggestion}</pre>
                      </div>
                    ) : (
                      scenario.diffBefore.map((line, i) => (
                        <div 
                          key={i} 
                          className={`py-0.5 px-2 rounded ${
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
                </div>

                {/* Argus Inline Review Comment Box (GitHub Native Style) */}
                <div className="rounded-xl bg-[#0a0a0a] border border-[#222222] p-5 space-y-4">
                  
                  {/* Bot Identity Header */}
                  <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-black border border-[#333] p-1">
                        <img src="/branding/powerbox-dark.png" alt="Argus" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-white">argus-sentinel</span>
                      <span className="px-1.5 py-0.2 text-[10px] rounded bg-[#1c1c1c] text-neutral-400">bot</span>
                      <span className="text-neutral-500 text-[11px]">reviewed just now</span>
                    </div>

                    {appliedFix ? (
                      <span className="flex items-center gap-1 text-white text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Suggestion Applied</span>
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-400 font-medium">
                        Action Required
                      </span>
                    )}
                  </div>

                  {/* Comment Details */}
                  <div className="space-y-2 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    <div className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{scenario.title}</span>
                    </div>
                    <p>{scenario.issue}</p>
                  </div>

                  {/* 1-Click Suggestion Block */}
                  <div className="rounded-lg bg-[#000000] border border-[#222] p-3 font-mono text-xs space-y-2">
                    <div className="text-neutral-500 text-[11px]">Suggested Change (1-Click Commit):</div>
                    <pre className="text-neutral-200 bg-[#080808] p-3 rounded border border-[#171717] overflow-x-auto text-[12px]">
                      {scenario.suggestion}
                    </pre>

                    <div className="pt-2 flex items-center justify-end">
                      {appliedFix ? (
                        <button 
                          disabled
                          className="px-4 py-2 rounded-lg bg-[#141414] text-neutral-400 border border-[#262626] flex items-center gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Commit Applied</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyFix}
                          className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center gap-2"
                        >
                          <GitCommit className="w-3.5 h-3.5" />
                          <span>Apply Suggestion</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* Synthesized Unit Tests Tab */
              <div className="rounded-xl bg-[#000000] border border-[#171717] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 text-[11px] text-neutral-400">
                  <span>Synthesized Jest / Vitest Suite</span>
                  <span>Automated Boundary & Error Coverage</span>
                </div>
                <pre className="text-neutral-200 overflow-x-auto text-[12px] leading-relaxed">
                  {scenario.testsGenerated}
                </pre>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
