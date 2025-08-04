import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Government-specific utility functions
export function formatClassification(level: 'unclassified' | 'cui' | 'secret'): string {
  return level.toUpperCase()
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function getChangeClass(change: number): string {
  if (change > 0) return 'badge-positive'
  if (change < 0) return 'badge-negative'
  return 'badge-neutral'
}

export function getChangeText(change: number): string {
  if (change > 0) return `+${formatPercentage(Math.abs(change))}`
  if (change < 0) return `-${formatPercentage(Math.abs(change))}`
  return '0%'
}