import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, GitPullRequest } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-7 h-7 rounded-sm bg-[#0d0d0d] border border-[#2a2a2a] flex items-center justify-center p-1">
              <img 
                src="/branding/argus-dark.png" 
                alt="Argus Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-mono text-sm font-semibold tracking-wider text-white">
              Argus
            </span>
          </a>

          {/* Clean Desktop Navigation (No Clutter) */}
          <nav className="hidden md:flex items-center gap-8 text-xs text-neutral-400 font-sans">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#demo" className="hover:text-white transition">Live Demo</a>
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <a href="#compare" className="hover:text-white transition">Compare</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a 
              href="https://powerbox.atlasresearchlabs.online/docs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition inline-flex items-center gap-1"
            >
              <span>Docs</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </a>
          </nav>

          {/* Action Link */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#222] px-6 py-5 space-y-4 text-xs font-sans">
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Features</a>
          <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Live Demo</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">How It Works</a>
          <a href="#compare" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Compare</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-neutral-300 hover:text-white py-1">Pricing</a>
          <a href="https://powerbox.atlasresearchlabs.online/docs" target="_blank" rel="noopener noreferrer" className="block text-neutral-300 hover:text-white py-1">Documentation</a>
          <div className="pt-4 border-t border-[#1c1c1c]">
            <a 
              href="https://github.com/AtlasResearch-Labs/Argus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-white text-black text-center font-medium rounded-sm block"
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
