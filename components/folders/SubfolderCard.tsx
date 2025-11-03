"use client"

import { Folder, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SheetCard } from './SheetCard'

interface SubfolderCardProps {
  name: string
  sheets: string[]
  onOpen?: () => void
  onAddSheet?: () => void
  onOpenSheet?: (sheetName: string) => void
  onDeleteSheet?: (sheetName: string) => void
}

export function SubfolderCard({ name, sheets, onOpen, onAddSheet, onOpenSheet, onDeleteSheet }: SubfolderCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <button
          onClick={onOpen}
          className="flex items-center gap-2 text-left"
          aria-label={`Open subfolder ${name}`}
          title={`Open subfolder ${name}`}
        >
          <Folder className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <CardTitle>{name}</CardTitle>
        </button>
        <Button
          variant="icon"
          size="sm"
          onClick={onAddSheet}
          aria-label={`Add sheet to ${name}`}
          title={`Add sheet to ${name}`}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {sheets.map((sheet) => (
            <SheetCard 
              key={sheet} 
              name={sheet} 
              onOpen={() => onOpenSheet?.(sheet)}
              onDelete={() => onDeleteSheet?.(sheet)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
