import React, { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';

export default function PricingCalculator() {
  const [devCount, setDevCount] = useState(10);

  const prCount = devCount * 20;
  const argusCostInr = Math.max(1, Math.round(prCount * 0.04));
  const codeRabbitCostUsd = devCount * 20;
  const codeRabbitCostInr = codeRabbitCostUsd * 83;

  return (
    <section id="pricing" className="py-24 bg-black border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Pay only for what you review.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            No mandatory per-seat monthly subscriptions. Public open-source repos run free, private repos pay purely for token usage.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Open Source */}
          <div className="p-8 rounded-sm bg-[#080808] border border-[#1f1f1f] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-neutral-400 font-bold uppercase mb-2">
                Open Source
              </div>
              <div className="text-3xl font-bold text-white font-mono">
                ₹0 <span className="text-xs text-neutral-500 font-normal">/ forever</span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3">
                Free for all public GitHub and GitLab repositories.
              </p>

              <div className="pt-6 mt-6 border-t border-[#171717] space-y-3 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Unlimited public repository reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>1-Click GitHub merge suggestions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Secret & credential scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Terminal CLI tool</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2.5 rounded-sm bg-[#141414] border border-[#2a2a2a] hover:border-[#444] text-white text-xs font-mono text-center transition block"
            >
              Install on GitHub
            </a>
          </div>

          {/* Card 2: Private Repos */}
          <div className="p-8 rounded-sm bg-[#0c0c0c] border border-neutral-300 flex flex-col justify-between relative shadow-2xl">
            <div>
              <div className="text-xs font-mono text-white font-bold uppercase mb-2 flex items-center justify-between">
                <span>Private Repositories</span>
                <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded-sm font-bold">Standard</span>
              </div>
              
              <div className="text-3xl font-bold text-white font-mono">
                ₹49 <span className="text-xs text-neutral-400 font-normal">/ 500k Cells</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans mt-3">
                ~₹0.04 per PR review. Battery cells never expire and can be used across all repositories.
              </p>

              <div className="pt-6 mt-6 border-t border-[#222] space-y-3 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>~1,200 full PR reviews per pack</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Automated unit test generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>No user seat limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Unified Powerbox API key</span>
                </div>
              </div>
            </div>

            <a
              href="https://powerbox.atlasresearchlabs.online/login"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2.5 rounded-sm bg-white text-black font-semibold text-xs font-mono text-center hover:bg-neutral-200 transition flex items-center justify-center gap-1"
            >
              <span>Get Powerbox Key</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Enterprise */}
          <div className="p-8 rounded-sm bg-[#080808] border border-[#1f1f1f] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-neutral-400 font-bold uppercase mb-2">
                Self-Hosted
              </div>
              <div className="text-3xl font-bold text-white font-mono">
                Custom <span className="text-xs text-neutral-500 font-normal">/ deployment</span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3">
                Deploy Argus directly inside your own private VPC or air-gapped infrastructure.
              </p>

              <div className="pt-6 mt-6 border-t border-[#171717] space-y-3 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Self-hosted private LLM gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Custom fine-tuned review rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Audit log exports & SSO</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Dedicated support</span>
                </div>
              </div>
            </div>

            <a
              href="https://powerbox.atlasresearchlabs.online/login"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2.5 rounded-sm bg-[#141414] border border-[#2a2a2a] hover:border-[#444] text-white text-xs font-mono text-center transition block"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* Cost Comparison Slider */}
        <div className="p-8 rounded-sm bg-[#080808] border border-[#1f1f1f]">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold text-white">
              Estimated Monthly Cost
            </h3>
            <p className="text-xs text-neutral-400 font-sans mt-1">
              Move the slider to compare per-seat subscription cost against compute-based usage.
            </p>
          </div>

          <div className="space-y-6 font-mono text-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-300">Engineering Team: <strong className="text-white">{devCount} developers</strong></span>
                <span className="text-neutral-500">~{prCount} Pull Requests / month</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={devCount}
                onChange={(e) => setDevCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#262626] rounded-sm appearance-none cursor-pointer accent-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#171717]">
              <div className="p-5 rounded-sm bg-black border border-[#222]">
                <div className="text-[11px] text-neutral-400 uppercase">Argus (Pay-As-You-Go)</div>
                <div className="text-2xl font-bold text-white mt-1">
                  ₹{argusCostInr} <span className="text-xs text-neutral-400 font-normal">/ month</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Based on exact token usage (~₹0.04/PR)</div>
              </div>

              <div className="p-5 rounded-sm bg-black border border-[#222]">
                <div className="text-[11px] text-neutral-400 uppercase">CodeRabbit ($20/seat/mo)</div>
                <div className="text-2xl font-bold text-neutral-400 mt-1">
                  ${codeRabbitCostUsd} <span className="text-xs text-neutral-500 font-normal">(~₹{codeRabbitCostInr.toLocaleString()})</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Fixed per-seat monthly fee</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
