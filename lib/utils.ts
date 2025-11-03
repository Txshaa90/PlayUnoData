import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'text-status-approved bg-status-approved-bg'
    case 'pending':
      return 'text-amber-700 bg-status-pending-bg'
    case 'in progress':
      return 'text-status-progress bg-status-progress-bg'
    case 'rejected':
    case 'blocked':
      return 'text-status-rejected bg-status-rejected-bg'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'text-red-700 bg-red-100'
    case 'medium':
      return 'text-yellow-700 bg-yellow-100'
    case 'low':
      return 'text-gray-600 bg-gray-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}
