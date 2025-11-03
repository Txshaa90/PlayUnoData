'use client'

import { TemplateSheetWorkspace } from '@/components/TemplateSheetWorkspace'
import { SalesCRMTemplate } from '@/components/SalesCRMTemplate'
import { TEMPLATE_SHEETS } from '@/types/templateSheets'
import { notFound } from 'next/navigation'

interface TemplateWorkspacePageProps {
  params: {
    id: string
  }
}

export default function TemplateWorkspacePage({ params }: TemplateWorkspacePageProps) {
  // Handle Sales CRM template specifically
  if (params.id === 'sales-crm') {
    return <SalesCRMTemplate />
  }

  // Handle other templates through the existing system
  const templateConfig = TEMPLATE_SHEETS[params.id]
  
  if (!templateConfig) {
    notFound()
  }

  return (
    <TemplateSheetWorkspace 
      templateId={params.id}
      onBack={() => window.history.back()}
    />
  )
}
