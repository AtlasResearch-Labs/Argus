import React from 'react';
import { GitPullRequest, ShieldCheck, Cpu, Terminal } from 'lucide-react';

const CAPABILITIES = [
  {
    index: '01',
    title: 'Context-Aware PR Reviews',
    subtitle: 'High-Density Signal',
    description: 'Argus isolates logical regressions, memory leaks, and concurrency edge cases. It provides clear inline explanations and committable code blocks without conversational noise.',
    icon: GitPullRequest,
    specs: [
      'Line-by-line AST & semantic diff analysis',
      'Native GitHub suggestion commit blocks',
      'Configurable rules via .argus.yml',
      'Sub-second inference response via Powerbox'
    ]
  },
  {
    index: '02',
    title: 'Zero-Trust Security & SAST',
    subtitle: 'Credential & Injection Sentry',
    description: 'Every pull request is automatically scanned for leaked credentials, API tokens, private keys, and injection vectors before code can be merged to protected branches.',
    icon: ShieldCheck,
    specs: [
      'Static pattern matching for 50+ key types',
      'SQL injection & raw string concatenation alerts',
      'Dangerous call flags (eval, TLS disable)',
      'Blocks PR merge if critical leaks are detected'
    ]
  },
  {
    index: '03',
    title: 'Automated Test Synthesis',
    subtitle: 'Boundary & Error Coverage',
    description: 'When new functions or endpoints are added to a pull request, Argus synthesizes ready-to-run unit test suites covering null boundaries, edge cases, and error branches.',
    icon: Cpu,
    specs: [
      'Generates tests in Jest, Vitest, PyTest, or Go test',
      'Tests edge cases (null, empty arrays, extreme values)',
      'Outputs runnable test files directly in PR branch',
      'Ensures test coverage increases with every commit'
    ]
  },
  {
    index: '04',
    title: 'Local Terminal CLI',
    subtitle: 'Pre-Commit Local Verification',
    description: 'Run Argus directly in your terminal on staged or uncommitted diffs to catch defects and security leaks before pushing to GitHub.',
    icon: Terminal,
    specs: [
      'Instant execution: npx @atlas-labs/argus review',
      'Compare local branch: argus review main',
      'Static secret scan: argus scan',
      'Unit test generation: argus test <file>'
    ]
  }
];

export default function WorkflowCards() {
  return (
    <section id="overview" className="py-20 bg-black border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            CORE CAPABILITIES
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for High-Velocity Engineering
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            Argus automates repetitive review tasks so engineers can focus on core system architecture.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div 
                key={cap.index}
                className="p-6 sm:p-8 rounded-sm bg-[#050505] border border-[#1a1a1a] hover:border-[#2e2e2e] transition duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-white transition">
                      [ {cap.index} ]
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-[#0a0a0a] border border-[#222] flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {cap.title}
                  </h3>
                  <div className="font-mono text-xs text-neutral-400 mt-1 mb-4">
                    {cap.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#141414] space-y-2 font-mono text-xs text-neutral-400">
                  {cap.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-neutral-600">-</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
