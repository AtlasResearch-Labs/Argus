import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const CLI_EXAMPLES = [
  {
    id: 'review',
    cmd: 'argus review',
    desc: 'Audit unstaged & staged changes locally before opening a pull request',
    output: `ARGUS // AUTONOMOUS CODE SENTINEL

Inspecting git diff: [git diff HEAD]...
Parsed 2 modified code file(s). Running Argus analysis...

--------------------------------------------------
Verdict: [CHANGES_REQUESTED] (0.84s)
Summary: Potential null dereference in verifyToken and unindexed query detected.

ACTIONABLE FINDINGS (2):

[HIGH] src/auth/jwt.ts:24 - Unhandled Token Null State
  Explanation: Function accesses token.length without validating null input.
  Suggested Fix:
    if (!token) return { valid: false };

[MEDIUM] src/db/queries.ts:89 - Non-Parameterized Query Parameter
  Explanation: Pass parameters via array binding to prevent injection risks.

--------------------------------------------------`
  },
  {
    id: 'scan',
    cmd: 'argus scan',
    desc: 'Static zero-latency secret and credential sentry',
    output: `ARGUS // STATIC SECRET SENTRY

Scanning 14 source files across workspace...

SECURITY FINDINGS (1):
  [CRITICAL] src/config/aws.ts:12 -> Leaked AWS Access Key ID
  Line contains hardcoded AKIAIOSFODNN7EXAMPLE. Move key to .env.

Warning: Please remove hardcoded credentials before creating a commit.`
  },
  {
    id: 'test',
    cmd: 'argus test src/math/calculator.ts',
    desc: 'Synthesize comprehensive unit test suite for a specific file',
    output: `ARGUS // TEST SYNTHESIZER

Parsing AST for src/math/calculator.ts...
Synthesizing Jest test suite with 16 boundary cases...

Generated: tests/math/calculator.test.ts (16 assertions)
  - applies 20% discount for VIP users
  - applies 10% discount for PRO users
  - returns 0 if price is negative or zero
  - handles null and undefined userRole safely
  - validates floating-point decimal precision`
  }
];

export default function CliSection() {
  const [activeTab, setActiveTab] = useState('review');
  const [copied, setCopied] = useState(false);

  const activeExample = CLI_EXAMPLES.find(e => e.id === activeTab) || CLI_EXAMPLES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeExample.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cli" className="py-20 bg-[#020202] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            LOCAL TERMINAL WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Audit Code Directly in Your Terminal
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            Run Argus locally before pushing commits to catch issues before CI triggers.
          </p>
        </div>

        {/* Command Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
          {CLI_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveTab(ex.id)}
              className={`px-4 py-2 rounded-sm transition border ${
                activeTab === ex.id
                  ? 'bg-[#141414] border-neutral-300 text-white font-bold'
                  : 'bg-[#080808] border-[#1f1f1f] text-neutral-400 hover:text-white hover:border-[#333]'
              }`}
            >
              $ {ex.cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="rounded-sm bg-[#000000] border border-[#1a1a1a] overflow-hidden shadow-2xl font-mono">
          
          {/* Terminal Titlebar */}
          <div className="px-4 py-3 bg-[#0a0a0a] border-b border-[#171717] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-none bg-[#262626]" />
              <span className="w-2.5 h-2.5 rounded-none bg-[#262626]" />
              <span className="w-2.5 h-2.5 rounded-none bg-[#262626]" />
              <span className="ml-2 text-xs text-neutral-400">terminal — argus cli</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#141414] border border-[#222] hover:border-[#333] text-xs text-neutral-300 transition"
            >
              {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-neutral-400" />}
              <span>{copied ? 'Copied' : 'Copy command'}</span>
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-6 text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-neutral-300">
            <div className="text-neutral-500 mb-2"># {activeExample.desc}</div>
            <div className="text-white font-bold mb-4">$ npx @atlas-labs/{activeExample.cmd}</div>
            <pre className="text-neutral-300 whitespace-pre">{activeExample.output}</pre>
          </div>

        </div>

      </div>
    </section>
  );
}
