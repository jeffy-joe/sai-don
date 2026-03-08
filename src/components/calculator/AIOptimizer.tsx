"use client"

import React, { useState } from 'react';
import { useCalculator } from './CalculatorContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { aiCostOptimizationSuggestions, AICostOptimizationSuggestionsOutput } from '@/ai/flows/ai-cost-optimization-suggestions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AIOptimizer() {
  const { selectedServices } = useCalculator();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AICostOptimizationSuggestionsOutput | null>(null);
  const [open, setOpen] = useState(false);

  const handleOptimize = async () => {
    if (selectedServices.length === 0) return;
    
    setLoading(true);
    setOpen(true);
    try {
      const infrastructure = selectedServices.map(s => ({
        id: s.instanceId,
        provider: s.provider,
        category: s.category,
        service_name: s.service_name,
        description: `${s.service_name} ${s.instance_type || ''}`,
        estimated_monthly_cost: (s.usageValue * s.price * s.quantity),
        usage_details: {
          hours_per_month: s.usageValue,
          quantity: s.quantity,
          instance_type: s.instance_type
        }
      }));

      const suggestions = await aiCostOptimizationSuggestions({ currentInfrastructure: infrastructure });
      setResult(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleOptimize}
        disabled={selectedServices.length === 0}
        className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold gap-2 shadow-lg shadow-primary/20"
      >
        <Sparkles className="w-5 h-5" />
        AI Cost Optimizer
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-background border-primary/20 dark">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
              <Sparkles className="w-6 h-6 text-accent" /> AI Optimization Suggestions
            </DialogTitle>
            <DialogDescription>
              We've analyzed your infrastructure and found potential savings.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto space-y-4 p-1">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Analyzing infrastructure patterns...</p>
              </div>
            ) : result ? (
              <>
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-sm leading-relaxed">
                  <p className="font-semibold text-primary mb-1">Executive Summary</p>
                  {result.summary}
                </div>

                <div className="space-y-4">
                  {result.suggestions.map((suggestion, i) => (
                    <div key={i} className="p-5 glass-card rounded-xl border-l-4 border-l-accent space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-foreground">{suggestion.suggestedService.service_name}</h4>
                          <p className="text-xs text-muted-foreground">Replacement for: {suggestion.originalServiceDescription}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-accent">Save ${suggestion.monthlySavings.toFixed(2)}/mo</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">&ldquo;{suggestion.reason}&rdquo;</p>
                      <div className="flex gap-4 pt-2 border-t border-white/5">
                         <div className="text-[10px] uppercase font-bold text-muted-foreground">
                            Provider: <span className="text-foreground">{suggestion.suggestedService.provider}</span>
                         </div>
                         <div className="text-[10px] uppercase font-bold text-muted-foreground">
                            Category: <span className="text-foreground">{suggestion.suggestedService.category}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-10 text-center">
                <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                <p>Failed to generate suggestions. Please try again.</p>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button onClick={() => setOpen(false)} className="w-full">Dismiss</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
