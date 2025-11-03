'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, X, MoreHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tab } from '@/hooks/useTabState'

interface TabNavigationProps {
  tabs: Tab[]
  activeTabId: string | null
  onTabClick: (id: string) => void
  onTabRename: (id: string, newName: string) => void
  onTabAdd: () => void
  onTabRemove: (id: string) => void
}

export function TabNavigation({
  tabs,
  activeTabId,
  onTabClick,
  onTabRename,
  onTabAdd,
  onTabRemove
}: TabNavigationProps) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Focus input when editing starts
  useEffect(() => {
    if (editingTabId && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingTabId])

  const handleDoubleClick = (tab: Tab) => {
    setEditingTabId(tab.id)
    setEditingName(tab.name)
  }

  const handleEditSubmit = () => {
    if (editingTabId && editingName.trim()) {
      onTabRename(editingTabId, editingName.trim())
    }
    setEditingTabId(null)
    setEditingName('')
  }

  const handleEditCancel = () => {
    setEditingTabId(null)
    setEditingName('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit()
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  const handleDeleteClick = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (tabs.length <= 1) return // Don't allow deleting the last tab
    
    setShowDeleteConfirm(tabId)
    
    // Auto-hide confirmation after 3 seconds
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current)
    }
    deleteTimeoutRef.current = setTimeout(() => {
      setShowDeleteConfirm(null)
    }, 3000)
  }

  const confirmDelete = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onTabRemove(tabId)
    setShowDeleteConfirm(null)
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current)
    }
  }

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteConfirm(null)
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center px-6 py-0 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-0 min-w-max">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative group">
              <motion.div
                className={`
                  relative flex items-center px-4 py-3 cursor-pointer transition-all duration-200
                  border-b-2 hover:bg-gray-50
                  ${activeTabId === tab.id 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                  }
                `}
                onClick={() => onTabClick(tab.id)}
                onDoubleClick={() => handleDoubleClick(tab)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {editingTabId === tab.id ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleEditSubmit}
                    className="bg-transparent border-none outline-none text-sm font-medium min-w-0 w-32"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter tab name"
                    title="Edit tab name"
                    aria-label="Edit tab name"
                  />
                ) : (
                  <span className="text-sm font-medium select-none">
                    {tab.name}
                  </span>
                )}

                {/* Delete button - only show on hover and if more than 1 tab */}
                {!editingTabId && tabs.length > 1 && (
                  <AnimatePresence>
                    {showDeleteConfirm === tab.id ? (
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="text-xs text-gray-600 mb-2 whitespace-nowrap">
                          Delete "{tab.name}"?
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => confirmDelete(tab.id, e)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => cancelDelete(e)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                        {/* Arrow pointing down */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
                      </motion.div>
                    ) : (
                      <button
                        onClick={(e) => handleDeleteClick(tab.id, e)}
                        className="ml-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all duration-200"
                        title="Delete tab"
                      >
                        <X className="h-3 w-3 text-gray-400 hover:text-red-500" />
                      </button>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          ))}

          {/* Add Tab Button */}
          <motion.button
            onClick={onTabAdd}
            className="flex items-center justify-center w-10 h-10 ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Add new sheet"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Scroll gradient indicators */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Tab content indicator */}
      <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {tabs.find(tab => tab.id === activeTabId)?.name || 'No sheet selected'}
          </div>
          <div className="text-xs text-gray-400">
            {tabs.length} sheet{tabs.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
