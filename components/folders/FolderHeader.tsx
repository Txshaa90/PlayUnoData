import { ChevronRight, Download, Plus, Upload } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FolderHeaderProps {
  title: string
  breadcrumb?: string[]
  onNewSubfolder?: () => void
  onNewSheet?: () => void
  onImport?: () => void
  onExport?: () => void
}

export function FolderHeader({
  title,
  breadcrumb = ['Home', title],
  onNewSubfolder,
  onNewSheet,
  onImport,
  onExport,
}: FolderHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center text-sm text-gray-500">
          {breadcrumb.map((crumb, idx) => (
            <div key={idx} className="flex items-center">
              <span>{crumb}</span>
              {idx < breadcrumb.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-1" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onImport}
          aria-label="Import"
          title="Import"
        >
          <Upload className="w-4 h-4 mr-2" aria-hidden="true" /> Import
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          aria-label="Export"
          title="Export"
        >
          <Download className="w-4 h-4 mr-2" aria-hidden="true" /> Export
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onNewSubfolder}
          aria-label="Create new subfolder"
          title="Create new subfolder"
        >
          <Plus className="w-4 h-4 mr-2" aria-hidden="true" /> New Subfolder
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onNewSheet}
          aria-label="Create new sheet"
          title="Create new sheet"
        >
          <Plus className="w-4 h-4 mr-2" aria-hidden="true" /> New Sheet
        </Button>
      </div>
    </div>
  )
}
