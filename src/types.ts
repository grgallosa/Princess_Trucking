/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ServiceCategory {
  ROAD_FREIGHT = "ROAD_FREIGHT",
  SEA_FREIGHT_RORO = "SEA_FREIGHT_RORO",
  EQUIPMENT_DEALERSHIP = "EQUIPMENT_DEALERSHIP",
  COLD_CHAIN_REPAIR = "COLD_CHAIN_REPAIR",
  SUPPLY_CHAIN_SUPPORT = "SUPPLY_CHAIN_SUPPORT"
}

export interface ServiceDetail {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  coverage: string;
  iconName: string; // for Lucide icons lookup
  colorClass: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
}

export interface RouteHub {
  name: string;
  region: string;
  island: "Luzon" | "Visayas" | "Mindanao";
  isHeadquarters?: boolean;
}

export interface FleetVehicle {
  id: string;
  name: string;
  type: string;
  capacity: string;
  idealFor: string;
  imageUrl: string;
}

export interface BookingInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceCategory: ServiceCategory;
  origin: string;
  destination: string;
  weightTons: number;
  cargoDescription: string;
  dateCreated: string;
  status: "Pending" | "Reviewed" | "In Transit" | "Completed";
  estimatedCost?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  relation: string;
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
