import React, { useState } from 'react';
import { Terminal, Check, GitPullRequest, ArrowUpRight, ShieldCheck, Cpu, Code2, Zap } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState('diff');

  const copyCli = () => {
    navigator.clipboard.writeText('npx @atlas-labs/argus review');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-black glow-mesh">
      
      {/* Ambient Grid Backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header Copy */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            AUTONOMOUS CODE REVIEW & PULL REQUEST SENTRY
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            The future isn't writing code.<br />
            <span className="text-neutral-400 font-normal">It's reviewing and securing it.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            AI-generated changes now outpace human engineering capacity. Argus delivers context-aware pull request reviews, committable code suggestions, and automated unit test synthesis with zero noise.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs">
            
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

        </div>

        {/* Hero Interactive PR Workbench Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-md bg-[#050505] border border-[#1f1f1f] shadow-2xl overflow-hidden font-mono">
          
          {/* Card Titlebar */}
          <div className="px-4 py-3 bg-[#0a0a0a] border-b border-[#1a1a1a] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <GitPullRequest className="w-3.5 h-3.5 text-neutral-400" />
                <span>PR #142: auth/jwt.ts - Token rotation & revocation</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
              <span>Commits: 3</span>
              <span>Files: 2</span>
              <span className="text-white font-bold bg-[#141414] px-2 py-0.5 border border-[#262626] rounded-sm">
                VERDICT: REVIEW READY
              </span>
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="px-4 pt-2.5 bg-[#080808] border-b border-[#171717] flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveHeroTab('diff')}
                className={`pb-2.5 border-b-2 transition ${
                  activeHeroTab === 'diff' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Inspection Diff
              </button>
              <button
                onClick={() => setActiveHeroTab('sentry')}
                className={`pb-2.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeHeroTab === 'sentry' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Security Sentry</span>
              </button>
              <button
                onClick={() => setActiveHeroTab('tests')}
                className={`pb-2.5 border-b-2 transition flex items-center gap-1.5 ${
                  activeHeroTab === 'tests' ? 'border-white text-white font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                <span>Synthesized Test Suite</span>
              </button>
            </div>

            <div className="text-[11px] text-neutral-500 hidden sm:block">
              Response: 0.88s · Engine: Powerbox Flash
            </div>
          </div>

          {/* Workbench Body */}
          <div className="p-5 text-xs text-neutral-300 bg-[#000]">
            {activeHeroTab === 'diff' && (
              <div className="space-y-3">
                <div className="text-neutral-500 text-[11px] flex items-center justify-between">
                  <span>src/auth/jwt.ts (Lines 18 - 24)</span>
                  <span className="text-neutral-400">1 Committable GitHub Suggestion Available</span>
                </div>
                
                <div className="p-3 bg-[#080808] border border-[#171717] rounded-sm space-y-1 text-[12px] leading-relaxed">
                  <div className="text-neutral-500">export async function rotateRefreshToken(token: string) &#123;</div>
                  <div className="bg-red-950/40 text-red-300 px-2 py-0.5 rounded-sm border-l-2 border-red-500">-   const decoded = jwt.decode(token);</div>
                  <div className="bg-red-950/40 text-red-300 px-2 py-0.5 rounded-sm border-l-2 border-red-500">-   return issueNewSession(decoded.userId);</div>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   const decoded = jwt.verify(token, process.env.JWT_SECRET);</div>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   if (!decoded || !decoded.userId) return null;</div>
                  <div className="bg-neutral-800 text-white px-2 py-0.5 rounded-sm border-l-2 border-white">+   return issueNewSession(decoded.userId);</div>
                  <div className="text-neutral-500">&#125;</div>
                </div>

                <div className="p-3 bg-[#0a0a0a] border border-[#222] rounded-sm flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <img src="/branding/argus-dark.png" alt="Argus" className="w-4 h-4 object-contain" />
                    <span className="text-white font-bold">Argus Analysis:</span>
                    <span className="text-neutral-400">jwt.decode() does not verify cryptographic signature. Replaced with jwt.verify().</span>
                  </div>
                  <span className="text-white font-mono font-bold bg-[#141414] px-2 py-1 border border-[#333] rounded-sm">
                    1-Click Suggestion
                  </span>
                </div>
              </div>
            )}

            {activeHeroTab === 'sentry' && (
              <div className="p-4 bg-[#080808] border border-[#171717] rounded-sm space-y-3">
                <div className="text-neutral-400 text-[11px] uppercase tracking-wider">Static Security Inspection Log:</div>
                <div className="space-y-2 text-[12px]">
                  <div className="p-2.5 bg-[#0f0f0f] border border-[#222] rounded-sm flex items-center justify-between">
                    <span className="text-neutral-300">AWS / GCP / OpenAI API Credentials:</span>
                    <span className="text-white font-bold">0 Leaks Detected (Clean)</span>
                  </div>
                  <div className="p-2.5 bg-[#0f0f0f] border border-[#222] rounded-sm flex items-center justify-between">
                    <span className="text-neutral-300">Raw SQL String Concatenation:</span>
                    <span className="text-white font-bold">0 Injections Detected</span>
                  </div>
                  <div className="p-2.5 bg-[#0f0f0f] border border-[#222] rounded-sm flex items-center justify-between">
                    <span className="text-neutral-300">Dangerous Function Invocations (eval/TLS disable):</span>
                    <span className="text-white font-bold">0 Dangerous Calls</span>
                  </div>
                </div>
              </div>
            )}

            {activeHeroTab === 'tests' && (
              <div className="p-4 bg-[#080808] border border-[#171717] rounded-sm space-y-2 text-[12px] leading-relaxed">
                <div className="text-neutral-500 text-[11px]">// Auto-generated Jest test suite for rotateRefreshToken</div>
                <pre className="text-neutral-300 overflow-x-auto">{`describe('rotateRefreshToken', () => {
  it('throws or returns null on expired signature', async () => {
    const expiredToken = 'eyJhbGciOiJIUzI1Ni...';
    await expect(rotateRefreshToken(expiredToken)).resolves.toBeNull();
  });

  it('successfully rotates valid active refresh tokens', async () => {
    const validToken = generateValidToken({ userId: 'usr_8819' });
    const session = await rotateRefreshToken(validToken);
    expect(session).toHaveProperty('token');
  });
});`}</pre>
              </div>
            )}
          </div>

        </div>

        {/* 4 Bottom Metrics */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-[#171717] text-left font-mono">
          <div className="p-3">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Review Latency</div>
            <div className="text-xl font-bold text-white mt-1">&lt; 1.2s</div>
            <div className="text-[11px] text-neutral-500 font-sans mt-0.5">Flash inference gateway</div>
          </div>

          <div className="p-3">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Signal Quality</div>
            <div className="text-xl font-bold text-white mt-1">High Density</div>
            <div className="text-[11px] text-neutral-500 font-sans mt-0.5">Zero conversational noise</div>
          </div>

          <div className="p-3">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Open Source</div>
            <div className="text-xl font-bold text-white mt-1">₹0 Free</div>
            <div className="text-[11px] text-neutral-500 font-sans mt-0.5">For all public repositories</div>
          </div>

          <div className="p-3">
            <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Security Sentry</div>
            <div className="text-xl font-bold text-white mt-1">Zero-Trust</div>
            <div className="text-[11px] text-neutral-500 font-sans mt-0.5">Static SAST credential check</div>
          </div>
        </div>

      </div>
    </section>
  );
}
