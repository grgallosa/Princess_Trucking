/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { SERVICES } from "../data";
import { ServiceDetail, ServiceCategory } from "../types";
import { Truck, Ship, HardHat, ShieldCheck, Layers, MapPin, Printer, ChevronRight, CheckCircle2, ThermometerSnowflake } from "lucide-react";

interface ServicesPanelProps {
  selectedServiceId: string | null;
  onClearSelectedService: () => void;
  onNavigateToTab: (tab: string) => void;
  onSetCategoryInquiry: (category: ServiceCategory) => void;
}

export default function ServicesPanel({
  selectedServiceId,
  onClearSelectedService,
  onNavigateToTab,
  onSetCategoryInquiry
}: ServicesPanelProps) {
  const [activeService, setActiveService] = useState<ServiceDetail>(SERVICES[0]);

  useEffect(() => {
    if (selectedServiceId) {
      const found = SERVICES.find(s => s.id === selectedServiceId);
      if (found) {
        setActiveService(found);
      }
    }
  }, [selectedServiceId]);

  const handleServiceSelect = (service: ServiceDetail) => {
    setActiveService(service);
    onClearSelectedService();
  };

  // Helper to render the correct category icon dynamically
  const getServiceIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "Truck":
        return <Truck className={className} />;
      case "Ship":
        return <Ship className={className} />;
      case "HardHat":
        return <HardHat className={className} />;
      case "ThermometerSnowflake":
        return <ThermometerSnowflake className={className} />;
      case "Layers":
        return <Layers className={className} />;
      default:
        return <Truck className={className} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-250 pb-4">
        <h1 className="font-display text-2xl font-bold text-gray-950 tracking-tight">Our Services</h1>
        <p className="text-xs text-gray-500 mt-1">
          Explore Princess Trucking's comprehensive domestic logistics, cold chain support, and dealership services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Service Switcher Sidebar (Left 4 Columns) */}
        <div className="lg:col-span-4 space-y-2.5">
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2">Service Pillars</p>
          <div className="space-y-1.5">
            {SERVICES.map((service) => {
              const isSelected = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                    isSelected
                      ? "bg-blue-50 border-blue-200 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {getServiceIcon(service.iconName, "h-5 w-5")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? "text-blue-950" : "text-gray-900"}`}>
                      {service.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{service.shortDesc}</p>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${
                    isSelected ? "text-blue-600 translate-x-0.5" : "text-gray-400"
                  }`} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-dashed border-gray-200 p-4 bg-gray-50/50 mt-4 text-center">
            <h5 className="text-[11px] font-bold text-gray-700">Need immediate tech support?</h5>
            <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
              Our Capiz Refrigeration and Mechanical Repair hub supports standard models and stationary systems.
            </p>
            <button
              onClick={() => {
                onSetCategoryInquiry(ServiceCategory.COLD_CHAIN_REPAIR);
                onNavigateToTab("inquire");
              }}
              className="mt-3 w-full rounded-lg bg-white hover:bg-gray-50 border border-gray-200 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm transition"
            >
              Contact Technicians
            </button>
          </div>
        </div>

        {/* Detailed Service Display (Right 8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          {/* Service Title Block */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-4 pb-4 border-b border-gray-150">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100/80 text-blue-700 shadow-inner">
                {getServiceIcon(activeService.iconName, "h-6 w-6")}
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-gray-400 tracking-wider uppercase"> Princess Advantage </span>
                <h2 className="font-display text-lg md:text-xl font-bold text-gray-950 leading-tight">
                  {activeService.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="self-start xs:self-center flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 px-3 py-1.5 text-xs text-gray-600 transition"
              title="Print this service catalog"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Catalog</span>
            </button>
          </div>

          {/* Service Long Description */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Description</h4>
            <p className="font-sans text-sm text-gray-700 leading-relaxed">
              {activeService.description}
            </p>
          </div>

          {/* Service Features Checklist */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Key Capabilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeService.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2.5 items-start bg-slate-50/50 rounded-xl p-3 border border-slate-100 hover:border-blue-100 transition">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-700 font-medium leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <div>
                <span className="text-[9px] text-blue-700 uppercase font-bold tracking-wider block">Service Coverage</span>
                <span className="text-xs font-semibold text-blue-950">{activeService.coverage}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSetCategoryInquiry(activeService.category);
                onNavigateToTab("inquire");
              }}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
            >
              Book this service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
