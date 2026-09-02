import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const COMPARISON_DATA = [
  {
    feature: 'Pricing Model',
    argus: 'Free for OSS / ₹49 Pay-As-You-Go',
    coderabbit: '$15 – $30 / dev / month',
    copilot: '$19 – $39 / dev / month',
    qodo: '$19 – $38 / dev / month'
  },
  {
    feature: 'Conversational Noise',
    argus: 'Zero (Actionable findings only)',
    coderabbit: 'High (Summary essays & poems)',
    copilot: 'Medium (Generic responses)',
    qodo: 'High (Verbose markdown tables)'
  },
  {
    feature: '1-Click GitHub Suggestions',
    argus: true,
    coderabbit: true,
    copilot: false,
    qodo: true
  },
  {
    feature: 'Static Secret & Injection Sentry',
    argus: true,
    coderabbit: 'Add-on Tier',
    copilot: 'Basic',
    qodo: 'Basic'
  },
  {
    feature: 'Automated Unit Test Synthesizer',
    argus: true,
    coderabbit: false,
    copilot: false,
    qodo: 'Partial'
  },
  {
    feature: 'Local Terminal CLI (pre-push)',
    argus: true,
    coderabbit: false,
    copilot: false,
    qodo: 'Limited'
  },
  {
    feature: 'Inference Backend',
    argus: 'Atlas Powerbox (Sub-second)',
    coderabbit: 'Proprietary Cloud',
    copilot: 'Azure OpenAI',
    qodo: 'AWS Bedrock'
  },
  {
    feature: 'Open Source Repositories',
    argus: '100% Free Forever',
    coderabbit: 'Free with rate limits',
    copilot: 'Paid Only',
    qodo: 'Free with rate limits'
  }
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 bg-black border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            // MARKET COMPARISON
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Architectural Comparison
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            A direct, feature-by-feature evaluation of automated code review tools.
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl bg-[#050505] border border-[#1a1a1a] overflow-x-auto shadow-2xl">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-[#1f1f1f]">
                <th className="p-4 sm:p-5 text-neutral-400 font-bold uppercase tracking-wider">Dimension</th>
                <th className="p-4 sm:p-5 text-white font-extrabold bg-[#121212] border-x border-[#262626]">
                  ARGUS (Atlas Labs)
                </th>
                <th className="p-4 sm:p-5 text-neutral-400 font-normal">CodeRabbit</th>
                <th className="p-4 sm:p-5 text-neutral-400 font-normal">GitHub Copilot PR</th>
                <th className="p-4 sm:p-5 text-neutral-400 font-normal">Qodo (PR-Agent)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#141414]">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#080808] transition">
                  <td className="p-4 sm:p-5 text-neutral-300 font-medium">
                    {row.feature}
                  </td>

                  {/* Argus Column */}
                  <td className="p-4 sm:p-5 font-bold text-white bg-[#0e0e0e] border-x border-[#1f1f1f]">
                    {typeof row.argus === 'boolean' ? (
                      row.argus ? (
                        <div className="flex items-center gap-1.5 text-white">
                          <Check className="w-4 h-4 text-white" />
                          <span>Supported</span>
                        </div>
                      ) : (
                        <X className="w-4 h-4 text-neutral-500" />
                      )
                    ) : (
                      <span>{row.argus}</span>
                    )}
                  </td>

                  {/* CodeRabbit Column */}
                  <td className="p-4 sm:p-5 text-neutral-400">
                    {typeof row.coderabbit === 'boolean' ? (
                      row.coderabbit ? (
                        <Check className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600" />
                      )
                    ) : (
                      <span>{row.coderabbit}</span>
                    )}
                  </td>

                  {/* Copilot Column */}
                  <td className="p-4 sm:p-5 text-neutral-400">
                    {typeof row.copilot === 'boolean' ? (
                      row.copilot ? (
                        <Check className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600" />
                      )
                    ) : (
                      <span>{row.copilot}</span>
                    )}
                  </td>

                  {/* Qodo Column */}
                  <td className="p-4 sm:p-5 text-neutral-400">
                    {typeof row.qodo === 'boolean' ? (
                      row.qodo ? (
                        <Check className="w-4 h-4 text-neutral-400" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600" />
                      )
                    ) : (
                      <span>{row.qodo}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
