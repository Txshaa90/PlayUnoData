'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  ExternalLink,
  Download,
  Share2,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { Template } from '@/types/templates'
import { getTemplatePreviewImage } from '@/utils/previewImages'

interface TemplateFullPreviewModalProps {
  templates: Template[]
  currentTemplateIndex: number
  isOpen: boolean
  onClose: () => void
  onTemplateChange?: (index: number) => void
}

export function TemplateFullPreviewModal({ 
  templates, 
  currentTemplateIndex, 
  isOpen, 
  onClose,
  onTemplateChange 
}: TemplateFullPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(currentTemplateIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [viewMode, setViewMode] = useState<'image' | 'iframe'>('image')

  const currentTemplate = templates[currentIndex]

  // Update current index when prop changes
  useEffect(() => {
    setCurrentIndex(currentTemplateIndex)
  }, [currentTemplateIndex])

  // Navigation functions
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % templates.length
    setCurrentIndex(nextIndex)
    onTemplateChange?.(nextIndex)
    setImageLoaded(false)
    setImageError(false)
  }, [currentIndex, templates.length, onTemplateChange])

  const goToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + templates.length) % templates.length
    setCurrentIndex(prevIndex)
    onTemplateChange?.(prevIndex)
    setImageLoaded(false)
    setImageError(false)
  }, [currentIndex, templates.length, onTemplateChange])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'f':
        case 'F':
          setIsFullscreen(!isFullscreen)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goToPrevious, goToNext, onClose, isFullscreen])

  // Get preview image URL
  const getPreviewUrl = (template: Template) => {
    return getTemplatePreviewImage(template.id, false) // Use full-size image
  }

  // Get workspace URL for iframe mode
  const getWorkspaceUrl = (template: Template) => {
    return `${window.location.origin}/workspace?template=${template.id}`
  }

  if (!isOpen || !currentTemplate) return null

  return (
    <AnimatePresence>
      <motion.div 
        className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${
          isFullscreen ? 'p-0' : 'p-4'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Header */}
        <motion.div 
          className={`absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm text-white p-4 ${
            isFullscreen ? 'opacity-0 hover:opacity-100' : ''
          } transition-opacity duration-300`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">{currentTemplate.name}</h2>
              <span className="text-sm text-gray-300">
                {currentIndex + 1} of {templates.length}
              </span>
              {currentTemplate.isPremium && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Premium
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setViewMode('image')
                  }}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === 'image' 
                      ? 'bg-white text-black' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  Preview
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setViewMode('iframe')
                  }}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === 'iframe' 
                      ? 'bg-white text-black' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <ExternalLink className="h-4 w-4 inline mr-1" />
                  Live
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFullscreen(!isFullscreen)
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Add share functionality
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Share Template"
              >
                <Share2 className="h-5 w-5" />
              </button>

              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Close (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        {templates.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              title="Previous Template (←)"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              title="Next Template (→)"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Main Content */}
        <motion.div 
          className={`relative w-full h-full flex items-center justify-center ${
            isFullscreen ? 'p-0' : 'p-16'
          }`}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'image' ? (
            // Image Preview Mode
            <div className="relative w-full h-full flex items-center justify-center">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>Loading preview...</p>
                  </div>
                </div>
              )}

              {imageError ? (
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📋</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Preview Not Available</h3>
                  <p className="text-gray-300 mb-4">This template preview is being generated.</p>
                  <button
                    onClick={() => setViewMode('iframe')}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    View Live Preview
                  </button>
                </div>
              ) : (
                <img
                  src={getPreviewUrl(currentTemplate)}
                  alt={`${currentTemplate.name} preview`}
                  className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}
            </div>
          ) : (
            // Live Preview Mode (iframe)
            <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={getWorkspaceUrl(currentTemplate)}
                className="w-full h-full border-0"
                title={`${currentTemplate.name} live preview`}
              />
            </div>
          )}
        </motion.div>

        {/* Bottom Navigation Dots */}
        {templates.length > 1 && (
          <motion.div 
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ${
              isFullscreen ? 'opacity-0 hover:opacity-100' : ''
            } transition-opacity duration-300`}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
          >
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                  onTemplateChange?.(index)
                  setImageLoaded(false)
                  setImageError(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                title={templates[index].name}
              />
            ))}
          </motion.div>
        )}

        {/* Template Info Overlay */}
        <motion.div 
          className={`absolute bottom-16 left-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg ${
            isFullscreen ? 'opacity-0 hover:opacity-100' : ''
          } transition-opacity duration-300`}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
        >
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-300 mb-2">{currentTemplate.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <span>⭐ {currentTemplate.rating}</span>
                <span>👥 {currentTemplate.usageCount?.toLocaleString()} users</span>
                <span>📅 {currentTemplate.createdAt?.toLocaleDateString()}</span>
              </div>
              <div className="flex space-x-2">
                {currentTemplate.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/20 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
