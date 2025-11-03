'use client'

import { Header } from '@/components/Header'
import { ViewBar } from '@/components/ViewBar'
import { DataGridWithSheets } from '@/components/DataGridWithSheets'
import { TabNavigation } from '@/components/TabNavigation'
import { useFilterState } from '@/hooks/useFilterState'
import { useTabState } from '@/hooks/useTabState'
import { ArrowLeft } from 'lucide-react'

export default function WorkspacePage() {
  const filterState = useFilterState()
  const tabState = useTabState()

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Homepage Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Homepage</span>
        </button>
      </div>
      
      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabState.tabs}
        activeTabId={tabState.activeTabId}
        onTabClick={tabState.setActiveTab}
        onTabRename={tabState.renameTab}
        onTabAdd={tabState.addTab}
        onTabRemove={tabState.removeTab}
      />
      
      <Header 
        filterState={filterState} 
        activeTabName={tabState.getActiveTab()?.name}
      />
      <div className="relative">
        <ViewBar filterState={filterState} />
      </div>
      <div className="px-6 py-4">
        <DataGridWithSheets 
          activeTabName={tabState.getActiveTab()?.name || 'Project Database'}
          filterState={filterState}
        />
      </div>
    </div>
  )
}
