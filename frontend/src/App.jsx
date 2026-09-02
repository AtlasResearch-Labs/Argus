import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkflowCards from './components/WorkflowCards';
import LiveReviewSimulator from './components/LiveReviewSimulator';
import ArchitecturePipeline from './components/ArchitecturePipeline';
import CliSection from './components/CliSection';
import ComparisonTable from './components/ComparisonTable';
import PricingCalculator from './components/PricingCalculator';
import QuickStart from './components/QuickStart';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white antialiased">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WorkflowCards />
        <LiveReviewSimulator />
        <ArchitecturePipeline />
        <CliSection />
        <ComparisonTable />
        <PricingCalculator />
        <QuickStart />
      </main>
      <Footer />
    </div>
  );
}
