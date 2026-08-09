import { Donor, BloodRequest, BloodGroup, BloodCompatibility } from '../types';

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'DNR-1001',
    name: 'Prajwal Kulkarni',
    bloodGroup: 'O+',
    age: 27,
    gender: 'Male',
    mobile: '+91 98230 11223',
    city: 'Pune',
    status: 'approved',
    registeredAt: '2026-01-15',
    lastDonatedDate: '2025-11-20',
    totalDonations: 6,
    email: 'prajwal.k@example.com'
  },
  {
    id: 'DNR-1002',
    name: 'Ananya Sharma',
    bloodGroup: 'A+',
    age: 24,
    gender: 'Female',
    mobile: '+91 98112 33445',
    city: 'Mumbai',
    status: 'approved',
    registeredAt: '2026-01-18',
    lastDonatedDate: '2025-12-10',
    totalDonations: 3,
    email: 'ananya.s@example.com'
  },
  {
    id: 'DNR-1003',
    name: 'Rahul Deshmukh',
    bloodGroup: 'B+',
    age: 31,
    gender: 'Male',
    mobile: '+91 97654 88990',
    city: 'Nagpur',
    status: 'approved',
    registeredAt: '2026-02-01',
    lastDonatedDate: '2025-10-05',
    totalDonations: 8,
    email: 'rahul.d@example.com'
  },
  {
    id: 'DNR-1004',
    name: 'Priya Verma',
    bloodGroup: 'O-',
    age: 29,
    gender: 'Female',
    mobile: '+91 99201 55667',
    city: 'Mumbai',
    status: 'approved',
    registeredAt: '2026-02-05',
    lastDonatedDate: '2025-09-15',
    totalDonations: 5,
    email: 'priya.v@example.com'
  },
  {
    id: 'DNR-1005',
    name: 'Siddharth Mehta',
    bloodGroup: 'AB+',
    age: 26,
    gender: 'Male',
    mobile: '+91 98450 77112',
    city: 'Bangalore',
    status: 'approved',
    registeredAt: '2026-02-10',
    lastDonatedDate: '2026-01-02',
    totalDonations: 4,
    email: 'sid.m@example.com'
  },
  {
    id: 'DNR-1006',
    name: 'Kavita Patel',
    bloodGroup: 'A-',
    age: 33,
    gender: 'Female',
    mobile: '+91 98980 44332',
    city: 'Surat',
    status: 'approved',
    registeredAt: '2026-02-14',
    lastDonatedDate: '2025-08-20',
    totalDonations: 7,
    email: 'kavita.p@example.com'
  },
  {
    id: 'DNR-1007',
    name: 'Vikram Joshi',
    bloodGroup: 'B-',
    age: 28,
    gender: 'Male',
    mobile: '+91 98221 66554',
    city: 'Pune',
    status: 'approved',
    registeredAt: '2026-02-20',
    lastDonatedDate: '2025-11-01',
    totalDonations: 2,
    email: 'vikram.j@example.com'
  },
  {
    id: 'DNR-1008',
    name: 'Meera Nambiar',
    bloodGroup: 'AB-',
    age: 25,
    gender: 'Female',
    mobile: '+91 94470 22119',
    city: 'Hyderabad',
    status: 'approved',
    registeredAt: '2026-03-01',
    lastDonatedDate: '2025-12-28',
    totalDonations: 3,
    email: 'meera.n@example.com'
  },
  {
    id: 'DNR-1009',
    name: 'Amitabh Sen',
    bloodGroup: 'O+',
    age: 35,
    gender: 'Male',
    mobile: '+91 98300 99887',
    city: 'Kolkata',
    status: 'approved',
    registeredAt: '2026-03-05',
    lastDonatedDate: '2025-10-18',
    totalDonations: 12,
    email: 'amitabh.s@example.com'
  },
  {
    id: 'DNR-1010',
    name: 'Rohan Pawar',
    bloodGroup: 'B+',
    age: 22,
    gender: 'Male',
    mobile: '+91 91580 33221',
    city: 'Nashik',
    status: 'pending',
    registeredAt: '2026-03-12',
    email: 'rohan.pawar@example.com'
  },
  {
    id: 'DNR-1011',
    name: 'Shreya Bhosale',
    bloodGroup: 'A+',
    age: 23,
    gender: 'Female',
    mobile: '+91 98234 11889',
    city: 'Pune',
    status: 'pending',
    registeredAt: '2026-03-14',
    email: 'shreya.b@example.com'
  },
  {
    id: 'DNR-1012',
    name: 'Deepak Rathore',
    bloodGroup: 'O-',
    age: 30,
    gender: 'Male',
    mobile: '+91 94140 55443',
    city: 'Jaipur',
    status: 'pending',
    registeredAt: '2026-03-15',
    email: 'deepak.r@example.com'
  }
];

export const INITIAL_REQUESTS: BloodRequest[] = [
  {
    id: 'REQ-5001',
    patientName: 'Sunil Jadhav',
    bloodGroup: 'O+',
    hospital: 'Sahyadri Speciality Hospital',
    city: 'Pune',
    units: 2,
    urgency: 'Critical',
    contactMobile: '+91 98220 44112',
    status: 'Pending',
    requestedAt: '2026-03-14 10:30',
    notes: 'Required urgently for cardiac bypass surgery.'
  },
  {
    id: 'REQ-5002',
    patientName: 'Ritu Kapoor',
    bloodGroup: 'A-',
    hospital: 'Lilavati Hospital & Research Centre',
    city: 'Mumbai',
    units: 1,
    urgency: 'Urgent',
    contactMobile: '+91 98200 77889',
    status: 'Pending',
    requestedAt: '2026-03-15 08:15',
    notes: 'Anemia complication, blood required before evening.'
  },
  {
    id: 'REQ-5003',
    patientName: 'Karan Malhotra',
    bloodGroup: 'B+',
    hospital: 'Apollo Hospitals',
    city: 'Bangalore',
    units: 3,
    urgency: 'Standard',
    contactMobile: '+91 98800 11223',
    status: 'Fulfilled',
    requestedAt: '2026-03-10 14:00',
    notes: 'Elective orthopedic surgery.'
  },
  {
    id: 'REQ-5004',
    patientName: 'Deepa Hegde',
    bloodGroup: 'O-',
    hospital: 'KIMS Hospital',
    city: 'Hyderabad',
    units: 2,
    urgency: 'Critical',
    contactMobile: '+91 98490 66554',
    status: 'Pending',
    requestedAt: '2026-03-15 12:45',
    notes: 'Trauma ICU patient, immediate universal donor O- needed.'
  }
];

export const BLOOD_COMPATIBILITY_MATRIX: Record<BloodGroup, BloodCompatibility> = {
  'O-': {
    canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-'],
    rarity: 'Universal Donor (7% of population)',
    description: 'O negative blood can be given to patients of any blood type in emergency situations.'
  },
  'O+': {
    canGiveTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+'],
    rarity: 'Most Common (38% of population)',
    description: 'O positive blood is the most requested blood type by hospitals.'
  },
  'A-': {
    canGiveTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-'],
    rarity: 'Rare (6% of population)',
    description: 'A negative blood can be given to A and AB blood type patients.'
  },
  'A+': {
    canGiveTo: ['A+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+'],
    rarity: 'Very Common (34% of population)',
    description: 'A positive is one of the most frequent blood types needed for surgeries.'
  },
  'B-': {
    canGiveTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-', 'B-'],
    rarity: 'Very Rare (2% of population)',
    description: 'B negative donors are extremely valuable for rare blood type matching.'
  },
  'B+': {
    canGiveTo: ['B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+'],
    rarity: 'Common in South Asia (9% globally, 32% in India)',
    description: 'B positive is highly vital and frequently requested in regional blood banks.'
  },
  'AB-': {
    canGiveTo: ['AB-', 'AB+'],
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'],
    rarity: 'Rarest Blood Type (1% of population)',
    description: 'AB negative is the rarest blood type among the general population.'
  },
  'AB+': {
    canGiveTo: ['AB+'],
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    rarity: 'Universal Recipient (3% of population)',
    description: 'AB positive patients can safely receive red blood cells from any blood group.'
  }
};

export const CITIES_LIST = [
  'All Cities',
  'Mumbai',
  'Pune',
  'Nagpur',
  'Nashik',
  'Bangalore',
  'Hyderabad',
  'Delhi',
  'Kolkata',
  'Surat',
  'Jaipur',
  'Chennai',
  'Ahmedabad'
];
