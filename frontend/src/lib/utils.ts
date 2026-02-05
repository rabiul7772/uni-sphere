import { colors } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDepartmentColor = (id: number) => {
  return colors[id % colors.length];
};
