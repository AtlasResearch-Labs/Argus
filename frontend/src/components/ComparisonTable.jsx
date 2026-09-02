import React from 'react';
import { Check, X } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'Pricing Model',
    argus: 'Free for OSS / ₹49 Pay-As-You-Go',
    coderabbit: '$15 – $30 / user / month',
    copilot: '$19 – $39 / user / month',
    qodo: '$19 – $38 / user / month'
  },
  {
    feature: '1-Click Merge Suggestions',
    argus: true,
    coderabbit: true,
    copilot: false,
    qodo: true
  },
  {
    feature: 'Secret & Credential Scanner',
    argus: true,
    coderabbit: true,
    copilot: 'Basic',
    qodo: 'Basic'
  },
  {
    feature: 'Automated Unit Test Generation',
    argus: true,
    coderabbit: false,
    copilot: false,
    qodo: 'Partial'
  },
  {
    feature: 'Command-Line Tool (CLI)',
    argus: true,
    coderabbit: true,
    copilot: false,
    qodo: true
  },
  {
    feature: 'Public Open-Source Repositories',
    argus: '100% Free Forever',
    coderabbit: 'Free with rate limits',
    copilot: 'Paid subscription',
    qodo: 'Free tier with rate limits'
  }
];

export default function ComparisonTable() {
  return (
    <section id="compare" className="py-24 bg-[#050505] border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How Argus compares to other tools.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            A straightforward comparison of automated pull request review tools.
          </p>
        </div>

        {/* Wide Clean Table */}
        <div className="rounded-sm bg-[#080808] border border-[#1f1f1f] overflow-x-auto shadow-2xl">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f0f0f] border-b border-[#222]">
                <th className="p-5 text-neutral-400 font-bold uppercase tracking-wider">Feature</th>
                <th className="p-5 text-white font-bold bg-[#141414] border-x border-[#262626]">
                  Argus
                </th>
                <th className="p-5 text-neutral-400 font-medium">CodeRabbit</th>
                <th className="p-5 text-neutral-400 font-medium">GitHub Copilot PR</th>
                <th className="p-5 text-neutral-400 font-medium">Qodo</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#171717]">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#0c0c0c] transition">
                  <td className="p-5 text-neutral-300 font-medium font-sans text-sm">
                    {row.feature}
                  </td>

                  {/* Argus Column */}
                  <td className="p-5 font-bold text-white bg-[#0e0e0e] border-x border-[#222]">
                    {typeof row.argus === 'boolean' ? (
                      row.argus ? (
                        <div className="flex items-center gap-1.5 text-white">
                          <Check className="w-4 h-4 text-white" />
                          <span>Yes</span>
                        </div>
                      ) : (
                        <X className="w-4 h-4 text-neutral-600" />
                      )
                    ) : (
                      <span>{row.argus}</span>
                    )}
                  </td>

                  {/* CodeRabbit */}
                  <td className="p-5 text-neutral-400">
                    {typeof row.coderabbit === 'boolean' ? (
                      row.coderabbit ? (
                        <div className="flex items-center gap-1.5 text-neutral-400">
                          <Check className="w-4 h-4 text-neutral-400" />
                          <span>Yes</span>
                        </div>
                      ) : (
                        <X className="w-4 h-4 text-neutral-600" />
                      )
                    ) : (
                      <span>{row.coderabbit}</span>
                    )}
                  </td>

                  {/* Copilot */}
                  <td className="p-5 text-neutral-400">
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

                  {/* Qodo */}
                  <td className="p-5 text-neutral-400">
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
