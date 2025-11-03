'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Calendar,
  Crown,
  Sparkles,
  Eye,
  ArrowRight,
  X,
  Play,
  Download,
  Rocket,
  Lock,
  Settings
} from 'lucide-react'
import { Template, TemplateCategory, TEMPLATE_CATEGORIES } from '@/types/templates'
import { MOCK_TEMPLATES } from '@/data/mockTemplates'
import { useUserRole } from '@/hooks/useUserRole'
import { TemplatePreviewModal } from './TemplatePreviewModal'
import { TemplateFullPreviewModal } from './TemplateFullPreviewModal'
import { TemplateGalleryImage } from './TemplateImage'
import { loadExternalTemplatesIndex, type ExternalTemplateIndexItem } from '@/utils/templateLoader'

interface TemplateGalleryProps {
  className?: string
}


function TemplateCard({ template, onClick, onPreview }: { template: Template; onClick: () => void; onPreview?: () => void }) {
  const { isSuperAdmin, isAdmin, isOwner } = useUserRole()
  const isAuthenticated = typeof window !== 'undefined' ? sessionStorage.getItem('isAuthenticated') === 'true' : false
  
  const handleLaunchClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (!isAuthenticated) {
      window.location.href = '/auth/login?returnUrl=' + encodeURIComponent(`/workspace/template/${template.id}`)
      return
    }
    // In a real app, this would launch the template workspace
    console.log('Launching template:', template.name)
    window.location.href = `/workspace/template/${template.id}`
  }

  const getLaunchButtonText = () => {
    if (!isAuthenticated) return 'Sign In to Launch'
    if (template.isPremium && !isSuperAdmin && !isAdmin) return 'Launch (Premium)'
    if (isSuperAdmin) return 'Launch as Admin'
    return 'Launch'
  }

  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden"
      whileHover={{ y: -2 }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <TemplateGalleryImage
          templateId={template.id}
          templateName={template.name}
          className="w-full h-full"
          onClick={onClick}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {template.isPremium && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Crown className="h-3 w-3" />
              <span>Premium</span>
            </span>
          )}
          {template.isNew && (
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>New</span>
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col space-y-2">
            <button 
              onClick={onClick}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
              <span>Preview Template</span>
            </button>
            <button 
              onClick={handleLaunchClick}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                !isAuthenticated
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : template.isPremium && !isSuperAdmin && !isAdmin
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                  : isSuperAdmin
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              <Rocket className="h-4 w-4" />
              <span>{getLaunchButtonText()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{template.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Users className="h-3 w-3" />
            <span>{template.usageCount.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                +{template.tags.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          {/* Preview Template Button */}
          {onPreview && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPreview()
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <Eye className="h-4 w-4" />
              <span>Preview Template</span>
            </button>
          )}
          
          {/* Action Buttons Row */}
          <div className="flex gap-2">
            <button
              onClick={onClick}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Settings className="h-4 w-4" />
              <span>Details</span>
            </button>
            <button
              onClick={handleLaunchClick}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                !isAuthenticated
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : template.isPremium && !isSuperAdmin && !isAdmin
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                  : isSuperAdmin
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              }`}
            >
              <Rocket className="h-4 w-4" />
              <span>{getLaunchButtonText()}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TemplateGallery({ className }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isFullPreviewModalOpen, setIsFullPreviewModalOpen] = useState(false)
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const [externalTemplates, setExternalTemplates] = useState<Template[]>([])
  const [isExternalLoading, setIsExternalLoading] = useState<boolean>(true)

  // Adapt external index items to Template type used by gallery
  const adaptExternal = (item: ExternalTemplateIndexItem): Template => ({
    id: item.id,
    name: item.name,
    description: item.description || '',
    category: (item.category as any) || 'project-management',
    thumbnail: item.preview || '/templates/templates-gallery.png',
    isPremium: false,
    isFeatured: false,
    isNew: false,
    tags: [],
    author: 'PlayUnoData',
    createdAt: new Date(),
    usageCount: 0,
    rating: 5,
    fields: [],
    previewData: []
  })

  useEffect(() => {
    let mounted = true
    setIsExternalLoading(true)
    loadExternalTemplatesIndex()
      .then((items) => {
        if (!mounted) return
        const adapted = items.map(adaptExternal)
        setExternalTemplates(adapted)
        setIsExternalLoading(false)
      })
      .catch(() => { setIsExternalLoading(false) })
    return () => { mounted = false }
  }, [])

  const allTemplates: Template[] = useMemo(
    () => [...MOCK_TEMPLATES, ...externalTemplates],
    [externalTemplates]
  )

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredTemplates = allTemplates.filter(t => t.isFeatured)
  const newTemplates = allTemplates.filter(t => t.isNew)

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsPreviewModalOpen(true)
  }

  const handleUseTemplate = (template: Template) => {
    console.log('Using template:', template.name)
    setIsPreviewModalOpen(false)
    // Redirect to template workspace
    window.location.href = `/workspace/template/${template.id}`
  }

  const handleLaunchTemplate = (template: Template) => {
    console.log('Launching template:', template.name)
    // In a real app, this would directly open the template workspace
    setIsPreviewModalOpen(false)
    // Redirect directly to the template workspace
    window.location.href = `/workspace/template/${template.id}`
  }

  const handleFullPreview = (template: Template) => {
    const templateIndex = filteredTemplates.findIndex(t => t.id === template.id)
    setCurrentPreviewIndex(templateIndex)
    setIsFullPreviewModalOpen(true)
  }

  const categories = Object.entries(TEMPLATE_CATEGORIES).filter(([key]) => 
    key !== 'featured' && key !== 'new'
  )

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Template Gallery</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Jumpstart your projects with professionally designed templates. 
          Choose from our curated collection to get up and running in minutes.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TemplateCategory | 'all')}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            aria-label="Filter templates by category"
            title="Filter templates by category"
          >
            <option value="all">All Categories</option>
            {categories.map(([key, category]) => (
              <option key={key} value={key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Templates */}
      {selectedCategory === 'all' && !searchQuery && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Templates</h2>
            <p className="text-gray-600">Most popular and recommended templates curated by our team</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => handleTemplateClick(template)}
                onPreview={() => handleFullPreview(template)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* New Templates */}
      {selectedCategory === 'all' && !searchQuery && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">New Templates</h2>
            <p className="text-gray-600">Latest additions to our template collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => handleTemplateClick(template)}
                onPreview={() => handleFullPreview(template)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* Category Templates or Search Results */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="mb-6">
          {searchQuery ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">{filteredTemplates.length} templates found</p>
            </div>
          ) : selectedCategory !== 'all' ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {TEMPLATE_CATEGORIES[selectedCategory as TemplateCategory]?.label}
              </h2>
              <p className="text-gray-600">
                {TEMPLATE_CATEGORIES[selectedCategory as TemplateCategory]?.description}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Templates</h2>
              <p className="text-gray-600">Browse our complete collection of templates</p>
            </div>
          )}
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => handleTemplateClick(template)}
                onPreview={() => handleFullPreview(template)}
              />
            ))}
          </div>
        ) : isExternalLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading templates...</h3>
            <p className="text-gray-500">Fetching external templates</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.section>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}

      {/* Full Preview Modal */}
      <TemplateFullPreviewModal
        templates={filteredTemplates}
        currentTemplateIndex={currentPreviewIndex}
        isOpen={isFullPreviewModalOpen}
        onClose={() => setIsFullPreviewModalOpen(false)}
        onTemplateChange={setCurrentPreviewIndex}
      />
    </div>
  )
}
