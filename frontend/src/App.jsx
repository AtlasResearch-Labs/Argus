import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiveReviewSimulator from './components/LiveReviewSimulator';
import ArchitecturePipeline from './components/ArchitecturePipeline';
import WorkflowCards from './components/WorkflowCards';
import RulesStudio from './components/RulesStudio';
import CliSection from './components/CliSection';
import ComparisonTable from './components/ComparisonTable';
import PricingCalculator from './components/PricingCalculator';
import QuickStart from './components/QuickStart';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-neutral-800 selection:text-white font-sans antialiased">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LiveReviewSimulator />
        <ArchitecturePipeline />
        <WorkflowCards />
        <RulesStudio />
        <CliSection />
        <ComparisonTable />
        <PricingCalculator />
        <QuickStart />
      </main>
      <Footer />
    </div>
  );
}
