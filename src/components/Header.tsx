/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Truck, ChevronDown, User, ShieldCheck, MapPin, Menu, X } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInquiryHistory: () => void;
  historyCount: number;
}

export default function Header({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Our Services" },
    { id: "estimator", label: "Rates Planner" },
    { id: "fleet", label: "Fleet & Dealership" },
    { id: "inquire", label: "Inquire & Book" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab("overview")} 
            className="flex items-center gap-2 text-left focus:outline-none rounded-lg p-1"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-100">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-tight text-slate-900 block">
                Princess Trucking
              </span>
              <span className="font-mono text-[9px] text-slate-400 block -mt-1 font-semibold">
                Roxas City Gateway
              </span>
            </div>
          </button>
        </div>

        {/* Desktop navigation tabs - Google styled (clean pill borders/indicators) */}
        <nav className="hidden md:flex items-center space-x-1" aria-label="Global navigation">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setActiveTab("inquire")}
            className="rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 transition-all active:scale-95 cursor-pointer"
          >
            Request Quote
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-600"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-100 bg-white px-4 pt-2 pb-4 md:hidden">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab("inquire");
                setMobileMenuOpen(false);
              }}
              className="w-full mt-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-2 text-xs font-bold text-center"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
