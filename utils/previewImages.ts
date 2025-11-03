// Template Preview Image Management
// This utility helps manage and serve template preview images

export interface TemplatePreview {
  templateId: string
  name: string
  filename: string
  fullImagePath: string
  previewImagePath: string
  fallbackIcon?: string
}

// Template preview mappings
export const TEMPLATE_PREVIEWS: Record<string, TemplatePreview> = {
  'template-1': {
    templateId: 'template-1',
    name: 'Project Management Hub',
    filename: 'project-management-hub.png',
    fullImagePath: '/templates/project-management-hub.png',
    previewImagePath: '/previews/project-management-hub.png',
    fallbackIcon: '🚀'
  },
  'template-4': {
    templateId: 'template-4',
    name: 'Content Calendar Pro',
    filename: 'content-calendar-pro.png',
    fullImagePath: '/templates/content-calendar-pro.png',
    previewImagePath: '/previews/content-calendar-pro.png',
    fallbackIcon: '📊'
  },
  'template-blank': {
    templateId: 'template-blank',
    name: 'Blank Template',
    filename: 'blank-template.png',
    fullImagePath: '/templates/blank-template.png',
    previewImagePath: '/previews/blank-template.png',
    fallbackIcon: '📄'
  },
  'template-5': {
    templateId: 'template-5',
    name: 'Sales Pipeline CRM',
    filename: 'sales-pipeline-crm.png',
    fullImagePath: '/templates/sales-pipeline-crm.png',
    previewImagePath: '/previews/sales-pipeline-crm.png',
    fallbackIcon: '💼'
  },
  'template-6': {
    templateId: 'template-6',
    name: 'Inventory Management',
    filename: 'inventory-management.png',
    fullImagePath: '/templates/inventory-management.png',
    previewImagePath: '/previews/inventory-management.png',
    fallbackIcon: '📦'
  },
  'sales-crm': {
    templateId: 'sales-crm',
    name: 'Sales CRM & Pipeline',
    filename: 'sales-crm.png',
    fullImagePath: '/templates/sales-crm.png',
    previewImagePath: '/previews/sales-crm.png',
    fallbackIcon: '💼'
  }
}

/**
 * Get template preview image URL with fallback
 */
export function getTemplatePreviewImage(templateId: string, usePreview = true): string {
  const preview = TEMPLATE_PREVIEWS[templateId]
  
  if (!preview) {
    return '/api/placeholder/400/240' // Fallback placeholder
  }
  
  return usePreview ? preview.previewImagePath : preview.fullImagePath
}

/**
 * Get template fallback icon
 */
export function getTemplateFallbackIcon(templateId: string): string {
  const preview = TEMPLATE_PREVIEWS[templateId]
  return preview?.fallbackIcon || '📋'
}

/**
 * Check if template preview image exists
 * In a real app, you might want to check if the file actually exists
 */
export function hasTemplatePreview(templateId: string): boolean {
  return templateId in TEMPLATE_PREVIEWS
}

/**
 * Template Preview Image Component Props
 */
export interface TemplateImageProps {
  templateId: string
  alt: string
  className?: string
  usePreview?: boolean
  showFallback?: boolean
}

/**
 * Get all available template previews
 */
export function getAllTemplatePreviews(): TemplatePreview[] {
  return Object.values(TEMPLATE_PREVIEWS)
}

/**
 * Template preview image with fallback handling
 */
export function getTemplateImageSrc(templateId: string, usePreview = true): {
  src: string
  fallbackIcon: string
  hasPreview: boolean
} {
  const preview = TEMPLATE_PREVIEWS[templateId]
  
  if (!preview) {
    return {
      src: '/api/placeholder/400/240',
      fallbackIcon: '📋',
      hasPreview: false
    }
  }
  
  return {
    src: usePreview ? preview.previewImagePath : preview.fullImagePath,
    fallbackIcon: preview.fallbackIcon || '📋',
    hasPreview: true
  }
}

// Default placeholder dimensions
export const PREVIEW_DIMENSIONS = {
  width: 400,
  height: 240
}

// Template categories with preview support
export const TEMPLATE_CATEGORIES_WITH_PREVIEWS = {
  'project-management': {
    name: 'Project Management',
    templates: ['template-1'],
    previewCount: 1
  },
  'content-planning': {
    name: 'Content Planning',
    templates: ['template-4'],
    previewCount: 1
  },
  'sales-crm': {
    name: 'Sales & CRM',
    templates: ['template-5'],
    previewCount: 1
  },
  'inventory': {
    name: 'Inventory Management',
    templates: ['template-6'],
    previewCount: 1
  },
  'blank': {
    name: 'Blank Templates',
    templates: ['template-blank'],
    previewCount: 1
  }
}
