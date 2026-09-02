import React from 'react';
import { GitPullRequest, Search, CheckSquare } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Open Pull Request',
    desc: 'You create or update a pull request on GitHub or GitLab. The Argus action triggers automatically on changed files.',
    icon: GitPullRequest
  },
  {
    step: '02',
    title: 'Automated Inspection',
    desc: 'Argus parses the git diff, checks for leaked API keys or raw SQL queries, and analyzes code logic line by line.',
    icon: Search
  },
  {
    step: '03',
    title: '1-Click Review & Merge',
    desc: 'Argus posts actionable inline review comments with ready-to-merge code suggestions directly on your pull request.',
    icon: CheckSquare
  }
];

export default function ArchitecturePipeline() {
  return (
    <section id="how-it-works" className="py-24 bg-black border-b border-[#171717]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How Argus works in your repository.
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            Integrates into standard GitHub and GitLab workflows without requiring full repository write permissions.
          </p>
        </div>

        {/* 3 Step Wide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-sm bg-[#080808] border border-[#1f1f1f] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-neutral-500">
                      STEP {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-sm bg-[#121212] border border-[#2a2a2a] flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {s.title}
                  </h3>

                  <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
