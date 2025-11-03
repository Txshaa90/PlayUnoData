'use client'

import React, { useState, useCallback } from 'react'
import Papa from 'papaparse'
import { Button } from '@/components/ui/Button'
import { 
  Upload, 
  Plus, 
  Trash2, 
  Download,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface TableData {
  [key: string]: string | number | Date
}

interface ImportTableProps {
  onImportComplete?: (data: TableData[], headers: string[]) => void
}

export function ImportTable({ onImportComplete }: ImportTableProps) {
  const [data, setData] = useState<TableData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; header: string } | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)
    setFileName(file.name)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            setError(`CSV parsing error: ${results.errors[0].message}`)
            setIsLoading(false)
            return
          }

          const parsedData = results.data as TableData[]
          if (parsedData.length === 0) {
            setError('No data found in the CSV file')
            setIsLoading(false)
            return
          }

          const headerKeys = Object.keys(parsedData[0])
          setHeaders(headerKeys)
          setData(parsedData)
          
          // Notify parent component
          onImportComplete?.(parsedData, headerKeys)
          
          setIsLoading(false)
        } catch (err) {
          setError('Failed to parse CSV file')
          setIsLoading(false)
        }
      },
      error: (error) => {
        setError(`File reading error: ${error.message}`)
        setIsLoading(false)
      }
    })
  }, [onImportComplete])

  const addRow = useCallback(() => {
    const newRow: TableData = {}
    headers.forEach((header) => {
      newRow[header] = ''
    })
    setData(prev => [...prev, newRow])
  }, [headers])

  const addColumn = useCallback(() => {
    const newHeader = `Column ${headers.length + 1}`
    setHeaders(prev => [...prev, newHeader])
    setData(prev => prev.map(row => ({ ...row, [newHeader]: '' })))
  }, [headers])

  const deleteRow = useCallback((rowIndex: number) => {
    setData(prev => prev.filter((_, index) => index !== rowIndex))
  }, [])

  const deleteColumn = useCallback((headerToDelete: string) => {
    setHeaders(prev => prev.filter(header => header !== headerToDelete))
    setData(prev => prev.map(row => {
      const newRow = { ...row }
      delete newRow[headerToDelete]
      return newRow
    }))
  }, [])

  const handleCellClick = useCallback((rowIndex: number, header: string, currentValue: any) => {
    setEditingCell({ rowIndex, header })
    setEditValue(String(currentValue || ''))
  }, [])

  const handleCellEdit = useCallback((rowIndex: number, header: string, newValue: string) => {
    setData(prev => prev.map((row, index) => 
      index === rowIndex 
        ? { ...row, [header]: newValue }
        : row
    ))
    setEditingCell(null)
    setEditValue('')
  }, [])

  const handleEditKeyDown = useCallback((e: React.KeyboardEvent, rowIndex: number, header: string) => {
    if (e.key === 'Enter') {
      handleCellEdit(rowIndex, header, editValue)
    } else if (e.key === 'Escape') {
      setEditingCell(null)
      setEditValue('')
    }
  }, [editValue, handleCellEdit])

  const exportCSV = useCallback(() => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', fileName || 'exported_data.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [data, fileName])

  const clearTable = useCallback(() => {
    setData([])
    setHeaders([])
    setFileName('')
    setError(null)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white rounded-component border border-gray-200"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Table</h2>
        <p className="text-gray-600">Upload a CSV file to create an editable data table</p>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isLoading}
            />
            <Button
              variant="primary"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <Upload className="h-4 w-4" />
              {isLoading ? 'Processing...' : 'Choose CSV File'}
            </Button>
          </div>
          
          {fileName && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{fileName}</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          )}
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-3 bg-red-50 border border-red-200 rounded-component flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </motion.div>
        )}
      </div>

      {/* Table Controls */}
      {data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Button
              onClick={addRow}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="h-4 w-4" />
              Add Row
            </Button>
            <Button
              onClick={addColumn}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="h-4 w-4" />
              Add Column
            </Button>
            <Button
              onClick={exportCSV}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              onClick={clearTable}
              variant="secondary"
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Clear Table
            </Button>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            {data.length} rows × {headers.length} columns
          </div>
        </motion.div>
      )}

      {/* Data Table */}
      {data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border border-gray-200 rounded-component overflow-hidden"
        >
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-3 py-2 text-xs font-medium text-gray-500">#</th>
                  {headers.map((header, index) => (
                    <th key={index} className="px-3 py-2 text-xs font-medium text-gray-500 min-w-[120px]">
                      <div className="flex items-center justify-between group">
                        <span>{header}</span>
                        <button
                          onClick={() => deleteColumn(header)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                          title="Delete column"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    </th>
                  ))}
                  <th className="w-12 px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <motion.tr 
                    key={rowIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 group"
                  >
                    <td className="px-3 py-2 text-xs text-gray-400 font-mono">
                      {rowIndex + 1}
                    </td>
                    {headers.map((header) => (
                      <td 
                        key={header}
                        className="px-3 py-2 cursor-text"
                        onClick={() => handleCellClick(rowIndex, header, row[header])}
                      >
                        {editingCell?.rowIndex === rowIndex && editingCell?.header === header ? (
                          <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleCellEdit(rowIndex, header, editValue)}
                            onKeyDown={(e) => handleEditKeyDown(e, rowIndex, header)}
                            className="w-full bg-transparent border border-primary rounded px-2 py-1 text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          <span className="text-sm text-gray-900">
                            {String(row[header] || '')}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2">
                      <button
                        onClick={() => deleteRow(rowIndex)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
                        title="Delete row"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {data.length === 0 && !isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">No data imported yet</p>
          <p className="text-sm">Upload a CSV file to get started with your data table</p>
        </motion.div>
      )}
    </motion.div>
  )
}
