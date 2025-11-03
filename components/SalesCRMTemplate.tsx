'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  Kanban, 
  Calendar,
  Plus,
  MoreHorizontal,
  DollarSign,
  Phone,
  Mail,
  Building2,
  User,
  TrendingUp,
  Target,
  Users,
  PieChart,
  BarChart3,
  ChevronDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

// Airtable CRM Data Structure
const LEAD_STATUSES = {
  'new': { label: 'New', color: '#6B7280', bgColor: '#F3F4F6' },
  'contacted': { label: 'Contacted', color: '#3B82F6', bgColor: '#DBEAFE' },
  'qualified': { label: 'Qualified', color: '#10B981', bgColor: '#D1FAE5' },
  'unqualified': { label: 'Unqualified', color: '#EF4444', bgColor: '#FEE2E2' }
}

const DEAL_STAGES = {
  'qualification': { label: 'Qualification', color: '#6B7280', bgColor: '#F3F4F6' },
  'proposal': { label: 'Proposal', color: '#F59E0B', bgColor: '#FEF3C7' },
  'negotiation': { label: 'Negotiation', color: '#EF4444', bgColor: '#FEE2E2' },
  'closed-won': { label: 'Closed Won', color: '#10B981', bgColor: '#D1FAE5' },
  'closed-lost': { label: 'Closed Lost', color: '#6B7280', bgColor: '#F3F4F6' }
}

const ACCOUNT_TYPES = {
  'prospect': { label: 'Prospect', color: '#6B7280' },
  'active': { label: 'Active', color: '#10B981' },
  'inactive': { label: 'Inactive', color: '#EF4444' }
}

const ACTIVITY_TYPES = {
  'call': { label: 'Call', icon: '📞', color: '#3B82F6' },
  'email': { label: 'Email', icon: '📧', color: '#10B981' },
  'meeting': { label: 'Meeting', icon: '🤝', color: '#F59E0B' },
  'demo': { label: 'Demo', icon: '🖥️', color: '#8B5CF6' },
  'follow-up': { label: 'Follow-up', icon: '📋', color: '#6B7280' }
}

// Airtable-style relational data structure
const MOCK_ACCOUNTS = [
  {
    id: 'acc-1',
    name: 'TechCorp Inc.',
    industry: 'Technology',
    location: 'San Francisco, CA',
    status: 'active',
    tier: 'Enterprise',
    owner: 'Sarah Mitchell',
    contactCount: 3,
    lifetimeValue: 150000,
    website: 'techcorp.com'
  },
  {
    id: 'acc-2',
    name: 'Growth Marketing LLC',
    industry: 'Marketing',
    location: 'Austin, TX',
    status: 'prospect',
    tier: 'Mid-Market',
    owner: 'Mike Johnson',
    contactCount: 2,
    lifetimeValue: 25000,
    website: 'growthmarketing.com'
  },
  {
    id: 'acc-3',
    name: 'DataFlow Systems',
    industry: 'Data Analytics',
    location: 'Seattle, WA',
    status: 'active',
    tier: 'Enterprise',
    owner: 'Sarah Mitchell',
    contactCount: 4,
    lifetimeValue: 300000,
    website: 'dataflow.com'
  }
]

const MOCK_CONTACTS = [
  {
    id: 'con-1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    role: 'CTO',
    accountId: 'acc-1',
    source: 'Website',
    status: 'qualified',
    owner: 'Sarah Mitchell',
    dateAdded: '2024-09-15',
    lastContacted: '2024-11-01'
  },
  {
    id: 'con-2',
    name: 'Sarah Johnson',
    email: 'sarah@growthmarketing.com',
    phone: '+1 (555) 987-6543',
    role: 'Marketing Director',
    accountId: 'acc-2',
    source: 'Referral',
    status: 'contacted',
    owner: 'Mike Johnson',
    dateAdded: '2024-10-01',
    lastContacted: '2024-10-29'
  },
  {
    id: 'con-3',
    name: 'Mike Chen',
    email: 'mike@dataflow.com',
    phone: '+1 (555) 456-7890',
    role: 'VP Engineering',
    accountId: 'acc-3',
    source: 'LinkedIn',
    status: 'qualified',
    owner: 'Sarah Mitchell',
    dateAdded: '2024-09-20',
    lastContacted: '2024-10-28'
  }
]

const MOCK_DEALS = [
  {
    id: 'deal-1',
    name: 'Enterprise Software License',
    accountId: 'acc-1',
    contactId: 'con-1',
    stage: 'proposal',
    value: 75000,
    probability: 70,
    closeDate: '2024-12-15',
    owner: 'Sarah Mitchell',
    source: 'Website',
    nextStep: 'Schedule board presentation',
    daysInStage: 12,
    createdDate: '2024-10-15'
  },
  {
    id: 'deal-2',
    name: 'Marketing Automation Setup',
    accountId: 'acc-2',
    contactId: 'con-2',
    stage: 'negotiation',
    value: 25000,
    probability: 85,
    closeDate: '2024-11-30',
    owner: 'Mike Johnson',
    source: 'Referral',
    nextStep: 'Finalize pricing',
    daysInStage: 8,
    createdDate: '2024-10-20'
  },
  {
    id: 'deal-3',
    name: 'Cloud Migration Services',
    accountId: 'acc-3',
    contactId: 'con-3',
    stage: 'qualification',
    value: 120000,
    probability: 60,
    closeDate: '2025-01-15',
    owner: 'Sarah Mitchell',
    source: 'LinkedIn',
    nextStep: 'Technical discovery call',
    daysInStage: 5,
    createdDate: '2024-10-25'
  }
]

const MOCK_ACTIVITIES = [
  {
    id: 'act-1',
    name: 'Discovery Call',
    type: 'call',
    date: '2024-11-01',
    contactId: 'con-1',
    dealId: 'deal-1',
    status: 'completed',
    owner: 'Sarah Mitchell',
    notes: 'Discussed technical requirements and timeline'
  },
  {
    id: 'act-2',
    name: 'Proposal Follow-up',
    type: 'email',
    date: '2024-10-29',
    contactId: 'con-2',
    dealId: 'deal-2',
    status: 'completed',
    owner: 'Mike Johnson',
    notes: 'Sent revised proposal with updated pricing'
  },
  {
    id: 'act-3',
    name: 'Product Demo',
    type: 'demo',
    date: '2024-11-05',
    contactId: 'con-3',
    dealId: 'deal-3',
    status: 'planned',
    owner: 'Sarah Mitchell',
    notes: 'Scheduled technical demo for engineering team'
  }
]

const CONTACTS = [
  {
    id: '1',
    name: 'John Smith',
    company: 'TechCorp Inc.',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    role: 'CTO',
    deals: 2,
    totalValue: 95000
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Growth Marketing LLC',
    email: 'sarah@growthmarketing.com',
    phone: '+1 (555) 987-6543',
    role: 'Marketing Director',
    deals: 1,
    totalValue: 25000
  }
]

interface SalesCRMTemplateProps {
  className?: string
}

export function SalesCRMTemplate({ className = '' }: SalesCRMTemplateProps) {
  const [activeView, setActiveView] = useState<'deals' | 'leads' | 'accounts' | 'activities' | 'dashboard'>('deals')
  const [viewMode, setViewMode] = useState<'grid' | 'kanban' | 'table'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedDeal, setSelectedDeal] = useState<any>(null)

  // Helper functions for relational data
  const getAccountById = (accountId: string) => MOCK_ACCOUNTS.find(acc => acc.id === accountId)
  const getContactById = (contactId: string) => MOCK_CONTACTS.find(con => con.id === contactId)
  const getActivitiesByDeal = (dealId: string) => MOCK_ACTIVITIES.filter(act => act.dealId === dealId)
  const getDealsByAccount = (accountId: string) => MOCK_DEALS.filter(deal => deal.accountId === accountId)

  // Filter deals based on search and status
  const filteredDeals = useMemo(() => {
    return MOCK_DEALS.filter(deal => {
      const account = getAccountById(deal.accountId)
      const contact = getContactById(deal.contactId)
      
      const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           account?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contact?.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || deal.stage === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  // Calculate pipeline metrics
  const pipelineMetrics = useMemo(() => {
    const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0)
    const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)
    const avgDealSize = totalValue / filteredDeals.length || 0
    const closedWonDeals = filteredDeals.filter(deal => deal.stage === 'closed-won')
    const winRate = (closedWonDeals.length / filteredDeals.length) * 100 || 0

    return {
      totalValue,
      weightedValue,
      avgDealSize,
      winRate,
      totalDeals: filteredDeals.length,
      closedWon: closedWonDeals.length
    }
  }, [filteredDeals])

  const renderDealCard = (deal: any) => {
    const account = getAccountById(deal.accountId)
    const contact = getContactById(deal.contactId)
    const status = DEAL_STAGES[deal.stage as keyof typeof DEAL_STAGES]
    
    return (
      <motion.div
        key={deal.id}
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
        whileHover={{ y: -2 }}
        onClick={() => setSelectedDeal(deal)}
      >
        {/* Deal Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{deal.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Building2 className="h-4 w-4 mr-1" />
              {account?.name}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                color: status.color, 
                backgroundColor: status.bgColor 
              }}
            >
              {status.label}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Deal Value */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-green-600 mr-1" />
            <span className="font-semibold text-lg text-gray-900">
              ${deal.value.toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {deal.probability}% probability
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            {contact?.name}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {contact?.email}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{deal.probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${deal.probability}%`,
                backgroundColor: status.color
              }}
            />
          </div>
        </div>

        {/* Close Date */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Close Date:</span> {new Date(deal.closeDate).toLocaleDateString()}
        </div>
      </motion.div>
    )
  }

  const renderKanbanView = () => {
    const statusColumns = Object.entries(DEAL_STAGES).map(([key, status]) => {
      const deals = filteredDeals.filter(deal => deal.stage === key)
      const columnValue = deals.reduce((sum, deal) => sum + deal.value, 0)

      return (
        <div key={key} className="flex-1 min-w-80">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{status.label}</h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                {deals.length}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              ${columnValue.toLocaleString()} total
            </div>
          </div>
          <div className="space-y-3">
            {deals.map(deal => (
              <div key={deal.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow cursor-pointer">
                <h4 className="font-medium text-gray-900 mb-2">{deal.title}</h4>
                <div className="text-sm text-gray-600 mb-2">{deal.company}</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-600">${deal.value.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">{deal.probability}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })

    return (
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {statusColumns}
      </div>
    )
  }

  return (
    <div className={`h-screen bg-gray-50 flex flex-col ${className}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales CRM</h1>
            <p className="text-sm text-gray-600">Manage your sales pipeline and customer relationships</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Deal</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6">
          <nav className="space-y-2">
            {[
              { id: 'deals', label: 'Deals', icon: TrendingUp },
              { id: 'leads', label: 'Leads/Contacts', icon: Users },
              { id: 'accounts', label: 'Accounts', icon: Building2 },
              { id: 'activities', label: 'Activities', icon: Calendar },
              { id: 'dashboard', label: 'Dashboard', icon: PieChart }
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeView === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Pipeline Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Pipeline Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Value:</span>
                <span className="font-medium">${pipelineMetrics.totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weighted:</span>
                <span className="font-medium">${Math.round(pipelineMetrics.weightedValue).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Win Rate:</span>
                <span className="font-medium">{Math.round(pipelineMetrics.winRate)}%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {activeView === 'pipeline' && (
            <>
              {/* Toolbar */}
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search deals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Statuses</option>
                      {Object.entries(DEAL_STAGES).map(([key, status]) => (
                        <option key={key} value={key}>{status.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    {[
                      { id: 'grid', icon: Grid3X3, label: 'Grid' },
                      { id: 'kanban', icon: Kanban, label: 'Kanban' },
                      { id: 'table', icon: BarChart3, label: 'Table' }
                    ].map((mode) => {
                      const Icon = mode.icon
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setViewMode(mode.id as any)}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            viewMode === mode.id
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{mode.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-auto p-6">
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDeals.map(renderDealCard)}
                  </div>
                )}

                {viewMode === 'kanban' && renderKanbanView()}

                {viewMode === 'table' && (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDeals.map((deal) => {
                          const account = getAccountById(deal.accountId)
                          const contact = getContactById(deal.contactId)
                          const status = DEAL_STAGES[deal.stage as keyof typeof DEAL_STAGES]
                          return (
                            <tr key={deal.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{deal.name}</div>
                                <div className="text-sm text-gray-500">{contact?.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account?.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${deal.value.toLocaleString()}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span 
                                  className="px-2 py-1 rounded-full text-xs font-medium"
                                  style={{ 
                                    color: status.color, 
                                    backgroundColor: status.bgColor 
                                  }}
                                >
                                  {status.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(deal.closeDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button className="text-blue-600 hover:text-blue-900">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button className="text-gray-600 hover:text-gray-900">
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {activeView === 'contacts' && (
            <div className="flex-1 overflow-auto p-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contacts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CONTACTS.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.role} at {contact.company}</p>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {contact.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {contact.phone}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between text-sm">
                        <span className="text-gray-600">{contact.deals} deals</span>
                        <span className="font-medium text-green-600">${contact.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'dashboard' && (
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500">Total Pipeline</div>
                      <div className="text-2xl font-bold text-gray-900">${pipelineMetrics.totalValue.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500">Weighted Pipeline</div>
                      <div className="text-2xl font-bold text-gray-900">${Math.round(pipelineMetrics.weightedValue).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500">Win Rate</div>
                      <div className="text-2xl font-bold text-gray-900">{Math.round(pipelineMetrics.winRate)}%</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500">Active Deals</div>
                      <div className="text-2xl font-bold text-gray-900">{pipelineMetrics.totalDeals}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pipeline by Stage</h2>
                <div className="space-y-4">
                  {Object.entries(DEAL_STAGES).map(([key, status]) => {
                    const deals = MOCK_DEALS.filter(deal => deal.stage === key)
                    const value = deals.reduce((sum, deal) => sum + deal.value, 0)
                    const percentage = pipelineMetrics.totalValue > 0 ? (value / pipelineMetrics.totalValue) * 100 : 0

                    return (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: status.color }}
                          />
                          <span className="font-medium text-gray-900">{status.label}</span>
                          <span className="text-sm text-gray-500">({deals.length} deals)</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: status.color
                              }}
                            />
                          </div>
                          <span className="font-medium text-gray-900 min-w-20 text-right">
                            ${value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
