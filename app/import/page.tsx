'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImportTable } from '@/components/ImportTable'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'
import { DataGrid } from '@/components/DataGrid'
import { ViewBar } from '@/components/ViewBar'
import { useFilterState } from '@/hooks/useFilterState'
import { ArrowLeft, Database } from 'lucide-react'
import Link from 'next/link'

interface TableData {
  [key: string]: string | number | Date
}

export default function ImportPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [importedData, setImportedData] = useState<TableData[]>([])
  const [importedHeaders, setImportedHeaders] = useState<string[]>([])
  const [showImporter, setShowImporter] = useState(true)
  const filterState = useFilterState()

  const handleImportComplete = (data: TableData[], headers: string[]) => {
    setImportedData(data)
    setImportedHeaders(headers)
    setShowImporter(false)
  }

  const handleBackToImport = () => {
    setShowImporter(true)
    setImportedData([])
    setImportedHeaders([])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-background flex"
    >
      {/* Left Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </motion.div>

      {/* Main Area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="flex-1 flex flex-col"
      >
        {/* Top Bar */}
        <TopBar />

        {/* Page Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="bg-white border-b border-gray-200 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {showImporter ? 'Import Table' : 'Imported Data'}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {showImporter 
                      ? 'Upload and manage your CSV data'
                      : `${importedData.length} rows × ${importedHeaders.length} columns`
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {!showImporter && (
              <button
                onClick={handleBackToImport}
                className="px-4 py-2 text-sm bg-primary text-white rounded-component hover:bg-primary-700 transition-colors"
              >
                Import New File
              </button>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {showImporter ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="p-6"
            >
              <ImportTable onImportComplete={handleImportComplete} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="h-full flex flex-col"
            >
              {/* View Bar */}
              <ViewBar filterState={filterState} />
              
              {/* Data Grid */}
              <div className="flex-1 overflow-auto">
                <DataGrid filterState={filterState} />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
