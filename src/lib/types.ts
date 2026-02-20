export type Role = "ADMIN" | "CUSTOMER" | "VENDOR" | "SUPER_ADMIN";

export type BillboardType = "Unipole" | "Gantry" | "Wall" | "Digital LED";

export type ServiceType = "PRINTING" | "DESIGN" | "INSTALLATION" | "PERMIT";

export type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED";
export type PaymentMethod = "MoMo" | "Card";

export interface Region {
  id: string;
  name: string;
}

export interface Billboard {
  id: string;
  title: string;
  type: BillboardType;
  size: string;
  regionId: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerMonth: number;
  trafficEstimate: number;
  visibilityScore: number;
  isDigital: boolean;
  isActive: boolean;
  createdAt: string;
  imageUrl: string;
}

export interface Vendor {
  id: string;
  name: string;
  serviceType: ServiceType;
  region: string;
  phone: string;
  rating: number;
  verified: boolean;
  imageUrl: string;
}

export interface MapBillboard {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  pricePerMonth: number;
  city: string;
}
