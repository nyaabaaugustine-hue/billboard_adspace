
export type Role = "ADMIN" | "VENDOR" | "USER";

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

export type BillboardStatus = "Available" | "On Hold" | "Rented";

export interface Region {
  id: string;
  name: string;
}

export interface Billboard {
  id: string;
  title: string;
  type: BillboardType;
  size: string;
  sides: number;
  lighting: boolean;
  status: BillboardStatus;
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
  vendorId?: string;
}

export interface UserProfile {
    id: string;
    uid: string;
    email: string;
    displayName: string | null;
    photoURL: string | null;
    role: Role;
    createdAt: any; // Firestore Timestamp
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

export interface Booking {
  customer: string;
  email: string;
  avatar: string;
  billboard: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Active' | 'Completed';
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}
