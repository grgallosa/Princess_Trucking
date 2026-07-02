/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Ship, Clock, Award, Building2, MapPin, ArrowRight, 
  Sparkles, CheckCircle2, ChevronRight, Phone, ShieldCheck, 
  Truck, ArrowUpRight, Anchor, Users, HelpCircle, ThermometerSnowflake
} from "lucide-react";
import { motion } from "motion/react";
import { SERVICES } from "../data";

interface DashboardOverviewProps {
  onSearchAction: (query: string) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectService: (serviceId: string) => void;
}

export default function DashboardOverview({ onSearchAction, onNavigateToTab, onSelectService }: DashboardOverviewProps) {
  const [activeTab, setActiveTab] = useState<"about" | "advantage" | "location">("about");

  const partners = [
    { name: "JEM Logistics Inc. / Manny Boy", desc: "Long-term Hauling Partner" },
    { name: "MENN Logistics Services Inc. (Jersey Milk)", desc: "Cold Chain Client" },
    { name: "RSP Hauler (Pepsi Capiz Sales)", desc: "Strategic Beverage Hauler" },
    { name: "Lee Boy Trucking", desc: "Regional Cargo Partner" },
    { name: "Bob & Lyn Trucking Services", desc: "Visayas Fleet Client" }
  ];

  const valueProps = [
    {
      title: "Unmatched Reliability",
      desc: "A proven track record of on-time deliveries and secure cargo handling across the Philippine highway networks.",
      icon: Clock,
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "One-Stop Logistics Shop",
      desc: "From vehicle dealership and spare parts sourcing to cross-country hauling and cold chain reefer maintenance—we handle it all.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Strategic Visayas Location",
      desc: "Based in Roxas City, Capiz, serving as the gateway to Western Visayas and connecting Panay seamlessly to the archipelago.",
      icon: MapPin,
      color: "text-indigo-600 bg-indigo-50"
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* Premium Hero Banner (Corporate Web Design Aesthetic) */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-900 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-600/20 via-cyan-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* Real-world inspired high-quality Unsplash image background with perfect overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-35 lg:opacity-60 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80" 
            alt="Princess Trucking Logistics Fleet" 
            className="w-full h-full object-cover object-center mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent lg:from-slate-950 lg:via-slate-950/70 lg:to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 text-xs font-semibold text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              <span>Premier Visayas Logistics &amp; Supply Chain Provider</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Connecting the <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent font-extrabold">
                Philippine Archipelago
              </span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed font-sans">
              Headquartered in Roxas City, Capiz, <strong>Princess Trucking</strong> delivers robust domestic logistics solutions via extensive road networks and seamless Roll-on/Roll-off (Ro-Ro) sea transport.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => onNavigateToTab("inquire")}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-xs font-bold text-white transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigateToTab("estimator")}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-6 py-3.5 text-xs font-bold text-slate-200 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Interactive Rates Planner</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Partners Showcase */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
          TRUSTED PARTNER & LOGISTICS PROVIDER FOR PROMINENT COMPANIES
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
          {partners.map((partner, idx) => (
            <div key={idx} className="text-center p-3 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 hover:border-blue-100 transition-all duration-300">
              <p className="font-display text-xs font-extrabold text-slate-800 tracking-tight">{partner.name}</p>
              <p className="text-[9px] text-slate-400 mt-0.5 font-medium">{partner.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Princess Trucking - Editorial Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Text Detail */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <Building2 className="h-3.5 w-3.5" />
            <span>Corporate Profile</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-slate-950 leading-tight">
            The Princess Trucking Advantage
          </h2>
          
          <p className="text-slate-600 text-sm leading-relaxed">
            We proudly stand head and shoulders above our competitors. Our unique combination of rich industry experience, client-centric service models, and modern technology allows us to deliver high-reliability logistics solutions while remaining exceptionally cost-effective.
          </p>

          <div className="flex gap-2.5 border-b border-slate-100 pb-2">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === "about" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Who We Are
            </button>
            <button
              onClick={() => setActiveTab("advantage")}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === "advantage" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              The Advantage
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`pb-2.5 text-xs font-semibold border-b-2 transition-all ${
                activeTab === "location" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Visayas Gateway
            </button>
          </div>

          <div className="min-h-[120px]">
            {activeTab === "about" && (
              <p className="text-xs text-slate-500 leading-relaxed animate-in fade-in duration-300">
                Princess Trucking is a premier, full-service logistics and supply chain solutions provider headquartered in Roxas City, Capiz. We support businesses across the Philippines by delivering robust domestic logistics solutions via comprehensive road networks and seamless sea transport.
              </p>
            )}
            {activeTab === "advantage" && (
              <p className="text-xs text-slate-500 leading-relaxed animate-in fade-in duration-300">
                Beyond standard hauling, we offer end-to-end supply chain support. This includes state-of-the-art secure warehousing, custom clearance facilitation, strategic industrial purchasing services, and dedicated fleet spare parts mechanics.
              </p>
            )}
            {activeTab === "location" && (
              <p className="text-xs text-slate-500 leading-relaxed animate-in fade-in duration-300">
                Based strategically in Roxas City, Capiz, we serve as the logistical gateway to Western Visayas. We connect Panay Island (Capiz, Iloilo, Aklan, and Antique) seamlessly to Luzon and Mindanao port corridors via major Ro-Ro shipping partnerships.
              </p>
            )}
          </div>
        </div>

        {/* Right Graphic/Image Panel */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-3xl overflow-hidden relative h-56 border border-slate-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" 
              alt="Road Freight Services" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[8px] font-mono uppercase tracking-widest text-blue-300">Road Transport</span>
              <h4 className="text-xs font-bold">Nationwide Road Freight</h4>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl overflow-hidden relative h-56 border border-slate-100 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1590137500588-228642a86381?auto=format&fit=crop&w=600&q=80" 
              alt="Dealership & heavy machinery" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300">Panay Island Dealer</span>
              <h4 className="text-xs font-bold">Heavy Equipment Distribution</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Pillars (Gorgeous Interactive Grid) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 justify-center">
            <Truck className="h-3.5 w-3.5" />
            <span>Our Offerings</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-950 tracking-tight">
            Our Core Service Pillars
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Delivering robust commercial logistics, cold chain mechanics, and heavy machinery supply to vital national enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            return (
              <div 
                key={service.id} 
                className="bg-white border border-slate-100 hover:border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                    {service.id === "road-freight" && <Truck className="h-5 w-5" />}
                    {service.id === "sea-freight-roro" && <Ship className="h-5 w-5" />}
                    {service.id === "equipment-dealership" && <Award className="h-5 w-5" />}
                    {service.id === "cold-chain-repair" && <ThermometerSnowflake className="h-5 w-5" />}
                    {service.id === "supply-chain-support" && <Building2 className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {service.coverage}
                  </span>
                  <button 
                    onClick={() => { onNavigateToTab("services"); onSelectService(service.id); }}
                    className="flex items-center gap-0.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition cursor-pointer"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us Values Block */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
            Why Businesses Choose Princess Trucking
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Delivering the Princess Trucking Advantage through high-reliability transport networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${prop.color} shadow-sm`}>
                <prop.icon className="h-5 w-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-slate-950">{prop.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Interactive Map Network Highlight */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold text-indigo-600 tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full uppercase">
              Island Connectivity Network
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-950 leading-tight">
              Our Strategic Port &amp; Route Hubs
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Princess Trucking bridges the major economic centers of the Philippines. Headquartered in Roxas City, Capiz, we link key maritime roll-on/roll-off gateways with ease.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span><strong>Luzon Gateway:</strong> Port of Batangas &amp; Metro Manila Hub</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                <span><strong>Visayas Mainline:</strong> Roxas City (HQ), Iloilo, Kalibo, Antique, Bacolod, &amp; Cebu</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span><strong>Mindanao Depot:</strong> Davao City Hub Corridor</span>
              </div>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={() => onNavigateToTab("estimator")}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 text-xs transition shadow-md flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>Launch Interactive Rates Planner</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 text-slate-300 border border-slate-900 shadow-xl relative overflow-hidden min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 bg-radial-gradient-map opacity-10 pointer-events-none" />
            
            {/* Elegant simplified schematic vector design representing port route links */}
            <div className="space-y-4 text-center">
              <Anchor className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
              <div className="space-y-1">
                <p className="font-display text-sm font-bold text-white uppercase tracking-wider">Philippine Maritime Highway System</p>
                <p className="text-[10px] text-slate-500 font-mono">PANAY CORRIDOR ➔ LUZON EXPRESSWAY ➔ CEBU PASSAGE</p>
              </div>
              <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                Our vetted carriers load bulk freight directly onto sea transport transits, ensuring continuous GPS monitoring and on-time inter-island delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
