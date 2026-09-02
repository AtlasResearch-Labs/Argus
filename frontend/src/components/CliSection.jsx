import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const CLI_EXAMPLES = [
  {
    id: 'review',
    cmd: 'argus review',
    desc: 'Review staged and unstaged changes locally before opening a pull request',
    output: `ARGUS CODE REVIEWER

Checking git diff...
2 modified files found.

src/auth/jwt.ts:24 [LOGIC]
  Token payload accessed without null verification.
  Suggestion: if (!token) return { valid: false };

src/db/queries.ts:89 [SECURITY]
  Raw string concatenation in SQL query.
  Suggestion: Use parameterized query binding.

Review complete. 2 suggestions generated.`
  },
  {
    id: 'scan',
    cmd: 'argus scan',
    desc: 'Scan workspace for leaked API keys, tokens, and private credentials',
    output: `ARGUS SECRET SCANNER

Scanning repository files...

src/config/aws.ts:12 [LEAK]
  Hardcoded AWS Access Key ID detected (AKIAIOSFODNN7EXAMPLE).
  Please move this key to your .env file before committing.`
  },
  {
    id: 'test',
    cmd: 'argus test src/math/calc.ts',
    desc: 'Generate a unit test suite for a specific function or file',
    output: `ARGUS TEST GENERATOR

Analyzing src/math/calc.ts...
Synthesized Jest test suite with 8 boundary cases.

Created tests/math/calc.test.ts:
  - calculates standard percentage discount
  - returns 0 on negative price input
  - handles empty user roles safely`
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
    <section id="cli" className="py-24 bg-[#050505] border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Terminal CLI
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Run reviews locally in your terminal.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            Catch issues before pushing code to GitHub with the standalone Argus CLI.
          </p>
        </div>

        {/* Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
          {CLI_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveTab(ex.id)}
              className={`px-4 py-2 rounded-sm transition border ${
                activeTab === ex.id
                  ? 'bg-white text-black font-semibold border-white'
                  : 'bg-[#0a0a0a] border-[#222] text-neutral-400 hover:text-white hover:border-[#333]'
              }`}
            >
              $ {ex.cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-md bg-black border border-[#222] overflow-hidden shadow-2xl font-mono text-xs">
          
          <div className="px-5 py-3.5 bg-[#0f0f0f] border-b border-[#1c1c1c] flex items-center justify-between">
            <span className="text-neutral-400">Terminal — Argus CLI</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3a3a3a] text-neutral-300 text-xs transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-6 text-[13px] leading-relaxed overflow-x-auto text-neutral-300 space-y-3">
            <div className="text-neutral-500"># {activeExample.desc}</div>
            <div className="text-white font-bold">$ npx @atlas-labs/{activeExample.cmd}</div>
            <pre className="text-neutral-300 whitespace-pre">{activeExample.output}</pre>
          </div>

        </div>

      </div>
    </section>
  );
}
