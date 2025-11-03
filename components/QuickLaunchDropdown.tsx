'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Rocket, Clock, Star } from 'lucide-react'

interface RecentTemplate {
  id: string
  name: string
  lastUsed: Date
  category: string
  isFavorite: boolean
}

const RECENT_TEMPLATES: RecentTemplate[] = [
  {
    id: 'template-1',
    name: 'Project Management Hub',
    lastUsed: new Date('2024-03-10'),
    category: 'Project Management',
    isFavorite: true
  },
  {
    id: 'template-2',
    name: 'Marketing Campaign Tracker',
    lastUsed: new Date('2024-03-08'),
    category: 'Marketing',
    isFavorite: false
  },
  {
    id: 'template-5',
    name: 'Sales Pipeline CRM',
    lastUsed: new Date('2024-03-05'),
    category: 'Sales & CRM',
    isFavorite: true
  }
]

export function QuickLaunchDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLaunchTemplate = (template: RecentTemplate) => {
    console.log('Quick launching:', template.name)
    window.location.href = `/workspace/template/${template.id}`
    setIsOpen(false)
  }

  const formatLastUsed = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
      >
        <Rocket className="h-4 w-4" />
        <span className="text-sm font-medium">Quick Launch</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Recently Used Templates</h3>
                <p className="text-xs text-gray-500 mt-1">Quick access to your recent workspaces</p>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {RECENT_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {template.name}
                        </h4>
                        {template.isFavorite && (
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{template.category}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{formatLastUsed(template.lastUsed)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleLaunchTemplate(template)}
                      className="opacity-0 group-hover:opacity-100 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1"
                    >
                      <Rocket className="h-3 w-3" />
                      <span>Launch</span>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => {
                    window.location.href = '/templates'
                    setIsOpen(false)
                  }}
                  className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Browse All Templates →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
