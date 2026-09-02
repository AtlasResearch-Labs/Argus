import React, { useState } from 'react';
import { Sliders, Check, Copy, FileCode } from 'lucide-react';

export default function RulesStudio() {
  const [strictNulls, setStrictNulls] = useState(true);
  const [blockSql, setBlockSql] = useState(true);
  const [autoTests, setAutoTests] = useState(true);
  const [blockSecrets, setBlockSecrets] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateYaml = () => {
    return `# Argus Configuration (.argus.yml)
version: "1.0"

rules:
  strict_null_checks: ${strictNulls}
  block_raw_sql_concatenation: ${blockSql}
  auto_synthesize_tests: ${autoTests}
  block_on_critical_secrets: ${blockSecrets}

models:
  primary: "google/gemini-2.5-flash"
  fallback: "deepseek/deepseek-chat"

review:
  max_comments_per_file: 5
  post_summary_table: true
  enable_1click_suggestions: true`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateYaml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="rules" className="py-20 bg-black border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            REPOSITORY CUSTOMIZATION
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Configure Team Review Policies
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            Customize how Argus reviews pull requests with a simple <code className="text-neutral-200">.argus.yml</code> file in your repository root.
          </p>
        </div>

        {/* Studio Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start font-mono">
          
          {/* Left Controls */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#050505] border border-[#1a1a1a] space-y-6">
            <div className="text-xs text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neutral-400" />
              <span>Interactive Rule Toggles</span>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Toggle 1 */}
              <div className="p-4 rounded-sm bg-[#080808] border border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Strict Null & Boundary Checks</div>
                  <div className="text-neutral-500 text-[11px] font-sans mt-0.5">Flag functions that access properties without null validation.</div>
                </div>
                <button
                  onClick={() => setStrictNulls(!strictNulls)}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition ${
                    strictNulls ? 'bg-white text-black font-bold' : 'bg-[#1a1a1a] text-neutral-500'
                  }`}
                >
                  {strictNulls ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="p-4 rounded-sm bg-[#080808] border border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Block Raw SQL Concatenation</div>
                  <div className="text-neutral-500 text-[11px] font-sans mt-0.5">Enforce parameterized queries across all database drivers.</div>
                </div>
                <button
                  onClick={() => setBlockSql(!blockSql)}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition ${
                    blockSql ? 'bg-white text-black font-bold' : 'bg-[#1a1a1a] text-neutral-500'
                  }`}
                >
                  {blockSql ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="p-4 rounded-sm bg-[#080808] border border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Auto-Synthesize Unit Tests</div>
                  <div className="text-neutral-500 text-[11px] font-sans mt-0.5">Generate ready-to-run Jest/PyTest suites for new functions.</div>
                </div>
                <button
                  onClick={() => setAutoTests(!autoTests)}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition ${
                    autoTests ? 'bg-white text-black font-bold' : 'bg-[#1a1a1a] text-neutral-500'
                  }`}
                >
                  {autoTests ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* Toggle 4 */}
              <div className="p-4 rounded-sm bg-[#080808] border border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Block Critical Leaks & Secrets</div>
                  <div className="text-neutral-500 text-[11px] font-sans mt-0.5">Set review verdict to REQUEST_CHANGES if credentials detected.</div>
                </div>
                <button
                  onClick={() => setBlockSecrets(!blockSecrets)}
                  className={`px-3 py-1 rounded-sm text-xs font-mono transition ${
                    blockSecrets ? 'bg-white text-black font-bold' : 'bg-[#1a1a1a] text-neutral-500'
                  }`}
                >
                  {blockSecrets ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

            </div>
          </div>

          {/* Right Live YAML Preview */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#000000] border border-[#1a1a1a] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#171717] text-xs">
              <div className="flex items-center gap-2 text-neutral-400">
                <FileCode className="w-4 h-4 text-neutral-400" />
                <span>.argus.yml (Generated)</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#141414] border border-[#262626] hover:border-[#333] text-neutral-300 text-xs transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                <span>{copied ? 'Copied' : 'Copy YAML'}</span>
              </button>
            </div>

            <pre className="text-neutral-300 text-xs leading-relaxed overflow-x-auto">
              {generateYaml()}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
