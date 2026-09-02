import React, { useState } from 'react';
import { Terminal, Shield, Check, ArrowRight, GitPullRequest, Zap, Cpu } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx @atlas-labs/argus review');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-black">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Engineering Category Indicator */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
            <span>// 04. AUTONOMOUS CODE GUARDIAN & PR SENTRY</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Autonomous PR Reviews.<br />
            <span className="text-neutral-400 font-normal">Zero Noise. Pure Signal.</span>
          </h1>

          {/* Technical Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            Argus reviews pull request diffs line by line, scans for leaked credentials and SQL injections, and formats 1-click committable GitHub suggestions. No repetitive conversational fluff.
          </p>

          {/* Primary Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
            
            <a
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Install GitHub Action</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </a>

            <button
              onClick={copyCli}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0a0a0a] border border-[#262626] hover:border-[#404040] text-neutral-300 transition flex items-center justify-center gap-2.5"
            >
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span>npx @atlas-labs/argus review</span>
              {copied ? (
                <span className="text-xs text-neutral-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Copied
                </span>
              ) : (
                <span className="text-[10px] text-neutral-500 bg-[#141414] px-1.5 py-0.5 rounded border border-[#222]">
                  Copy
                </span>
              )}
            </button>

          </div>

          {/* Key Engineering Specifications */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-[#171717]">
            <div className="p-3 text-left">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">Review Latency</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">&lt; 1.2s</div>
              <div className="text-[11px] text-neutral-500">Powerbox Flash Engine</div>
            </div>

            <div className="p-3 text-left">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">Noise Level</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">0 Fluff</div>
              <div className="text-[11px] text-neutral-500">Actionable Signal Only</div>
            </div>

            <div className="p-3 text-left">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">Unit Cost</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">₹0.04</div>
              <div className="text-[11px] text-neutral-500">Per PR Review</div>
            </div>

            <div className="p-3 text-left">
              <div className="font-mono text-[11px] text-neutral-500 uppercase">Security</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">Zero-Trust</div>
              <div className="text-[11px] text-neutral-500">Static SAST + AST Sentry</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
