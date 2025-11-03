'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  X, 
  Play, 
  CheckCircle, 
  Clock, 
  Database,
  ArrowRight,
  Eye,
  Settings,
  Sparkles,
  Calendar,
  DollarSign,
  Percent,
  Rocket
} from 'lucide-react'
import { Template } from '@/types/templates'
import { TemplateSheetConfig, TEMPLATE_SHEETS } from '@/types/templateSheets'

interface TemplatePreviewModalProps {
  template: Template
  isOpen: boolean
  onClose: () => void
}

export function TemplatePreviewModal({ template, isOpen, onClose }: TemplatePreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'sheet' | 'features'>('sheet')

  // Get the sheet configuration for this template
  const sheetConfig = TEMPLATE_SHEETS[template.id]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'sheet', label: 'Sheet Preview', icon: Database },
    { id: 'features', label: 'Features', icon: Settings }
  ]

  const renderCellPreview = (value: any, fieldType: string) => {
    switch (fieldType) {
      case 'progress':
        const progress = Number(value) || 0
        return (
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 min-w-[30px]">{progress}%</span>
          </div>
        )
      case 'currency':
        return (
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3 text-gray-400" />
            <span className="text-sm">{Number(value || 0).toLocaleString()}</span>
          </div>
        )
      case 'date':
        return (
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-sm">{value ? new Date(value).toLocaleDateString() : ''}</span>
          </div>
        )
      default:
        return <span className="text-sm">{value}</span>
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-accent rounded-component flex items-center justify-center">
              <span className="text-xl">
                {/* Template category icon */}
                📊
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{template.name}</h2>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-component transition-colors"
            aria-label="Close preview"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{sheetConfig?.fields.length || 0}</div>
                  <div className="text-sm text-gray-600">Fields</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{sheetConfig?.records.length || 0}</div>
                  <div className="text-sm text-gray-600">Sample Records</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">Ready</div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">2 min</div>
                  <div className="text-sm text-gray-600">Setup Time</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">About this template:</h3>
                <p className="text-gray-700">{template.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sheet' && sheetConfig && (
            <div className="space-y-6">
              {/* Theme Preview */}
              <div className="text-center">
                <div 
                  className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
                  style={{ background: sheetConfig.themeColor.gradient }}
                >
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{sheetConfig.name}</h3>
                    <p className="text-sm text-gray-600">{sheetConfig.description}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Template theme and styling</p>
              </div>

              {/* Sheet Preview */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200">
                  <div className="flex">
                    <div className="w-8 p-2 border-r border-gray-200 text-center text-xs text-gray-500">#</div>
                    {sheetConfig.fields.slice(0, 4).map((field) => (
                      <div
                        key={field.id}
                        className="border-r border-gray-200 p-2 font-medium text-gray-900 text-xs"
                        style={{ width: Math.min(field.width || 120, 120) }}
                      >
                        {field.name}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </div>
                    ))}
                    {sheetConfig.fields.length > 4 && (
                      <div className="p-2 text-xs text-gray-400">+{sheetConfig.fields.length - 4} more</div>
                    )}
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {sheetConfig.records.slice(0, 3).map((record, index) => (
                    <div key={record.id} className="flex hover:bg-gray-50">
                      <div className="w-8 p-2 border-r border-gray-200 text-center text-xs text-gray-400">
                        {index + 1}
                      </div>
                      {sheetConfig.fields.slice(0, 4).map((field) => (
                        <div
                          key={field.id}
                          className="border-r border-gray-200 p-2 text-xs"
                          style={{ width: Math.min(field.width || 120, 120) }}
                        >
                          {renderCellPreview(record[field.id], field.type)}
                        </div>
                      ))}
                      {sheetConfig.fields.length > 4 && (
                        <div className="p-2 text-xs text-gray-400">...</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && sheetConfig && (
            <div className="space-y-6">
              {/* Prebuilt Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Pre-configured Features:</h3>
                <div className="space-y-3">
                  {sheetConfig.prebuiltFeatures.colorRules && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Color Coding</span>
                        <p className="text-sm text-gray-600">Automatic cell colors based on values</p>
                      </div>
                    </div>
                  )}
                  {sheetConfig.prebuiltFeatures.defaultGroupBy && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Smart Grouping</span>
                        <p className="text-sm text-gray-600">Grouped by {sheetConfig.prebuiltFeatures.defaultGroupBy}</p>
                      </div>
                    </div>
                  )}
                  {sheetConfig.prebuiltFeatures.defaultSort && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Default Sorting</span>
                        <p className="text-sm text-gray-600">Sorted by {sheetConfig.prebuiltFeatures.defaultSort.field}</p>
                      </div>
                    </div>
                  )}
                  {sheetConfig.prebuiltFeatures.defaultFilters && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-900">Pre-applied Filters</span>
                        <p className="text-sm text-gray-600">Useful filters already configured</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Field Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Field Types:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {sheetConfig.fields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{field.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{field.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye className="h-4 w-4" />
            <span>Template Preview - Use Launch buttons on template cards to start</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Got it</span>
            </button>
          </div>
        </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
