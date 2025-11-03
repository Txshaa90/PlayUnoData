import type { TemplateSheetConfig } from '@/types/templateSheets'

// Load a TemplateSheetConfig JSON by id from public/templates/json/<id>.json
export async function loadTemplateConfigById(id: string): Promise<TemplateSheetConfig | null> {
  try {
    const res = await fetch(`/templates/json/${id}.json`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data as TemplateSheetConfig
  } catch (e) {
    console.error('Failed to load template config', id, e)
    return null
  }
}

// Optional: load an index to list external templates (used later for gallery wiring)
export interface ExternalTemplateIndexItem {
  id: string
  name: string
  description?: string
  category?: string
  preview?: string
}

export async function loadExternalTemplatesIndex(): Promise<ExternalTemplateIndexItem[]> {
  try {
    const res = await fetch('/templates/index.json', { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data as ExternalTemplateIndexItem[] : []
  } catch (e) {
    return []
  }
}
