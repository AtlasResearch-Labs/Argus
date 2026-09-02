import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#141414] py-16 font-mono text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#141414]">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-[#0a0a0a] border border-[#222222] flex items-center justify-center p-1">
                <img 
                  src="/branding/argus-dark.png" 
                  alt="Argus Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-white tracking-widest">ARGUS</span>
            </div>
            <p className="text-neutral-500 text-[11px] leading-relaxed font-sans">
              Autonomous PR reviewer and code security sentinel. Part of the Atlas Labs sovereign software collective.
            </p>
          </div>

          {/* Systems */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">// Ecosystem</div>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="https://atlasresearchlabs.online" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Atlas Labs Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="https://powerbox.atlasresearchlabs.online" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Powerbox Gateway</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/AtlasResearch-Labs/Isthmus" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Isthmus P2P Mesh</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="https://github.com/AtlasResearch-Labs/Atlas" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Atlas Workspace</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">// Resources</div>
            <ul className="space-y-2 font-sans">
              <li>
                <a href="https://github.com/AtlasResearch-Labs/Argus" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="https://powerbox.atlasresearchlabs.online/docs" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Inference API Docs</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="https://powerbox.atlasresearchlabs.online/tester" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>API Sandbox</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <div className="text-white font-bold uppercase tracking-wider mb-3">// Legal & Policy</div>
            <ul className="space-y-2 font-sans">
              <li><a href="https://powerbox.atlasresearchlabs.online/privacy" className="hover:text-white transition">Zero-Retention Privacy</a></li>
              <li><a href="https://powerbox.atlasresearchlabs.online/terms" className="hover:text-white transition">Terms of Service</a></li>
              <li><span className="text-neutral-500">MIT Open Source License</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>© 2026 Atlas Labs. Sovereign Software Primitives.</div>
          <div className="text-neutral-400">Sub-second Flash Inference · Zero Data Retention</div>
        </div>

      </div>
    </footer>
  );
}
