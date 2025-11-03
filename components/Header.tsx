'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  Plus, 
  Filter, 
  Group, 
  ArrowUpDown, 
  Share2,
  Search,
  Grid3X3,
  Calendar,
  BarChart3,
  Edit3,
  Check,
  X,
  Copy,
  Mail,
  Users
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  filterState?: {
    filters: any[]
    searchQuery: string
    setSearchQuery: (query: string) => void
    groupBy: string | null
    setGroupBy: (field: string | null) => void
    sortBy: {field: string, direction: 'asc' | 'desc'} | null
    setSortBy: (sort: {field: string, direction: 'asc' | 'desc'} | null) => void
    addFilter: (filter: any) => void
    clearFilters: () => void
  }
  activeTabName?: string
}

export function Header({ filterState, activeTabName }: HeaderProps = {}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(activeTabName || 'Project Database')
  const [tempTitle, setTempTitle] = useState(title)

  // Update title when activeTabName changes
  useEffect(() => {
    if (activeTabName) {
      setTitle(activeTabName)
      setTempTitle(activeTabName)
    }
  }, [activeTabName])
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleEditTitle = () => {
    setTempTitle(title)
    setIsEditingTitle(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSaveTitle = () => {
    setTitle(tempTitle)
    setIsEditingTitle(false)
  }

  const handleCancelEdit = () => {
    setTempTitle(title)
    setIsEditingTitle(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsShareModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const togglePanel = (panelName: string) => {
    setActivePanel(activePanel === panelName ? null : panelName)
  }

  // Close panels when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setActivePanel(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isEditingTitle ? (
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="text-xl font-semibold text-gray-900 bg-transparent border-b-2 border-green-500 focus:outline-none min-w-0"
                    placeholder="Enter sheet title"
                    title="Sheet title"
                  />
                  <button
                    onClick={handleSaveTitle}
                    className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                    title="Save title"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                    title="Cancel edit"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 group">
                  <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                  <button
                    onClick={handleEditTitle}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                    title="Edit title"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="icon" className="text-primary" title="Grid view">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="icon" title="Calendar view">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="icon" title="Chart view">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={filterState?.searchQuery || ''}
                onChange={(e) => filterState?.setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                title="Search records"
              />
            </div>
            
            <div className="relative flex space-x-2" ref={panelRef}>
              <Button 
                variant="secondary" 
                size="sm" 
                className={`bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 ${
                  activePanel === 'filter' ? 'bg-gray-100 border-green-500' : ''
                }`}
                onClick={() => togglePanel('filter')}
              >
                <Filter className="h-4 w-4" />
                Filter
                {filterState?.filters && filterState.filters.length > 0 && (
                  <span className="ml-1 bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {filterState.filters.length}
                  </span>
                )}
              </Button>
              
              <Button 
                variant="secondary" 
                size="sm" 
                className={`bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 ${
                  activePanel === 'group' ? 'bg-gray-100 border-green-500' : ''
                }`}
                onClick={() => togglePanel('group')}
              >
                <Group className="h-4 w-4" />
                Group
                {filterState?.groupBy && (
                  <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    1
                  </span>
                )}
              </Button>
              
              <Button 
                variant="secondary" 
                size="sm" 
                className={`bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 ${
                  activePanel === 'sort' ? 'bg-gray-100 border-green-500' : ''
                }`}
                onClick={() => togglePanel('sort')}
              >
                <ArrowUpDown className="h-4 w-4" />
                Sort
                {filterState?.sortBy && (
                  <span className="ml-1 bg-purple-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    1
                  </span>
                )}
              </Button>

              {/* Filter Panel */}
              {activePanel === 'filter' && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 pr-6 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-medium text-gray-900 mb-3">Filter Records</h3>
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <select className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm" title="Field to filter">
                        <option>Status</option>
                        <option>Priority</option>
                        <option>Assignee</option>
                        <option>Category</option>
                      </select>
                      <select className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm" title="Filter condition">
                        <option>is</option>
                        <option>is not</option>
                        <option>contains</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="Value" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm min-w-0"
                        title="Filter value"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <button 
                        onClick={() => filterState?.clearFilters()}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Clear all
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Add Filter
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Group Panel */}
              {activePanel === 'group' && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-medium text-gray-900 mb-3">Group By</h3>
                  <div className="space-y-2">
                    {['Status', 'Priority', 'Assignee', 'Category'].map((field) => (
                      <button
                        key={field}
                        onClick={() => {
                          filterState?.setGroupBy(field.toLowerCase())
                          setActivePanel(null)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 ${
                          filterState?.groupBy === field.toLowerCase() ? 'bg-blue-100 text-blue-700' : ''
                        }`}
                      >
                        {field}
                      </button>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <button
                        onClick={() => {
                          filterState?.setGroupBy(null)
                          setActivePanel(null)
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"
                      >
                        No grouping
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Sort Panel */}
              {activePanel === 'sort' && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {['Status', 'Priority', 'Assignee', 'Due Date', 'Progress'].map((field) => (
                      <div key={field} className="flex items-center justify-between">
                        <span className="text-sm">{field}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => {
                              filterState?.setSortBy({field: field.toLowerCase(), direction: 'asc'})
                              setActivePanel(null)
                            }}
                            className={`px-2 py-1 text-xs rounded ${
                              filterState?.sortBy?.field === field.toLowerCase() && filterState?.sortBy?.direction === 'asc'
                                ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            A→Z
                          </button>
                          <button
                            onClick={() => {
                              filterState?.setSortBy({field: field.toLowerCase(), direction: 'desc'})
                              setActivePanel(null)
                            }}
                            className={`px-2 py-1 text-xs rounded ${
                              filterState?.sortBy?.field === field.toLowerCase() && filterState?.sortBy?.direction === 'desc'
                                ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            Z→A
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <button
                        onClick={() => {
                          filterState?.setSortBy(null)
                          setActivePanel(null)
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100"
                      >
                        No sorting
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            
            <Button variant="primary" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4" />
              Add record
            </Button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShareModalOpen(false)}
          >
            <motion.div
              ref={modalRef}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Share Sheet</h2>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Invite by Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invite people by email
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    title="Email address"
                  />
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm" title="Access level">
                    <option>Viewer</option>
                    <option>Editor</option>
                    <option>Commenter</option>
                  </select>
                </div>
                <button className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Send Invite</span>
                </button>
              </div>

              {/* Shareable Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareable link
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value="https://playunodata.com/sheet/abc123"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                    title="Shareable link"
                  />
                  <button
                    onClick={() => copyToClipboard('https://playunodata.com/sheet/abc123')}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-1"
                    title="Copy link"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-sm">Copy</span>
                  </button>
                </div>
                <div className="mt-2">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" title="Link access level">
                    <option>Read Only</option>
                    <option>Can Edit</option>
                    <option>Can Comment</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
