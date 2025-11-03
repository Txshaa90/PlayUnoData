'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import FolderView from '@/components/folders/FolderView'

export default function WorkspaceFoldersPage() {
  const router = useRouter()
  const params = useSearchParams()
  const folder = params.get('folder') || 'Returns'

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Home */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push('/dashboard')}
          aria-label="Back to Home"
          title="Back to Home"
        >
          <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" /> Back to Home
        </Button>
      </div>

      <div className="px-6 py-4">
        <FolderView title={folder} />
      </div>
    </div>
  )
}
