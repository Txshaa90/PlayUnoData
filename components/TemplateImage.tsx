'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getTemplateImageSrc, PREVIEW_DIMENSIONS } from '@/utils/previewImages'

interface TemplateImageProps {
  templateId: string
  alt: string
  className?: string
  usePreview?: boolean
  showFallback?: boolean
  onClick?: () => void
}

export function TemplateImage({ 
  templateId, 
  alt, 
  className = '', 
  usePreview = true, 
  showFallback = true,
  onClick 
}: TemplateImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  
  const { src, fallbackIcon, hasPreview } = getTemplateImageSrc(templateId, usePreview)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  // If no preview exists or image failed to load, show fallback
  if (!hasPreview || imageError) {
    return (
      <motion.div
        className={`relative bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center ${className}`}
        style={{
          width: PREVIEW_DIMENSIONS.width,
          height: PREVIEW_DIMENSIONS.height
        }}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Fallback Icon */}
        <div className="text-center">
          <div className="text-6xl mb-2">{fallbackIcon}</div>
          <div className="text-sm text-gray-600 font-medium">Preview Coming Soon</div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg" />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Loading State */}
      {imageLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center"
          style={{
            width: PREVIEW_DIMENSIONS.width,
            height: PREVIEW_DIMENSIONS.height
          }}
        >
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading preview...</div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{
          width: PREVIEW_DIMENSIONS.width,
          height: PREVIEW_DIMENSIONS.height
        }}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200" />
      
      {/* Preview Badge */}
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700">
        Preview
      </div>
    </motion.div>
  )
}

// Specialized component for template cards
export function TemplateCardImage({ 
  templateId, 
  templateName, 
  className = '',
  onClick 
}: {
  templateId: string
  templateName: string
  className?: string
  onClick?: () => void
}) {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <TemplateImage
        templateId={templateId}
        alt={`${templateName} template preview`}
        className="rounded-lg cursor-pointer"
        onClick={onClick}
      />
    </div>
  )
}

// Component for template gallery grid
export function TemplateGalleryImage({ 
  templateId, 
  templateName,
  className = '',
  onClick 
}: {
  templateId: string
  templateName: string
  className?: string
  onClick?: () => void
}) {
  return (
    <div className={`group relative ${className}`}>
      <TemplateImage
        templateId={templateId}
        alt={`${templateName} template preview`}
        className="rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={onClick}
      />
      
      {/* Hover Overlay with Play Button */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-xl flex items-center justify-center">
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <div className="bg-white rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
