'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TemplateModal from './TemplateModal'
import { TeamManagement } from './TeamManagement'
import { GlobalAdminPanel } from './GlobalAdminPanel'
import { TemplateGallery } from './TemplateGallery'
import { useUserRole } from '@/hooks/useUserRole'
import { 
  Database, 
  Plus, 
  Search,
  Filter,
  Grid3X3,
  Calendar,
  BarChart3,
  Users,
  Settings,
  Home,
  FileText,
  CreditCard,
  Upload,
  Download,
  Star,
  Clock,
  MoreHorizontal,
  Folder,
  Zap,
  Globe,
  Lock,
  Trash2,
  Edit3,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

// Mock data for workspaces
const mockWorkspaces = [
  {
    id: '1',
    name: 'Project Management Hub',
    description: 'Track all team projects and deadlines',
    lastModified: '2 hours ago',
    records: 156,
    collaborators: 8,
    color: 'from-blue-500 to-blue-600',
    icon: '🚀',
    isStarred: true,
    tables: ['Projects', 'Tasks', 'Team Members']
  },
  {
    id: '2',
    name: 'Customer CRM',
    description: 'Manage leads, contacts, and sales pipeline',
    lastModified: '1 day ago',
    records: 342,
    collaborators: 5,
    color: 'from-green-500 to-green-600',
    icon: '💼',
    isStarred: false,
    tables: ['Contacts', 'Deals', 'Companies']
  },
  {
    id: '3',
    name: 'Content Calendar',
    description: 'Plan and schedule social media content',
    lastModified: '3 days ago',
    records: 89,
    collaborators: 3,
    color: 'from-purple-500 to-purple-600',
    icon: '📅',
    isStarred: true,
    tables: ['Posts', 'Campaigns', 'Analytics']
  },
  {
    id: '4',
    name: 'Inventory System',
    description: 'Track products, stock levels, and orders',
    lastModified: '1 week ago',
    records: 567,
    collaborators: 12,
    color: 'from-orange-500 to-orange-600',
    icon: '📦',
    isStarred: false,
    tables: ['Products', 'Orders', 'Suppliers']
  },
  {
    id: '5',
    name: 'Event Planning',
    description: 'Organize events and manage attendees',
    lastModified: '2 weeks ago',
    records: 234,
    collaborators: 6,
    color: 'from-pink-500 to-pink-600',
    icon: '🎉',
    isStarred: false,
    tables: ['Events', 'Attendees', 'Venues']
  },
  {
    id: '6',
    name: 'HR Dashboard',
    description: 'Employee records and recruitment tracking',
    lastModified: '3 weeks ago',
    records: 178,
    collaborators: 4,
    color: 'from-teal-500 to-teal-600',
    icon: '👥',
    isStarred: true,
    tables: ['Employees', 'Candidates', 'Positions']
  }
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('workspaces')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isSuperAdmin, isAdmin, hasPermission } = useUserRole()

  const filteredWorkspaces = mockWorkspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectTemplate = (template: any) => {
    // Create new workspace from template
    console.log('Creating workspace from template:', template)
    // Redirect to specific template workspace
    if (template.id) {
      window.location.href = `/workspace/template/${template.id}`
    } else {
      window.location.href = '/workspace'
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated')
    window.location.href = '/'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">PlayUnoData</span>
              </button>
              
              <div className="hidden md:flex items-center space-x-1 ml-8">
                <button
                  onClick={() => setActiveTab('workspaces')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'workspaces' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-4 w-4 inline mr-2" />
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'templates' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  Templates
                </button>
                {isAdmin && (
                  <button
                    onClick={() => setActiveTab('team')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'team' 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Team
                  </button>
                )}
                {isSuperAdmin && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Global Admin
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workspaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">TC</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">TC</p>
                      <p className="text-xs text-gray-500">trishcaisip_playunodata.com</p>
                    </div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </button>
                    
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        {activeTab === 'workspaces' && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, TC! 👋
              </h1>
              <p className="text-gray-600">
                You have {mockWorkspaces.length} workspaces with {mockWorkspaces.reduce((sum, w) => sum + w.records, 0)} total records
              </p>
            </motion.div>
          </div>
        )}

        {/* Workspaces Content */}
        {activeTab === 'workspaces' && (
          <>
            {/* Quick Actions */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
          <motion.button 
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsTemplateModalOpen(true)}
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">New Workspace</span>
          </motion.button>
          
          <motion.button 
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 text-gray-700 hover:text-gray-900"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="h-5 w-5" />
            <span className="font-medium">Import Data</span>
          </motion.button>
          
          <motion.button 
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 text-gray-700 hover:text-gray-900"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsTemplateModalOpen(true)}
          >
            <FileText className="h-5 w-5" />
            <span className="font-medium">Browse Templates</span>
          </motion.button>
          
          <motion.button 
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 text-gray-700 hover:text-gray-900"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="h-5 w-5" />
            <span className="font-medium">Automations</span>
          </motion.button>
        </motion.div>

        {/* Workspaces Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Workspaces</h2>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-500">{filteredWorkspaces.length} workspaces</span>
            </div>
          </div>

          {/* Workspace Grid */}
          <motion.div 
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredWorkspaces.map((workspace, index) => (
              <motion.div
                key={workspace.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => window.location.href = '/workspace'}
              >
                {/* Card Header */}
                <div className={`h-2 bg-gradient-to-r ${workspace.color}`} />
                
                <div className="p-6">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{workspace.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                          {workspace.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {workspace.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button 
                        className={`p-1 rounded transition-colors ${
                          workspace.isStarred 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-300 hover:text-yellow-500'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Star className="h-4 w-4" fill={workspace.isStarred ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        className="p-1 text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Tables Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {workspace.tables.map((table, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {table}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>{workspace.records} records</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{workspace.collaborators}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{workspace.lastModified}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Created new record in Project Management Hub', time: '2 hours ago', icon: Plus, color: 'text-green-600' },
              { action: 'Updated Customer CRM database', time: '1 day ago', icon: Edit3, color: 'text-blue-600' },
              { action: 'Shared Content Calendar with team', time: '3 days ago', icon: Users, color: 'text-purple-600' },
              { action: 'Imported data to Inventory System', time: '1 week ago', icon: Upload, color: 'text-orange-600' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 py-2">
                <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
            </motion.div>
          </>
        )}

        {/* Team Management Content */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TeamManagement />
          </motion.div>
        )}

        {/* Templates Content */}
        {activeTab === 'templates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TemplateGallery />
          </motion.div>
        )}

        {/* Global Admin Panel Content */}
        {activeTab === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlobalAdminPanel />
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => setIsTemplateModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {/* Template Selection Modal */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  )
}
