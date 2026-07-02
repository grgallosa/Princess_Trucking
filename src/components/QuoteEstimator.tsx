/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { HUBS, calculateLogisticsEstimate } from "../data";
import { ServiceCategory } from "../types";
import { Calculator, ArrowRight, Check, HelpCircle, FileText, Download, RefreshCw, AlertCircle, Info } from "lucide-react";

interface QuoteEstimatorProps {
  onApplyEstimateToBooking: (data: {
    category: ServiceCategory;
    origin: string;
    destination: string;
    weight: number;
    estimatedCost: number;
    cargoDesc: string;
  }) => void;
  initialCategory?: ServiceCategory;
}

export default function QuoteEstimator({ onApplyEstimateToBooking, initialCategory }: QuoteEstimatorProps) {
  const [category, setCategory] = useState<ServiceCategory>(initialCategory || ServiceCategory.ROAD_FREIGHT);
  const [origin, setOrigin] = useState("Roxas City, Capiz");
  const [destination, setDestination] = useState("Metro Manila Hub");
  const [weight, setWeight] = useState(12); // standard tons
  const [isSpecialized, setIsSpecialized] = useState(false);
  const [cargoDesc, setCargoDesc] = useState("Agri-food products, standard crates");
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [isCopiedToBooking, setIsCopiedToBooking] = useState(false);

  // Recalculate whenever parameters change
  useEffect(() => {
    const results = calculateLogisticsEstimate(category, origin, destination, weight, isSpecialized);
    setCalculationResult(results);
    setIsCopiedToBooking(false); // reset copy state on change
  }, [category, origin, destination, weight, isSpecialized]);

  const handleCopyToBooking = () => {
    onApplyEstimateToBooking({
      category,
      origin,
      destination,
      weight,
      estimatedCost: calculationResult.totalCost,
      cargoDesc: `[Estimated Ref: ${origin} to ${destination}, ${weight}T] ${cargoDesc}`
    });
    setIsCopiedToBooking(true);
    setTimeout(() => setIsCopiedToBooking(false), 3000);
  };

  const formattedPHP = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="font-display text-2xl font-bold text-gray-950 tracking-tight flex items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          Interactive Logistics Planner
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Simulate logistics costs across our Panay network and inter-island sea routes with instant breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Estimator Form Controls (Left 6 Columns) */}
        <div className="lg:col-span-6 bg-white border border-slate-100 rounded-2xl p-5 md:p-6 space-y-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-950">1. Parameter Specifications</h3>
          
          {/* Service Category Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Service Segment</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCategory(ServiceCategory.ROAD_FREIGHT)}
                className={`rounded-xl border p-2.5 text-center text-xs font-medium transition ${
                  category === ServiceCategory.ROAD_FREIGHT
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                Road Freight
              </button>
              <button
                type="button"
                onClick={() => setCategory(ServiceCategory.SEA_FREIGHT_RORO)}
                className={`rounded-xl border p-2.5 text-center text-xs font-medium transition ${
                  category === ServiceCategory.SEA_FREIGHT_RORO
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                Sea Freight & Ro-Ro
              </button>
            </div>
          </div>

          {/* Route Hubs selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">Origin Hub</label>
              <select
                className="w-full rounded-xl border border-slate-100 bg-white p-2.5 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                {HUBS.map((hub) => (
                  <option key={`origin-${hub.name}`} value={hub.name}>
                    {hub.name} {hub.isHeadquarters ? "(HQ)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">Destination Hub</label>
              <select
                className="w-full rounded-xl border border-slate-100 bg-white p-2.5 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {HUBS.map((hub) => (
                  <option key={`dest-${hub.name}`} value={hub.name}>
                    {hub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weight tonnage control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-gray-700">Estimated Weight</label>
              <span className="font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                {weight} Tons
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              className="w-full accent-blue-600 cursor-pointer"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>1 Ton (LTL Mini)</span>
              <span>40 Tons (Oversized Trailer)</span>
            </div>
          </div>

          {/* Specialized requirements toggle */}
          <label className="flex items-start gap-2.5 border border-gray-150 rounded-xl p-3 bg-gray-50/50 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 accent-blue-600"
              checked={isSpecialized}
              onChange={(e) => setIsSpecialized(e.target.checked)}
            />
            <div>
              <span className="text-xs font-semibold text-gray-800 block">Requires specialized operations?</span>
              <span className="text-[10px] text-gray-500 leading-relaxed block mt-0.5">
                Apply premium loading for oversized heavy equipment vehicles or extreme-height dimensions.
              </span>
            </div>
          </label>

          {/* Cargo description short */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Cargo Description</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder-gray-400"
              value={cargoDesc}
              onChange={(e) => setCargoDesc(e.target.value)}
              placeholder="e.g. Raw poultry, concrete beams, retail FMCG"
            />
          </div>
        </div>

        {/* Calculation Result Sheet (Right 6 Columns) */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-slate-50 p-4 border-b border-slate-100">
            <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase">Rate Planner Sheet</span>
            <h4 className="font-sans text-sm font-bold text-slate-800 mt-0.5">Estimated Cost Summary Sheet</h4>
          </div>

          {/* Content list */}
          <div className="p-5 md:p-6 space-y-4 flex-1">
            <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-100 pb-2">
              <span>Transit Route</span>
              <span className="font-medium text-gray-800 flex items-center gap-1">
                {origin.split(",")[0]} <ArrowRight className="h-3 w-3 text-gray-400" /> {destination.split(",")[0]}
              </span>
            </div>

            {calculationResult ? (
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Base Hauling Transit Rate:</span>
                  <span className="font-medium text-gray-900">{formattedPHP(calculationResult.baseCost)}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    Port Sea/Ro-Ro Surcharge:
                    <Info className="h-3 w-3 text-gray-400 cursor-help" title="Ferry crossing or highway road toll fees" />
                  </span>
                  <span className="font-medium text-gray-900">{formattedPHP(calculationResult.ferryOrToll)}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                  <span>Fuel Adjuster Index (18%):</span>
                  <span className="font-medium text-gray-900">{formattedPHP(calculationResult.fuelSurcharge)}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-600 border-b border-gray-100 pb-3">
                  <span>Logistics Insurance Allocation:</span>
                  <span className="font-medium text-gray-900">{formattedPHP(calculationResult.insurance)}</span>
                </div>

                {/* Main Estimated Cost Block */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mt-4 text-center">
                  <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block">Estimated Total Quote (PHP)</span>
                  <h2 className="font-sans text-3xl font-extrabold text-blue-900 mt-1">
                    {formattedPHP(calculationResult.totalCost)}
                  </h2>
                  <div className="flex items-center justify-center gap-1 text-[11px] text-blue-700 mt-1.5 font-medium">
                    <span>Estimated Transit Duration:</span>
                    <strong className="text-blue-950">~{calculationResult.estimatedDays} {calculationResult.estimatedDays === 1 ? "Day" : "Days"}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center text-xs text-gray-400">
                <RefreshCw className="h-5 w-5 animate-spin mr-2 text-blue-500" />
                Calculating rates...
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex gap-2 text-[10px] text-gray-400 bg-slate-50 border border-slate-100 rounded-lg p-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
              <p className="leading-relaxed">
                *Simulated figures are indicative rates based on baseline Capiz cargo hauling coefficients. Actual final contracts depend on fuel pricing changes and custom cargo dimensions.
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="p-4 border-t border-gray-150 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 py-2.5 text-center text-xs font-semibold text-gray-700 transition"
            >
              Print Receipt
            </button>
            <button
              onClick={handleCopyToBooking}
              className={`flex-1 rounded-xl py-2.5 text-center text-xs font-semibold text-white transition shadow-sm flex items-center justify-center gap-1.5 ${
                isCopiedToBooking ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isCopiedToBooking ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Transferred!</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  <span>Transfer to Booking</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
