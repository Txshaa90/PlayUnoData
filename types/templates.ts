export interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnail: string
  isPremium: boolean
  isFeatured: boolean
  isNew: boolean
  tags: string[]
  author: string
  createdAt: Date
  usageCount: number
  rating: number
  fields: TemplateField[]
  previewData: any[]
  sheets?: TemplateSheet[]
}

export interface TemplateSheet {
  name: string
  fields: TemplateField[]
}

export interface TemplateField {
  name: string
  type: 'text' | 'number' | 'select' | 'date' | 'checkbox' | 'email' | 'url' | 'longtext'
  options?: string[]
}

export type TemplateCategory = 
  | 'featured'
  | 'new'
  | 'project-management'
  | 'marketing'
  | 'product-management'
  | 'hr-recruiting'
  | 'sales-crm'
  | 'content-planning'
  | 'inventory'
  | 'event-planning'

export const TEMPLATE_CATEGORIES: Record<TemplateCategory, { label: string; description: string }> = {
  'featured': {
    label: 'Featured Templates',
    description: 'Most popular and recommended templates curated by our team'
  },
  'new': {
    label: 'New Templates',
    description: 'Latest additions to our template collection'
  },
  'project-management': {
    label: 'Project Management',
    description: 'Organize tasks, track progress, and manage team workflows'
  },
  'marketing': {
    label: 'Marketing',
    description: 'Campaign planning, content calendars, and marketing analytics'
  },
  'product-management': {
    label: 'Product Management',
    description: 'Feature roadmaps, user feedback, and product development tracking'
  },
  'hr-recruiting': {
    label: 'HR & Recruiting',
    description: 'Candidate tracking, employee management, and HR processes'
  },
  'sales-crm': {
    label: 'Sales & CRM',
    description: 'Lead management, sales pipelines, and customer relationships'
  },
  'content-planning': {
    label: 'Content Planning',
    description: 'Editorial calendars, content strategy, and publishing workflows'
  },
  'inventory': {
    label: 'Inventory Management',
    description: 'Stock tracking, supply chain, and warehouse management'
  },
  'event-planning': {
    label: 'Event Planning',
    description: 'Event coordination, vendor management, and timeline tracking'
  }
}
