'use client'

import { useState } from 'react'

export interface FilterCondition {
  id: string
  field: string
  operator: string
  value: string | number | Date
}

export interface ColorRule {
  id: string
  field: string
  condition: string
  value: string | number | Date
  color: string
  backgroundColor: string
}

export interface DataRecord {
  id: string
  name: string
  status: string
  priority: string
  assignee: string
  dueDate: Date
  category: string
  progress: number
}

export function useFilterState() {
  const [filters, setFilters] = useState<FilterCondition[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [colorMode, setColorMode] = useState<'none' | 'status' | 'priority' | 'custom'>('none')
  const [groupBy, setGroupBy] = useState<string | null>(null)
  const [hiddenFields, setHiddenFields] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null)
  const [colorRules, setColorRules] = useState<ColorRule[]>([])
  const [colorByCondition, setColorByCondition] = useState(false)

  const addFilter = (filter: FilterCondition) => {
    setFilters(prev => [...prev, filter])
  }

  const removeFilter = (id: string) => {
    setFilters(prev => prev.filter(f => f.id !== id))
  }

  const clearFilters = () => {
    setFilters([])
  }

  const toggleFieldVisibility = (fieldId: string) => {
    setHiddenFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    )
  }

  const addQuickFilter = (field: string, value: string) => {
    const quickFilter: FilterCondition = {
      id: `quick-${Date.now()}`,
      field,
      operator: 'equals',
      value
    }
    addFilter(quickFilter)
  }

  const addColorRule = (rule: ColorRule) => {
    setColorRules(prev => [...prev, rule])
  }

  const removeColorRule = (id: string) => {
    setColorRules(prev => prev.filter(r => r.id !== id))
  }

  const clearColorRules = () => {
    setColorRules([])
    setColorByCondition(false)
  }

  const addRecord = (record: DataRecord) => {
    // This function will be handled by the DataGrid component
    // We're just providing the interface here
    console.log('Add record called from hook:', record)
  }

  const deleteRecord = (recordId: string) => {
    // This function will be handled by the DataGrid component
    // We're just providing the interface here
    console.log('Delete record called from hook:', recordId)
  }

  return {
    filters,
    searchQuery,
    colorMode,
    groupBy,
    hiddenFields,
    sortBy,
    colorRules,
    colorByCondition,
    addFilter,
    removeFilter,
    clearFilters,
    setFilters,
    setSearchQuery,
    setColorMode,
    setGroupBy,
    toggleFieldVisibility,
    setSortBy,
    addQuickFilter,
    addColorRule,
    removeColorRule,
    clearColorRules,
    setColorByCondition,
    addRecord,
    deleteRecord
  }
}
