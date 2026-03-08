"use client"

import React from 'react';
import { useCalculator } from './CalculatorContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Calendar, Zap } from 'lucide-react';
import { AIOptimizer } from './AIOptimizer';

export function CostSummary() {
  const { totalMonthlyCost, providerCosts, categoryCosts } = useCalculator();

  const providerData = Object.entries(providerCosts).map(([name, value]) => ({ name, value }));
  const categoryData = Object.entries(categoryCosts).map(([name, value]) => ({ name, value }));

  const COLORS = ['#527EF0', '#69E0FF', '#FF8042', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6 lg:sticky lg:top-8">
      <Card className="glass-card border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" /> Total Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-5xl font-mono font-black text-foreground">
              ${totalMonthlyCost.toFixed(2)}
              <span className="text-lg font-medium text-muted-foreground ml-2">/mo</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 mt-2">
              <Calendar className="w-4 h-4" />
              Yearly: <span className="font-bold text-foreground">${(totalMonthlyCost * 12).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="h-px bg-white/10 w-full" />
          
          <div className="space-y-4 pt-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Provider Breakdown</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={providerData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {providerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#191E27', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <AIOptimizer />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={80} 
                  axisLine={false} 
                  tickLine={false} 
                  style={{ fontSize: '10px', fontWeight: 'bold' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#191E27', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#527EF0" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
