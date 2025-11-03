"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FolderHeader } from '@/components/folders/FolderHeader'
import { SubfolderCard } from '@/components/folders/SubfolderCard'

interface FolderViewProps {
  title: string
}

export default function FolderView({ title }: FolderViewProps) {
  const router = useRouter()
  const [folders, setFolders] = useState<Array<{ name: string; sheets: string[] }>>([
    { name: 'Amazon', sheets: ['ALS', 'SOT', 'Global'] },
    { name: 'Shopify', sheets: ['ALS', 'FRX'] },
  ])

  const handleNewSubfolder = () => {
    // Placeholder: later, show modal to name a folder
    setFolders((prev) => [...prev, { name: `Folder ${prev.length + 1}`, sheets: [] }])
  }

  const handleNewSheet = () => {
    // Placeholder: attach to selected folder; for demo, add to first
    setFolders((prev) => prev.map((f, i) => (i === 0 ? { ...f, sheets: [...f.sheets, `Sheet ${f.sheets.length + 1}`] } : f)))
  }

  const handleImport = () => {
    // Placeholder for import action
    console.log('Import clicked')
  }

  const handleExport = () => {
    // Placeholder for export action
    console.log('Export clicked')
  }

  const handleDeleteSheet = (folderName: string, sheetName: string) => {
    if (!window.confirm(`Delete sheet "${sheetName}" from ${folderName}?`)) return
    setFolders(prev => prev.map(f => (
      f.name === folderName ? { ...f, sheets: f.sheets.filter(s => s !== sheetName) } : f
    )))
  }

  const openSubfolder = (name: string) => {
    // Navigate into subfolder within the folders section only
    const params = new URLSearchParams(window.location.search)
    params.set('folder', name)
    router.push(`/workspace/folders?${params.toString()}`)
  }

  const openSheet = (sheetName: string) => {
    // Placeholder: later map to real template or sheet ID
    console.log('Open sheet:', sheetName)
  }

  return (
    <div className="space-y-6">
      <FolderHeader
        title={title}
        breadcrumb={["Home", title]}
        onNewSubfolder={handleNewSubfolder}
        onNewSheet={handleNewSheet}
        onImport={handleImport}
        onExport={handleExport}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <SubfolderCard
            key={folder.name}
            name={folder.name}
            sheets={folder.sheets}
            onOpen={() => openSubfolder(folder.name)}
            onAddSheet={handleNewSheet}
            onOpenSheet={openSheet}
            onDeleteSheet={(sheet) => handleDeleteSheet(folder.name, sheet)}
          />
        ))}
      </div>
    </div>
  )
}
