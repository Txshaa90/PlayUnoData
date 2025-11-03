import type { TemplateSheetConfig } from '@/types/templateSheets'

const templateCache = new Map<string, TemplateSheetConfig | null>()
let indexCache: ExternalTemplateIndexItem[] | null = null

export async function loadTemplateConfigById(id: string): Promise<TemplateSheetConfig | null> {
  if (templateCache.has(id)) return templateCache.get(id) ?? null
  try {
    const res = await fetch(`/templates/json/${id}.json`, { cache: 'no-store' })
    if (!res.ok) {
      templateCache.set(id, null)
      return null
    }
    const data = (await res.json()) as TemplateSheetConfig
    templateCache.set(id, data)
    return data
  } catch (e) {
    templateCache.set(id, null)
    return null
  }
}

export interface ExternalTemplateIndexItem {
  id: string
  name: string
  description?: string
  category?: string
  preview?: string
}

export async function loadExternalTemplatesIndex(): Promise<ExternalTemplateIndexItem[]> {
  if (indexCache) return indexCache
  try {
    const res = await fetch('/templates/index.json', { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    indexCache = Array.isArray(data) ? (data as ExternalTemplateIndexItem[]) : []
    return indexCache
  } catch (e) {
    return []
  }
}

export async function loadTemplate(id: string) {
  return loadTemplateConfigById(id)
}

export async function getTemplateList() {
  return loadExternalTemplatesIndex()
}
