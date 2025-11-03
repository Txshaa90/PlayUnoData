'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  Grid3X3, 
  List, 
  MoreHorizontal, 
  Share2, 
  Trash2, 
  Star,
  Clock,
  Users,
  Database,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  FileText,
  Zap
} from 'lucide-react'
import { templates } from '@/lib/templates'

interface Workspace {
  id: string
  name: string
  description: string
  lastOpened: string
  icon: string
  color: string
  recordCount: number
  collaborators: number
  isStarred: boolean
}

export function MainContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showUpgrade, setShowUpgrade] = useState(true)

  const workspaces: Workspace[] = [
    {
      id: '1',
      name: 'Returns Reports',
      description: 'Customer return analytics and tracking',
      lastOpened: '2 hours ago',
      icon: '📊',
      color: 'bg-blue-100',
      recordCount: 1247,
      collaborators: 3,
      isStarred: true
    },
    {
      id: '2', 
      name: 'Product Inventory',
      description: 'Stock management and product catalog',
      lastOpened: '1 day ago',
      icon: '📦',
      color: 'bg-green-100',
      recordCount: 856,
      collaborators: 5,
      isStarred: false
    },
    {
      id: '3',
      name: 'Customer Database',
      description: 'Client information and contact details',
      lastOpened: '3 days ago', 
      icon: '👥',
      color: 'bg-purple-100',
      recordCount: 2341,
      collaborators: 2,
      isStarred: true
    },
    {
      id: '4',
      name: 'Marketing Campaigns',
      description: 'Campaign performance and analytics',
      lastOpened: '1 week ago',
      icon: '📈',
      color: 'bg-orange-100',
      recordCount: 423,
      collaborators: 4,
      isStarred: false
    }
  ]

  const handleWorkspaceAction = (workspaceId: string, action: 'open' | 'share' | 'delete' | 'star') => {
    if (action === 'open') {
      // Navigate to the workspace data grid
      window.location.href = '/workspace'
    } else {
      console.log(`${action} workspace ${workspaceId}`)
      // Handle other workspace actions
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.main 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 bg-background p-6 overflow-auto"
    >
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-2xl font-semibold text-gray-900 mb-2"
          >
            Welcome to PlayUnoData
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="text-gray-600"
          >
            Manage your data, workspaces, and views seamlessly—your all-in-one data manager.
          </motion.p>
        </motion.div>

        {/* Upgrade Card */}
        {showUpgrade && (
          <div className="mb-8 bg-gradient-to-r from-primary-50 to-accent border border-primary-200 rounded-component p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-16 -mt-16" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-component flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-gray-600">
                    Unlock unlimited records and advanced integrations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Dismiss upgrade prompt"
                >
                  ×
                </button>
                <button className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-component font-medium transition-colors flex items-center gap-2">
                  Upgrade Plan
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recently Opened Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recently Opened Workspaces
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-component transition-colors",
                  viewMode === 'grid' 
                    ? "bg-accent text-primary" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-component transition-colors",
                  viewMode === 'list' 
                    ? "bg-accent text-primary" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Workspace Cards */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {workspaces.map((workspace) => (
                <WorkspaceCard 
                  key={workspace.id} 
                  workspace={workspace} 
                  onAction={handleWorkspaceAction}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {workspaces.map((workspace) => (
                <WorkspaceListItem 
                  key={workspace.id} 
                  workspace={workspace} 
                  onAction={handleWorkspaceAction}
                />
              ))}
            </div>
          )}
        </div>

        {/* Popular Templates Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Popular Templates
              </h2>
              <p className="text-sm text-gray-600">
                Get started quickly with pre-built templates
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/templates'}
              className="flex items-center gap-2 text-primary hover:text-primary-700 font-medium text-sm transition-colors"
            >
              <span>View All Templates</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.slice(0, 3).map((template) => (
              <div
                key={template.id}
                className="bg-white border border-gray-200 rounded-component p-4 hover:border-accent hover:shadow-sm transition-all duration-200 cursor-pointer group"
                onClick={() => window.location.href = '/templates'}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-accent rounded-component flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {template.estimatedSetupTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    {template.schema.tables.length} table{template.schema.tables.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white border border-gray-200 rounded-component p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-component flex items-center justify-center">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-xl font-semibold text-gray-900">4,867</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-component p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-component flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Collaborators</p>
                <p className="text-xl font-semibold text-gray-900">14</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-component p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-component flex items-center justify-center">
                <Share2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Shared Workspaces</p>
                <p className="text-xl font-semibold text-gray-900">7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}

// Workspace Card Component
function WorkspaceCard({ 
  workspace, 
  onAction 
}: { 
  workspace: Workspace
  onAction: (id: string, action: 'open' | 'share' | 'delete' | 'star') => void
}) {
  const [showActions, setShowActions] = useState(false)

  return (
    <motion.div 
      whileHover={{ 
        y: -4, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-white border border-gray-200 rounded-component p-4 hover:border-accent cursor-pointer relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => onAction(workspace.id, 'open')}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-component flex items-center justify-center text-lg", workspace.color)}>
            {workspace.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
              {workspace.name}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction(workspace.id, 'star')
            }}
            className={cn(
              "p-1 rounded transition-colors",
              workspace.isStarred 
                ? "text-yellow-500 hover:text-yellow-600" 
                : "text-gray-300 hover:text-yellow-500"
            )}
          >
            <Star className={cn("h-4 w-4", workspace.isStarred && "fill-current")} />
          </button>
          
          {showActions && (
            <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAction(workspace.id, 'share')
                }}
                className="p-1 text-gray-400 hover:text-primary rounded transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAction(workspace.id, 'delete')
                }}
                className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {workspace.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            {workspace.recordCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {workspace.collaborators}
          </span>
        </div>
      </div>

      {/* Last Opened */}
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Clock className="h-3 w-3" />
        <span>Opened {workspace.lastOpened}</span>
      </div>
    </motion.div>
  )
}

// Workspace List Item Component
function WorkspaceListItem({ 
  workspace, 
  onAction 
}: { 
  workspace: Workspace
  onAction: (id: string, action: 'open' | 'share' | 'delete' | 'star') => void
}) {
  return (
    <div 
      className="group bg-white border border-gray-200 rounded-component p-4 hover:border-accent hover:shadow-sm transition-all duration-200 cursor-pointer"
      onClick={() => onAction(workspace.id, 'open')}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={cn("w-10 h-10 rounded-component flex items-center justify-center text-lg", workspace.color)}>
            {workspace.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
              {workspace.name}
            </h3>
            <p className="text-sm text-gray-600">{workspace.description}</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              {workspace.recordCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {workspace.collaborators}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {workspace.lastOpened}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction(workspace.id, 'star')
            }}
            className={cn(
              "p-1 rounded transition-colors",
              workspace.isStarred 
                ? "text-yellow-500 hover:text-yellow-600" 
                : "text-gray-300 hover:text-yellow-500"
            )}
          >
            <Star className={cn("h-4 w-4", workspace.isStarred && "fill-current")} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction(workspace.id, 'share')
            }}
            className="p-1 text-gray-400 hover:text-primary rounded transition-colors opacity-0 group-hover:opacity-100"
          >
            <Share2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAction(workspace.id, 'delete')
            }}
            className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
