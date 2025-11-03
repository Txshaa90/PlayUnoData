'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Star, 
  Users, 
  FolderOpen, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  X,
  Upload
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  hasAction?: boolean
  count?: number
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('home')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'import', label: 'Import Table', icon: Upload },
    { id: 'templates', label: 'Templates', icon: Star },
    { id: 'starred', label: 'Starred', icon: Star, count: 3 },
    { id: 'shared', label: 'Shared', icon: Users, count: 2 },
    { id: 'workspaces', label: 'Workspaces', icon: FolderOpen, hasAction: true, count: 5 },
  ]

  const handleCreateWorkspace = () => {
    setShowCreateModal(true)
  }

  return (
    <>
      <div className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-gray-900">PlayUnoData</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-gray-100 rounded-component transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              
              return (
                <li key={item.id}>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        setActiveItem(item.id)
                        if (item.id === 'templates') {
                          window.location.href = '/templates'
                        } else if (item.id === 'home') {
                          window.location.href = '/'
                        } else if (item.id === 'import') {
                          window.location.href = '/import'
                        }
                      }}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-component text-sm font-medium transition-all duration-200 flex-1",
                        isActive 
                          ? "bg-accent text-primary-700 border-r-2 border-primary" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive ? "text-primary" : "text-gray-400"
                      )} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.count && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {item.count}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                    
                    {item.hasAction && !collapsed && (
                      <button
                        onClick={handleCreateWorkspace}
                        className="ml-1 p-1.5 hover:bg-gray-100 rounded-component transition-colors"
                        aria-label="Create new workspace"
                      >
                        <Plus className="h-4 w-4 text-gray-400 hover:text-primary" />
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Storage: 2.1 GB / 5 GB</div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-primary h-1 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Workspace Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-component p-6 w-96 max-w-md mx-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Workspace</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workspace Name
                </label>
                <input
                  type="text"
                  placeholder="My New Workspace"
                  className="w-full px-3 py-2 border border-gray-200 rounded-component focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Describe your workspace..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-component focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-component hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle workspace creation
                    setShowCreateModal(false)
                  }}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-component hover:bg-primary-700 transition-colors"
                >
                  Create Workspace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
