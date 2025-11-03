'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { TemplateGallery } from '@/components/TemplateGallery'

export default function TemplatesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Homepage</span>
          </button>
        </div>
      </motion.div>

      {/* Template Gallery */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <TemplateGallery />
      </motion.div>
    </motion.div>
  )
}
