export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
export const PAGE_SIZE = 8;
export const SUB_TABLE_PAGE_SIZE = 6;

import {
  Building2,
  BookOpen,
  Users,
  ClipboardList,
  GraduationCap,
  Home
} from 'lucide-react';

export const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Departments', href: '/departments', icon: Building2 },
  { name: 'Subjects', href: '/subjects', icon: BookOpen },
  { name: 'Classes', href: '/classes', icon: GraduationCap },
  { name: 'Faculty', href: '/faculty', icon: Users },
  { name: 'Enrollments', href: '/enrollments', icon: ClipboardList }
];

// Mock Data
export const departments = [
  {
    code: 'SCVHBRT',
    name: 'Biology',
    subjects: 5,
    description: 'The study of life and living systems.'
  },
  {
    code: 'AFGSR3G',
    name: 'Mathematics',
    subjects: 5,
    description: 'The study of numbers, patterns, and logical structure.'
  },
  {
    code: 'T4UWNJD',
    name: 'Computer Science',
    subjects: 5,
    description: 'The study of computation, software, and algorithms.'
  },
  {
    code: 'JMNYRTG',
    name: 'Business',
    subjects: 5,
    description: 'The study of how organizations create and manage value.'
  },
  {
    code: 'm4HHXGH',
    name: 'History',
    subjects: 5,
    description: 'The study of past events and human societies.'
  },
  {
    code: 'YUTDNMA',
    name: 'Economics',
    subjects: 5,
    description: 'The study of decision-making under scarcity.'
  },
  {
    code: 'UOIKYSDG',
    name: 'Physics',
    subjects: 5,
    description: 'The study of matter, energy, and the laws of nature.'
  }
];

export const colors = [
  'text-blue-600 bg-blue-50',
  'text-red-600 bg-red-50',
  'text-purple-600 bg-purple-50',
  'text-pink-600 bg-pink-50',
  'text-emerald-600 bg-emerald-50',
  'text-orange-600 bg-orange-50',
  'text-indigo-600 bg-indigo-50'
];
