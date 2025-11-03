'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Plus, FileText, Download, Table, Import, FileSpreadsheet } from 'lucide-react'

interface BlankTemplateWorkspaceProps {
  onDataImport?: (data: any[]) => void
  onManualAdd?: () => void
}

export function BlankTemplateWorkspace({ onDataImport, onManualAdd }: BlankTemplateWorkspaceProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const fileName = file.name.toLowerCase()
    
    if (fileName.endsWith('.csv') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      // In a real app, you would parse the file here
      console.log('Processing file:', file.name)
      
      // Mock data that would come from CSV/Excel parsing
      const mockData = [
        {
          id: 1,
          'Name': 'Imported Item 1',
          'Status': 'Active',
          'Priority': 'High',
          'Date Created': '2024-01-15',
          'Category': 'Imported',
          'Notes': 'Data imported from ' + file.name
        },
        {
          id: 2,
          'Name': 'Imported Item 2',
          'Status': 'Pending',
          'Priority': 'Medium',
          'Date Created': '2024-01-16',
          'Category': 'Imported',
          'Notes': 'Successfully imported with PMH styling'
        }
      ]
      
      onDataImport?.(mockData)
    } else {
      alert('Please upload a CSV or Excel file (.csv, .xlsx, .xls)')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Table className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blank Template</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start from scratch with a flexible template that maintains the same professional design as Project Management Hub. 
          Import your CSV/Excel files or add data manually.
        </p>
      </div>

      {/* Import Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* File Upload */}
        <motion.div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Import CSV/Excel</h3>
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop your file here or click to browse
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>CSV</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>Excel</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Manual Entry */}
        <motion.div
          className="border-2 border-gray-200 rounded-xl p-8 text-center hover:border-green-400 hover:bg-green-50 transition-all duration-200 cursor-pointer"
          onClick={onManualAdd}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Manually</h3>
              <p className="text-sm text-gray-600 mb-4">
                Begin with sample data and add records manually
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Start Building
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Template Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Table, label: 'PMH Styling', desc: 'Same design as Project Management Hub' },
            { icon: Import, label: 'Easy Import', desc: 'CSV/Excel file support' },
            { icon: Plus, label: 'Flexible Fields', desc: 'Customize columns as needed' },
            { icon: Download, label: 'Export Ready', desc: 'Export data anytime' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <feature.icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 text-sm mb-1">{feature.label}</h4>
              <p className="text-xs text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
