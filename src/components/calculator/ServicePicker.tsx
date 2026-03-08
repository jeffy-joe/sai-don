"use client"

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CLOUD_SERVICES, Provider, Category } from '@/lib/pricing-data';
import { useCalculator } from './CalculatorContext';
import { Search, Plus, Server, Cloud, Database, Network, Box, Cpu, Shield, Zap, Activity, Globe, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Compute',
  'Storage',
  'Database',
  'Networking',
  'Containers & Kubernetes',
  'AI / Machine Learning',
  'Analytics / Big Data',
  'DevOps & CI/CD',
  'Monitoring & Logging',
  'Security Services',
  'CDN & Edge',
  'Messaging & Integration',
];

export function ServicePicker() {
  const { addService } = useCalculator();
  const [search, setSearch] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [open, setOpen] = useState(false);

  const filteredServices = useMemo(() => {
    return CLOUD_SERVICES.filter(service => {
      const matchesSearch = service.service_name.toLowerCase().includes(search.toLowerCase()) || 
                            (service.instance_type?.toLowerCase().includes(search.toLowerCase()));
      const matchesProvider = selectedProvider === 'All' || service.provider === selectedProvider;
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesProvider && matchesCategory;
    });
  }, [search, selectedProvider, selectedCategory]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full h-16 text-lg font-semibold gap-2 border-dashed border-2 bg-transparent hover:bg-white/5 border-primary/50 text-primary">
          <Plus className="w-6 h-6" />
          Add Cloud Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 dark bg-background">
        <DialogHeader className="p-6 border-b border-white/5">
          <DialogTitle className="text-2xl font-bold">Browse Cloud Services</DialogTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search services (e.g. EC2, S3, RDS...)" 
                className="pl-9 h-11 bg-white/5 border-white/10" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex p-1 bg-white/5 rounded-lg">
              {['All', 'AWS', 'Microsoft Azure', 'Google Cloud Platform'].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProvider(p as Provider | 'All')}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-md transition-all whitespace-nowrap",
                    selectedProvider === p 
                      ? "bg-primary text-white shadow-lg" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p === 'Microsoft Azure' ? 'Azure' : p === 'Google Cloud Platform' ? 'GCP' : p}
                </button>
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-64 border-r border-white/5 overflow-y-auto bg-black/20 p-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 px-2">Categories</p>
            {CATEGORIES.map((cat) => {
              const Icon = cat === 'All' ? LayoutGrid : (CATEGORY_ICONS[cat] || Server);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as Category | 'All')}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                    isActive 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                  <span className="truncate">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Service Results */}
          <div className="flex-1 overflow-y-auto p-6 bg-background/50">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredServices.map((service) => {
                  const Icon = CATEGORY_ICONS[service.category] || Server;
                  return (
                    <div 
                      key={service.id}
                      className="glass-card p-5 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer rounded-2xl border border-white/5"
                      onClick={() => {
                        addService(service);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {service.service_name} {service.instance_type ? <span className="text-muted-foreground font-normal ml-1">- {service.instance_type}</span> : ''}
                          </h4>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">
                            {service.provider} • {service.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-base font-black text-accent">
                          ${service.price}
                        </p>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">
                          per {service.pricing_unit}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <Search className="w-12 h-12 mb-4" />
                <p className="text-lg font-bold">No services found</p>
                <p className="text-sm">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
