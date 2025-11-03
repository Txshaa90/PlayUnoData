'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Check, 
  X,
  Calendar,
  DollarSign,
  Percent
} from 'lucide-react'
import { TemplateSheetConfig, TemplateSheetRecord, TemplateSheetField, TEMPLATE_SHEETS } from '@/types/templateSheets'
import { loadTemplateConfigById } from '@/utils/templateLoader'
import { ViewBar } from './ViewBar'
import { useFilterState } from '@/hooks/useFilterState'

interface TemplateSheetWorkspaceProps {
  templateId: string
  onBack?: () => void
}

interface EditingCell {
  recordId: string
  fieldId: string
  value: string
}

export function TemplateSheetWorkspace({ templateId, onBack }: TemplateSheetWorkspaceProps) {
  const [sheetConfig, setSheetConfig] = useState<TemplateSheetConfig | null>(null)
  const [records, setRecords] = useState<TemplateSheetRecord[]>([])
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const filterState = useFilterState()

  useEffect(() => {
    let mounted = true
    const init = async () => {
      // Try local registry first
      const local = TEMPLATE_SHEETS[templateId]
      if (local) {
        if (!mounted) return
        setSheetConfig(local)
        setRecords(local.records)
        // Apply prebuilt features (optional)
        if (local.prebuiltFeatures?.defaultGroupBy) {
          filterState.setGroupBy(local.prebuiltFeatures.defaultGroupBy)
        }
        if (local.prebuiltFeatures?.defaultFilters) {
          filterState.setFilters(local.prebuiltFeatures.defaultFilters)
        }
        return
      }

      // Fallback: attempt to load external JSON config
      const external = await loadTemplateConfigById(templateId)
      if (mounted && external) {
        setSheetConfig(external)
        setRecords(external.records || [])
        if (external.prebuiltFeatures?.defaultGroupBy) {
          filterState.setGroupBy(external.prebuiltFeatures.defaultGroupBy)
        }
        if (external.prebuiltFeatures?.defaultFilters) {
          filterState.setFilters(external.prebuiltFeatures.defaultFilters)
        }
      }
    }
    init()
    return () => { mounted = false }
  }, [templateId])

  if (!sheetConfig) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
          </div>
          <p className="text-gray-500">Loading template...</p>
        </div>
      </div>
    )
  }

  const handleCellClick = (recordId: string, fieldId: string, currentValue: any) => {
    setEditingCell({
      recordId,
      fieldId,
      value: String(currentValue || '')
    })
  }

  const handleCellSave = () => {
    if (!editingCell) return

    setRecords(prev => prev.map(record => 
      record.id === editingCell.recordId
        ? { ...record, [editingCell.fieldId]: editingCell.value }
        : record
    ))
    setEditingCell(null)
  }

  const handleCellCancel = () => {
    setEditingCell(null)
  }

  const addNewRecord = () => {
    const newRecord: TemplateSheetRecord = {
      id: `record-${Date.now()}`,
      ...sheetConfig.fields.reduce((acc, field) => {
        acc[field.id] = field.type === 'progress' ? 0 : ''
        return acc
      }, {} as any)
    }
    
    setRecords(prev => [...prev, newRecord])
  }

  const getCellBackgroundColor = (record: TemplateSheetRecord, field: TemplateSheetField) => {
    const colorRules = sheetConfig.prebuiltFeatures.colorRules?.find(rule => rule.field === field.id)
    if (!colorRules) return 'transparent'

    const value = record[field.id]
    const condition = colorRules.conditions.find(cond => {
      if (field.type === 'number' && typeof cond.value === 'number') {
        return Number(value) >= cond.value
      }
      return value === cond.value
    })

    return condition?.color || 'transparent'
  }

  const getCellTextColor = (record: TemplateSheetRecord, field: TemplateSheetField) => {
    const colorRules = sheetConfig.prebuiltFeatures.colorRules?.find(rule => rule.field === field.id)
    if (!colorRules) return '#374151'

    const value = record[field.id]
    const condition = colorRules.conditions.find(cond => {
      if (field.type === 'number' && typeof cond.value === 'number') {
        return Number(value) >= cond.value
      }
      return value === cond.value
    })

    return condition?.textColor || '#374151'
  }

  const renderCellContent = (record: TemplateSheetRecord, field: TemplateSheetField) => {
    const value = record[field.id]
    const isEditing = editingCell?.recordId === record.id && editingCell?.fieldId === field.id

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editingCell.value}
            onChange={(e) => setEditingCell(prev => prev ? { ...prev, value: e.target.value } : null)}
            className="flex-1 px-2 py-1 text-sm border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCellSave()
              if (e.key === 'Escape') handleCellCancel()
            }}
          />
          <button
            onClick={handleCellSave}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={handleCellCancel}
            className="p-1 text-gray-400 hover:bg-gray-100 rounded"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )
    }

    switch (field.type) {
      case 'progress':
        const progress = Number(value) || 0
        return (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 min-w-[35px]">{progress}%</span>
          </div>
        )
      
      case 'currency':
        return (
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3 text-gray-400" />
            <span>{Number(value || 0).toLocaleString()}</span>
          </div>
        )
      
      case 'date':
        return (
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span>{value ? new Date(value).toLocaleDateString() : ''}</span>
          </div>
        )
      
      case 'number':
        if (field.name === 'ROI') {
          return (
            <div className="flex items-center space-x-1">
              <span>{value}%</span>
              <Percent className="h-3 w-3 text-gray-400" />
            </div>
          )
        }
        return <span>{value}</span>
      
      default:
        return <span>{value}</span>
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Templates</span>
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{sheetConfig.name}</h1>
              <p className="text-gray-600">{sheetConfig.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ background: sheetConfig.themeColor.gradient }}
            />
            <span className="text-sm text-gray-500">Template Sheet</span>
          </div>
        </div>
      </div>

      {/* ViewBar */}
      <ViewBar 
        filterState={filterState}
        className="border-b border-gray-200"
      />

      {/* Sheet Content */}
      <div className="flex-1 overflow-auto">
        <div 
          className="min-h-full p-6"
          style={{ background: sheetConfig.themeColor.gradient }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="flex">
                <div className="w-12 p-3 border-r border-gray-200">
                  <button
                    onClick={addNewRecord}
                    className="w-6 h-6 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center transition-colors"
                    title="Add new record"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                {sheetConfig.fields.map((field) => (
                  <div
                    key={field.id}
                    className="border-r border-gray-200 p-3 font-medium text-gray-900 text-sm"
                    style={{ width: field.width || 150 }}
                  >
                    {field.name}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              <AnimatePresence>
                {records.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex hover:bg-gray-50 transition-colors ${
                      hoveredRow === record.id ? 'bg-gray-50' : ''
                    }`}
                    onMouseEnter={() => setHoveredRow(record.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <div className="w-12 p-3 border-r border-gray-200 text-center text-xs text-gray-400">
                      {index + 1}
                    </div>
                    {sheetConfig.fields.map((field) => (
                      <div
                        key={field.id}
                        className="border-r border-gray-200 p-3 text-sm cursor-pointer group relative"
                        style={{ 
                          width: field.width || 150,
                          backgroundColor: getCellBackgroundColor(record, field),
                          color: getCellTextColor(record, field)
                        }}
                        onClick={() => handleCellClick(record.id, field.id, record[field.id])}
                      >
                        {renderCellContent(record, field)}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-2 border-green-400 rounded transition-opacity pointer-events-none" />
                      </div>
                    ))}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {records.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first record to this template</p>
                <button
                  onClick={addNewRecord}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
