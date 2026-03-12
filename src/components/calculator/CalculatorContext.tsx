"use client"

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { PricingService } from '@/lib/pricing-data';
import { getRealTimePrice } from '@/ai/flows/real-time-price-check';

export type CurrencyCode = 'USD' | 'EUR' | 'INR' | 'GBP';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  GBP: '£',
};

export interface ServiceInstance extends PricingService {
  instanceId: string;
  quantity: number;
  usageValue: number; // e.g., hours per month, GB, or units
  isVerifying?: boolean;
}

interface CalculatorContextType {
  selectedServices: ServiceInstance[];
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
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
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const updateServicePrice = (instanceId: string, newPrice: number) => {
    setSelectedServices(prev => prev.map(s => 
      s.instanceId === instanceId ? { ...s, price: newPrice } : s
    ));
  };

  const setServiceVerifying = (instanceId: string, isVerifying: boolean) => {
    setSelectedServices(prev => prev.map(s => 
      s.instanceId === instanceId ? { ...s, isVerifying } : s
    ));
  };

  // Re-fetch all pricing from Gemini whenever the currency changes
  useEffect(() => {
    if (selectedServices.length === 0) return;

    const reFetchAll = async () => {
      const promises = selectedServices.map(async (service) => {
        setServiceVerifying(service.instanceId, true);
        try {
          const result = await getRealTimePrice({
            provider: service.provider,
            serviceName: service.service_name,
            instanceType: service.instance_type,
            region: service.region,
            category: service.category,
            currency: currency
          });
          updateServicePrice(service.instanceId, result.price);
        } catch (error) {
          console.error("AI currency conversion failed:", error);
        } finally {
          setServiceVerifying(service.instanceId, false);
        }
      });
      await Promise.all(promises);
    };

    reFetchAll();
  }, [currency]);

  const addService = async (service: PricingService) => {
    const instanceId = Math.random().toString(36).substr(2, 9);
    // Default usage: 730 hours for compute, 1 unit for others
    const defaultUsage = service.billing_cycle === 'hour' ? 730 : 1;
    
    const newInstance: ServiceInstance = {
      ...service,
      instanceId,
      quantity: 1,
      usageValue: defaultUsage,
      isVerifying: true,
      price: 0, 
    };
    
    setSelectedServices(prev => [...prev, newInstance]);

    try {
      const result = await getRealTimePrice({
        provider: service.provider,
        serviceName: service.service_name,
        instanceType: service.instance_type,
        region: service.region,
        category: service.category,
        currency: currency
      });
      
      updateServicePrice(instanceId, result.price);
    } catch (error) {
      console.error("Initial AI Price Fetch Failed:", error);
    } finally {
      setServiceVerifying(instanceId, false);
    }
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

  const calculateInstanceCost = (instance: ServiceInstance) => {
    let cost = 0;
    // Calculation Engine: 
    // Compute: instance * usage * quantity
    // Storage: size * price (per GB/mo) * quantity
    // Others: unit * price * quantity
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
      currency,
      setCurrency,
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
