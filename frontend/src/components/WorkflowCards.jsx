import React from 'react';
import { GitPullRequest, ShieldCheck, FileCheck, Terminal } from 'lucide-react';

const FEATURES = [
  {
    title: 'Line-by-Line Code Review',
    desc: 'Argus reviews modified code hunks and points out logic errors, unhandled edge cases, and performance regressions. It attaches ready-to-merge GitHub suggestion blocks directly to lines of code.',
    icon: GitPullRequest,
    points: [
      'Focuses only on modified code hunks',
      'Uses GitHub native ```suggestion commit blocks',
      'Skips generated lockfiles and build assets',
      'Configurable review strictness via .argus.yml'
    ]
  },
  {
    title: 'Secret & Vulnerability Scanner',
    desc: 'A built-in static scanner checks every pull request for leaked API credentials, private RSA keys, and raw string concatenations in database queries before code reaches production.',
    icon: ShieldCheck,
    points: [
      'Detects AWS, Stripe, GitHub, OpenAI, and JWT keys',
      'Identifies unparameterized SQL statements',
      'Zero-latency static regex engine',
      'Runs locally and in CI workflows'
    ]
  },
  {
    title: 'Unit Test Generation',
    desc: 'When a pull request introduces new functions or endpoints, Argus can automatically synthesize runnable unit test suites covering edge cases, null boundaries, and error branches.',
    icon: FileCheck,
    points: [
      'Supports Jest, Vitest, PyTest, and Go test',
      'Tests boundary inputs and error handling',
      'Outputs complete test files directly in the branch',
      'Helps maintain test coverage over time'
    ]
  },
  {
    title: 'Command-Line Interface (CLI)',
    desc: 'Run Argus locally in your terminal before opening a pull request. Inspect uncommitted changes, verify secrets, and generate tests with a single command.',
    icon: Terminal,
    points: [
      'Run instantly: npx @atlas-labs/argus review',
      'Audit uncommitted diffs: argus review',
      'Scan workspace for leaked keys: argus scan',
      'Generate tests for a file: argus test <file>'
    ]
  }
];

export default function WorkflowCards() {
  return (
    <section id="features" className="py-24 bg-black border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Clear, actionable code reviews for engineering teams.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            Designed to save senior developers time by catching obvious bugs, missing tests, and leaked credentials automatically.
          </p>
        </div>

        {/* 4 Cards Wide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-sm bg-[#080808] border border-[#1f1f1f] hover:border-[#333] transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-sm bg-[#121212] border border-[#2a2a2a] flex items-center justify-center text-white mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-neutral-400 font-sans leading-relaxed mb-6">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#171717] space-y-2 font-mono text-xs text-neutral-400">
                  {feat.points.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-neutral-600">-</span>
                      <span>{p}</span>
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
