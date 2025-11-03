'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Search, 
  Filter,
  Star,
  Users,
  FileText,
  ArrowRight,
  Check,
  Zap,
  Building,
  Calendar,
  ShoppingCart,
  Briefcase,
  Heart,
  Target,
  Megaphone,
  BookOpen,
  TrendingUp
} from 'lucide-react'

interface TemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: any) => void
}

const templateCategories = [
  { id: 'all', name: 'All Templates', count: 24 },
  { id: 'project', name: 'Project Management', count: 6 },
  { id: 'crm', name: 'CRM & Sales', count: 4 },
  { id: 'marketing', name: 'Marketing', count: 5 },
  { id: 'hr', name: 'HR & Recruiting', count: 3 },
  { id: 'finance', name: 'Finance & Accounting', count: 3 },
  { id: 'operations', name: 'Operations', count: 3 }
]

const templates = [
  {
    id: '1',
    name: 'Project Management Hub',
    description: 'Track tasks, deadlines, and team progress with Kanban boards and Gantt charts',
    category: 'project',
    icon: '🚀',
    color: 'from-blue-500 to-blue-600',
    isPremium: false,
    rating: 4.8,
    users: '12.5k',
    tables: ['Projects', 'Tasks', 'Team Members', 'Milestones'],
    features: ['Kanban View', 'Timeline', 'Team Collaboration', 'Progress Tracking']
  },
  {
    id: '2',
    name: 'CRM & Sales Pipeline',
    description: 'Manage leads, contacts, deals, and sales performance in one place',
    category: 'crm',
    icon: '💼',
    color: 'from-green-500 to-green-600',
    isPremium: true,
    rating: 4.9,
    users: '8.2k',
    tables: ['Contacts', 'Companies', 'Deals', 'Activities'],
    features: ['Sales Pipeline', 'Lead Scoring', 'Email Integration', 'Reports']
  },
  {
    id: '3',
    name: 'Content Calendar Pro',
    description: 'Complete content management system with advanced analytics dashboard, pipeline tracking, task management, and performance insights',
    category: 'marketing',
    icon: '📊',
    color: 'from-green-500 to-blue-600',
    isPremium: true,
    rating: 4.9,
    users: '1.8k',
    tables: ['Content Pipeline', 'Tasks', 'Promotions & Performance', 'Ideas & Playbooks'],
    features: ['Multi-sheet Workflow', 'Task Management', 'Performance Analytics', 'Content Planning']
  },
  {
    id: '4',
    name: 'Event Planning',
    description: 'Organize events, manage attendees, vendors, and budgets seamlessly',
    category: 'operations',
    icon: '🎉',
    color: 'from-pink-500 to-pink-600',
    isPremium: false,
    rating: 4.6,
    users: '5.7k',
    tables: ['Events', 'Attendees', 'Vendors', 'Budget'],
    features: ['RSVP Tracking', 'Vendor Management', 'Budget Planning', 'Timeline']
  },
  {
    id: '5',
    name: 'Inventory Management',
    description: 'Track products, stock levels, suppliers, and orders efficiently',
    category: 'operations',
    icon: '📦',
    color: 'from-orange-500 to-orange-600',
    isPremium: true,
    rating: 4.8,
    users: '9.1k',
    tables: ['Products', 'Inventory', 'Suppliers', 'Orders'],
    features: ['Stock Alerts', 'Supplier Portal', 'Order Tracking', 'Reports']
  },
  {
    id: '6',
    name: 'HR & Recruiting',
    description: 'Streamline hiring process, manage candidates, and track employee data',
    category: 'hr',
    icon: '👥',
    color: 'from-teal-500 to-teal-600',
    isPremium: true,
    rating: 4.7,
    users: '6.4k',
    tables: ['Candidates', 'Employees', 'Positions', 'Interviews'],
    features: ['Applicant Tracking', 'Interview Scheduling', 'Onboarding', 'Performance']
  },
  {
    id: 'blank',
    name: 'Blank Template',
    description: 'Start from scratch with a flexible template. Perfect for importing CSV/Excel files with Project Management Hub styling.',
    category: 'project',
    icon: '📄',
    color: 'from-gray-500 to-gray-600',
    isPremium: false,
    rating: 4.8,
    users: '5.7k',
    tables: ['Data'],
    features: ['CSV/Excel Import', 'Flexible Fields', 'Custom Structure', 'PMH Styling']
  }
]

const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template)
  }

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                <p className="text-gray-600 mt-1">Start with a pre-built template or create from scratch</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex h-[calc(90vh-120px)]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-200 p-6">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                  {templateCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-400">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex">
                {/* Templates Grid */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                      <motion.div
                        key={template.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedTemplate?.id === template.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                        onClick={() => handleSelectTemplate(template)}
                        whileHover={{ y: -2 }}
                        layout
                      >
                        {/* Template Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center text-2xl`}>
                              {template.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{template.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600">{template.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-600">{template.users}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {template.isPremium && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              Premium
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>

                        {/* Tables */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {template.tables.slice(0, 3).map((table, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {table}
                              </span>
                            ))}
                            {template.tables.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{template.tables.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Template Preview */}
                {selectedTemplate && (
                  <motion.div
                    className="w-80 border-l border-gray-200 p-6 overflow-y-auto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="sticky top-0 bg-white">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${selectedTemplate.color} rounded-xl flex items-center justify-center text-3xl`}>
                          {selectedTemplate.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{selectedTemplate.name}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{selectedTemplate.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{selectedTemplate.users} users</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6">{selectedTemplate.description}</p>

                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">What's included:</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <FileText className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-gray-900">Tables</span>
                            </div>
                            <div className="space-y-1">
                              {selectedTemplate.tables.map((table: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Check className="h-3 w-3 text-green-500" />
                                  <span>{table}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Zap className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-gray-900">Features</span>
                            </div>
                            <div className="space-y-1">
                              {selectedTemplate.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Check className="h-3 w-3 text-green-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={handleUseTemplate}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Use This Template</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>

                      <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Preview Template
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TemplateModal
