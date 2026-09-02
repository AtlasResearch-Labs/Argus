import React, { useState } from 'react';
import { Check, Zap, ArrowRight, Shield } from 'lucide-react';

export default function PricingCalculator() {
  const [devCount, setDevCount] = useState(10);

  // Math: 10 devs * ~20 PRs/mo = 200 PRs
  // Argus cost: 200 PRs * ₹0.04 = ₹8.00 / month (~$0.10)
  // CodeRabbit cost: 10 devs * $20/mo = $200 / month (₹16,600)
  const prCount = devCount * 20;
  const argusCostInr = Math.max(1, Math.round(prCount * 0.04));
  const codeRabbitCostUsd = devCount * 20;
  const codeRabbitCostInr = codeRabbitCostUsd * 83;

  return (
    <section id="pricing" className="py-20 bg-[#020202] border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            // UNIT ECONOMICS & PRICING
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Predictable, Penny-Worth Pricing
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            No mandatory seat minimums, no recurring $30/month lock-ins. Pay only for the compute you actually consume.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Open Source */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#050505] border border-[#1a1a1a] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-neutral-500 font-bold uppercase mb-2">
                Open Source
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                ₹0 <span className="text-xs text-neutral-500 font-normal">/ forever</span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3">
                Free for all public GitHub & GitLab repositories. Built to empower open-source maintainers.
              </p>

              <div className="pt-6 mt-6 border-t border-[#141414] space-y-2.5 font-mono text-xs text-neutral-400">
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
                  <span>Secret & vulnerability scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Full CLI access (argus review)</span>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2.5 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#404040] text-white font-mono text-xs text-center transition"
            >
              Install on GitHub
            </a>
          </div>

          {/* Card 2: Pay-As-You-Go Battery Cells (Highlighted) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border-2 border-neutral-400 flex flex-col justify-between relative shadow-2xl">
            <div>
              <div className="font-mono text-xs text-white font-bold uppercase mb-2 flex items-center justify-between">
                <span>Private Repos (Pay-As-You-Go)</span>
                <span className="text-[10px] bg-white text-black px-2 py-0.5 rounded font-bold">Standard</span>
              </div>
              
              <div className="text-3xl font-extrabold text-white font-mono">
                ₹49 <span className="text-xs text-neutral-400 font-normal">/ 500k Cells</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans mt-3">
                ~₹0.04 per PR review. Battery cells never expire and can be shared across all Atlas tools.
              </p>

              <div className="pt-6 mt-6 border-t border-[#1f1f1f] space-y-2.5 font-mono text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>~1,200 full PR reviews per ₹49 pack</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Automated unit test synthesizer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Zero user seat seat-pricing limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Cross-compatible with Atlas IDE & CLI</span>
                </div>
              </div>
            </div>

            <a
              href="https://powerbox.atlasresearchlabs.online/login"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2.5 rounded-xl bg-white text-black font-semibold font-mono text-xs text-center hover:bg-neutral-200 transition"
            >
              Get Powerbox Key ↗
            </a>
          </div>

          {/* Card 3: Self-Hosted Enterprise */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#050505] border border-[#1a1a1a] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-neutral-500 font-bold uppercase mb-2">
                Self-Hosted / Sovereign
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                Custom <span className="text-xs text-neutral-500 font-normal">/ on-prem</span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3">
                Deploy Argus and Powerbox directly inside your own AWS/GCP VPC with zero external API calls.
              </p>

              <div className="pt-6 mt-6 border-t border-[#141414] space-y-2.5 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Air-gapped private LLM cluster</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Custom fine-tuned rule sentry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>SOC2 & ISO audit logs export</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Dedicated SLA & engineering channel</span>
                </div>
              </div>
            </div>

            <a
              href="https://powerbox.atlasresearchlabs.online/login"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2.5 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#404040] text-white font-mono text-xs text-center transition"
            >
              Contact Engineering
            </a>
          </div>

        </div>

        {/* Interactive Cost Savings Calculator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#050505] border border-[#1a1a1a]">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-bold text-white font-mono">
              Team Cost Comparison Calculator
            </h3>
            <p className="text-xs text-neutral-400 font-sans mt-1">
              Adjust your engineering team size to see the difference between per-seat pricing vs compute-based pricing.
            </p>
          </div>

          <div className="space-y-6">
            {/* Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400">Active Engineers: <strong className="text-white">{devCount} developers</strong></span>
                <span className="text-neutral-500">~{prCount} Pull Requests / month</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={devCount}
                onChange={(e) => setDevCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Side-by-side cost result */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#141414] font-mono">
              
              <div className="p-4 rounded-xl bg-[#000] border border-[#222]">
                <div className="text-[11px] text-neutral-500 uppercase">Argus (Pay-As-You-Go)</div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  ₹{argusCostInr} <span className="text-xs text-neutral-400 font-normal">/ month</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Based on exact token usage</div>
              </div>

              <div className="p-4 rounded-xl bg-[#000] border border-[#222]">
                <div className="text-[11px] text-neutral-500 uppercase">CodeRabbit ($20/seat)</div>
                <div className="text-2xl font-extrabold text-neutral-400 mt-1">
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
