'use client'

import React, { createContext, useContext, useState } from 'react'

interface FilterCondition {
  id: string
  field: string
  operator: string
  value: string | number | Date
}

interface FilterContextValue {
  filters: FilterCondition[]
  searchQuery: string
  colorMode: 'none' | 'status' | 'priority'
  addFilter: (filter: FilterCondition) => void
  removeFilter: (id: string) => void
  clearFilters: () => void
  setSearchQuery: (query: string) => void
  setColorMode: (mode: 'none' | 'status' | 'priority') => void
}

const FilterContext = createContext<FilterContextValue | null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterCondition[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [colorMode, setColorMode] = useState<'none' | 'status' | 'priority'>('none')

  const addFilter = (filter: FilterCondition) => {
    setFilters(prev => [...prev, filter])
  }

  const removeFilter = (id: string) => {
    setFilters(prev => prev.filter(f => f.id !== id))
  }

  const clearFilters = () => {
    setFilters([])
  }

  const value: FilterContextValue = {
    filters,
    searchQuery,
    colorMode,
    addFilter,
    removeFilter,
    clearFilters,
    setSearchQuery,
    setColorMode
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter(): FilterContextValue {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within FilterProvider')
  }
  return context
}
