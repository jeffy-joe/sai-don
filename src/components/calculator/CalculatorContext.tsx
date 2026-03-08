"use client"

import React, { createContext, useContext, useState, useMemo } from 'react';
import { PricingService, CLOUD_SERVICES } from '@/lib/pricing-data';

export interface ServiceInstance extends PricingService {
  instanceId: string;
  quantity: number;
  usageValue: number; // e.g., hours per month, GB, or units
  isVerifying?: boolean;
}

interface CalculatorContextType {
  selectedServices: ServiceInstance[];
  addService: (service: PricingService) => void;
  removeService: (instanceId: string) => void;
  updateServiceUsage: (instanceId: string, usage: number) => void;
  updateServiceQuantity: (instanceId: string, quantity: number) => void;
  updateServicePrice: (instanceId: string, newPrice: number) => void;
  setServiceVerifying: (instanceId: string, isVerifying: boolean) => void;
  totalMonthlyCost: number;
  providerCosts: Record<string, number>;
  categoryCosts: Record<string, number>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState<ServiceInstance[]>([]);

  const addService = (service: PricingService) => {
    const defaultUsage = service.billing_cycle === 'hour' ? 730 : 1;
    const newInstance: ServiceInstance = {
      ...service,
      instanceId: Math.random().toString(36).substr(2, 9),
      quantity: 1,
      usageValue: defaultUsage,
    };
    setSelectedServices([...selectedServices, newInstance]);
  };

  const removeService = (instanceId: string) => {
    setSelectedServices(selectedServices.filter(s => s.instanceId !== instanceId));
  };

  const updateServiceUsage = (instanceId: string, usage: number) => {
    setSelectedServices(selectedServices.map(s => 
      s.instanceId === instanceId ? { ...s, usageValue: usage } : s
    ));
  };

  const updateServiceQuantity = (instanceId: string, quantity: number) => {
    setSelectedServices(selectedServices.map(s => 
      s.instanceId === instanceId ? { ...s, quantity: Math.max(1, quantity) } : s
    ));
  };

  const updateServicePrice = (instanceId: string, newPrice: number) => {
    setSelectedServices(selectedServices.map(s => 
      s.instanceId === instanceId ? { ...s, price: newPrice } : s
    ));
  };

  const setServiceVerifying = (instanceId: string, isVerifying: boolean) => {
    setSelectedServices(selectedServices.map(s => 
      s.instanceId === instanceId ? { ...s, isVerifying } : s
    ));
  };

  const calculateInstanceCost = (instance: ServiceInstance) => {
    let cost = 0;
    if (instance.unit_multiplier) {
      cost = (instance.usageValue / instance.unit_multiplier) * instance.price;
    } else {
      cost = instance.usageValue * instance.price;
    }
    return cost * instance.quantity;
  };

  const totalMonthlyCost = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + calculateInstanceCost(s), 0);
  }, [selectedServices]);

  const providerCosts = useMemo(() => {
    const costs: Record<string, number> = {};
    selectedServices.forEach(s => {
      costs[s.provider] = (costs[s.provider] || 0) + calculateInstanceCost(s);
    });
    return costs;
  }, [selectedServices]);

  const categoryCosts = useMemo(() => {
    const costs: Record<string, number> = {};
    selectedServices.forEach(s => {
      costs[s.category] = (costs[s.category] || 0) + calculateInstanceCost(s);
    });
    return costs;
  }, [selectedServices]);

  return (
    <CalculatorContext.Provider value={{
      selectedServices,
      addService,
      removeService,
      updateServiceUsage,
      updateServiceQuantity,
      updateServicePrice,
      setServiceVerifying,
      totalMonthlyCost,
      providerCosts,
      categoryCosts
    }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error('useCalculator must be used within a CalculatorProvider');
  return context;
};
