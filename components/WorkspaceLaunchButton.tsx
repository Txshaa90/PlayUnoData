'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  Play, 
  Settings, 
  BarChart3, 
  Zap, 
  Puzzle, 
  Eye,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { useUserRole } from '@/hooks/useUserRole'

interface LaunchOption {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  action: () => void
  isPremium?: boolean
  adminOnly?: boolean
}

export function WorkspaceLaunchButton() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isSuperAdmin, isAdmin } = useUserRole()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const launchOptions: LaunchOption[] = [
    {
      id: 'template-preview',
      label: 'Open Template Preview',
      description: 'View the original template structure',
      icon: <Eye className="h-4 w-4" />,
      action: () => {
        console.log('Opening template preview...')
        // In real app: open template preview modal
        setIsOpen(false)
      }
    },
    {
      id: 'automations',
      label: 'Manage Automations',
      description: 'Create and run automated workflows',
      icon: <Zap className="h-4 w-4" />,
      action: () => {
        console.log('Opening automations panel...')
        // In real app: open automations sidebar
        setIsOpen(false)
      },
      isPremium: true
    },
    {
      id: 'dashboard',
      label: 'Open Dashboard',
      description: 'View charts and analytics for this base',
      icon: <BarChart3 className="h-4 w-4" />,
      action: () => {
        console.log('Opening dashboard...')
        // In real app: navigate to dashboard view
        setIsOpen(false)
      }
    },
    {
      id: 'extensions',
      label: 'Extensions & Integrations',
      description: 'Connect third-party apps and tools',
      icon: <Puzzle className="h-4 w-4" />,
      action: () => {
        console.log('Opening extensions marketplace...')
        // In real app: open extensions panel
        setIsOpen(false)
      },
      isPremium: true
    },
    {
      id: 'settings',
      label: 'Base Settings',
      description: 'Configure permissions and preferences',
      icon: <Settings className="h-4 w-4" />,
      action: () => {
        console.log('Opening base settings...')
        // In real app: open settings modal
        setIsOpen(false)
      },
      adminOnly: true
    }
  ]

  // Filter options based on user permissions
  const availableOptions = launchOptions.filter(option => {
    if (option.adminOnly && !isAdmin && !isSuperAdmin) return false
    return true
  })

  const handleOptionClick = (option: LaunchOption) => {
    if (option.isPremium && !isSuperAdmin && !isAdmin) {
      console.log('Premium feature - showing upgrade modal')
      // In real app: show premium upgrade modal
      return
    }
    option.action()
  }

  return (
    <div className="relative">
      {/* Launch Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200
          ${isOpen 
            ? 'bg-green-600 text-white shadow-lg' 
            : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-md'
          }
          hover:scale-105 active:scale-95
        `}
        title="Launch tools and automations"
      >
        <Rocket className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-12' : ''}`} />
        <span className="text-sm">Launch</span>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Rocket className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Launch Tools</h3>
                  <p className="text-xs text-gray-600">Powerful actions for your workspace</p>
                </div>
              </div>
            </div>

            {/* Options List */}
            <div className="py-2">
              {availableOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleOptionClick(option)}
                  className={`
                    w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors group
                    ${option.isPremium && !isSuperAdmin && !isAdmin ? 'opacity-60' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-2 rounded-lg transition-colors
                      ${option.isPremium && !isSuperAdmin && !isAdmin 
                        ? 'bg-gray-100 text-gray-400' 
                        : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                      }
                    `}>
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                        {option.isPremium && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center space-x-1">
                            <Sparkles className="h-2 w-2" />
                            <span>Pro</span>
                          </span>
                        )}
                        {option.adminOnly && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  More tools and integrations coming soon
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
