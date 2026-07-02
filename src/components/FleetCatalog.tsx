/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FLEET } from "../data";
import { HardHat } from "lucide-react";

interface FleetCatalogProps {
  onNavigateToTab: (tab: string) => void;
}

export default function FleetCatalog({ onNavigateToTab }: FleetCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<"fleet" | "dealership">("fleet");

  const dealershipCategories = [
    {
      title: "Construction Machinery",
      units: ["Heavy excavators (15-30T)", "Wheel loaders & backhoes", "Hydraulic dump trucks", "Soil compactor rollers"],
      highlight: "Authorized distributor across Panay Island with lifetime engine warranties."
    },
    {
      title: "Agricultural Logistical Vehicles",
      units: ["Farm multi-utility tractors", "Irrigation pump transport chassis", "Grain bulk carrier trucks", "Harvester flatbed loggers"],
      highlight: "Customized for Capiz and Western Visayas agrarian cooperatives."
    },
    {
      title: "Logistical Hauling Fleet",
      units: ["10-Wheeler wing vans", "6-Wheeler closed box cargo trucks", "Transit concrete mixers", "4-Wheeler express dispatch vans"],
      highlight: "Sourced directly from certified international manufacturing partners."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="font-display text-2xl font-bold text-gray-950 tracking-tight">Fleet & Dealership Portal</h1>
        <p className="text-xs text-gray-500 mt-1">
          Explore our certified transport fleets or purchase heavy utility machinery for your enterprise.
        </p>
      </div>

      {/* Internal Category switch tabs - Google-style pills */}
      <div className="flex gap-2 border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveCategory("fleet")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            activeCategory === "fleet"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Our Hauling Fleet
        </button>
        <button
          onClick={() => setActiveCategory("dealership")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            activeCategory === "dealership"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Heavy Equipment Dealership
        </button>
      </div>

      {/* RENDER ACTIVE CATEGORY CONTENT */}

      {activeCategory === "fleet" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FLEET.map((vehicle) => (
              <div key={vehicle.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition">
                <div className="sm:w-2/5 relative h-48 sm:h-auto">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    {vehicle.id}
                  </span>
                </div>
                <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-blue-600 tracking-wider uppercase block">{vehicle.type}</span>
                    <h3 className="font-sans text-base font-bold text-gray-950 mt-1">{vehicle.name}</h3>
                    
                    <div className="mt-2.5 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Payload Capacity:</span>
                        <span className="font-semibold text-gray-800">{vehicle.capacity}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                        {vehicle.idealFor}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab("inquire")}
                    className="mt-4 w-full rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 py-2 text-center text-xs font-semibold text-slate-700 hover:text-blue-700 transition cursor-pointer"
                  >
                    Inquire for booking
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Partners & Clients Slider block */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Trusted logistics and dealership clients</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-items-center">
              <span className="font-sans text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">JEM LOGISTICS INC.</span>
              <span className="font-sans text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">MENN (JERSEY MILK)</span>
              <span className="font-sans text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">RSP HAULER / PEPSI</span>
              <span className="font-sans text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">LEE BOY TRUCKING</span>
              <span className="font-sans text-xs font-extrabold text-slate-400 uppercase tracking-widest text-center">BOB & LYN LOGISTICS</span>
            </div>
          </div>
        </div>
      )}

      {activeCategory === "dealership" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dealershipCategories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-slate-150 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <HardHat className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-gray-950">{cat.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">Commercial Distribution Network</p>
                </div>

                <ul className="space-y-2 border-t border-slate-50 pt-3">
                  {cat.units.map((unit, uIdx) => (
                    <li key={uIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{unit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-50 pt-4 mt-6">
                <div className="rounded-lg bg-amber-50/50 p-2.5 text-[10px] text-amber-800 leading-relaxed font-medium mb-3">
                  {cat.highlight}
                </div>
                <button
                  onClick={() => onNavigateToTab("inquire")}
                  className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2 shadow-sm transition cursor-pointer"
                >
                  Request Dealership Brochure
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
