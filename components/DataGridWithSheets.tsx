'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Plus, Upload, FileText } from 'lucide-react'
import { getSheetDataById, BLANK_SHEET_TEMPLATE, BLANK_TEMPLATE, SheetData } from '@/data/sheetTemplates'
import { getContentCalendarDataById } from '@/data/contentCalendarTemplates'
import { BlankTemplateWorkspace } from './BlankTemplateWorkspace'
import { ContentCalendarAnalytics } from './ContentCalendarAnalytics'

interface DataGridWithSheetsProps {
  activeTabName: string
  filterState?: {
    searchQuery: string
    groupBy: string | null
    sortBy: {field: string, direction: 'asc' | 'desc'} | null
    filters: any[]
  }
}

export function DataGridWithSheets({ activeTabName, filterState }: DataGridWithSheetsProps) {
  const [sortConfig, setSortConfig] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  
  // Get sheet data based on active tab name - try Content Calendar first, then check for blank template, then fallback to general templates
  const sheetData = useMemo(() => {
    const contentCalendarSheets = ['Content Pipeline', 'Tasks', 'Promotions & Performance', 'Ideas & Playbooks']
    
    if (contentCalendarSheets.includes(activeTabName)) {
      return getContentCalendarDataById(activeTabName)
    }
    
    if (activeTabName === 'Blank Template') {
      return BLANK_TEMPLATE
    }
    
    return getSheetDataById(activeTabName)
  }, [activeTabName])

  // Apply filtering and sorting
  const processedData = useMemo(() => {
    let data = [...sheetData.data]

    // Apply search filter
    if (filterState?.searchQuery) {
      const query = filterState.searchQuery.toLowerCase()
      data = data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(query)
        )
      )
    }

    // Apply sorting
    const sortBy = filterState?.sortBy || sortConfig
    if (sortBy) {
      data.sort((a, b) => {
        const aVal = a[sortBy.field]
        const bVal = b[sortBy.field]
        
        if (aVal < bVal) return sortBy.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortBy.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return data
  }, [sheetData.data, filterState?.searchQuery, filterState?.sortBy, sortConfig])

  const handleSort = (field: string) => {
    setSortConfig(prev => {
      if (prev?.field === field) {
        return prev.direction === 'asc' 
          ? { field, direction: 'desc' }
          : null
      }
      return { field, direction: 'asc' }
    })
  }

  const getSortIcon = (field: string) => {
    const currentSort = filterState?.sortBy || sortConfig
    if (currentSort?.field !== field) return null
    
    return currentSort.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      // Content workflow statuses
      case 'idea': return 'bg-purple-100 text-purple-800'
      case 'in draft': return 'bg-yellow-100 text-yellow-800'
      case 'in review': return 'bg-orange-100 text-orange-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'published': return 'bg-green-100 text-green-800'
      // Task statuses
      case 'not started': return 'bg-gray-100 text-gray-600'
      case 'in progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      // Planning statuses
      case 'backlog': return 'bg-gray-100 text-gray-600'
      case 'in planning': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-orange-100 text-orange-800'
      // Performance scores
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'average': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderCellContent = (value: any, column: string) => {
    const columnLower = column.toLowerCase()
    
    if (columnLower.includes('status') || columnLower.includes('performance score')) {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      )
    }
    
    if (columnLower.includes('priority')) {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(value)}`}>
          {value}
        </span>
      )
    }
    
    if (columnLower.includes('progress') && typeof value === 'number') {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 min-w-0">{value}%</span>
        </div>
      )
    }
    
    if (columnLower.includes('engagement rate') || columnLower.includes('ctr')) {
      return (
        <span className="text-sm font-medium text-blue-600">
          {value}
        </span>
      )
    }
    
    if (columnLower.includes('views') || columnLower.includes('impressions') || columnLower.includes('clicks')) {
      return (
        <span className="text-sm font-medium text-green-600">
          {value}
        </span>
      )
    }
    
    if (columnLower.includes('leads generated') && typeof value === 'number') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value > 20 ? 'bg-green-100 text-green-800' : 
          value > 10 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-600'
        }`}>
          {value} leads
        </span>
      )
    }
    
    if (columnLower.includes('estimated effort') || columnLower.includes('estimated hours')) {
      const effortColor = typeof value === 'string' ? 
        (value.toLowerCase() === 'high' ? 'text-red-600' : 
         value.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-green-600') :
        'text-gray-600'
      
      return (
        <span className={`text-sm font-medium ${effortColor}`}>
          {value}
        </span>
      )
    }
    
    if (columnLower.includes('channel')) {
      const channelColors: Record<string, string> = {
        'blog': 'bg-blue-100 text-blue-800',
        'social': 'bg-pink-100 text-pink-800',
        'newsletter': 'bg-green-100 text-green-800',
        'video': 'bg-purple-100 text-purple-800',
        'email': 'bg-indigo-100 text-indigo-800',
        'website': 'bg-gray-100 text-gray-800'
      }
      
      const colorClass = channelColors[value?.toLowerCase()] || 'bg-gray-100 text-gray-800'
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {value}
        </span>
      )
    }
    
    if (columnLower.includes('url') && value && value.startsWith('http')) {
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          View Link
        </a>
      )
    }
    
    return value
  }

  // Show blank template workspace for blank template or empty sheets
  if (sheetData.data.length === 0) {
    // Special handling for Blank Template
    if (activeTabName === 'Blank Template') {
      return (
        <BlankTemplateWorkspace
          onDataImport={(data) => {
            console.log('Data imported:', data)
            // In a real app, this would update the sheet data
          }}
          onManualAdd={() => {
            console.log('Starting manual entry')
            // In a real app, this would switch to manual entry mode
          }}
        />
      )
    }
    
    // Default empty sheet template
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8 text-center">
          <div className="mb-6">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Empty Sheet</h3>
            <p className="text-gray-500 mb-6">This sheet is empty. Add some data to get started.</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Record</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Import Excel</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Check if this is a Content Calendar sheet
  const isContentCalendarSheet = ['Content Pipeline', 'Tasks', 'Promotions & Performance', 'Ideas & Playbooks'].includes(activeTabName)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header with Analytics Toggle */}
      {isContentCalendarSheet && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{sheetData.name}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAnalytics(false)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    !showAnalytics 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Data
                </button>
                <button
                  onClick={() => setShowAnalytics(true)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    showAnalytics 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Analytics
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {processedData.length} {processedData.length === 1 ? 'record' : 'records'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show Analytics or Data View */}
      {isContentCalendarSheet && showAnalytics ? (
        <div className="p-6">
          <ContentCalendarAnalytics />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {sheetData.columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {processedData.map((row, index) => (
              <motion.tr
                key={row.id || index}
                className="hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {sheetData.columns.map((column) => (
                  <td key={column} className="px-4 py-3 text-sm text-gray-900">
                    {renderCellContent(row[column], column)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
          </table>
          
          {processedData.length === 0 && filterState?.searchQuery && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No records found matching "{filterState.searchQuery}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
