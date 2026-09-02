import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal, GitBranch } from 'lucide-react';

const WORKFLOW_YAML = `name: Argus PR Sentinel

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Argus Code Reviewer
        uses: AtlasResearch-Labs/argus@main
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          POWERBOX_API_KEY: \${{ secrets.POWERBOX_API_KEY }}`;

export default function QuickStart() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(WORKFLOW_YAML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-black border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            // INTEGRATION BLUEPRINT
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            1-Minute Setup in Any Repository
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            Argus runs as a standard GitHub Action. No third-party OAuth app permissions or read-all repository access required.
          </p>
        </div>

        {/* 3 Step Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 font-mono text-xs">
          <div className="p-6 rounded-xl bg-[#050505] border border-[#1a1a1a]">
            <div className="text-neutral-500 font-bold mb-2">STEP 01</div>
            <div className="text-sm font-bold text-white mb-2">Create Workflow File</div>
            <p className="text-neutral-400 font-sans text-xs">
              Add <code className="text-neutral-200 bg-[#141414] px-1 py-0.5 rounded">.github/workflows/argus.yml</code> to your repository root.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#050505] border border-[#1a1a1a]">
            <div className="text-neutral-500 font-bold mb-2">STEP 02</div>
            <div className="text-sm font-bold text-white mb-2">Configure Secret (Optional)</div>
            <p className="text-neutral-400 font-sans text-xs">
              Add <code className="text-neutral-200 bg-[#141414] px-1 py-0.5 rounded">POWERBOX_API_KEY</code> in GitHub Secrets for private repos (Public repos are free).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#050505] border border-[#1a1a1a]">
            <div className="text-neutral-500 font-bold mb-2">STEP 03</div>
            <div className="text-sm font-bold text-white mb-2">Open Pull Request</div>
            <p className="text-neutral-400 font-sans text-xs">
              Open or update any PR. Argus parses the diff and leaves inline committable suggestions in seconds.
            </p>
          </div>
        </div>

        {/* Copyable YAML Box */}
        <div className="rounded-2xl bg-[#050505] border border-[#1a1a1a] overflow-hidden shadow-2xl font-mono">
          <div className="px-4 py-3 bg-[#0a0a0a] border-b border-[#171717] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <FileCode className="w-3.5 h-3.5 text-neutral-400" />
              <span>.github/workflows/argus.yml</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#141414] border border-[#222] hover:border-[#333] text-xs text-neutral-300 transition"
            >
              {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-neutral-400" />}
              <span>{copied ? 'Copied' : 'Copy YAML'}</span>
            </button>
          </div>

          <pre className="p-6 text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-neutral-300 bg-[#000]">
            {WORKFLOW_YAML}
          </pre>
        </div>

      </div>
    </section>
  );
}
