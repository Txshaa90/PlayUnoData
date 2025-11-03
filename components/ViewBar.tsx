'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  Grid3X3,
  ChevronDown,
  EyeOff,
  Filter,
  Group,
  ArrowUpDown,
  Palette,
  RowsIcon,
  Share2,
  Search,
  X,
  Plus,
  MoreHorizontal,
  Trash2,
  Columns
} from 'lucide-react'
import { WorkspaceLaunchButton } from './WorkspaceLaunchButton'
import { cn } from '@/lib/utils'
import { FilterCondition, FIELD_OPTIONS, OPERATORS } from '@/lib/filtering'
import { ColorRule } from '@/hooks/useFilterState'

interface ViewBarProps {
  className?: string
  filterState: {
    filters: FilterCondition[]
    searchQuery: string
    colorMode: 'none' | 'status' | 'priority' | 'custom'
    groupBy: string | null
    hiddenFields: string[]
    sortBy: {field: string, direction: 'asc' | 'desc'} | null
    colorRules: ColorRule[]
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
    addColorRule: (rule: ColorRule) => void
    removeColorRule: (id: string) => void
    clearColorRules: () => void
    setColorByCondition: (enabled: boolean) => void
  }
}

export function ViewBar({ className, filterState }: ViewBarProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const { 
    filters, 
    searchQuery, 
    setSearchQuery, 
    colorMode, 
    setColorMode,
    groupBy,
    setGroupBy,
    toggleFieldVisibility
  } = filterState

  const togglePanel = (panelName: string) => {
    setActivePanel(activePanel === panelName ? null : panelName)
  }

  const handleColorClick = () => {
    // Instead of cycling, open the color panel
    togglePanel('color')
  }

  const actionButtons = [
    { id: 'hide', icon: EyeOff, label: 'Hide fields', hasDropdown: true },
    { id: 'filter', icon: Filter, label: 'Filter', hasDropdown: true },
    { id: 'group', icon: Group, label: 'Group', hasDropdown: true },
    { id: 'sort', icon: ArrowUpDown, label: 'Sort', hasDropdown: true },
    { id: 'color', icon: Palette, label: 'Color', hasDropdown: false },
    { id: 'addRow', icon: Plus, label: 'Add Row', hasDropdown: true },
    { id: 'addColumn', icon: Columns, label: 'Add Column', hasDropdown: true },
    { id: 'height', icon: RowsIcon, label: 'Row height', hasDropdown: false },
    { id: 'share', icon: Share2, label: 'Share', hasDropdown: false },
  ]

  return (
    <div className={cn("bg-background border-b border-gray-200 h-12", className)}>
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: View Selector */}
        <div className="flex items-center">
          <div className="relative">
            <button 
              className="view-name flex items-center gap-2 px-3 py-1 bg-white rounded-component hover:bg-gray-50 transition-colors duration-200"
              onClick={() => togglePanel('views')}
            >
              <Grid3X3 className="h-4 w-4 text-primary" />
              <span className="font-medium text-gray-900 text-sm">Grid view</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            
            {/* Views Panel */}
            {activePanel === 'views' && (
              <ViewsPanel onClose={() => setActivePanel(null)} />
            )}
          </div>
        </div>

        {/* Center: Action Toolbar */}
        <div className="flex items-center gap-1">
          {actionButtons.map((button) => {
            const Icon = button.icon
            const isActive = activePanel === button.id
            
            return (
              <div key={button.id} className="relative">
                <button
                  className={cn(
                    "toolbar-button flex items-center justify-center p-2 rounded-component transition-all duration-200",
                    "text-primary hover:bg-accent hover:text-primary-700",
                    isActive && "bg-accent border border-primary text-primary-700"
                  )}
                  onClick={() => {
                    if (button.id === 'color') {
                      handleColorClick()
                    } else if (button.id === 'group') {
                      togglePanel(button.id)
                    } else if (button.hasDropdown) {
                      togglePanel(button.id)
                    }
                  }}
                  title={button.label}
                >
                  <Icon className="h-4 w-4" />
                </button>
                
                {/* Render dropdown directly under this button */}
                {activePanel === button.id && button.id === 'filter' && (
                  <FilterPanel 
                    onClose={() => setActivePanel(null)} 
                    filterState={filterState}
                  />
                )}
                {activePanel === button.id && button.id === 'color' && (
                  <ColorPanel 
                    onClose={() => setActivePanel(null)} 
                    filterState={filterState}
                  />
                )}
                {activePanel === button.id && button.id === 'group' && (
                  <GroupPanel 
                    onClose={() => setActivePanel(null)} 
                    filterState={filterState}
                  />
                )}
                {activePanel === button.id && button.id === 'hide' && (
                  <HideFieldsPanel 
                    onClose={() => setActivePanel(null)} 
                    filterState={filterState}
                  />
                )}
                {activePanel === button.id && button.id === 'sort' && (
                  <SortPanel 
                    onClose={() => setActivePanel(null)} 
                    filterState={filterState}
                  />
                )}
                {activePanel === button.id && button.id === 'addRow' && (
                  <AddRowPanel 
                    onClose={() => setActivePanel(null)} 
                    onAddRow={(rowData) => {
                      // Call the addRecord function from filterState if available
                      if (filterState.addRecord) {
                        filterState.addRecord(rowData)
                      }
                      setActivePanel(null)
                    }}
                  />
                )}
                {activePanel === button.id && button.id === 'addColumn' && (
                  <AddColumnPanel 
                    onClose={() => setActivePanel(null)} 
                    onAddColumn={(columnData) => {
                      // This would be passed to DataGrid to add the column
                      console.log('Adding column:', columnData)
                      setActivePanel(null)
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Right: Launch Button & Search Toggle */}
        <div className="flex items-center gap-2">
          <WorkspaceLaunchButton />
        </div>
        
        {/* Search Toggle */}
        <div className="flex items-center">
          {searchExpanded ? (
            <div className="flex items-center gap-2 animate-in slide-in-from-right duration-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-1.5 border border-accent rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  setSearchExpanded(false)
                  setSearchQuery('')
                }}
                className="p-1.5 rounded-component hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchExpanded(true)}
              className="toolbar-button flex items-center justify-center p-2 rounded-component transition-all duration-200 text-primary hover:bg-accent hover:text-primary-700"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  )
}

// Filter Panel Component
function FilterPanel({ onClose, filterState }: { 
  onClose: () => void
  filterState: {
    filters: FilterCondition[]
    addFilter: (filter: FilterCondition) => void
    removeFilter: (id: string) => void
    clearFilters: () => void
  }
}) {
  const { filters, addFilter, removeFilter, clearFilters } = filterState
  const [newFilter, setNewFilter] = useState<Partial<FilterCondition>>({
    field: 'name',
    operator: 'contains',
    value: ''
  })

  const handleAddCondition = () => {
    if (newFilter.field && newFilter.operator && newFilter.value !== '' && newFilter.value !== undefined) {
      const filter: FilterCondition = {
        id: Date.now().toString(),
        field: newFilter.field,
        operator: newFilter.operator,
        value: newFilter.value
      }
      addFilter(filter)
      setNewFilter({ field: 'name', operator: 'contains', value: '' })
    }
  }

  const selectedField = FIELD_OPTIONS.find(f => f.value === newFilter.field)
  const availableOperators = selectedField ? OPERATORS[selectedField.type as keyof typeof OPERATORS] : []

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg p-4 w-96 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Filter</h3>
        <div className="flex items-center gap-2">
          {filters.length > 0 && (
            <button 
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close filter panel">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Existing Filters */}
      {filters.length > 0 && (
        <div className="space-y-2 mb-4">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
              <span className="font-medium">{FIELD_OPTIONS.find(f => f.value === filter.field)?.label}</span>
              <span className="text-gray-500">{filter.operator}</span>
              <span className="font-medium">{String(filter.value)}</span>
              <button
                onClick={() => removeFilter(filter.id)}
                className="ml-auto p-1 hover:bg-gray-200 rounded"
                aria-label="Remove filter"
              >
                <Trash2 className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Add New Filter */}
      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <select
            value={newFilter.field}
            onChange={(e) => setNewFilter(prev => ({ ...prev, field: e.target.value, operator: 'contains' }))}
            className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {FIELD_OPTIONS.map(field => (
              <option key={field.value} value={field.value}>{field.label}</option>
            ))}
          </select>
          
          <select
            value={newFilter.operator}
            onChange={(e) => setNewFilter(prev => ({ ...prev, operator: e.target.value }))}
            className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {availableOperators.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
          
          <input
            type={selectedField?.type === 'date' ? 'date' : selectedField?.type === 'number' ? 'number' : 'text'}
            value={String(newFilter.value || '')}
            onChange={(e) => setNewFilter(prev => ({ ...prev, value: e.target.value }))}
            placeholder="Value..."
            className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <button 
          onClick={handleAddCondition}
          disabled={!newFilter.value}
          className="flex items-center gap-2 text-primary hover:text-primary-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          Add condition
        </button>
      </div>
      
      {filters.length === 0 && (
        <div className="text-sm text-gray-500">
          No conditions applied to this view
        </div>
      )}
    </div>
  )
}


// Color Panel Component
function ColorPanel({ onClose, filterState }: { 
  onClose: () => void
  filterState: {
    colorMode: 'none' | 'status' | 'priority' | 'custom'
    colorRules: ColorRule[]
    colorByCondition: boolean
    setColorMode: (mode: 'none' | 'status' | 'priority' | 'custom') => void
    addColorRule: (rule: ColorRule) => void
    removeColorRule: (id: string) => void
    clearColorRules: () => void
    setColorByCondition: (enabled: boolean) => void
  }
}) {
  const { 
    colorMode, 
    colorRules, 
    colorByCondition, 
    setColorMode, 
    addColorRule, 
    removeColorRule, 
    setColorByCondition 
  } = filterState

  // Color adjustment helper functions
  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360; s /= 100; l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h * 6) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 1/6) { r = c; g = x; b = 0 }
    else if (1/6 <= h && h < 2/6) { r = x; g = c; b = 0 }
    else if (2/6 <= h && h < 3/6) { r = 0; g = c; b = x }
    else if (3/6 <= h && h < 4/6) { r = 0; g = x; b = c }
    else if (4/6 <= h && h < 5/6) { r = x; g = 0; b = c }
    else if (5/6 <= h && h < 1) { r = c; g = 0; b = x }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  const adjustColorBrightness = (hex: string, amount: number): string => {
    const [h, s, l] = hexToHsl(hex)
    const newL = Math.max(0, Math.min(100, l + (amount * 100)))
    return hslToHex(h, s, newL)
  }

  const getDefaultStatusColor = (status: string): string => {
    const defaults: Record<string, string> = {
      'In Progress': '#E0F2FE',
      'Approved': '#DCFCE7',
      'Pending': '#FEF3C7',
      'Rejected': '#FEE2E2'
    }
    return defaults[status] || '#F3F4F6'
  }

  const getDefaultPriorityColor = (priority: string): string => {
    const defaults: Record<string, string> = {
      'High': '#FEE2E2',
      'Medium': '#FEF3C7',
      'Low': '#DCFCE7'
    }
    return defaults[priority] || '#F3F4F6'
  }

  const [selectedField, setSelectedField] = useState('status')
  const [selectedCondition, setSelectedCondition] = useState('equals')
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedColor, setSelectedColor] = useState('#16A34A')
  const [customColor, setCustomColor] = useState('#16A34A')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [colorSettings, setColorSettings] = useState(() => {
    // Load saved color settings from localStorage
    const saved = localStorage.getItem('playuno-color-settings')
    return saved ? JSON.parse(saved) : {
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
  })

  const colorPresets = [
    { name: 'Green', color: '#16A34A', bg: '#D1FAE5' },
    { name: 'Blue', color: '#3B82F6', bg: '#DBEAFE' },
    { name: 'Yellow', color: '#EAB308', bg: '#FEF3C7' },
    { name: 'Red', color: '#EF4444', bg: '#FEE2E2' },
    { name: 'Purple', color: '#8B5CF6', bg: '#EDE9FE' },
    { name: 'Pink', color: '#EC4899', bg: '#FCE7F3' },
    { name: 'Orange', color: '#F97316', bg: '#FED7AA' },
    { name: 'Teal', color: '#14B8A6', bg: '#CCFBF1' },
    { name: 'Indigo', color: '#6366F1', bg: '#E0E7FF' },
    { name: 'Gray', color: '#6B7280', bg: '#F3F4F6' },
  ]

  // Save color settings to localStorage
  const saveColorSettings = () => {
    localStorage.setItem('playuno-color-settings', JSON.stringify(colorSettings))
    alert('Color settings saved successfully!')
  }

  // Update specific color in settings
  const updateColorSetting = (type: 'status' | 'priority', key: string, color: string) => {
    setColorSettings(prev => ({
      ...prev,
      [`${type}Colors`]: {
        ...prev[`${type}Colors`],
        [key]: color
      }
    }))
  }

  const handleApplyColorRule = () => {
    if (selectedField && selectedCondition && selectedValue) {
      const rule: ColorRule = {
        id: Date.now().toString(),
        field: selectedField,
        condition: selectedCondition,
        value: selectedValue,
        color: selectedColor,
        backgroundColor: colorPresets.find(p => p.color === selectedColor)?.bg || '#F3F4F6'
      }
      addColorRule(rule)
      setColorMode('custom')
      setColorByCondition(true)
      setSelectedValue('')
    }
  }

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-96 animate-in fade-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-primary">Customize Colors</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={saveColorSettings}
            className="px-3 py-1 bg-primary text-white text-xs rounded-component hover:bg-primary-700 transition-colors"
          >
            Save Colors
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close color panel">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Color Mode Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Color mode</label>
          <div className="space-y-1">
            {[
              { value: 'none', label: 'No colors' },
              { value: 'status', label: 'Color by status' },
              { value: 'priority', label: 'Color by priority' },
              { value: 'custom', label: 'Color by condition' }
            ].map(mode => (
              <label key={mode.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="colorMode"
                  value={mode.value}
                  checked={colorMode === mode.value}
                  onChange={(e) => setColorMode(e.target.value as any)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{mode.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Color Adjustments */}
        {colorMode === 'status' && (
          <div className="space-y-3 border-t pt-3">
            <label className="text-sm font-medium text-gray-700">Adjust Status Colors</label>
            <div className="space-y-3">
              {Object.entries(colorSettings.statusColors).map(([status, color]) => (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{status}</span>
                    <div 
                      className="w-6 h-6 rounded border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateColorSetting('status', status, adjustColorBrightness(color, -0.1))}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      Darker
                    </button>
                    <button
                      onClick={() => updateColorSetting('status', status, adjustColorBrightness(color, 0.1))}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      Lighter
                    </button>
                    <button
                      onClick={() => updateColorSetting('status', status, getDefaultStatusColor(status))}
                      className="px-2 py-1 text-xs bg-primary text-white hover:bg-primary-700 rounded transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priority Color Adjustments */}
        {colorMode === 'priority' && (
          <div className="space-y-3 border-t pt-3">
            <label className="text-sm font-medium text-gray-700">Adjust Priority Colors</label>
            <div className="space-y-3">
              {Object.entries(colorSettings.priorityColors).map(([priority, color]) => (
                <div key={priority} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{priority} Priority</span>
                    <div 
                      className="w-6 h-6 rounded border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateColorSetting('priority', priority, adjustColorBrightness(color, -0.1))}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      Darker
                    </button>
                    <button
                      onClick={() => updateColorSetting('priority', priority, adjustColorBrightness(color, 0.1))}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      Lighter
                    </button>
                    <button
                      onClick={() => updateColorSetting('priority', priority, getDefaultPriorityColor(priority))}
                      className="px-2 py-1 text-xs bg-primary text-white hover:bg-primary-700 rounded transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Color Presets */}
        <div className="space-y-3 border-t pt-3">
          <label className="text-sm font-medium text-gray-700">Color Presets</label>
          <div className="grid grid-cols-5 gap-2">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                className="flex flex-col items-center p-2 rounded-component hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedColor(preset.color)}
                title={preset.name}
              >
                <div 
                  className="w-6 h-6 rounded border-2 border-gray-200"
                  style={{ backgroundColor: preset.bg }}
                />
                <span className="text-xs text-gray-600 mt-1">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Rules */}
        {colorMode === 'custom' && (
          <div className="space-y-3 border-t pt-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={colorByCondition}
                onChange={(e) => setColorByCondition(e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label className="text-sm font-medium text-gray-700">Color by condition</label>
            </div>

            {colorByCondition && (
              <div className="space-y-3">
                {/* Existing Rules */}
                {colorRules.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Active Rules</label>
                    {colorRules.map(rule => (
                      <div key={rule.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: rule.backgroundColor, borderColor: rule.color }}
                        />
                        <span className="flex-1">
                          {FIELD_OPTIONS.find(f => f.value === rule.field)?.label} {rule.condition} "{rule.value}"
                        </span>
                        <button
                          onClick={() => removeColorRule(rule.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                          aria-label="Remove color rule"
                        >
                          <Trash2 className="h-3 w-3 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Rule */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Add Rule</label>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                      className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {FIELD_OPTIONS.map(field => (
                        <option key={field.value} value={field.value}>{field.label}</option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="equals">equals</option>
                      <option value="contains">contains</option>
                      <option value="not_equals">does not equal</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    placeholder="Value..."
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />

                  {/* Color Presets */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">Color</label>
                    <div className="flex gap-1 flex-wrap">
                      {colorPresets.map(preset => (
                        <button
                          key={preset.color}
                          onClick={() => setSelectedColor(preset.color)}
                          className={cn(
                            "w-8 h-8 rounded border-2 transition-all",
                            selectedColor === preset.color ? "border-gray-400 scale-110" : "border-gray-200"
                          )}
                          style={{ backgroundColor: preset.bg }}
                          title={preset.name}
                        />
                      ))}
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-8 h-8 rounded border-2 border-gray-200 cursor-pointer"
                        title="Custom color"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleApplyColorRule}
                    disabled={!selectedValue}
                    className="w-full bg-primary hover:bg-primary-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply Color Rule
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Group Panel Component
function GroupPanel({ onClose, groupBy, setGroupBy }: { 
  onClose: () => void
  groupBy: string | null
  setGroupBy: (field: string | null) => void
}) {
  const groupOptions = [
    { value: null, label: 'No grouping' },
    { value: 'status', label: 'Status' },
    { value: 'priority', label: 'Priority' },
    { value: 'assignee', label: 'Assignee' },
    { value: 'category', label: 'Category' },
  ]

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-64 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-primary">Group by field</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close group panel">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="p-3">
        {groupOptions.map((option) => (
          <button
            key={option.value || 'none'}
            className={cn(
              "flex items-center w-full p-2 text-left rounded hover:bg-gray-50 transition-colors text-sm",
              groupBy === option.value && "bg-accent text-primary-700"
            )}
            onClick={() => {
              setGroupBy(option.value)
              onClose()
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// Hide Fields Panel Component
function HideFieldsPanel({ onClose, hiddenFields, toggleFieldVisibility }: { 
  onClose: () => void
  hiddenFields: string[]
  toggleFieldVisibility: (fieldId: string) => void
}) {
  const fields = [
    { id: 'name', label: 'Project Name' },
    { id: 'status', label: 'Status' },
    { id: 'priority', label: 'Priority' },
    { id: 'assignee', label: 'Assignee' },
    { id: 'dueDate', label: 'Due Date' },
    { id: 'category', label: 'Category' },
    { id: 'progress', label: 'Progress' },
  ]

  return (
    <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-72 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-primary">Hide fields</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close hide fields panel">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="p-2 max-h-64 overflow-y-auto">
        {fields.map((field) => (
          <label
            key={field.id}
            className="flex items-center gap-3 p-2 hover:bg-accent-light rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={!hiddenFields.includes(field.id)}
              onChange={() => toggleFieldVisibility(field.id)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Views Panel Component
function ViewsPanel({ onClose }: { onClose: () => void }) {
  const views = [
    { id: 'grid', name: 'Grid view', icon: Grid3X3, active: true },
    { id: 'calendar', name: 'Calendar view', icon: Grid3X3, active: false },
    { id: 'kanban', name: 'Kanban view', icon: Grid3X3, active: false },
  ]

  return (
    <div className="absolute left-4 top-12 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-48 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-2">
        {views.map((view) => {
          const Icon = view.icon
          return (
            <button
              key={view.id}
              className={cn(
                "flex items-center gap-3 w-full p-2 text-left rounded hover:bg-gray-50 transition-colors",
                view.active && "bg-accent text-primary-700"
              )}
              onClick={onClose}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{view.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Sort Panel Component
function SortPanel({ onClose, filterState }: {
  onClose: () => void
  filterState: {
    sortBy: {field: string, direction: 'asc' | 'desc'} | null
    setSortBy: (sort: {field: string, direction: 'asc' | 'desc'} | null) => void
  }
}) {
  const { sortBy, setSortBy } = filterState
  const [searchQuery, setSearchQuery] = useState('')

  const sortOptions = [
    { value: 'name', label: 'Project Name', type: 'text' },
    { value: 'status', label: 'Status', type: 'text' },
    { value: 'priority', label: 'Priority', type: 'text' },
    { value: 'assignee', label: 'Assignee', type: 'text' },
    { value: 'dueDate', label: 'Due Date', type: 'date' },
    { value: 'category', label: 'Category', type: 'text' },
    { value: 'progress', label: 'Progress', type: 'number' },
  ]

  const filteredOptions = sortOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortBy({ field, direction })
    onClose()
  }

  const clearSort = () => {
    setSortBy(null)
    onClose()
  }

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-72 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-primary">Sort by field</h3>
        <div className="flex items-center gap-2">
          {sortBy && (
            <button 
              onClick={clearSort}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear sort
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close sort panel">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="p-3">
        {/* Search Field */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Current Sort Display */}
        {sortBy && (
          <div className="mb-3 p-2 bg-accent rounded-component">
            <div className="text-xs text-gray-600 mb-1">Currently sorted by:</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary-700">
                {sortOptions.find(opt => opt.value === sortBy.field)?.label}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {sortBy.direction === 'asc' ? '↑ A→Z' : '↓ Z→A'}
              </span>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div key={option.value} className="space-y-1">
              <button
                onClick={() => handleSort(option.value, 'asc')}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-component hover:bg-gray-50 transition-colors",
                  sortBy?.field === option.value && sortBy?.direction === 'asc' && "bg-accent text-primary-700"
                )}
              >
                <span>{option.label}</span>
                <span className="text-xs text-gray-500">↑ A→Z</span>
              </button>
              <button
                onClick={() => handleSort(option.value, 'desc')}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-component hover:bg-gray-50 transition-colors",
                  sortBy?.field === option.value && sortBy?.direction === 'desc' && "bg-accent text-primary-700"
                )}
              >
                <span>{option.label}</span>
                <span className="text-xs text-gray-500">↓ Z→A</span>
              </button>
            </div>
          ))}
        </div>

        {filteredOptions.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            No fields found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  )
}

// Add Row Panel Component
function AddRowPanel({ onClose, onAddRow }: {
  onClose: () => void
  onAddRow: (rowData: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Pending',
    priority: 'Medium',
    assignee: '',
    category: '',
    progress: 0
  })

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Please enter a project name')
      return
    }
    
    const newRow = {
      ...formData,
      id: `new-${Date.now()}`,
      dueDate: new Date(),
      progress: Number(formData.progress)
    }
    
    onAddRow(newRow)
  }

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-80 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-primary">Add New Record</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close add row panel">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter project name..."
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignee
          </label>
          <input
            type="text"
            value={formData.assignee}
            onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
            placeholder="Enter assignee name..."
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="Enter category..."
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Progress (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary-700 text-white py-2 px-4 rounded-component font-medium transition-colors text-sm"
          >
            Add Record
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// Add Column Panel Component
function AddColumnPanel({ onClose, onAddColumn }: {
  onClose: () => void
  onAddColumn: (columnData: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    defaultValue: '',
    required: false
  })

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Please enter a field name')
      return
    }
    
    const newColumn = {
      ...formData,
      id: `field_${Date.now()}`,
      label: formData.name
    }
    
    onAddColumn(newColumn)
  }

  return (
    <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-component shadow-lg w-80 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-primary">Add New Field</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded" aria-label="Close add column panel">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Field Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter field name..."
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Field Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>

        {/* Default Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Value
          </label>
          <input
            type="text"
            value={formData.defaultValue}
            onChange={(e) => setFormData(prev => ({ ...prev, defaultValue: e.target.value }))}
            placeholder="Enter default value..."
            className="w-full px-3 py-2 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Required Field */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={formData.required}
            onChange={(e) => setFormData(prev => ({ ...prev, required: e.target.checked }))}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
            Required field
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary-700 text-white py-2 px-4 rounded-component font-medium transition-colors text-sm"
          >
            Add Field
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
