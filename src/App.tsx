/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ServiceCategory, BookingInquiry } from "./types";
import Header from "./components/Header";
import DashboardOverview from "./components/DashboardOverview";
import ServicesPanel from "./components/ServicesPanel";
import QuoteEstimator from "./components/QuoteEstimator";
import FleetCatalog from "./components/FleetCatalog";
import InquiryForm from "./components/InquiryForm";
import { Ship, MapPin, Phone } from "lucide-react";

// Pre-populate with real-world partners from the company profile to show a living ecosystem
const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: "PT-2026-9042",
    companyName: "RSP Hauler (Pepsi Capiz)",
    contactPerson: "Arturo Valenzuela",
    email: "ops@rsphaulers.com.ph",
    phone: "+63 939 123 7789",
    serviceCategory: ServiceCategory.ROAD_FREIGHT,
    origin: "Roxas City, Capiz",
    destination: "Metro Manila Hub",
    weightTons: 25,
    cargoDescription: "Pepsi beverage cases - bulk wing van haul",
    dateCreated: "2026-06-30 09:42",
    status: "In Transit",
    estimatedCost: 112500
  },
  {
    id: "PT-2026-8711",
    companyName: "MENN Logistics Services Inc.",
    contactPerson: "Lucia Santos",
    email: "logistics@menngroup.ph",
    phone: "+63 918 445 1029",
    serviceCategory: ServiceCategory.COLD_CHAIN_REPAIR,
    origin: "Iloilo City, Iloilo",
    destination: "Port of Cebu",
    weightTons: 12,
    cargoDescription: "Jersey Fresh Milk cold storage container loading",
    dateCreated: "2026-06-30 14:11",
    status: "Reviewed",
    estimatedCost: 68400
  },
  {
    id: "PT-2026-4429",
    companyName: "JEM Logistics Inc. / Manny Boy",
    contactPerson: "Manny Boy Jimenez",
    email: "contact@jemlogistics.ph",
    phone: "+63 917 882 1190",
    serviceCategory: ServiceCategory.SEA_FREIGHT_RORO,
    origin: "Roxas City, Capiz",
    destination: "Port of Batangas",
    weightTons: 18,
    cargoDescription: "Processed agricultural feed supplies",
    dateCreated: "2026-07-01 10:15",
    status: "Pending",
    estimatedCost: 94800
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    const saved = localStorage.getItem("princess_trucking_inquiries");
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });
  
  // State for data transferred from Quote Estimator into Booking Form
  const [prefillData, setPrefillData] = useState<{
    category: ServiceCategory;
    origin: string;
    destination: string;
    weight: number;
    estimatedCost: number;
    cargoDesc: string;
  } | null>(null);

  // Sync inquiries with local storage
  useEffect(() => {
    localStorage.setItem("princess_trucking_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  const handleCreateInquiry = (newInq: Omit<BookingInquiry, "id" | "dateCreated" | "status">) => {
    const fullInquiry: BookingInquiry = {
      ...newInq,
      id: `PT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      dateCreated: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "Pending"
    };
    setInquiries((prev) => [fullInquiry, ...prev]);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  // Switch tabs from nested links
  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Route searches appropriately
  const handleSearchAction = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes("rate") || q.includes("cost") || q.includes("price") || q.includes("estimate") || q.includes("calc")) {
      setActiveTab("estimator");
    } else if (q.includes("fleet") || q.includes("van") || q.includes("truck") || q.includes("excavated") || q.includes("dealership") || q.includes("spare")) {
      setActiveTab("fleet");
    } else if (q.includes("book") || q.includes("inquire") || q.includes("ticket") || q.includes("contact")) {
      setActiveTab("inquire");
    } else {
      // default to services and filter if applicable
      setActiveTab("services");
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleApplyEstimateToBooking = (data: typeof prefillData) => {
    setPrefillData(data);
    setActiveTab("inquire");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-gray-800 font-sans flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      
      {/* Google-Inspired Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Stage */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === "overview" && (
          <DashboardOverview
            onSearchAction={handleSearchAction}
            onNavigateToTab={handleNavigateToTab}
            onSelectService={handleSelectService}
          />
        )}

        {activeTab === "services" && (
          <ServicesPanel
            selectedServiceId={selectedServiceId}
            onClearSelectedService={() => setSelectedServiceId(null)}
            onNavigateToTab={handleNavigateToTab}
            onSetCategoryInquiry={(cat) => {
              setPrefillData({
                category: cat,
                origin: "Roxas City, Capiz",
                destination: "Metro Manila Hub",
                weight: 10,
                estimatedCost: 45000,
                cargoDesc: ""
              });
            }}
          />
        )}

        {activeTab === "estimator" && (
          <QuoteEstimator
            onApplyEstimateToBooking={handleApplyEstimateToBooking}
            initialCategory={prefillData?.category}
          />
        )}

        {activeTab === "fleet" && (
          <FleetCatalog
            onNavigateToTab={handleNavigateToTab}
          />
        )}

        {activeTab === "inquire" && (
          <InquiryForm
            inquiries={inquiries}
            onSubmitInquiry={handleCreateInquiry}
            onDeleteInquiry={handleDeleteInquiry}
            prefillData={prefillData}
            onClearPrefillData={() => setPrefillData(null)}
          />
        )}

      </main>

      {/* Corporate Polished Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-gray-150">
            {/* Branding & Gateway info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Ship className="h-4.5 w-4.5" />
                </div>
                <span className="font-sans text-base font-bold text-gray-950">Princess Trucking</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                The Western Visayas Gateway logistics provider, facilitating overland road networks and roll-on/roll-off shipping from our main hub in Roxas City, Capiz, Philippines.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Roxas City Headquarters, Capiz, Panay Island</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Logistics Portal</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <button onClick={() => handleNavigateToTab("overview")} className="text-gray-600 hover:text-blue-600">
                    Operations Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToTab("services")} className="text-gray-600 hover:text-blue-600">
                    Hauling Services Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToTab("estimator")} className="text-gray-600 hover:text-blue-600">
                    Interactive Cost Estimator
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToTab("fleet")} className="text-gray-600 hover:text-blue-600">
                    Heavy Machinery Dealership
                  </button>
                </li>
              </ul>
            </div>

            {/* Support info / Contacts */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Mechanical Maintenance & Spares</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our advanced refrigeration diagnostics facility and spare parts inventory are available region-wide across the Visayas.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900 pt-1">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>Hotline: (036) 621-PT / +63 917 123 4567</span>
              </div>
            </div>
          </div>

          {/* Copyright Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Princess Trucking Group. All rights reserved.</p>
            <div className="flex gap-4 font-semibold">
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-blue-600">Terms of Transport</a>
              <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-blue-600">Ro-Ro Guidelines</a>
              <a href="#coop" onClick={(e) => e.preventDefault()} className="hover:text-blue-600">Visayas Operations</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
