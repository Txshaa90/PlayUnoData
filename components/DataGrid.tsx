import { Badge } from '@/components/ui/Badge'
import { getStatusColor, getPriorityColor, formatDate, cn } from '@/lib/utils'
import { getRowColorClass, getPriorityColorClass, applyFilters } from '@/lib/filtering'
import { groupDataBy, sortGroupedData, getGroupColor } from '@/lib/grouping'
import { User, Calendar, Tag, ChevronDown, ChevronUp, Filter as FilterIcon, Plus, Trash2 } from 'lucide-react'
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { FilterCondition } from '@/hooks/useFilterState'

interface DataRecord {
  id: string
  name: string
  status: string
  priority: string
  assignee: string
  dueDate: Date
  category: string
  progress: number
}

const sampleData: DataRecord[] = [
  {
    id: '1',
    name: 'Website Redesign Project',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Sarah Chen',
    dueDate: new Date('2024-11-15'),
    category: 'Design',
    progress: 75
  },
  {
    id: '2',
    name: 'Mobile App Development',
    status: 'Approved',
    priority: 'High',
    assignee: 'Mike Johnson',
    dueDate: new Date('2024-12-01'),
    category: 'Development',
    progress: 45
  },
  {
    id: '3',
    name: 'Marketing Campaign Q4',
    status: 'Pending',
    priority: 'Medium',
    assignee: 'Emma Wilson',
    dueDate: new Date('2024-10-30'),
    category: 'Marketing',
    progress: 20
  },
  {
    id: '4',
    name: 'Database Migration',
    status: 'Approved',
    priority: 'High',
    assignee: 'Alex Rodriguez',
    dueDate: new Date('2024-11-08'),
    category: 'Infrastructure',
    progress: 90
  },
  {
    id: '5',
    name: 'User Research Study',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Lisa Park',
    dueDate: new Date('2024-11-20'),
    category: 'Research',
    progress: 60
  },
  {
    id: '6',
    name: 'Security Audit',
    status: 'Rejected',
    priority: 'Low',
    assignee: 'David Kim',
    dueDate: new Date('2024-10-25'),
    category: 'Security',
    progress: 0
  }
]

interface DataGridProps {
  filterState: {
    filters: FilterCondition[]
    searchQuery: string
    colorMode: 'none' | 'status' | 'priority' | 'custom'
    groupBy: string | null
    hiddenFields: string[]
    sortBy: {field: string, direction: 'asc' | 'desc'} | null
    colorRules: any[]
    colorByCondition: boolean
    addFilter: (filter: FilterCondition) => void
    removeFilter: (id: string) => void
    clearFilters: () => void
    setSearchQuery: (query: string) => void
    setColorMode: (mode: 'none' | 'status' | 'priority' | 'custom') => void
    setGroupBy: (field: string | null) => void
    toggleFieldVisibility: (fieldId: string) => void
    setSortBy: (sort: {field: string, direction: 'asc' | 'desc'} | null) => void
    addQuickFilter: (field: string, value: string) => void
    addRecord?: (record: DataRecord) => void
    deleteRecord?: (recordId: string) => void
  }
}

export function DataGrid({ filterState }: DataGridProps) {
  const { 
    filters, 
    searchQuery, 
    colorMode, 
    groupBy, 
    hiddenFields, 
    sortBy,
    colorRules,
    colorByCondition,
    addQuickFilter,
    setSortBy,
    setGroupBy,
    addRecord: externalAddRecord,
    deleteRecord: externalDeleteRecord
  } = filterState
  
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const [editingCell, setEditingCell] = useState<{ rowId: string; field: string } | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [data, setData] = useState<DataRecord[]>(() => {
    // Load saved data from localStorage or use sample data
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('playuno-data-records')
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          // Convert date strings back to Date objects
          return parsedData.map((record: any) => ({
            ...record,
            dueDate: new Date(record.dueDate)
          }))
        } catch (error) {
          console.error('Error loading saved data:', error)
        }
      }
    }
    return sampleData
  })

  // Autosave function
  const saveDataToStorage = useCallback((dataToSave: DataRecord[]) => {
    setSaveStatus('saving')
    try {
      localStorage.setItem('playuno-data-records', JSON.stringify(dataToSave))
      setSaveStatus('saved')
    } catch (error) {
      console.error('Error saving data:', error)
      setSaveStatus('unsaved')
    }
  }, [])

  // Autosave effect - saves data whenever it changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveDataToStorage(data)
    }, 1000) // Autosave after 1 second of inactivity

    return () => clearTimeout(timeoutId)
  }, [data, saveDataToStorage])

  // Manual save function
  const manualSave = useCallback(() => {
    saveDataToStorage(data)
  }, [data, saveDataToStorage])
  
  const filteredData = useMemo(() => {
    let dataToFilter = [...data]
    
    // Apply search filter
    if (searchQuery) {
      dataToFilter = dataToFilter.filter(record => 
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Apply filters
    dataToFilter = applyFilters(dataToFilter, filters)
    
    return dataToFilter
  }, [data, filters, searchQuery])

  const processedData = useMemo(() => {
    if (!groupBy) return { ungrouped: filteredData }
    
    const grouped = groupDataBy(filteredData, groupBy)
    return sortGroupedData(grouped, sortBy || undefined)
  }, [filteredData, groupBy, sortBy])

  const getRowColorClasses = (record: DataRecord) => {
    switch (colorMode) {
      case 'status':
        return getRowColorClass(record.status)
      case 'priority':
        return getPriorityColorClass(record.priority)
      case 'custom':
        if (colorByCondition && colorRules.length > 0) {
          const matchingRule = colorRules.find(rule => {
            const recordValue = record[rule.field as keyof DataRecord]
            switch (rule.condition) {
              case 'equals':
                return recordValue === rule.value
              case 'contains':
                return String(recordValue).toLowerCase().includes(String(rule.value).toLowerCase())
              case 'not_equals':
                return recordValue !== rule.value
              default:
                return false
            }
          })
          
          if (matchingRule) {
            return 'border-l-4'
          }
        }
        return ''
      default:
        return ''
    }
  }

  // Get row background color based on record
  const getRowBackgroundColor = (record: DataRecord) => {
    // Load saved color settings (only on client side)
    const savedSettings = typeof window !== 'undefined' ? localStorage.getItem('playuno-color-settings') : null
    const colorSettings = savedSettings ? JSON.parse(savedSettings) : {
      statusColors: {
        'In Progress': '#E0F2FE',
        'Approved': '#DCFCE7', 
        'Pending': '#FEF3C7',
        'Rejected': '#FEE2E2'
      },
      priorityColors: {
        'High': '#FEE2E2',
        'Medium': '#FEF3C7',
        'Low': '#DCFCE7'
      }
    }

    switch (colorMode) {
      case 'status':
        return colorSettings.statusColors[record.status] || 'white'
      case 'priority':
        return colorSettings.priorityColors[record.priority] || 'white'
      case 'custom':
        if (colorByCondition && colorRules.length > 0) {
          const matchingRule = colorRules.find(rule => {
            const recordValue = record[rule.field as keyof DataRecord]
            switch (rule.condition) {
              case 'equals':
                return recordValue === rule.value
              case 'contains':
                return String(recordValue).toLowerCase().includes(String(rule.value).toLowerCase())
              case 'not_equals':
                return recordValue !== rule.value
              default:
                return false
            }
          })
          
          if (matchingRule) {
            return matchingRule.backgroundColor || '#F3F4F6'
          }
        }
        return 'white'
      default:
        return 'white'
    }
  }

  // Get cell background color based on field and record (kept for compatibility)
  const getCellBackgroundColor = (record: DataRecord, fieldId: string) => {
    switch (colorMode) {
      case 'status':
        if (fieldId === 'status') {
          switch (record.status) {
            case 'In Progress': return '#E0F2FE' // Light blue
            case 'Approved': return '#DCFCE7'   // Light green
            case 'Pending': return '#FEF3C7'    // Light yellow
            case 'Rejected': return '#FEE2E2'   // Light red
            default: return 'white'
          }
        }
        return 'white'
      case 'priority':
        if (fieldId === 'priority') {
          switch (record.priority) {
            case 'High': return '#FEE2E2'     // Light red
            case 'Medium': return '#FEF3C7'   // Light yellow
            case 'Low': return '#DCFCE7'      // Light green
            default: return 'white'
          }
        }
        return 'white'
      case 'custom':
        if (colorByCondition && colorRules.length > 0) {
          const matchingRule = colorRules.find(rule => {
            const recordValue = record[rule.field as keyof DataRecord]
            switch (rule.condition) {
              case 'equals':
                return recordValue === rule.value
              case 'contains':
                return String(recordValue).toLowerCase().includes(String(rule.value).toLowerCase())
              case 'not_equals':
                return recordValue !== rule.value
              default:
                return false
            }
          })
          
          if (matchingRule && matchingRule.field === fieldId) {
            return matchingRule.backgroundColor || '#F3F4F6'
          }
        }
        return 'white'
      default:
        return 'white'
    }
  }

  const getCustomRowStyle = (record: DataRecord) => {
    if (colorMode === 'custom' && colorByCondition && colorRules.length > 0) {
      const matchingRule = colorRules.find(rule => {
        const recordValue = record[rule.field as keyof DataRecord]
        switch (rule.condition) {
          case 'equals':
            return recordValue === rule.value
          case 'contains':
            return String(recordValue).toLowerCase().includes(String(rule.value).toLowerCase())
          case 'not_equals':
            return recordValue !== rule.value
          default:
            return false
        }
      })
      
      if (matchingRule) {
        return {
          backgroundColor: matchingRule.backgroundColor,
          borderLeftColor: matchingRule.color
        }
      }
    }
    return {}
  }

  // Cell editing functions
  const handleCellClick = (rowId: string, field: string, currentValue: any) => {
    setEditingCell({ rowId, field })
    setEditValue(String(currentValue))
  }

  const handleCellEdit = (rowId: string, field: string, newValue: string) => {
    setData(prevData => 
      prevData.map(record => 
        record.id === rowId 
          ? { ...record, [field]: newValue }
          : record
      )
    )
    setEditingCell(null)
    setEditValue('')
  }

  const handleEditKeyDown = (e: React.KeyboardEvent, rowId: string, field: string) => {
    if (e.key === 'Enter') {
      handleCellEdit(rowId, field, editValue)
    } else if (e.key === 'Escape') {
      setEditingCell(null)
      setEditValue('')
    }
  }

  // Add new record (row)
  const addRecord = (customRecord?: Partial<DataRecord>) => {
    const newRecord: DataRecord = {
      id: `new-${Date.now()}`,
      name: customRecord?.name || 'New Project',
      status: customRecord?.status || 'Pending',
      priority: customRecord?.priority || 'Medium',
      assignee: customRecord?.assignee || 'Unassigned',
      dueDate: customRecord?.dueDate || new Date(),
      category: customRecord?.category || 'General',
      progress: customRecord?.progress || 0
    }
    setData(prevData => [...prevData, newRecord])
  }

  // Delete record (row)
  const deleteRecord = (recordId: string) => {
    setData(prevData => prevData.filter(record => record.id !== recordId))
    // Also call external function if provided
    if (externalDeleteRecord) {
      externalDeleteRecord(recordId)
    }
  }

  // Connect external functions to internal functions
  React.useEffect(() => {
    // Override the filterState functions to use our internal functions
    filterState.addRecord = addRecord
    filterState.deleteRecord = deleteRecord
  }, [addRecord, deleteRecord])

  // Add new column (field)
  const addColumn = () => {
    const newFieldId = `custom_field_${Date.now()}`
    const newFieldLabel = `Custom Field ${fields.length + 1}`
    
    // Add the new field to data records
    setData(prevData => prevData.map(record => ({
      ...record,
      [newFieldId]: ''
    })))
    
    // Note: In a real app, you'd also update the fields configuration
    // For now, we'll show a message that this would add a custom field
    alert(`New field "${newFieldLabel}" would be added. In a full implementation, this would update the schema.`)
  }

  const fields = [
    { id: 'name', label: 'Project Name', minWidth: 'min-w-[300px]' },
    { id: 'status', label: 'Status', minWidth: 'min-w-[120px]' },
    { id: 'priority', label: 'Priority', minWidth: 'min-w-[100px]' },
    { id: 'assignee', label: 'Assignee', minWidth: 'min-w-[150px]' },
    { id: 'dueDate', label: 'Due Date', minWidth: 'min-w-[120px]' },
    { id: 'category', label: 'Category', minWidth: 'min-w-[120px]' },
    { id: 'progress', label: 'Progress', minWidth: 'min-w-[100px]' },
  ].filter(field => !hiddenFields.includes(field.id))

  const handleHeaderClick = (fieldId: string) => {
    if (sortBy?.field === fieldId) {
      setSortBy({
        field: fieldId,
        direction: sortBy.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setSortBy({ field: fieldId, direction: 'asc' })
    }
  }

  const toggleGroupCollapse = (groupName: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev)
      if (newSet.has(groupName)) {
        newSet.delete(groupName)
      } else {
        newSet.add(groupName)
      }
      return newSet
    })
  }

  const renderTableHeader = () => (
    <thead>
      <tr className="border-b border-gray-200">
        {fields.map(field => (
          <th 
            key={field.id}
            className={cn(
              "grid-header text-left cursor-pointer hover:bg-gray-100 transition-colors group",
              field.minWidth
            )}
            onClick={() => handleHeaderClick(field.id)}
          >
            <div className="flex items-center justify-between">
              <span>{field.label}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <FilterIcon className="h-3 w-3 text-gray-400" />
                {sortBy?.field === field.id && (
                  sortBy.direction === 'asc' 
                    ? <ChevronUp className="h-3 w-3 text-primary" />
                    : <ChevronDown className="h-3 w-3 text-primary" />
                )}
              </div>
            </div>
          </th>
        ))}
        <th className="grid-header text-center w-16">
          <span className="text-xs text-gray-500">Actions</span>
        </th>
      </tr>
    </thead>
  )

  return (
    <div className="bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          {renderTableHeader()}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  {searchQuery || filters.length > 0 ? 'No records match your filters' : 'No records found'}
                </td>
              </tr>
            ) : (
              filteredData.map((record, index) => (
              <tr 
                key={record.id} 
                className={cn(
                  'border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                  getRowColorClasses(record)
                )}
                style={{ 
                  backgroundColor: getRowBackgroundColor(record),
                  ...getCustomRowStyle(record)
                }}
              >
                <td 
                  className="grid-cell font-medium text-gray-900 cursor-text"
                  onClick={() => handleCellClick(record.id, 'name', record.name)}
                >
                  {editingCell?.rowId === record.id && editingCell?.field === 'name' ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleCellEdit(record.id, 'name', editValue)}
                      onKeyDown={(e) => handleEditKeyDown(e, record.id, 'name')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    record.name
                  )}
                </td>
                <td 
                  className="grid-cell cursor-text"
                  onClick={() => handleCellClick(record.id, 'status', record.status)}
                >
                  {editingCell?.rowId === record.id && editingCell?.field === 'status' ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleCellEdit(record.id, 'status', editValue)}
                      onKeyDown={(e) => handleEditKeyDown(e, record.id, 'status')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    <Badge variant="status" className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  )}
                </td>
                <td 
                  className="grid-cell cursor-text"
                  onClick={() => handleCellClick(record.id, 'priority', record.priority)}
                >
                  {editingCell?.rowId === record.id && editingCell?.field === 'priority' ? (
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleCellEdit(record.id, 'priority', editValue)}
                      onKeyDown={(e) => handleEditKeyDown(e, record.id, 'priority')}
                      className="w-full bg-transparent border-none outline-none"
                      autoFocus
                    />
                  ) : (
                    <Badge variant="priority" className={getPriorityColor(record.priority)}>
                      {record.priority}
                    </Badge>
                  )}
                </td>
                <td className="grid-cell">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-primary-600" />
                    </div>
                    <span className="text-gray-700">{record.assignee}</span>
                  </div>
                </td>
                <td className="grid-cell">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(record.dueDate)}</span>
                  </div>
                </td>
                <td className="grid-cell">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Tag className="h-4 w-4" />
                    <span>{record.category}</span>
                  </div>
                </td>
                <td className="grid-cell">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${record.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 min-w-[3rem]">
                      {record.progress}%
                    </span>
                  </div>
                </td>
                <td className="grid-cell text-center">
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="p-1 hover:bg-red-100 rounded transition-colors group"
                    title="Delete record"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
        
        {/* Add Record Button & Save Controls */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => addRecord()}
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-accent hover:text-primary-700 rounded-component transition-colors duration-200 font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Record
            </button>
            
            {/* Save Status & Manual Save */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  saveStatus === 'saved' ? 'bg-green-500' : 
                  saveStatus === 'saving' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} />
                <span className="text-gray-600">
                  {saveStatus === 'saved' ? 'All changes saved' : 
                   saveStatus === 'saving' ? 'Saving...' : 
                   'Unsaved changes'}
                </span>
              </div>
              
              <button
                onClick={manualSave}
                disabled={saveStatus === 'saving'}
                className="px-3 py-1 text-xs bg-primary text-white hover:bg-primary-700 disabled:bg-gray-400 rounded-component transition-colors"
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
