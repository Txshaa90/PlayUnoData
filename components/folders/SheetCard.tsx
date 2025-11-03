"use client"

import { FileSpreadsheet, Trash2 } from 'lucide-react'

interface SheetCardProps {
  name: string
  onOpen?: () => void
  onDelete?: () => void
}

export function SheetCard({ name, onOpen, onDelete }: SheetCardProps) {
  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-component px-3 py-2 hover:bg-gray-50 transition">
      <button
        onClick={onOpen}
        className="flex items-center gap-2 text-left"
        aria-label={`Open sheet ${name}`}
        title={`Open sheet ${name}`}
        type="button"
      >
        <FileSpreadsheet className="w-4 h-4 text-green-600" aria-hidden="true" />
        <span className="text-sm font-medium text-gray-800">{name}</span>
      </button>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          className="p-1 rounded text-red-600 hover:text-red-700 hover:bg-red-50"
          aria-label={`Delete sheet ${name}`}
          title={`Delete sheet ${name}`}
          type="button"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
