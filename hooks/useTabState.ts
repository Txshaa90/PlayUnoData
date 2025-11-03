'use client'

import { useState, useEffect } from 'react'

export interface Tab {
  id: string
  name: string
  sheetData?: any
  isActive?: boolean
}

interface TabState {
  tabs: Tab[]
  activeTabId: string | null
  addTab: (name?: string) => void
  removeTab: (id: string) => void
  renameTab: (id: string, newName: string) => void
  setActiveTab: (id: string) => void
  getActiveTab: () => Tab | null
}

const DEFAULT_TABS: Tab[] = [
  { id: '1', name: 'Content Pipeline', isActive: true },
  { id: '2', name: 'Tasks', isActive: false },
  { id: '3', name: 'Promotions & Performance', isActive: false },
  { id: '4', name: 'Ideas & Playbooks', isActive: false }
]

export function useTabState(): TabState {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS)
  const [activeTabId, setActiveTabId] = useState<string | null>('1')

  // Load from localStorage on mount
  useEffect(() => {
    const savedTabs = localStorage.getItem('playunodata-tabs')
    const savedActiveTab = localStorage.getItem('playunodata-active-tab')
    
    if (savedTabs) {
      try {
        const parsedTabs = JSON.parse(savedTabs)
        setTabs(parsedTabs)
      } catch (error) {
        console.error('Failed to parse saved tabs:', error)
      }
    }
    
    if (savedActiveTab) {
      setActiveTabId(savedActiveTab)
    }
  }, [])

  // Save to localStorage whenever tabs or activeTabId changes
  useEffect(() => {
    localStorage.setItem('playunodata-tabs', JSON.stringify(tabs))
  }, [tabs])

  useEffect(() => {
    if (activeTabId) {
      localStorage.setItem('playunodata-active-tab', activeTabId)
    }
  }, [activeTabId])

  const addTab = (name?: string) => {
    const newId = Date.now().toString()
    const newTab: Tab = {
      id: newId,
      name: name || `Sheet ${tabs.length + 1}`,
      isActive: false
    }
    
    setTabs(prev => [...prev, newTab])
    setActiveTabId(newId)
  }

  const removeTab = (id: string) => {
    if (tabs.length <= 1) return // Don't allow removing the last tab
    
    setTabs(prev => {
      const filtered = prev.filter(tab => tab.id !== id)
      
      // If we're removing the active tab, set the first remaining tab as active
      if (activeTabId === id && filtered.length > 0) {
        setActiveTabId(filtered[0].id)
      }
      
      return filtered
    })
  }

  const renameTab = (id: string, newName: string) => {
    setTabs(prev => 
      prev.map(tab => 
        tab.id === id ? { ...tab, name: newName } : tab
      )
    )
  }

  const setActiveTab = (id: string) => {
    setActiveTabId(id)
  }

  const getActiveTab = (): Tab | null => {
    return tabs.find(tab => tab.id === activeTabId) || null
  }

  return {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    renameTab,
    setActiveTab,
    getActiveTab
  }
}
