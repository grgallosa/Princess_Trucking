/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceCategory, ServiceDetail, RouteHub, FleetVehicle, Testimonial, FAQ } from "./types";

export const SERVICES: ServiceDetail[] = [
  {
    id: "road-freight",
    category: ServiceCategory.ROAD_FREIGHT,
    title: "Road Freight Services",
    shortDesc: "Comprehensive land-based cargo hauling and specialized overland shipping across Panay and national road networks.",
    description: "Princess Trucking offers total support for all your land-based cargo needs. Through an extensively screened and vetted network of reliable carriers, we guarantee safe, on-time, and highly reliable logistics deliveries.",
    features: [
      "Full Container Loads (FCL) & Partial / Less-Than-Truckload (LTL) shipments",
      "Oversize & Specialized Cargo suitable for heavy machinery and non-standard equipment",
      "Local & National Networks connecting Panay Island to vital economic hubs nationwide",
      "Fully screened, vetted, and GPS-monitored carrier fleets"
    ],
    coverage: "Panay Island & Nationwide Main Roads",
    iconName: "Truck",
    colorClass: {
      bg: "bg-blue-50/70 border-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      accent: "bg-blue-600 hover:bg-blue-700"
    }
  },
  {
    id: "sea-freight-roro",
    category: ServiceCategory.SEA_FREIGHT_RORO,
    title: "Sea Freight & Ro-Ro Services",
    shortDesc: "Efficient inter-island logistics using Roll-on/Roll-off sea transport and port-to-port connections.",
    description: "For large-scale domestic logistics, our Roll-on/Roll-off (Ro-Ro) and sea freight solutions offer the most efficient island-to-island transit in the Philippines, linking key ports with ease.",
    features: [
      "Seamless Port-to-Port operations across major inter-island sea routes",
      "Full Container Load (FCL) and Partial Container Load (LCL) solutions",
      "End-to-End documentation: we handle all permits and port paperwork at both origin and destination",
      "Strategic shipping scheduling to minimize transit lag times"
    ],
    coverage: "Nationwide Port-to-Port Links",
    iconName: "Ship",
    colorClass: {
      bg: "bg-teal-50/70 border-teal-100",
      text: "text-teal-700",
      border: "border-teal-200",
      accent: "bg-teal-600 hover:bg-teal-700"
    }
  },
  {
    id: "equipment-dealership",
    category: ServiceCategory.EQUIPMENT_DEALERSHIP,
    title: "Heavy Equipment & Truck Dealership",
    shortDesc: "Your trusted distributor of commercial trucks and durable heavy equipment across Panay Island.",
    description: "We are a major dealer and distributor of high-quality commercial trucks and Heavy Equipment Vehicles. We supply robust, durable units vital for construction, agriculture, and logistics enterprises.",
    features: [
      "Authorized sales of commercial hauling trucks, cargo vans, and specialized vehicles",
      "Premium construction heavy machinery (excavators, loaders, dump trucks)",
      "Tailored agricultural utility equipment distribution",
      "Post-purchase advisory and initial integration guidance"
    ],
    coverage: "Entire Panay Island (Capiz, Iloilo, Aklan, Antique)",
    iconName: "HardHat",
    colorClass: {
      bg: "bg-amber-50/70 border-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
      accent: "bg-amber-500 hover:bg-amber-600"
    }
  },
  {
    id: "cold-chain-repair",
    category: ServiceCategory.COLD_CHAIN_REPAIR,
    title: "Cold Chain & Technical Services",
    shortDesc: "Dedicated refrigeration troubleshooting, fleet maintenance, and stationary cold storage repair.",
    description: "Princess Trucking features a specialized Refrigeration and Air Conditioning Facility capable of diagnosing and repairing complex issues in transport refrigeration units and stationary cold storage setups.",
    features: [
      "Complete diagnostic troubleshooting and preventive maintenance for reefer trucks",
      "Stationary cold storage mechanical repairs and system tuning",
      "Fully stocked inventory of genuine spare parts and accessories for various truck models",
      "Expert local engineers serving the Visayas region"
    ],
    coverage: "Visayas Region & Panay Island",
    iconName: "ThermometerSnowflake",
    colorClass: {
      bg: "bg-cyan-50/70 border-cyan-100",
      text: "text-cyan-700",
      border: "border-cyan-200",
      accent: "bg-cyan-600 hover:bg-cyan-700"
    }
  },
  {
    id: "supply-chain-support",
    category: ServiceCategory.SUPPLY_CHAIN_SUPPORT,
    title: "Supply Chain Support & Warehousing",
    shortDesc: "Comprehensive logistics support including state-of-the-art warehousing and customs facilitation.",
    description: "Go beyond hauling with comprehensive end-to-end support. We secure your inventory, streamline customs clearance, and assist with strategic wholesale purchasing solutions.",
    features: [
      "State-of-the-art secure warehousing with real-time inventory oversight",
      "Fast-track customs brokerage and document clearance assistance",
      "Strategic purchasing support for industrial supply procurement",
      "Cross-docking and regional hub distribution systems"
    ],
    coverage: "Strategic Nationwide Hubs",
    iconName: "Layers",
    colorClass: {
      bg: "bg-indigo-50/70 border-indigo-100",
      text: "text-indigo-700",
      border: "border-indigo-200",
      accent: "bg-indigo-600 hover:bg-indigo-700"
    }
  }
];

export const HUBS: RouteHub[] = [
  { name: "Roxas City, Capiz", region: "Western Visayas", island: "Visayas", isHeadquarters: true },
  { name: "Iloilo City, Iloilo", region: "Western Visayas", island: "Visayas" },
  { name: "Kalibo, Aklan", region: "Western Visayas", island: "Visayas" },
  { name: "San Jose, Antique", region: "Western Visayas", island: "Visayas" },
  { name: "Port of Batangas", region: "CALABARZON", island: "Luzon" },
  { name: "Metro Manila Hub", region: "NCR", island: "Luzon" },
  { name: "Port of Cebu", region: "Central Visayas", island: "Visayas" },
  { name: "Davao City Hub", region: "Davao Region", island: "Mindanao" },
  { name: "Bacolod, Negros Occ.", region: "Western Visayas", island: "Visayas" }
];

export const FLEET: FleetVehicle[] = [
  {
    id: "f1",
    name: "10-Wheeler Wing Van",
    type: "Road Freight Heavy Duty",
    capacity: "15 to 25 Tons",
    idealFor: "Bulk logistics, FCL inter-island shipments, and national warehouse distribution.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f2",
    name: "6-Wheeler Refrigerated Truck",
    type: "Cold Chain Logistics",
    capacity: "4 to 7 Tons",
    idealFor: "Temperature-sensitive pharmaceuticals, fresh fish, poultry, dairy, and fruits.",
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f3",
    name: "Heavy Utility Flatbed Trailer",
    type: "Oversized / Specialized Cargo",
    capacity: "20 to 40 Tons",
    idealFor: "Constructive machinery, excavators, heavy dealership vehicles, and oversized steel piles.",
    imageUrl: "https://images.unsplash.com/photo-1590137500588-228642a86381?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "f4",
    name: "6-Wheeler Closed Cargo Van",
    type: "LTL & Direct Retail Logistics",
    capacity: "3 to 5 Tons",
    idealFor: "FMCG retail distribution, local Capiz hauling, and partial load e-commerce transit.",
    imageUrl: "https://images.unsplash.com/photo-1516576475862-f86232779874?auto=format&fit=crop&w=600&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "JEM Logistics Inc. / Manny Boy",
    relation: "Long-term Hauling Partner",
    quote: "Princess Trucking is our most reliable partner for Western Visayas connections. Their dispatch timelines are flawless, and their customer service sets the benchmark."
  },
  {
    id: "t2",
    clientName: "RSP Hauler (Pepsi Capiz Sales)",
    relation: "Strategic Beverages Logistics Client",
    quote: "Shipping thousands of cases daily requires absolute precision. Princess Trucking guarantees secure Ro-Ro transports and maintains our supply line seamlessly."
  },
  {
    id: "t3",
    clientName: "MENN Logistics Services Inc. (Jersey Milk)",
    relation: "Cold Chain Client",
    quote: "Their specialized refrigerated reefer service and prompt maintenance ensure that our fresh dairy cargo is preserved in pristine condition from port to warehouse."
  },
  {
    id: "t4",
    clientName: "Bob & Lyn Trucking Services",
    relation: "Fleet Spare Parts & Maintenance Partner",
    quote: "When our reefers have trouble, Princess Trucking's mechanical repair facility in Roxas City resolves it immediately. Their collection of genuine spare parts is unmatched."
  }
];

export const FAQS: FAQ[] = [
  {
    category: "General Logistics",
    question: "Where is Princess Trucking headquartered?",
    answer: "Our main administrative headquarters and primary maintenance facility are strategically located in Roxas City, Capiz. This central location serves as the perfect gateway to Western Visayas (Panay Island) and connects seamlessly with roll-on/roll-off ports."
  },
  {
    category: "Operations",
    question: "What geographical areas do you cover?",
    answer: "We offer road logistics and technical refrigeration repair services region-wide across Panay Island (Capiz, Iloilo, Aklan, and Antique). For Sea Freight and Ro-Ro shipping, we support nationwide routing connecting the Visayas to Luzon and Mindanao."
  },
  {
    category: "Estimates & Booking",
    question: "How is the logistics cost estimated?",
    answer: "Our pricing calculations are based on the service category, cargo volume or total tonnage, the travel distance (including sea ferry crossing fees where applicable), and any specialized requirements like refrigeration or oversize transport. Use our interactive portal to generate a quick formal estimate."
  },
  {
    category: "Technical Services",
    question: "Do you offer emergency reefer and cold storage repairs?",
    answer: "Yes! We operate a high-tech Refrigeration and Air Conditioning Facility that performs expert diagnostic troubleshooting, preventive maintenance, and repairs for transit reefers as well as stationary cold storage structures. We maintain a large inventory of genuine spare parts."
  },
  {
    category: "Equipment Sales",
    question: "Can we procure commercial heavy vehicles through you?",
    answer: "Absolutely. Princess Trucking is a trusted dealer and distributor of premium commercial haulers and Heavy Equipment Vehicles (construction and agriculture) throughout the Panay region, ensuring durability and lifetime parts support."
  }
];

/**
 * Calculates a standard realistic estimate for logistics in the Philippines (in PHP)
 */
export function calculateLogisticsEstimate(
  service: ServiceCategory,
  origin: string,
  destination: string,
  weight: number,
  isSpecialized: boolean
): {
  baseCost: number;
  ferryOrToll: number;
  fuelSurcharge: number;
  insurance: number;
  totalCost: number;
  estimatedDays: number;
} {
  let baseRatePerTon = 1800; // PHP per ton baseline
  let ferryFee = 0;
  let estimatedDays = 1;

  // Rough distance logic
  const isInterIsland = origin !== destination && (
    (origin.includes("Manila") || origin.includes("Batangas") || origin.includes("Davao") || origin.includes("Cebu")) ||
    (destination.includes("Manila") || destination.includes("Batangas") || destination.includes("Davao") || destination.includes("Cebu"))
  );

  if (isInterIsland) {
    baseRatePerTon = 4500;
    ferryFee = 8500; // Roro ferry loading fee
    estimatedDays = 3;
  } else if (origin !== destination) {
    // Local Panay Island travel
    baseRatePerTon = 2200;
    ferryFee = 1200; // toll and local fees
    estimatedDays = 1;
  } else {
    // Same hub city limits
    baseRatePerTon = 1100;
    ferryFee = 400;
    estimatedDays = 1;
  }

  // Factor in specialized operations
  if (service === ServiceCategory.COLD_CHAIN_REPAIR) {
    baseRatePerTon *= 1.4; // Cooling running cost
    estimatedDays = Math.max(1, estimatedDays);
  } else if (isSpecialized) {
    baseRatePerTon *= 1.35; // Heavy oversize premium
  }

  const baseCost = Math.round(weight * baseRatePerTon);
  const fuelSurcharge = Math.round(baseCost * 0.18); // 18% fuel cost
  const insurance = Math.round((baseCost + ferryFee) * 0.015); // 1.5% valuation
  const totalCost = baseCost + ferryFee + fuelSurcharge + insurance;

  return {
    baseCost,
    ferryOrToll: ferryFee,
    fuelSurcharge,
    insurance,
    totalCost,
    estimatedDays
  };
}
