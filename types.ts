export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  city: string;
  status: 'approved' | 'pending';
  registeredAt: string;
  lastDonatedDate?: string;
  totalDonations?: number;
  email?: string;
  notes?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospital: string;
  city: string;
  units: number;
  urgency: 'Critical' | 'Urgent' | 'Standard';
  contactMobile: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  requestedAt: string;
  requiredByDate?: string;
  notes?: string;
  smsNotifications?: boolean;
}

export interface AdminStats {
  totalDonors: number;
  availableDonors: number;
  pendingDonors: number;
  totalRequests: number;
  urgentRequests: number;
  fulfilledRequests: number;
}

export interface BloodCompatibility {
  canGiveTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
  rarity: string;
  description: string;
}

export type ActiveTab = 
  | 'home' 
  | 'search' 
  | 'register' 
  | 'request' 
  | 'compatibility' 
  | 'about' 
  | 'contact' 
  | 'login' 
  | 'admin-dashboard' 
  | 'admin-donors' 
  | 'admin-pending' 
  | 'admin-requests'
  | 'admin-add-donor';
