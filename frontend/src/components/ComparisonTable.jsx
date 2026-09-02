import React from 'react';
import { Check, X } from 'lucide-react';

const COMPARISON_DATA = [
  {
    dimension: 'Pricing Model',
    argus: 'Free for OSS / ₹49 Pay-As-You-Go',
    coderabbit: '$15 – $30 / dev / month (Subscription)',
    copilot: '$19 – $39 / dev / month (Subscription)',
    qodo: '$19 – $38 / dev / month (Subscription)'
  },
  {
    dimension: 'Review Output Style',
    argus: 'High-density inline comments & diffs',
    coderabbit: 'Summary overview + inline comments',
    copilot: 'Chat & inline comments',
    qodo: 'PR descriptions & inline comments'
  },
  {
    dimension: '1-Click GitHub Suggestions',
    argus: true,
    coderabbit: true,
    copilot: false,
    qodo: true
  },
  {
    dimension: 'Automated Unit Test Synthesis',
    argus: true,
    coderabbit: false,
    copilot: false,
    qodo: 'Partial'
  },
  {
    dimension: 'Static Secret & Injection Sentry',
    argus: true,
    coderabbit: 'Enterprise tier',
    copilot: 'Basic',
    qodo: 'Basic'
  },
  {
    dimension: 'Terminal CLI Tool',
    argus: true,
    coderabbit: true,
    copilot: false,
    qodo: true
  },
  {
    dimension: 'Open Source Repositories',
    argus: '100% Free Forever',
    coderabbit: 'Free with rate limits',
    copilot: 'Paid only',
    qodo: 'Free tier with rate limits'
  },
  {
    dimension: 'Inference Provider',
    argus: 'Atlas Powerbox (Multi-model failover)',
    coderabbit: 'Proprietary cloud routing',
    copilot: 'Azure OpenAI',
    qodo: 'AWS Bedrock / Azure'
  }
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 bg-black border-t border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">
            MARKET COMPARISON
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Architectural Comparison
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2">
            An objective, feature-by-feature evaluation of automated pull request review tools.
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-sm bg-[#050505] border border-[#1a1a1a] overflow-x-auto shadow-2xl">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-[#1f1f1f]">
                <th className="p-4 sm:p-5 text-neutral-400 font-bold uppercase tracking-wider">Dimension</th>
                <th className="p-4 sm:p-5 text-white font-extrabold bg-[#121212] border-x border-[#262626]">
                  ARGUS
                </th>
                <th className="p-4 sm:p-5 text-neutral-400 font-medium">CodeRabbit</th>
                <th className="p-4 sm:p-5 text-neutral-400 font-medium">GitHub Copilot PR</th>
                <th className="p-4 sm:p-5 text-neutral-400 font-medium">Qodo (PR-Agent)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#141414]">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#080808] transition">
                  <td className="p-4 sm:p-5 text-neutral-300 font-medium">
                    {row.dimension}
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
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <Check className="w-4 h-4 text-neutral-400" />
                          <span>Supported</span>
                        </div>
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
