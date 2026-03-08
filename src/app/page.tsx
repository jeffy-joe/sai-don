import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cloud, Zap, Shield, BarChart3, ArrowRight, Globe, Server } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">CloudCalc<span className="text-primary">Pro</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <Link href="#pricing" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Supported Clouds</Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Header buttons removed as requested */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full gradient-bg opacity-50 -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent uppercase tracking-widest animate-fade-in">
            <Zap className="w-4 h-4 fill-accent" /> Now with AI Cost Optimization
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Estimate Your Cloud Infrastructure <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Costs in Minutes.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The multi-cloud price calculator designed for modern architects. Compare AWS, Azure, and Google Cloud side-by-side with real-time accuracy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/calculator">
              <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full group">
                Start Building Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-full glass-card">
              View Sample Estimates
            </Button>
          </div>

          {/* Feature Badges */}
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale">
             <div className="flex flex-col items-center gap-2">
                <Globe className="w-8 h-8" />
                <span className="font-bold text-sm">AWS</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Server className="w-8 h-8" />
                <span className="font-bold text-sm">Microsoft Azure</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Cloud className="w-8 h-8" />
                <span className="font-bold text-sm">Google Cloud</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Shield className="w-8 h-8" />
                <span className="font-bold text-sm">Security First</span>
             </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="features" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Everything you need to plan your cloud spend</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Stop guessing your monthly bills. Get granular precision with our advanced simulation engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multi-Cloud Precision",
                desc: "Switch between providers instantly and compare the same architecture across global regions.",
                icon: Globe,
                color: "text-blue-500"
              },
              {
                title: "AI Optimization",
                desc: "Our GenAI tool analyzes your design and suggests alternative instance types to save up to 40%.",
                icon: Zap,
                color: "text-yellow-500"
              },
              {
                title: "Visual Breakdown",
                desc: "Interactive charts show you exactly where every cent is going—by provider, category, or region.",
                icon: BarChart3,
                color: "text-cyan-500"
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/20 transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter">CloudCalc<span className="text-primary">Pro</span></span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 CloudCalc Pro. All rights reserved. Built for professional cloud architects.
          </div>
          <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
            <Link href="#" className="hover:text-primary">Twitter</Link>
            <Link href="#" className="hover:text-primary">LinkedIn</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
