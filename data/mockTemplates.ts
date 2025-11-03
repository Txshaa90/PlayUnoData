import { Template } from '@/types/templates'

export const MOCK_TEMPLATES: Template[] = [
  // Featured Templates
  {
    id: 'template-1',
    name: 'Project Management Hub',
    description: 'Complete project tracking with tasks, milestones, and team collaboration features',
    category: 'project-management',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: true,
    isNew: false,
    tags: ['Tasks', 'Timeline', 'Team', 'Popular'],
    author: 'PlayUnoData Team',
    createdAt: new Date('2024-01-15'),
    usageCount: 2847,
    rating: 4.8,
    fields: [
      { name: 'Task Name', type: 'text' },
      { name: 'Status', type: 'select', options: ['To Do', 'In Progress', 'Review', 'Done'] },
      { name: 'Assignee', type: 'text' },
      { name: 'Due Date', type: 'date' },
      { name: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] }
    ],
    previewData: [
      { 'Task Name': 'Design Homepage', 'Status': 'In Progress', 'Assignee': 'Sarah Chen', 'Due Date': '2024-03-15', 'Priority': 'High' },
      { 'Task Name': 'Setup Database', 'Status': 'Done', 'Assignee': 'Mike Johnson', 'Due Date': '2024-03-10', 'Priority': 'Critical' }
    ]
  },
  {
    id: 'template-2',
    name: 'Marketing Campaign Tracker',
    description: 'Track marketing campaigns, budgets, and performance metrics across all channels',
    category: 'marketing',
    thumbnail: '/api/placeholder/400/240',
    isPremium: true,
    isFeatured: true,
    isNew: false,
    tags: ['Campaigns', 'Analytics', 'ROI', 'Premium'],
    author: 'Marketing Pro',
    createdAt: new Date('2024-01-20'),
    usageCount: 1923,
    rating: 4.9,
    fields: [
      { name: 'Campaign Name', type: 'text' },
      { name: 'Channel', type: 'select', options: ['Email', 'Social Media', 'Google Ads', 'Content', 'Events'] },
      { name: 'Budget', type: 'number' },
      { name: 'Start Date', type: 'date' },
      { name: 'Status', type: 'select', options: ['Planning', 'Active', 'Paused', 'Completed'] }
    ],
    previewData: [
      { 'Campaign Name': 'Spring Launch', 'Channel': 'Social Media', 'Budget': 5000, 'Start Date': '2024-03-01', 'Status': 'Active' },
      { 'Campaign Name': 'Email Newsletter', 'Channel': 'Email', 'Budget': 1200, 'Start Date': '2024-02-15', 'Status': 'Active' }
    ]
  },
  {
    id: 'template-3',
    name: 'Product Roadmap',
    description: 'Plan and track product features, releases, and development milestones',
    category: 'product-management',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: true,
    isNew: false,
    tags: ['Roadmap', 'Features', 'Planning', 'Development'],
    author: 'Product Team',
    createdAt: new Date('2024-02-01'),
    usageCount: 1654,
    rating: 4.7,
    fields: [
      { name: 'Feature', type: 'text' },
      { name: 'Priority', type: 'select', options: ['P0', 'P1', 'P2', 'P3'] },
      { name: 'Quarter', type: 'select', options: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'] },
      { name: 'Owner', type: 'text' },
      { name: 'Status', type: 'select', options: ['Backlog', 'In Development', 'Testing', 'Released'] }
    ],
    previewData: [
      { 'Feature': 'User Authentication', 'Priority': 'P0', 'Quarter': 'Q1 2024', 'Owner': 'Engineering', 'Status': 'Released' },
      { 'Feature': 'Mobile App', 'Priority': 'P1', 'Quarter': 'Q2 2024', 'Owner': 'Mobile Team', 'Status': 'In Development' }
    ]
  },

  // Sales CRM Template
  {
    id: 'sales-crm',
    name: 'Sales CRM & Pipeline',
    description: 'Complete sales management system with pipeline tracking, contact management, and deal analytics - perfect for sales teams',
    category: 'sales-crm',
    thumbnail: '/api/placeholder/400/240',
    isPremium: true,
    isFeatured: true,
    isNew: true,
    tags: ['Sales', 'CRM', 'Pipeline', 'Analytics', 'Deals', 'New'],
    author: 'PlayUnoData Team',
    createdAt: new Date('2024-03-01'),
    usageCount: 2341,
    rating: 4.9,
    fields: [
      { name: 'Deal', type: 'text' },
      { name: 'Company', type: 'text' },
      { name: 'Contact', type: 'text' },
      { name: 'Value', type: 'number' },
      { name: 'Status', type: 'select', options: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'] },
      { name: 'Probability', type: 'number' },
      { name: 'Close Date', type: 'date' },
      { name: 'Email', type: 'email' },
      { name: 'Phone', type: 'text' }
    ],
    previewData: [
      { 'Deal': 'Enterprise Software License', 'Company': 'TechCorp Inc.', 'Value': '$75,000', 'Status': 'Proposal', 'Close Date': '2024-12-15' },
      { 'Deal': 'Marketing Automation Setup', 'Company': 'Growth Marketing LLC', 'Value': '$25,000', 'Status': 'Negotiation', 'Close Date': '2024-11-30' }
    ]
  },

  // New Templates
  {
    id: 'template-4',
    name: 'Content Calendar Pro',
    description: 'Complete content management system with advanced analytics, pipeline tracking, task management, and performance insights - perfect for content teams and marketers',
    category: 'content-planning',
    thumbnail: '/api/placeholder/400/240',
    isPremium: true,
    isFeatured: true,
    isNew: true,
    tags: ['Content', 'Calendar', 'Publishing', 'Analytics', 'Marketing', 'New'],
    author: 'PlayUnoData Team',
    createdAt: new Date('2024-03-01'),
    usageCount: 1847,
    rating: 4.9,
    sheets: [
      {
        name: 'Content Pipeline',
        fields: [
          { name: 'Title', type: 'text' },
          { name: 'Status', type: 'select', options: ['Idea', 'In Draft', 'In Review', 'Scheduled', 'Published'] },
          { name: 'Publishing Date', type: 'date' },
          { name: 'Channel', type: 'select', options: ['Blog', 'Social', 'Newsletter', 'Video', 'Email'] },
          { name: 'Owner/Writer', type: 'text' },
          { name: 'Summary/Brief', type: 'longtext' },
          { name: 'URL', type: 'url' },
          { name: 'Keywords/Tags', type: 'text' },
          { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] }
        ]
      },
      {
        name: 'Tasks',
        fields: [
          { name: 'Task Title', type: 'text' },
          { name: 'Linked Content', type: 'text' },
          { name: 'Assignee', type: 'text' },
          { name: 'Due Date', type: 'date' },
          { name: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
          { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
          { name: 'Estimated Hours', type: 'number' },
          { name: 'Notes', type: 'longtext' }
        ]
      },
      {
        name: 'Promotions & Performance',
        fields: [
          { name: 'Content Title', type: 'text' },
          { name: 'Channel', type: 'select', options: ['Blog', 'Social', 'Newsletter', 'Video'] },
          { name: 'Publish Date', type: 'date' },
          { name: 'Views/Impressions', type: 'text' },
          { name: 'Engagement Rate', type: 'text' },
          { name: 'Clicks/CTR', type: 'text' },
          { name: 'Leads Generated', type: 'number' },
          { name: 'Performance Score', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
          { name: 'Notes', type: 'longtext' }
        ]
      },
      {
        name: 'Ideas & Playbooks',
        fields: [
          { name: 'Title/Idea', type: 'text' },
          { name: 'Type', type: 'select', options: ['Content Series', 'Social Content', 'Lead Magnet', 'Email Campaign', 'Playbook', 'Campaign'] },
          { name: 'Status', type: 'select', options: ['Backlog', 'In Planning', 'Approved', 'Draft'] },
          { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
          { name: 'Target Channel', type: 'text' },
          { name: 'Estimated Effort', type: 'select', options: ['High', 'Medium', 'Low'] },
          { name: 'Keywords/Theme', type: 'text' },
          { name: 'Notes/Brief', type: 'longtext' },
          { name: 'Created Date', type: 'date' }
        ]
      }
    ],
    fields: [
      { name: 'Title', type: 'text' },
      { name: 'Status', type: 'select', options: ['Idea', 'In Draft', 'In Review', 'Scheduled', 'Published'] },
      { name: 'Publishing Date', type: 'date' },
      { name: 'Channel', type: 'select', options: ['Blog', 'Social', 'Newsletter', 'Video', 'Email'] },
      { name: 'Owner/Writer', type: 'text' },
      { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] }
    ],
    previewData: [
      { 'Title': '10 Best Practices for Remote Team Management', 'Status': 'Published', 'Publishing Date': '2024-02-01', 'Channel': 'Blog', 'Owner/Writer': 'Sarah Chen', 'Priority': 'High' },
      { 'Title': 'Social Media Strategy 2024: What\'s Changed', 'Status': 'In Review', 'Publishing Date': '2024-02-15', 'Channel': 'Blog', 'Owner/Writer': 'Mike Johnson', 'Priority': 'High' },
      { 'Title': 'Quick Tips: Boost Your Morning Productivity', 'Status': 'Scheduled', 'Publishing Date': '2024-02-08', 'Channel': 'Social', 'Owner/Writer': 'Emma Wilson', 'Priority': 'Medium' }
    ]
  },
  {
    id: 'template-5',
    name: 'Sales Pipeline CRM',
    description: 'Comprehensive sales tracking from lead generation to deal closure',
    category: 'sales-crm',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: false,
    isNew: true,
    tags: ['Sales', 'CRM', 'Pipeline', 'Leads'],
    author: 'Sales Expert',
    createdAt: new Date('2024-02-28'),
    usageCount: 187,
    rating: 4.5,
    fields: [
      { name: 'Lead Name', type: 'text' },
      { name: 'Company', type: 'text' },
      { name: 'Email', type: 'email' },
      { name: 'Deal Value', type: 'number' },
      { name: 'Stage', type: 'select', options: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'] }
    ],
    previewData: [
      { 'Lead Name': 'John Smith', 'Company': 'Tech Corp', 'Email': 'john@techcorp.com', 'Deal Value': 15000, 'Stage': 'Proposal' }
    ]
  },

  // Project Management Templates
  {
    id: 'template-6',
    name: 'Agile Sprint Board',
    description: 'Manage agile sprints with user stories, tasks, and burndown tracking',
    category: 'project-management',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: false,
    isNew: false,
    tags: ['Agile', 'Sprint', 'Scrum', 'Development'],
    author: 'Agile Coach',
    createdAt: new Date('2024-01-10'),
    usageCount: 1432,
    rating: 4.6,
    fields: [
      { name: 'User Story', type: 'text' },
      { name: 'Story Points', type: 'number' },
      { name: 'Sprint', type: 'select', options: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Backlog'] },
      { name: 'Assignee', type: 'text' },
      { name: 'Status', type: 'select', options: ['To Do', 'In Progress', 'Code Review', 'Testing', 'Done'] }
    ],
    previewData: [
      { 'User Story': 'As a user, I want to login', 'Story Points': 5, 'Sprint': 'Sprint 1', 'Assignee': 'Dev Team', 'Status': 'Done' }
    ]
  },
  {
    id: 'template-7',
    name: 'Event Planning Checklist',
    description: 'Complete event management from planning to execution with vendor tracking',
    category: 'event-planning',
    thumbnail: '/api/placeholder/400/240',
    isPremium: true,
    isFeatured: false,
    isNew: false,
    tags: ['Events', 'Planning', 'Vendors', 'Timeline'],
    author: 'Event Planner',
    createdAt: new Date('2024-01-25'),
    usageCount: 892,
    rating: 4.4,
    fields: [
      { name: 'Task', type: 'text' },
      { name: 'Category', type: 'select', options: ['Venue', 'Catering', 'Entertainment', 'Marketing', 'Logistics'] },
      { name: 'Due Date', type: 'date' },
      { name: 'Vendor', type: 'text' },
      { name: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Completed', 'Cancelled'] }
    ],
    previewData: [
      { 'Task': 'Book Venue', 'Category': 'Venue', 'Due Date': '2024-04-01', 'Vendor': 'Grand Hotel', 'Status': 'Completed' }
    ]
  },

  // Marketing Templates
  {
    id: 'template-8',
    name: 'Social Media Planner',
    description: 'Plan and schedule social media content across all platforms',
    category: 'marketing',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: false,
    isNew: false,
    tags: ['Social Media', 'Content', 'Scheduling', 'Engagement'],
    author: 'Social Media Manager',
    createdAt: new Date('2024-02-05'),
    usageCount: 1156,
    rating: 4.3,
    fields: [
      { name: 'Post Content', type: 'text' },
      { name: 'Platform', type: 'select', options: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok'] },
      { name: 'Scheduled Date', type: 'date' },
      { name: 'Hashtags', type: 'text' },
      { name: 'Status', type: 'select', options: ['Draft', 'Scheduled', 'Published', 'Archived'] }
    ],
    previewData: [
      { 'Post Content': 'New product launch announcement!', 'Platform': 'Instagram', 'Scheduled Date': '2024-03-20', 'Hashtags': '#launch #product #innovation', 'Status': 'Scheduled' }
    ]
  },

  // HR Templates
  {
    id: 'template-9',
    name: 'Candidate Tracker',
    description: 'Streamline your hiring process with candidate management and interview scheduling',
    category: 'hr-recruiting',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: false,
    isNew: false,
    tags: ['Hiring', 'Candidates', 'Interviews', 'HR'],
    author: 'HR Professional',
    createdAt: new Date('2024-01-30'),
    usageCount: 743,
    rating: 4.5,
    fields: [
      { name: 'Candidate Name', type: 'text' },
      { name: 'Position', type: 'text' },
      { name: 'Email', type: 'email' },
      { name: 'Interview Date', type: 'date' },
      { name: 'Status', type: 'select', options: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'] }
    ],
    previewData: [
      { 'Candidate Name': 'Alice Johnson', 'Position': 'Frontend Developer', 'Email': 'alice@email.com', 'Interview Date': '2024-03-18', 'Status': 'Interview' }
    ]
  },

  // Inventory Template
  {
    id: 'template-10',
    name: 'Inventory Management',
    description: 'Track stock levels, suppliers, and reorder points for efficient inventory control',
    category: 'inventory',
    thumbnail: '/api/placeholder/400/240',
    isPremium: true,
    isFeatured: false,
    isNew: false,
    tags: ['Inventory', 'Stock', 'Suppliers', 'Warehouse'],
    author: 'Operations Manager',
    createdAt: new Date('2024-02-10'),
    usageCount: 567,
    rating: 4.2,
    fields: [
      { name: 'Product Name', type: 'text' },
      { name: 'SKU', type: 'text' },
      { name: 'Current Stock', type: 'number' },
      { name: 'Reorder Point', type: 'number' },
      { name: 'Supplier', type: 'text' },
      { name: 'Status', type: 'select', options: ['In Stock', 'Low Stock', 'Out of Stock', 'Discontinued'] }
    ],
    previewData: [
      { 'Product Name': 'Wireless Headphones', 'SKU': 'WH-001', 'Current Stock': 45, 'Reorder Point': 20, 'Supplier': 'Audio Tech Ltd', 'Status': 'In Stock' }
    ]
  },
  
  // Blank Template
  {
    id: 'template-blank',
    name: 'Blank Template',
    description: 'Start from scratch with a clean slate. Perfect for importing CSV/Excel files or building custom databases with the same professional design as Project Management Hub.',
    category: 'project-management',
    thumbnail: '/api/placeholder/400/240',
    isPremium: false,
    isFeatured: true,
    isNew: false,
    tags: ['Blank', 'Import', 'CSV', 'Excel', 'Custom', 'Flexible'],
    author: 'PlayUnoData Team',
    createdAt: new Date('2024-01-01'),
    usageCount: 5672,
    rating: 4.8,
    fields: [
      { name: 'Name', type: 'text' },
      { name: 'Status', type: 'select', options: ['Active', 'Inactive', 'Pending', 'Completed'] },
      { name: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
      { name: 'Date Created', type: 'date' },
      { name: 'Category', type: 'text' },
      { name: 'Notes', type: 'longtext' }
    ],
    previewData: [
      { 'Name': 'Sample Item 1', 'Status': 'Active', 'Priority': 'High', 'Date Created': '2024-01-15', 'Category': 'General', 'Notes': 'This is a sample entry to show the template structure' },
      { 'Name': 'Sample Item 2', 'Status': 'Pending', 'Priority': 'Medium', 'Date Created': '2024-01-16', 'Category': 'General', 'Notes': 'Import your own data or start adding records manually' }
    ]
  }
]
