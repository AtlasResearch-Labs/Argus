import React, { useState } from 'react';
import { GitBranch, Shield, Zap, FileCheck2, ArrowRight } from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'AST & Diff Parser',
    subtitle: 'Extracts modified AST nodes & hunks',
    icon: GitBranch,
    codeSnippet: `// 1. Ingest unified diff & map accurate hunk lines
const diff = parseGitDiff(rawDiff);
const astTree = extractModifiedFunctions(diff);`,
    details: [
      'Line-accurate hunk start/end mapping',
      'Filters out lockfiles, assets, and vendored code',
      'Builds scoped context trees for modified blocks'
    ]
  },
  {
    step: '02',
    title: 'Static Security Sentry',
    subtitle: 'Zero-latency credential & injection scan',
    icon: Shield,
    codeSnippet: `// 2. Zero-latency pattern matching (0.02s execution)
const secrets = scanDiffForSecrets(diff);
const injections = scanSqlInjections(diff);`,
    details: [
      'Scans for 50+ API key signatures (AWS, GitHub, OpenAI, JWT)',
      'Identifies raw string concatenation in SQL statements',
      'Flags dangerous primitives (eval, disabled TLS)'
    ]
  },
  {
    step: '03',
    title: 'Powerbox Reasoning Engine',
    subtitle: 'Context-aware logic & regression analysis',
    icon: Zap,
    codeSnippet: `// 3. Multi-provider sub-second flash inference
const review = await powerbox.complete({
  model: 'google/gemini-2.5-flash',
  messages: formatArgusReviewPrompt(diff)
});`,
    details: [
      'Sub-second inference via Powerbox multi-key failover',
      'Detects null pointer dereferences & race conditions',
      'Formats 1-click GitHub suggestion code blocks'
    ]
  },
  {
    step: '04',
    title: 'Automated Test Synthesizer',
    subtitle: 'Synthesizes boundary test cases',
    icon: FileCheck2,
    codeSnippet: `// 4. Synthesizes runnable Jest/PyTest suites
const testSuite = await synthesizeTests(file, functionSnippet);
await commitTestFileToBranch(testSuite);`,
    details: [
      'Generates happy path and extreme boundary tests',
      'Tests null, undefined, empty array, and timeout limits',
      'Writes complete, runnable test files directly into PR'
    ]
  }
];

export default function ArchitecturePipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const current = PIPELINE_STEPS[activeStep];
  const Icon = current.icon;

  return (
    <section id="pipeline" className="py-20 bg-[#020202] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            EXECUTION PIPELINE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Argus Evaluates Every Pull Request
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            An internal look at the four autonomous inspection stages executed on every code diff.
          </p>
        </div>

        {/* 4 Steps Interactive Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 font-mono text-xs">
          {PIPELINE_STEPS.map((item, idx) => {
            const ItemIcon = item.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-sm border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141414] border-neutral-300 text-white shadow-lg'
                    : 'bg-[#050505] border-[#1a1a1a] text-neutral-400 hover:text-white hover:border-[#2e2e2e]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-[11px] text-neutral-500">
                    STAGE [{item.step}]
                  </span>
                  <ItemIcon className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="font-bold text-white text-sm font-sans">{item.title}</div>
                <div className="text-[11px] text-neutral-400 font-sans mt-1">{item.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display */}
        <div className="rounded-sm bg-[#050505] border border-[#1a1a1a] p-6 sm:p-8 font-mono">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[#0a0a0a] border border-[#262626] flex items-center justify-center text-neutral-300">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-neutral-500 text-[11px]">STAGE [{current.step}] SPECIFICATION</div>
                  <h3 className="text-xl font-bold text-white font-sans">{current.title}</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {current.subtitle}. Argus executes this stage within milliseconds to ensure reviews finish before developer context is lost.
              </p>

              <div className="space-y-2.5 text-xs text-neutral-400 border-t border-[#141414] pt-4">
                {current.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-neutral-600">-</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Code Implementation Preview */}
            <div className="rounded-sm bg-[#000000] border border-[#1a1a1a] p-5 text-xs text-neutral-300">
              <div className="text-neutral-500 text-[11px] mb-3 pb-2 border-b border-[#171717] flex items-center justify-between">
                <span>Stage Implementation</span>
                <span>Sub-second Pipeline</span>
              </div>
              <pre className="text-neutral-300 overflow-x-auto leading-relaxed">
                {current.codeSnippet}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
