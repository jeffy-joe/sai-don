"use client"

import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CLOUD_SERVICES, Provider, Category } from '@/lib/pricing-data';
import { useCalculator } from './CalculatorContext';
import { Search, Plus, Server, Cloud, Database, Network, Box, Cpu, Shield, Zap, Activity, Globe, LayoutGrid, MapPin } from 'lucide-react';
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
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [open, setOpen] = useState(false);

  // Extract unique regions from the service data
  const availableRegions = useMemo(() => {
    const regions = new Set<string>();
    regions.add('All');
    CLOUD_SERVICES.forEach(s => regions.add(s.region));
    return Array.from(regions).sort();
  }, []);

  const filteredServices = useMemo(() => {
    return CLOUD_SERVICES.filter(service => {
      const matchesSearch = service.service_name.toLowerCase().includes(search.toLowerCase()) || 
                            (service.instance_type?.toLowerCase().includes(search.toLowerCase()));
      const matchesProvider = selectedProvider === 'All' || service.provider === selectedProvider;
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesRegion = selectedRegion === 'All' || service.region === selectedRegion;
      return matchesSearch && matchesProvider && matchesCategory && matchesRegion;
    });
  }, [search, selectedProvider, selectedCategory, selectedRegion]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full h-16 text-lg font-semibold gap-2 border-dashed border-2 bg-transparent hover:bg-white/5 border-primary/50 text-primary">
          <Plus className="w-6 h-6" />
          Add Cloud Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0 dark bg-background border-primary/20">
        <DialogHeader className="p-6 border-b border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Cloud className="w-6 h-6 text-primary" /> Browse Cloud Catalog
            </DialogTitle>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search services (e.g. EC2, S3, RDS...)" 
                className="pl-9 h-11 bg-white/5 border-white/10 focus-visible:ring-primary" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              {/* Provider Filter */}
              <div className="flex p-1 bg-white/5 rounded-lg border border-white/5">
                {['All', 'AWS', 'Microsoft Azure', 'Google Cloud Platform'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedProvider(p as Provider | 'All')}
                    className={cn(
                      "px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                      selectedProvider === p 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {p === 'Microsoft Azure' ? 'Azure' : p === 'Google Cloud Platform' ? 'GCP' : p}
                  </button>
                ))}
              </div>

              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px] h-11 bg-white/5 border-white/10 font-semibold">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <SelectValue placeholder="Select Region" />
                  </div>
                </SelectTrigger>
                <SelectContent className="dark bg-background border-white/10">
                  {availableRegions.map(region => (
                    <SelectItem key={region} value={region} className="font-medium">
                      {region === 'All' ? 'All Regions' : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-72 border-r border-white/5 overflow-y-auto bg-black/20 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4 px-3">Service Categories</p>
            {CATEGORIES.map((cat) => {
              const Icon = cat === 'All' ? LayoutGrid : (CATEGORY_ICONS[cat] || Server);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as Category | 'All')}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                  <span className="truncate">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Service Results */}
          <div className="flex-1 overflow-y-auto p-8 bg-background/50">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredServices.map((service) => {
                  const Icon = CATEGORY_ICONS[service.category] || Server;
                  return (
                    <div 
                      key={service.id}
                      className="glass-card p-6 flex items-center justify-between group hover:border-primary/50 transition-all cursor-pointer rounded-2xl border border-white/5"
                      onClick={() => {
                        addService(service);
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="font-black text-foreground group-hover:text-primary transition-colors leading-tight text-lg">
                            {service.service_name} {service.instance_type ? <span className="text-muted-foreground font-medium ml-1 text-sm">- {service.instance_type}</span> : ''}
                          </h4>
                          <div className="flex items-center gap-3 mt-1.5">
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest bg-white/5 px-2 py-0.5 rounded">
                              {service.provider}
                            </p>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <p className="text-[10px] text-primary uppercase font-black tracking-widest">
                              {service.region}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xl font-black text-accent leading-none">
                          ${service.price}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter mt-1">
                          per {service.pricing_unit}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-2xl font-black">No services found</p>
                <p className="text-muted-foreground mt-2 max-w-xs">Try adjusting your region, provider, or search terms to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
