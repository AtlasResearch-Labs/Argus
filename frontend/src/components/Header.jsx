import React, { useState } from 'react';
import { Terminal, ArrowUpRight, Menu, X, Check, GitPullRequest, Activity } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCli = () => {
    navigator.clipboard.writeText('npx @atlas-labs/argus review');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo with Official Argus Emblem */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#0a0a0a] border border-[#262626] flex items-center justify-center p-1">
                <img 
                  src="/branding/argus-dark.png" 
                  alt="Argus Emblem" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-mono text-sm font-bold tracking-widest text-white">
                ARGUS
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#222] font-mono text-[11px] text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-none bg-neutral-400" />
              <span>SENTINEL: READY</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 font-mono text-xs text-neutral-400">
            <a href="#simulator" className="hover:text-white transition">Live Simulator</a>
            <a href="#pipeline" className="hover:text-white transition">Architecture</a>
            <a href="#rules" className="hover:text-white transition">Rules Studio</a>
            <a href="#cli" className="hover:text-white transition">Terminal CLI</a>
            <a href="#comparison" className="hover:text-white transition">Comparison</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="https://powerbox.atlasresearchlabs.online/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-1">
              <span>Docs</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
            <button 
              onClick={copyCli}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#080808] border border-[#262626] hover:border-[#404040] text-neutral-300 transition"
              title="Copy CLI command"
            >
              <Terminal className="w-3.5 h-3.5 text-neutral-400" />
              <span>npx @atlas-labs/argus</span>
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : null}
            </button>

            <a 
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white text-black font-semibold hover:bg-neutral-200 transition"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-[#1f1f1f] px-4 py-4 space-y-3 font-mono text-xs">
          <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Live Simulator</a>
          <a href="#pipeline" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Architecture</a>
          <a href="#rules" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Rules Studio</a>
          <a href="#cli" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Terminal CLI</a>
          <a href="#comparison" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Comparison</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Pricing</a>
          <div className="pt-3 border-t border-[#1a1a1a] flex flex-col gap-2">
            <a 
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-white text-black text-center font-medium rounded-sm"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
