import { Button } from '@/components/ui/Button'
import { ChevronDown, Eye, Settings } from 'lucide-react'

export function ViewControls() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4" />
              Grid view
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button className="tab-active px-3 py-1 rounded-full text-xs font-medium transition-colors">
                All records
              </button>
              <button className="tab-inactive px-3 py-1 rounded-full text-xs font-medium transition-colors">
                Active
              </button>
              <button className="tab-inactive px-3 py-1 rounded-full text-xs font-medium transition-colors">
                Completed
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">12 records</span>
          <Button variant="icon" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
