export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// export const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
// export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// export const BASE_URL = import.meta.env.VITE_API_URL;
// export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
// export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;

// export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

// export const CLOUDINARY_UPLOAD_PRESET = import.meta.env
//   .VITE_CLOUDINARY_UPLOAD_PRESET;

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
  { name: 'Faculty', href: '/faculty', icon: Users },
  { name: 'Enrollments', href: '/enrollments', icon: ClipboardList },
  { name: 'Classes', href: '/classes', icon: GraduationCap }
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
