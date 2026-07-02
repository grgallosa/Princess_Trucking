/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ServiceCategory, BookingInquiry } from "../types";
import { HUBS, SERVICES, calculateLogisticsEstimate } from "../data";
import { FileText, Plus, CheckCircle2, Trash2, ShieldCheck, Mail, Phone, MapPin, ClipboardList, Info } from "lucide-react";

interface InquiryFormProps {
  inquiries: BookingInquiry[];
  onSubmitInquiry: (inquiry: Omit<BookingInquiry, "id" | "dateCreated" | "status" | "estimatedCost"> & { estimatedCost?: number }) => void;
  onDeleteInquiry: (id: string) => void;
  prefillData: {
    category: ServiceCategory;
    origin: string;
    destination: string;
    weight: number;
    estimatedCost: number;
    cargoDesc: string;
  } | null;
  onClearPrefillData: () => void;
}

export default function InquiryForm({
  inquiries,
  onSubmitInquiry,
  onDeleteInquiry,
  prefillData,
  onClearPrefillData
}: InquiryFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(ServiceCategory.ROAD_FREIGHT);
  const [origin, setOrigin] = useState("Roxas City, Capiz");
  const [destination, setDestination] = useState("Metro Manila Hub");
  const [weightTons, setWeightTons] = useState(10);
  const [cargoDescription, setCargoDescription] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState("");

  // Prefill hook
  useEffect(() => {
    if (prefillData) {
      setServiceCategory(prefillData.category);
      setOrigin(prefillData.origin);
      setDestination(prefillData.destination);
      setWeightTons(prefillData.weight);
      setCargoDescription(prefillData.cargoDesc);
      // Automatically prefill company for guest preview
      setCompanyName("Guest Partner Ltd.");
      setContactPerson("Guest Representative");
      setEmail("partner@example.com");
      setPhone("+63 917 123 4567");
    }
  }, [prefillData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !email || !phone) {
      alert("Please supply all necessary corporate credentials.");
      return;
    }

    // Calculate cost in backend logic
    const rates = calculateLogisticsEstimate(serviceCategory, origin, destination, weightTons, false);

    onSubmitInquiry({
      companyName,
      contactPerson,
      email,
      phone,
      serviceCategory,
      origin,
      destination,
      weightTons,
      cargoDescription,
      estimatedCost: rates.totalCost
    });

    // Reset prefill
    onClearPrefillData();

    // Trigger Success feedback
    const generatedId = `PT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastSubmittedId(generatedId);
    setShowSuccessToast(true);

    // Clear Form fields
    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPhone("");
    setCargoDescription("");
    setWeightTons(10);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  const getCategoryLabel = (cat: ServiceCategory) => {
    switch (cat) {
      case ServiceCategory.ROAD_FREIGHT:
        return "Road Freight";
      case ServiceCategory.SEA_FREIGHT_RORO:
        return "Sea Freight & Ro-Ro";
      case ServiceCategory.EQUIPMENT_DEALERSHIP:
        return "Heavy Equipment Sales";
      case ServiceCategory.COLD_CHAIN_REPAIR:
        return "Cold Chain Support";
      case ServiceCategory.SUPPLY_CHAIN_SUPPORT:
        return "Supply Chain / Warehouse";
      default:
        return "General Inquiry";
    }
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
        <h1 className="font-display text-2xl font-bold text-gray-950 tracking-tight">Inquire & Book Transport</h1>
        <p className="text-xs text-gray-500 mt-1">
          Submit secure corporate logistics inquiries or manage your ongoing bookings.
        </p>
      </div>

      {showSuccessToast && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-900">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xs font-bold font-sans">Logistics Inquiry Generated Successfully!</h4>
              <p className="text-[11px] text-emerald-700 leading-relaxed mt-1">
                Your booking inquiry has been registered under reference ID <strong className="font-mono text-emerald-950">{lastSubmittedId}</strong>. Our logistics operations team at our Roxas City Headquarters will contact you shortly. You can track this status in the bookings table.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Google Form Inspired Booking Form (Left 7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 md:p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <ClipboardList className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-950">Logistics Engagement Request</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Corporate Identification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Company Name *</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder-gray-400"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Pepsi Capiz Sales"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Contact Person *</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder-gray-400"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Maria Clara Santos"
                />
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. operations@pepsicapiz.ph"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="text-xs font-semibold text-gray-700 block flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none placeholder-gray-400"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +63 917 555 4321"
                />
              </div>
            </div>

            {/* Service & Route dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Service Segment</label>
                <select
                  className="w-full rounded-xl border border-slate-100 bg-white p-2.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value as ServiceCategory)}
                >
                  <option value={ServiceCategory.ROAD_FREIGHT}>Road Freight</option>
                  <option value={ServiceCategory.SEA_FREIGHT_RORO}>Sea Freight & Ro-Ro</option>
                  <option value={ServiceCategory.EQUIPMENT_DEALERSHIP}>Equipment Dealership</option>
                  <option value={ServiceCategory.COLD_CHAIN_REPAIR}>Cold Chain Mechanical</option>
                  <option value={ServiceCategory.SUPPLY_CHAIN_SUPPORT}>Supply Chain Support</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Origin Hub</label>
                <select
                  className="w-full rounded-xl border border-slate-100 bg-white p-2.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  {HUBS.map((hub) => (
                    <option key={`inq-origin-${hub.name}`} value={hub.name}>
                      {hub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Destination Hub</label>
                <select
                  className="w-full rounded-xl border border-slate-100 bg-white p-2.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  {HUBS.map((hub) => (
                    <option key={`inq-dest-${hub.name}`} value={hub.name}>
                      {hub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weight and details */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-1 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Weight (Tons)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:outline-none"
                  value={weightTons}
                  onChange={(e) => setWeightTons(Number(e.target.value))}
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Cargo Specifications</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs text-gray-800 focus:border-blue-500 focus:outline-none placeholder-gray-400"
                  value={cargoDescription}
                  onChange={(e) => setCargoDescription(e.target.value)}
                  placeholder="e.g. High-density plastic milk bottles, perishable"
                />
              </div>
            </div>

            {/* Submit btn */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 shadow-sm shadow-blue-100 hover:shadow transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Booking Inquiry</span>
              </button>
            </div>
          </form>
        </div>

        {/* Saved Tickets / History (Right 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
            <div>
              <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase">Logistics Register</span>
              <h4 className="font-sans text-sm font-bold text-slate-800">Your Booking Inquiries</h4>
            </div>
            <span className="rounded-full bg-slate-200 text-slate-700 px-2.5 py-0.5 text-[10px] font-bold">
              {inquiries.length} Active
            </span>
          </div>

          {/* Records List */}
          <div className="p-4 md:p-5 flex-1 overflow-y-auto space-y-3.5 max-h-[460px] scrollbar-thin">
            {inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <div key={inq.id} className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 hover:bg-white transition group">
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-gray-400 block">{inq.id}</span>
                      <h4 className="font-sans font-bold text-gray-950 mt-0.5">{inq.companyName}</h4>
                    </div>

                    <button
                      onClick={() => onDeleteInquiry(inq.id)}
                      className="text-gray-300 hover:text-red-500 rounded p-1 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Archive this ticket record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 my-2 pt-2 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-gray-400 uppercase block">Representative</span>
                      <span className="font-medium text-gray-800">{inq.contactPerson}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase block">Category</span>
                      <span className="font-semibold text-blue-700">{getCategoryLabel(inq.serviceCategory)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-medium text-gray-800 bg-white border border-slate-100 rounded-lg px-2 py-1.5 mt-2.5">
                    <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                    <span className="truncate">{inq.origin.split(",")[0]} to {inq.destination.split(",")[0]}</span>
                    <span className="ml-auto font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-bold">{inq.weightTons}T</span>
                  </div>

                  {inq.estimatedCost && (
                    <div className="flex justify-between items-center text-[11px] font-semibold text-gray-900 mt-2">
                      <span className="text-gray-500">Estimated transit cost:</span>
                      <span className="text-blue-900 font-bold">{formattedPHP(inq.estimatedCost)}</span>
                    </div>
                  )}

                  <div className="mt-2.5 flex items-center justify-between text-[10px]">
                    <span className="text-gray-400">{inq.dateCreated}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-gray-400 space-y-2">
                <FileText className="h-8 w-8 text-gray-300" />
                <p className="text-xs">No active bookings found in memory.</p>
                <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed">Fill out the inquiry form to request hauling.</p>
              </div>
            )}
          </div>

          {/* Footer security tag */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1 justify-center">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Industry-Standard Logistics Privacy Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
