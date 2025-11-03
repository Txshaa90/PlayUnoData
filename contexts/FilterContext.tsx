'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { FilterCondition } from '@/lib/filtering'

interface FilterContextType {
  filters: FilterCondition[]
  addFilter: (filter: FilterCondition) => void
  removeFilter: (filterId: string) => void
  updateFilter: (filterId: string, updates: Partial<FilterCondition>) => void
  clearFilters: () => void
  colorMode: 'none' | 'status' | 'priority'
  setColorMode: (mode: 'none' | 'status' | 'priority') => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterCondition[]>([])
  const [colorMode, setColorMode] = useState<'none' | 'status' | 'priority'>('none')
  const [searchQuery, setSearchQuery] = useState('')

  const addFilter = (filter: FilterCondition) => {
    setFilters(prev => [...prev, filter])
  }

  const removeFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId))
  }

  const updateFilter = (filterId: string, updates: Partial<FilterCondition>) => {
    setFilters(prev => prev.map(f => 
      f.id === filterId ? { ...f, ...updates } : f
    ))
  }

  const clearFilters = () => {
    setFilters([])
  }

  return (
    <FilterContext.Provider value={{
      filters,
      addFilter,
      removeFilter,
      updateFilter,
      clearFilters,
      colorMode,
      setColorMode,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}
