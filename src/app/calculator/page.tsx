"use client"

import React from 'react';
import { CalculatorProvider } from '@/components/calculator/CalculatorContext';
import { ArchitectureBuilder } from '@/components/calculator/ArchitectureBuilder';
import { CostSummary } from '@/components/calculator/CostSummary';
import { Cloud, LayoutDashboard, Settings, Info, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-background dark flex flex-col gradient-bg">
        {/* Simple Top Nav */}
        <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter">CloudCalc<span className="text-primary">Pro</span></span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button className="h-9 px-4 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-all">Export PDF</button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Sidebar-ish Nav */}
            <div className="lg:col-span-1 hidden xl:flex flex-col gap-4">
              {[
                { icon: LayoutDashboard, active: true },
                { icon: Settings, active: false },
                { icon: Info, active: false },
                { icon: MessageSquare, active: false },
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-white/5'}`}
                >
                  <item.icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Main Center Area: Builder */}
            <div className="lg:col-span-8 xl:col-span-8">
              <ArchitectureBuilder />
            </div>

            {/* Right Side: Cost Summary & AI */}
            <div className="lg:col-span-4 xl:col-span-3">
              <CostSummary />
            </div>
          </div>
        </main>
      </div>
    </CalculatorProvider>
  );
}
