export interface TemplateSheetField {
  id: string
  name: string
  type: 'text' | 'select' | 'date' | 'number' | 'progress' | 'currency' | 'email' | 'url'
  options?: string[]
  width?: number
  required?: boolean
}

export interface TemplateSheetRecord {
  id: string
  [key: string]: any
}

export interface TemplateSheetConfig {
  id: string
  name: string
  description: string
  themeColor: {
    primary: string
    secondary: string
    gradient: string
  }
  fields: TemplateSheetField[]
  records: TemplateSheetRecord[]
  prebuiltFeatures: {
    colorRules?: {
      field: string
      conditions: Array<{
        value: string | number
        color: string
        textColor?: string
      }>
    }[]
    defaultGroupBy?: string
    defaultSort?: {
      field: string
      direction: 'asc' | 'desc'
    }
    defaultFilters?: Array<{
      field: string
      operator: string
      value: string
    }>
  }
}

export const TEMPLATE_SHEETS: Record<string, TemplateSheetConfig> = {
  'template-1': {
    id: 'template-1',
    name: 'Project Management Hub',
    description: 'Task tracking and milestones',
    themeColor: {
      primary: '#10B981',
      secondary: '#D1FAE5',
      gradient: 'linear-gradient(135deg, #D1FAE5 0%, #BBF7D0 100%)'
    },
    fields: [
      { id: 'taskName', name: 'Task Name', type: 'text', width: 200, required: true },
      { id: 'owner', name: 'Owner', type: 'text', width: 120 },
      { 
        id: 'status', 
        name: 'Status', 
        type: 'select', 
        width: 130,
        options: ['✅ Completed', '🚧 In Progress', '⏳ Pending', '🔴 Blocked']
      },
      { id: 'dueDate', name: 'Due Date', type: 'date', width: 120 },
      { 
        id: 'priority', 
        name: 'Priority', 
        type: 'select', 
        width: 100,
        options: ['High', 'Medium', 'Low']
      },
      { id: 'progress', name: 'Progress', type: 'progress', width: 120 }
    ],
    records: [
      {
        id: 'record-1',
        taskName: 'Design Homepage',
        owner: 'Trisha',
        status: '✅ Completed',
        dueDate: '2025-10-20',
        priority: 'Medium',
        progress: 100
      },
      {
        id: 'record-2',
        taskName: 'Backend Setup',
        owner: 'Alex',
        status: '🚧 In Progress',
        dueDate: '2025-10-23',
        priority: 'High',
        progress: 75
      },
      {
        id: 'record-3',
        taskName: 'Final Testing',
        owner: 'Mia',
        status: '⏳ Pending',
        dueDate: '2025-10-27',
        priority: 'Low',
        progress: 0
      }
    ],
    prebuiltFeatures: {
      colorRules: [
        {
          field: 'status',
          conditions: [
            { value: '✅ Completed', color: '#DCFCE7', textColor: '#166534' },
            { value: '🚧 In Progress', color: '#FEF3C7', textColor: '#92400E' },
            { value: '⏳ Pending', color: '#F3F4F6', textColor: '#374151' },
            { value: '🔴 Blocked', color: '#FEE2E2', textColor: '#DC2626' }
          ]
        }
      ],
      defaultGroupBy: 'status',
      defaultSort: { field: 'dueDate', direction: 'asc' }
    }
  },

  'template-2': {
    id: 'template-2',
    name: 'Marketing Campaign Tracker',
    description: 'Track campaigns and performance',
    themeColor: {
      primary: '#F97316',
      secondary: '#FFEFD5',
      gradient: 'linear-gradient(135deg, #FFEFD5 0%, #FFDAB9 100%)'
    },
    fields: [
      { id: 'campaign', name: 'Campaign', type: 'text', width: 180, required: true },
      { 
        id: 'channel', 
        name: 'Channel', 
        type: 'select', 
        width: 120,
        options: ['Instagram', 'Facebook', 'Google', 'Email', 'LinkedIn']
      },
      { id: 'budget', name: 'Budget', type: 'currency', width: 120 },
      { id: 'roi', name: 'ROI', type: 'number', width: 80 },
      { id: 'startDate', name: 'Start Date', type: 'date', width: 120 },
      { id: 'endDate', name: 'End Date', type: 'date', width: 120 },
      { 
        id: 'status', 
        name: 'Status', 
        type: 'select', 
        width: 120,
        options: ['Completed', 'In Progress', 'Planned', 'Paused']
      }
    ],
    records: [
      {
        id: 'record-1',
        campaign: 'Summer Launch',
        channel: 'Instagram',
        budget: 20000,
        roi: 145,
        startDate: '2025-07-01',
        endDate: '2025-07-31',
        status: 'Completed'
      },
      {
        id: 'record-2',
        campaign: 'Q4 Ads',
        channel: 'Google',
        budget: 35000,
        roi: 95,
        startDate: '2025-09-15',
        endDate: '2025-10-31',
        status: 'In Progress'
      }
    ],
    prebuiltFeatures: {
      colorRules: [
        {
          field: 'roi',
          conditions: [
            { value: 100, color: '#DCFCE7', textColor: '#166534' }, // >= 100% green
            { value: 0, color: '#FEE2E2', textColor: '#DC2626' } // < 100% red
          ]
        }
      ],
      defaultGroupBy: 'channel',
      defaultFilters: [{ field: 'status', operator: 'equals', value: 'In Progress' }]
    }
  },

  'template-3': {
    id: 'template-3',
    name: 'Product Roadmap',
    description: 'Plan product features and releases',
    themeColor: {
      primary: '#8B5CF6',
      secondary: '#EDE9FE',
      gradient: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)'
    },
    fields: [
      { id: 'feature', name: 'Feature', type: 'text', width: 200, required: true },
      { 
        id: 'category', 
        name: 'Category', 
        type: 'select', 
        width: 120,
        options: ['Core', 'Add-on', 'Enhancement', 'Bug Fix']
      },
      { 
        id: 'release', 
        name: 'Release', 
        type: 'select', 
        width: 100,
        options: ['v1.0', 'v1.1', 'v2.0', 'v2.1', 'Future']
      },
      { id: 'owner', name: 'Owner', type: 'text', width: 120 },
      { id: 'progress', name: 'Progress', type: 'progress', width: 120 },
      { id: 'notes', name: 'Notes', type: 'text', width: 200 }
    ],
    records: [
      {
        id: 'record-1',
        feature: 'Authentication',
        category: 'Core',
        release: 'v1.0',
        owner: 'Dev Team',
        progress: 80,
        notes: 'Login + Sign Up'
      },
      {
        id: 'record-2',
        feature: 'Analytics Dashboard',
        category: 'Add-on',
        release: 'v2.0',
        owner: 'Data Team',
        progress: 30,
        notes: 'Graph design pending'
      }
    ],
    prebuiltFeatures: {
      defaultGroupBy: 'release',
      defaultSort: { field: 'progress', direction: 'desc' }
    }
  },

  'template-4': {
    id: 'template-4',
    name: 'Content Calendar Pro',
    description: 'Schedule posts and measure engagement',
    themeColor: {
      primary: '#EC4899',
      secondary: '#FCE7F3',
      gradient: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)'
    },
    fields: [
      { id: 'date', name: 'Date', type: 'date', width: 120, required: true },
      { 
        id: 'platform', 
        name: 'Platform', 
        type: 'select', 
        width: 120,
        options: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok']
      },
      { id: 'contentTitle', name: 'Content Title', type: 'text', width: 200 },
      { 
        id: 'status', 
        name: 'Status', 
        type: 'select', 
        width: 120,
        options: ['Published', 'Scheduled', 'Draft', 'Archived']
      },
      { id: 'engagement', name: 'Engagement', type: 'text', width: 120 },
      { id: 'notes', name: 'Notes', type: 'text', width: 150 }
    ],
    records: [
      {
        id: 'record-1',
        date: '2025-10-10',
        platform: 'Instagram',
        contentTitle: 'October Promo',
        status: 'Published',
        engagement: '👍 542',
        notes: ''
      },
      {
        id: 'record-2',
        date: '2025-10-14',
        platform: 'Facebook',
        contentTitle: 'Halloween Campaign',
        status: 'Scheduled',
        engagement: '—',
        notes: 'Add link'
      }
    ],
    prebuiltFeatures: {
      defaultFilters: [{ field: 'status', operator: 'equals', value: 'Scheduled' }],
      defaultSort: { field: 'date', direction: 'asc' }
    }
  },

  'template-5': {
    id: 'template-5',
    name: 'Sales Pipeline CRM',
    description: 'Manage leads and deals',
    themeColor: {
      primary: '#3B82F6',
      secondary: '#DBEAFE',
      gradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)'
    },
    fields: [
      { id: 'leadName', name: 'Lead Name', type: 'text', width: 150, required: true },
      { 
        id: 'stage', 
        name: 'Stage', 
        type: 'select', 
        width: 130,
        options: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost']
      },
      { id: 'dealValue', name: 'Deal Value', type: 'currency', width: 120 },
      { id: 'closeDate', name: 'Close Date', type: 'date', width: 120 },
      { id: 'owner', name: 'Owner', type: 'text', width: 100 },
      { id: 'notes', name: 'Notes', type: 'text', width: 200 }
    ],
    records: [
      {
        id: 'record-1',
        leadName: 'Acme Corp',
        stage: 'Negotiation',
        dealValue: 50000,
        closeDate: '2025-10-30',
        owner: 'John',
        notes: 'Awaiting response'
      },
      {
        id: 'record-2',
        leadName: 'BrightTech',
        stage: 'Won',
        dealValue: 70000,
        closeDate: '2025-10-22',
        owner: 'Maria',
        notes: 'Signed'
      }
    ],
    prebuiltFeatures: {
      colorRules: [
        {
          field: 'stage',
          conditions: [
            { value: 'Won', color: '#DCFCE7', textColor: '#166534' },
            { value: 'Lost', color: '#FEE2E2', textColor: '#DC2626' },
            { value: 'Negotiation', color: '#FEF3C7', textColor: '#92400E' }
          ]
        }
      ],
      defaultGroupBy: 'stage',
      defaultSort: { field: 'closeDate', direction: 'asc' }
    }
  }
}
