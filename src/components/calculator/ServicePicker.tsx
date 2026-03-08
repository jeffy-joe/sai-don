"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CLOUD_SERVICES, Provider, Category } from '@/lib/pricing-data';
import { useCalculator } from './CalculatorContext';
import { Search, Plus, Server, Cloud, Database, Network, Box, Cpu, Shield, Zap, Activity, Globe } from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  'Compute': Server,
  'Storage': Cloud,
  'Database': Database,
  'Networking': Network,
  'Containers & Kubernetes': Box,
  'AI / Machine Learning': Cpu,
  'Analytics / Big Data': Activity,
  'DevOps & CI/CD': Zap,
  'Monitoring & Logging': Activity,
  'Security Services': Shield,
  'CDN & Edge': Globe,
  'Messaging & Integration': Globe,
};

export function ServicePicker() {
  const { addService } = useCalculator();
  const [search, setSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | 'All'>('All');
  const [open, setOpen] = useState(false);

  const filteredServices = CLOUD_SERVICES.filter(service => {
    const matchesSearch = service.service_name.toLowerCase().includes(search.toLowerCase()) || 
                          (service.instance_type?.toLowerCase().includes(search.toLowerCase()));
    const matchesProvider = selectedProvider === 'All' || service.provider === selectedProvider;
    return matchesSearch && matchesProvider;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full h-16 text-lg font-semibold gap-2 border-dashed border-2 bg-transparent hover:bg-white/5 border-primary/50 text-primary">
          <Plus className="w-6 h-6" />
          Add Cloud Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0 dark bg-background">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">Browse Services</DialogTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search EC2, S3, RDS..." 
                className="pl-9 h-11" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['All', 'AWS', 'Microsoft Azure', 'Google Cloud Platform'].map((p) => (
                <Button
                  key={p}
                  variant={selectedProvider === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedProvider(p as Provider | 'All')}
                  className="whitespace-nowrap"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => {
              const Icon = CATEGORY_ICONS[service.category] || Server;
              return (
                <div 
                  key={service.id}
                  className="glass-card p-4 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer rounded-xl"
                  onClick={() => {
                    addService(service);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.service_name} {service.instance_type ? `- ${service.instance_type}` : ''}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {service.provider} • {service.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-accent">
                      ${service.price}/{service.pricing_unit}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{service.region}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
