import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-16 text-xs text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#171717]">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-[#0d0d0d] border border-[#262626] flex items-center justify-center p-1">
                <img 
                  src="/branding/argus-dark.png" 
                  alt="Argus Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-mono text-sm font-bold text-white tracking-wider">ARGUS</span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Automated pull request code reviewer and security scanner.
            </p>
          </div>

          {/* Col 2: Ecosystem */}
          <div className="space-y-3">
            <div className="text-white font-mono font-bold text-xs uppercase tracking-wider">Ecosystem</div>
            <ul className="space-y-2">
              <li>
                <a href="https://atlasresearchlabs.online" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Atlas Labs</span>
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
                  <span>Isthmus</span>
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

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <div className="text-white font-mono font-bold text-xs uppercase tracking-wider">Resources</div>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/AtlasResearch-Labs/Argus" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="https://powerbox.atlasresearchlabs.online/docs" className="hover:text-white transition inline-flex items-center gap-1">
                  <span>Documentation</span>
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

          {/* Col 4: Legal */}
          <div className="space-y-3">
            <div className="text-white font-mono font-bold text-xs uppercase tracking-wider">Policies &amp; Contact</div>
            <ul className="space-y-2">
              <li><a href="mailto:support@atlasresearchlabs.online" className="hover:text-white transition">Contact &amp; Support</a></li>
              <li><a href="mailto:security@atlasresearchlabs.online" className="hover:text-white transition">Security Vulnerabilities</a></li>
              <li><a href="https://powerbox.atlasresearchlabs.online/privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="https://powerbox.atlasresearchlabs.online/terms" className="hover:text-white transition">Terms of Service</a></li>
              <li><span className="text-neutral-500">MIT License</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-xs">
          <div>© 2026 Atlas Research Labs.</div>
          <div>Fast, private, zero-noise code reviews.</div>
        </div>

      </div>
    </footer>
  );
}
