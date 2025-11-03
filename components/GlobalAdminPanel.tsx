'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Users, 
  Database, 
  BarChart3, 
  Shield, 
  Globe, 
  FileText, 
  DollarSign,
  Activity,
  AlertTriangle,
  TrendingUp,
  Server,
  Eye,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react'
import { useUserRole } from '@/hooks/useUserRole'

interface GlobalAdminPanelProps {
  className?: string
}

export function GlobalAdminPanel({ className }: GlobalAdminPanelProps) {
  const { isSuperAdmin, hasPermission } = useUserRole()
  const [activeSection, setActiveSection] = useState('overview')

  if (!isSuperAdmin || !hasPermission('canManagePlatform')) {
    return (
      <div className="text-center p-8">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Super Admin Access Required</h3>
        <p className="text-gray-500">You need Super Admin privileges to access the global admin panel.</p>
      </div>
    )
  }

  const adminSections = [
    { id: 'overview', label: 'Platform Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'workspaces', label: 'All Workspaces', icon: Database },
    { id: 'templates', label: 'Template Management', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'system', label: 'System Settings', icon: Settings },
  ]

  const mockStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalWorkspaces: 3456,
    totalRecords: 125847,
    monthlyRevenue: 24500,
    systemHealth: 98.5
  }

  const mockRecentActivity = [
    { action: 'New user registration', user: 'john.doe@company.com', time: '2 minutes ago', type: 'user' },
    { action: 'Workspace created', user: 'sarah.chen@startup.io', time: '15 minutes ago', type: 'workspace' },
    { action: 'Template published', user: 'admin@playunodata.com', time: '1 hour ago', type: 'template' },
    { action: 'Payment processed', user: 'mike.johnson@corp.com', time: '2 hours ago', type: 'payment' },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Workspaces</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalWorkspaces.toLocaleString()}</p>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <Database className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${mockStats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15% from last month</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalRecords.toLocaleString()}</p>
              <p className="text-sm text-blue-600">+25% from last month</p>
            </div>
            <FileText className="h-8 w-8 text-orange-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.systemHealth}%</p>
              <p className="text-sm text-green-600">All systems operational</p>
            </div>
            <Server className="h-8 w-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.activeUsers.toLocaleString()}</p>
              <p className="text-sm text-blue-600">Currently online</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Platform Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockRecentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'workspace' ? 'bg-green-100 text-green-600' :
                  activity.type === 'template' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'user' && <Users className="h-4 w-4" />}
                  {activity.type === 'workspace' && <Database className="h-4 w-4" />}
                  {activity.type === 'template' && <FileText className="h-4 w-4" />}
                  {activity.type === 'payment' && <DollarSign className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderUserManagement = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Global User Management</h4>
          <p className="text-gray-500 mb-4">Manage all users across the platform with super admin privileges.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 border border-gray-200 rounded-lg">
              <Eye className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium">View All Users</p>
              <p className="text-xs text-gray-500">Access complete user directory</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <Edit3 className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Modify Permissions</p>
              <p className="text-xs text-gray-500">Change user roles and access</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <Shield className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Security Controls</p>
              <p className="text-xs text-gray-500">Manage security settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview()
      case 'users': return renderUserManagement()
      case 'workspaces': 
        return (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center py-12">
              <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">All Workspaces</h4>
              <p className="text-gray-500">Access and manage all workspaces across the platform.</p>
            </div>
          </div>
        )
      case 'templates':
        return (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Template Management</h4>
              <p className="text-gray-500">Create, edit, and manage platform templates.</p>
            </div>
          </div>
        )
      case 'analytics':
        return (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Platform Analytics</h4>
              <p className="text-gray-500">View detailed analytics and usage statistics.</p>
            </div>
          </div>
        )
      case 'system':
        return (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center py-12">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">System Settings</h4>
              <p className="text-gray-500">Configure platform-wide settings and preferences.</p>
            </div>
          </div>
        )
      default: return renderOverview()
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Globe className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Admin Panel</h1>
          <p className="text-gray-600">Super Admin platform management dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {adminSections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{section.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}
