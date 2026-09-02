import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

const WORKFLOW_YAML = `name: Argus Code Review

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

      - name: Run Argus Reviewer
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
    <section className="py-24 bg-black border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Setup
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Add Argus to your repository in 1 minute.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            Add a simple GitHub Action workflow file. No OAuth app access or repository admin permissions required.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 font-mono text-xs">
          <div className="p-6 rounded-sm bg-[#080808] border border-[#1f1f1f]">
            <div className="text-neutral-500 font-bold mb-2">01</div>
            <div className="text-sm font-bold text-white mb-2">Create Workflow File</div>
            <p className="text-neutral-400 font-sans text-xs">
              Add <code className="text-neutral-200 bg-[#171717] px-1 py-0.5 rounded-sm">.github/workflows/argus.yml</code> to your repository.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#080808] border border-[#1f1f1f]">
            <div className="text-neutral-500 font-bold mb-2">02</div>
            <div className="text-sm font-bold text-white mb-2">Set API Key (Private Repos)</div>
            <p className="text-neutral-400 font-sans text-xs">
              Add <code className="text-neutral-200 bg-[#171717] px-1 py-0.5 rounded-sm">POWERBOX_API_KEY</code> in GitHub repository secrets. Public repos run free.
            </p>
          </div>

          <div className="p-6 rounded-sm bg-[#080808] border border-[#1f1f1f]">
            <div className="text-neutral-500 font-bold mb-2">03</div>
            <div className="text-sm font-bold text-white mb-2">Open a Pull Request</div>
            <p className="text-neutral-400 font-sans text-xs">
              Argus automatically reviews the diff and posts comments with 1-click merge suggestions.
            </p>
          </div>
        </div>

        {/* Copyable YAML Box */}
        <div className="rounded-md bg-[#080808] border border-[#222] overflow-hidden shadow-2xl font-mono text-xs">
          <div className="px-5 py-3.5 bg-[#0f0f0f] border-b border-[#1c1c1c] flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-400">
              <FileCode className="w-4 h-4 text-neutral-400" />
              <span>.github/workflows/argus.yml</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3a3a3a] text-neutral-300 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copied ? 'Copied' : 'Copy YAML'}</span>
            </button>
          </div>

          <pre className="p-6 text-[13px] leading-relaxed overflow-x-auto text-neutral-300 bg-black">
            {WORKFLOW_YAML}
          </pre>
        </div>

      </div>
    </section>
  );
}
