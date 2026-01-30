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
    count: 56,
    description: 'The study of life and living systems.'
  },
  {
    code: 'AFGSR3G',
    name: 'Mathematics',
    count: 72,
    description: 'The study of numbers, patterns, and logical structure.'
  },
  {
    code: 'T4UWNJD',
    name: 'Computer Science',
    count: 89,
    description: 'The study of computation, software, and algorithms.'
  },
  {
    code: 'JMNYRTG',
    name: 'Business',
    count: 38,
    description: 'The study of how organizations create and manage value.'
  },
  {
    code: 'm4HHXGH',
    name: 'History',
    count: 67,
    description: 'The study of past events and human societies.'
  },
  {
    code: 'YUTDNMA',
    name: 'Economics',
    count: 73,
    description: 'The study of decision-making under scarcity.'
  },
  {
    code: 'UOIKYSDG',
    name: 'Physics',
    count: 53,
    description: 'The study of matter, energy, and the laws of nature.'
  }
];
