"use client"

import React from 'react';
import { useCalculator } from './CalculatorContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Trash2, Users, Clock, ChevronRight, Server } from 'lucide-react';
import { ServicePicker } from './ServicePicker';

export function ArchitectureBuilder() {
  const { selectedServices, removeService, updateServiceUsage, updateServiceQuantity } = useCalculator();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Infrastructure Design</h2>
          <p className="text-muted-foreground">Configure your cloud resources and see real-time cost estimates.</p>
        </div>
      </div>

      <div className="space-y-4">
        {selectedServices.map((instance) => (
          <Card key={instance.instanceId} className="glass-card overflow-hidden transition-all hover:ring-1 hover:ring-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{instance.provider.charAt(0)}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{instance.service_name}</h3>
                      {instance.instance_type && (
                        <span className="text-xs px-2 py-0.5 rounded bg-muted font-mono text-muted-foreground uppercase">
                          {instance.instance_type}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{instance.provider} • {instance.category}</p>
                    <p className="text-xs font-medium text-accent uppercase tracking-widest">{instance.region}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-end lg:items-center">
                  <div className="w-full sm:w-48 space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Users className="w-3 h-3" /> Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <Slider
                        value={[instance.quantity]}
                        min={1}
                        max={100}
                        step={1}
                        onValueChange={([val]) => updateServiceQuantity(instance.instanceId, val)}
                        className="flex-1"
                      />
                      <span className="text-sm font-mono w-8 text-right font-bold">{instance.quantity}</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-64 space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {instance.input_label || 'Usage per Month'}
                    </label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={instance.usageValue}
                        onChange={(e) => updateServiceUsage(instance.instanceId, Number(e.target.value))}
                        className="h-9 font-mono bg-white/5 border-white/10"
                      />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {instance.billing_cycle === 'hour' ? 'hrs/mo' : instance.pricing_unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase font-bold">Subtotal</p>
                      <p className="text-xl font-mono font-bold text-primary">
                        ${((instance.unit_multiplier ? (instance.usageValue / instance.unit_multiplier) : instance.usageValue) * instance.price * instance.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeService(instance.instanceId)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <ServicePicker />

        {selectedServices.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-muted rounded-3xl opacity-60">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
              <Server className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold">No services added yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Start by adding cloud services from AWS, Azure, or GCP to your infrastructure design.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
