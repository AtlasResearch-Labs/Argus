import React, { useState } from 'react';
import { Terminal, Check, ArrowRight, GitPullRequest, ArrowUpRight } from 'lucide-react';

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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Engineering Category Header (No pulsing dots, no pill capsules) */}
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            AUTONOMOUS PR CODE REVIEW & SECURITY SENTINEL
          </div>

          {/* Clean Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            The future isn't writing code.<br />
            <span className="text-neutral-400 font-normal">It's reviewing and verifying it.</span>
          </h1>

          {/* Technical Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            AI-generated changes now outpace human review capacity. Argus provides context-aware line-by-line diff analysis, committable GitHub suggestions, and automated unit test synthesis.
          </p>

          {/* Action Row (Clean Sharp Buttons) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
            
            <a
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center justify-center gap-2"
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Install GitHub Action</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={copyCli}
              className="w-full sm:w-auto px-5 py-3 rounded-sm bg-[#080808] border border-[#262626] hover:border-[#404040] text-neutral-300 transition flex items-center justify-center gap-2.5"
            >
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span>npx @atlas-labs/argus review</span>
              {copied ? (
                <span className="text-xs text-neutral-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-white" /> Copied
                </span>
              ) : (
                <span className="text-[10px] text-neutral-500 font-mono">
                  [Copy]
                </span>
              )}
            </button>

          </div>

          {/* Core Technical Metric Pillars */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-[#171717] text-left">
            <div className="p-3">
              <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">Review Latency</div>
              <div className="text-xl font-bold text-white font-mono mt-1">&lt; 1.2s</div>
              <div className="text-[11px] text-neutral-500 font-sans mt-0.5">Flash inference engine</div>
            </div>

            <div className="p-3">
              <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">Signal Density</div>
              <div className="text-xl font-bold text-white font-mono mt-1">High Signal</div>
              <div className="text-[11px] text-neutral-500 font-sans mt-0.5">Zero conversational noise</div>
            </div>

            <div className="p-3">
              <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">Pricing</div>
              <div className="text-xl font-bold text-white font-mono mt-1">₹0 / Free</div>
              <div className="text-[11px] text-neutral-500 font-sans mt-0.5">For all open-source repos</div>
            </div>

            <div className="p-3">
              <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">Security Sentry</div>
              <div className="text-xl font-bold text-white font-mono mt-1">Zero-Trust</div>
              <div className="text-[11px] text-neutral-500 font-sans mt-0.5">Static SAST credential check</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
