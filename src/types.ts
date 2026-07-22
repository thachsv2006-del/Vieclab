/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DesignTokens {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  bgLight: string;
  bgDark: string;
  borderRadiusCard: string;
  borderRadiusButton: string;
  borderRadiusInputChip: string;
  shadowY: string;
  shadowBlur: string;
  shadowColor: string;
  shadowOpacity: string;
}

export type CodePlatform = 'react' | 'flutter' | 'react-native';

export interface ShiftJob {
  id: string;
  title: string;
  restaurantName: string;
  logo: string;
  date: string;
  time: string;
  hourlyRate: number;
  totalEarnings: number;
  location: string;
  requiredSkills: string[];
  status: 'available' | 'applied' | 'confirmed' | 'completed' | 'cancelled';
  slotsTotal: number;
  slotsFilled: number;
}

export const VIECLAB_TOKENS: DesignTokens = {
  primary: '#1565C0',
  secondary: '#FFFFFF',
  accent: '#42A5F5',
  success: '#00C853',
  warning: '#FF9800',
  error: '#E53935',
  bgLight: '#F5F7FA',
  bgDark: '#0A0E17',
  borderRadiusCard: '20px',
  borderRadiusButton: '16px',
  borderRadiusInputChip: '12px',
  shadowY: '8px',
  shadowBlur: '24px',
  shadowColor: '#1565C0',
  shadowOpacity: '0.04',
};

export const INITIAL_SHIFTS: ShiftJob[] = [
  {
    id: 'shift-1',
    title: 'Senior Barista (Afternoon Shift)',
    restaurantName: 'The Royal Beans Coffee',
    logo: '☕',
    date: 'Today, July 09',
    time: '14:00 - 18:00 (4 hours)',
    hourlyRate: 25,
    totalEarnings: 100,
    location: 'District 1, Ho Chi Minh City',
    requiredSkills: ['Espresso Art', 'Cashier', 'Customer Service'],
    status: 'available',
    slotsTotal: 2,
    slotsFilled: 0,
  },
  {
    id: 'shift-2',
    title: 'Sous Chef (Evening Dinner Rush)',
    restaurantName: 'Saigon Bistro & Grill',
    logo: '🥩',
    date: 'Today, July 09',
    time: '17:00 - 22:00 (5 hours)',
    hourlyRate: 32,
    totalEarnings: 160,
    location: 'District 3, Ho Chi Minh City',
    requiredSkills: ['F&B Prep', 'Kitchen Safety', 'Grill Master'],
    status: 'available',
    slotsTotal: 1,
    slotsFilled: 0,
  },
  {
    id: 'shift-3',
    title: 'Lead Dining Server',
    restaurantName: 'La Villa French Restaurant',
    logo: '🍷',
    date: 'Tomorrow, July 10',
    time: '18:00 - 23:00 (5 hours)',
    hourlyRate: 22,
    totalEarnings: 110,
    location: 'Thao Dien, District 2',
    requiredSkills: ['Wine Serving', 'English Fluent', 'Fine Dining'],
    status: 'confirmed',
    slotsTotal: 3,
    slotsFilled: 3,
  },
  {
    id: 'shift-4',
    title: 'Kitchen Helper',
    restaurantName: 'Banh Mi Premium & Co',
    logo: '🥖',
    date: 'Tomorrow, July 10',
    time: '06:00 - 11:00 (5 hours)',
    hourlyRate: 18,
    totalEarnings: 90,
    location: 'Binh Thanh District',
    requiredSkills: ['Food Prep', 'Fast Pace', 'Dishwashing'],
    status: 'available',
    slotsTotal: 4,
    slotsFilled: 2,
  },
];
