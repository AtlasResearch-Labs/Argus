import React, { useState } from 'react';
import { Terminal, Check, GitPullRequest, ArrowUpRight, Copy, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx @atlas-labs/argus review');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-black overflow-hidden border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="max-w-3xl space-y-6">
          <div className="text-xs font-mono text-neutral-400 tracking-wider uppercase">
            Pull Request Code Review
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Automated code reviews that actually catch bugs.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-sans">
            Argus inspects pull request diffs line by line. It identifies logic errors, detects leaked API keys and SQL injections, and posts ready-to-merge code suggestions directly on GitHub.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-sm bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center gap-2"
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Install GitHub Action</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={copyCli}
              className="px-4 py-3 rounded-sm bg-[#0d0d0d] border border-[#262626] hover:border-[#404040] text-neutral-300 transition flex items-center gap-2.5"
            >
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span>npx @atlas-labs/argus review</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-white ml-1" />
              ) : (
                <Copy className="w-3 h-3 text-neutral-500 ml-1" />
              )}
            </button>
          </div>
        </div>

        {/* Wide Interactive PR Review Preview Card */}
        <div className="mt-16 rounded-md bg-[#080808] border border-[#222222] overflow-hidden shadow-2xl">
          
          {/* PR Title Bar */}
          <div className="px-5 py-3.5 bg-[#0f0f0f] border-b border-[#1c1c1c] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 font-bold">PR #128</span>
              <span className="text-neutral-500">|</span>
              <span className="text-white">auth: validate bearer token before payload access</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
              <span>src/auth/session.ts</span>
              <span className="px-2 py-0.5 rounded-sm bg-[#1c1c1c] text-neutral-300 border border-[#333]">
                {applied ? 'RESOLVED' : '1 SUGGESTION'}
              </span>
            </div>
          </div>

          {/* Unified Diff View */}
          <div className="p-6 font-mono text-xs space-y-5">
            
            {/* Diff Lines */}
            <div className="rounded-sm bg-[#000000] border border-[#1a1a1a] p-4 space-y-1 text-[13px] leading-relaxed overflow-x-auto">
              <div className="text-neutral-500 text-[11px] mb-2">// Unified Diff View</div>
              <div className="text-neutral-400">export async function verifySession(token: string | null) &#123;</div>
              
              {applied ? (
                <>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   if (!token) return &#123; valid: false, user: null &#125;;</div>
                  <div className="text-neutral-300">    const payload = decodeToken(token);</div>
                  <div className="text-neutral-300">    return &#123; valid: true, user: payload.id &#125;;</div>
                </>
              ) : (
                <>
                  <div className="bg-red-950/40 text-red-300 px-2 py-0.5 rounded-sm border-l-2 border-red-500">-   const payload = decodeToken(token);</div>
                  <div className="bg-red-950/40 text-red-300 px-2 py-0.5 rounded-sm border-l-2 border-red-500">-   return &#123; valid: true, user: payload.id &#125;;</div>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   if (!token) return &#123; valid: false, user: null &#125;;</div>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   const payload = decodeToken(token);</div>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   return &#123; valid: true, user: payload.id &#125;;</div>
                </>
              )}
              <div className="text-neutral-400">&#125;</div>
            </div>

            {/* Inline Review Comment Box */}
            <div className="rounded-sm bg-[#0d0d0d] border border-[#242424] p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-sm bg-black border border-[#333] p-1 flex items-center justify-center">
                    <img src="/branding/argus-dark.png" alt="Argus" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-white">argus-bot</span>
                  <span className="text-neutral-500 text-[11px]">reviewed on line 24</span>
                </div>

                {applied ? (
                  <span className="flex items-center gap-1.5 text-white text-xs">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Commit Applied</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setApplied(true)}
                    className="px-3.5 py-1.5 rounded-sm bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition"
                  >
                    Apply Suggestion
                  </button>
                )}
              </div>

              <div className="font-sans text-xs text-neutral-300 leading-relaxed">
                Passing a <code className="text-neutral-200 bg-black px-1 py-0.5 rounded-sm">null</code> token causes <code className="text-neutral-200 bg-black px-1 py-0.5 rounded-sm">decodeToken()</code> to throw an uncaught TypeError on empty headers. Adding an early return handles the unauthenticated state safely.
              </div>
            </div>

          </div>

        </div>

        {/* 4 Feature Metrics */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#171717] font-mono text-xs">
          <div>
            <div className="text-neutral-500 uppercase">Review Speed</div>
            <div className="text-xl font-bold text-white mt-1">~1.2 seconds</div>
            <div className="text-neutral-500 font-sans mt-0.5">Average PR review latency</div>
          </div>
          <div>
            <div className="text-neutral-500 uppercase">Code Suggestions</div>
            <div className="text-xl font-bold text-white mt-1">1-Click Merge</div>
            <div className="text-neutral-500 font-sans mt-0.5">GitHub native suggestion blocks</div>
          </div>
          <div>
            <div className="text-neutral-500 uppercase">Security Check</div>
            <div className="text-xl font-bold text-white mt-1">50+ Secret Signatures</div>
            <div className="text-neutral-500 font-sans mt-0.5">Static regex credential scan</div>
          </div>
          <div>
            <div className="text-neutral-500 uppercase">Open Source</div>
            <div className="text-xl font-bold text-white mt-1">Free Forever</div>
            <div className="text-neutral-500 font-sans mt-0.5">For all public repositories</div>
          </div>
        </div>

      </div>
    </section>
  );
}
