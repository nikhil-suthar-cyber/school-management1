export type SchoolStatus = 'Paid' | 'Pending' | 'Unpaid';

export interface School {
  id: string;
  name: string;
  address: string;
  state: string;
  zipCode: string;
  location: string;
  email: string;
  phone: string;
  password?: string;
  startDate: string;
  endDate: string;
  students: number;
  teachers: number;
  amount: number;
  status: SchoolStatus;
}

export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Teacher' | 'Student';
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export interface Subscription {
  id: string;
  schoolId: string;
  planName: string;
  expiryDate: string;
  amount: number;
  status: 'Active' | 'Expiring' | 'Expired';
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: 'Monthly' | 'Yearly';
}

export type Page = 'dashboard' | 'schools' | 'plans' | 'overview' | 'support' | 'terms' | 'form' | 'user-form' | 'schools-list' | 'users-list' | 'subscription-details';
