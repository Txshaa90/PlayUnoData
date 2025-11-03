export interface TemplateField {
  name: string
  type: 'text' | 'number' | 'date' | 'select' | 'multiSelect' | 'checkbox' | 'url' | 'email'
  options?: string[]
  required?: boolean
}

export interface TemplateTable {
  name: string
  fields: TemplateField[]
  sampleData?: Record<string, any>[]
}

export interface Template {
  id: string
  name: string
  category: string
  description: string
  previewImage: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedSetupTime: string
  useCases: string[]
  schema: {
    tables: TemplateTable[]
  }
}

export const templateCategories = [
  { id: 'all', name: 'All Templates', icon: '📋' },
  { id: 'project-management', name: 'Project Management', icon: '📊' },
  { id: 'crm', name: 'CRM & Sales', icon: '👥' },
  { id: 'inventory', name: 'Inventory & Operations', icon: '📦' },
  { id: 'marketing', name: 'Marketing', icon: '📈' },
  { id: 'hr', name: 'HR & Recruiting', icon: '🏢' },
  { id: 'personal', name: 'Personal Planning', icon: '📝' },
  { id: 'finance', name: 'Finance & Accounting', icon: '💰' },
  { id: 'content', name: 'Content Management', icon: '📚' }
]

export const templates: Template[] = [
  {
    id: 'project-tracker',
    name: 'Project Tracker',
    category: 'project-management',
    description: 'Manage projects, tasks, and team collaboration with deadlines and progress tracking.',
    previewImage: '/templates/project-tracker.png',
    tags: ['projects', 'tasks', 'collaboration', 'deadlines'],
    difficulty: 'Beginner',
    estimatedSetupTime: '5 minutes',
    useCases: ['Track project milestones', 'Assign tasks to team members', 'Monitor project progress'],
    schema: {
      tables: [
        {
          name: 'Projects',
          fields: [
            { name: 'Project Name', type: 'text', required: true },
            { name: 'Status', type: 'select', options: ['Planning', 'In Progress', 'On Hold', 'Completed'], required: true },
            { name: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
            { name: 'Start Date', type: 'date' },
            { name: 'Due Date', type: 'date' },
            { name: 'Project Manager', type: 'text' },
            { name: 'Budget', type: 'number' },
            { name: 'Progress', type: 'number' },
            { name: 'Description', type: 'text' }
          ],
          sampleData: [
            {
              'Project Name': 'Website Redesign',
              'Status': 'In Progress',
              'Priority': 'High',
              'Start Date': '2024-01-15',
              'Due Date': '2024-03-15',
              'Project Manager': 'Sarah Johnson',
              'Budget': 25000,
              'Progress': 65,
              'Description': 'Complete overhaul of company website with new branding'
            },
            {
              'Project Name': 'Mobile App Development',
              'Status': 'Planning',
              'Priority': 'Medium',
              'Start Date': '2024-02-01',
              'Due Date': '2024-06-01',
              'Project Manager': 'Mike Chen',
              'Budget': 50000,
              'Progress': 15,
              'Description': 'Native iOS and Android app for customer portal'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'inventory-tracker',
    name: 'Inventory Management',
    category: 'inventory',
    description: 'Track stock levels, suppliers, reorder points, and inventory movements.',
    previewImage: '/templates/inventory-tracker.png',
    tags: ['inventory', 'stock', 'suppliers', 'warehouse'],
    difficulty: 'Intermediate',
    estimatedSetupTime: '10 minutes',
    useCases: ['Monitor stock levels', 'Track supplier information', 'Automate reorder alerts'],
    schema: {
      tables: [
        {
          name: 'Inventory',
          fields: [
            { name: 'Item Name', type: 'text', required: true },
            { name: 'SKU', type: 'text', required: true },
            { name: 'Category', type: 'select', options: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'] },
            { name: 'Current Stock', type: 'number', required: true },
            { name: 'Reorder Point', type: 'number' },
            { name: 'Unit Price', type: 'number' },
            { name: 'Supplier', type: 'text' },
            { name: 'Status', type: 'select', options: ['In Stock', 'Low Stock', 'Out of Stock', 'Discontinued'] },
            { name: 'Last Updated', type: 'date' }
          ],
          sampleData: [
            {
              'Item Name': 'Wireless Headphones',
              'SKU': 'WH-001',
              'Category': 'Electronics',
              'Current Stock': 45,
              'Reorder Point': 20,
              'Unit Price': 79.99,
              'Supplier': 'TechSupply Co.',
              'Status': 'In Stock',
              'Last Updated': '2024-01-20'
            },
            {
              'Item Name': 'Cotton T-Shirt',
              'SKU': 'TS-002',
              'Category': 'Clothing',
              'Current Stock': 12,
              'Reorder Point': 25,
              'Unit Price': 19.99,
              'Supplier': 'Fashion Direct',
              'Status': 'Low Stock',
              'Last Updated': '2024-01-18'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'crm-contacts',
    name: 'CRM & Customer Management',
    category: 'crm',
    description: 'Manage customer relationships, track sales pipeline, and monitor interactions.',
    previewImage: '/templates/crm-contacts.png',
    tags: ['crm', 'customers', 'sales', 'pipeline'],
    difficulty: 'Intermediate',
    estimatedSetupTime: '8 minutes',
    useCases: ['Track customer interactions', 'Manage sales pipeline', 'Store contact information'],
    schema: {
      tables: [
        {
          name: 'Contacts',
          fields: [
            { name: 'Full Name', type: 'text', required: true },
            { name: 'Company', type: 'text' },
            { name: 'Email', type: 'email', required: true },
            { name: 'Phone', type: 'text' },
            { name: 'Lead Status', type: 'select', options: ['New Lead', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'] },
            { name: 'Lead Source', type: 'select', options: ['Website', 'Referral', 'Social Media', 'Cold Call', 'Trade Show'] },
            { name: 'Deal Value', type: 'number' },
            { name: 'Last Contact', type: 'date' },
            { name: 'Notes', type: 'text' }
          ],
          sampleData: [
            {
              'Full Name': 'John Smith',
              'Company': 'Acme Corp',
              'Email': 'john.smith@acme.com',
              'Phone': '(555) 123-4567',
              'Lead Status': 'Qualified',
              'Lead Source': 'Website',
              'Deal Value': 15000,
              'Last Contact': '2024-01-19',
              'Notes': 'Interested in premium package, follow up next week'
            },
            {
              'Full Name': 'Emma Davis',
              'Company': 'StartupXYZ',
              'Email': 'emma@startupxyz.com',
              'Phone': '(555) 987-6543',
              'Lead Status': 'Proposal Sent',
              'Lead Source': 'Referral',
              'Deal Value': 8500,
              'Last Contact': '2024-01-17',
              'Notes': 'Proposal sent, waiting for decision by month end'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'content-calendar-pro',
    name: 'Content Calendar Pro',
    category: 'content',
    description: 'Complete content management system with advanced analytics dashboard, pipeline tracking, task management, and performance insights - perfect for content teams and marketers.',
    previewImage: '/templates/content-calendar-pro.png',
    tags: ['content', 'marketing', 'analytics', 'pipeline', 'performance'],
    difficulty: 'Intermediate',
    estimatedSetupTime: '12 minutes',
    useCases: ['Manage content pipeline from idea to publication', 'Track task assignments and deadlines', 'Analyze content performance metrics', 'Plan content strategy and campaigns'],
    schema: {
      tables: [
        {
          name: 'Content Pipeline',
          fields: [
            { name: 'Title', type: 'text', required: true },
            { name: 'Status', type: 'select', options: ['Idea', 'In Draft', 'In Review', 'Scheduled', 'Published'], required: true },
            { name: 'Publishing Date', type: 'date' },
            { name: 'Channel', type: 'select', options: ['Blog', 'Social', 'Newsletter', 'Video', 'Email'] },
            { name: 'Owner/Writer', type: 'text' },
            { name: 'Summary/Brief', type: 'text' },
            { name: 'URL', type: 'url' },
            { name: 'Keywords/Tags', type: 'text' },
            { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] }
          ],
          sampleData: [
            {
              'Title': '10 Best Practices for Remote Team Management',
              'Status': 'Published',
              'Publishing Date': '2024-02-01',
              'Channel': 'Blog',
              'Owner/Writer': 'Sarah Chen',
              'Summary/Brief': 'Comprehensive guide covering communication tools, productivity tips, and team building strategies for remote teams.',
              'URL': 'https://blog.company.com/remote-team-management',
              'Keywords/Tags': 'remote work, management, productivity, team building',
              'Priority': 'High'
            }
          ]
        },
        {
          name: 'Tasks',
          fields: [
            { name: 'Task Title', type: 'text', required: true },
            { name: 'Linked Content', type: 'text' },
            { name: 'Assignee', type: 'text' },
            { name: 'Due Date', type: 'date' },
            { name: 'Status', type: 'select', options: ['Not Started', 'In Progress', 'Completed'] },
            { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
            { name: 'Estimated Hours', type: 'number' },
            { name: 'Notes', type: 'text' }
          ],
          sampleData: [
            {
              'Task Title': 'Write first draft - Remote Team Management',
              'Linked Content': '10 Best Practices for Remote Team Management',
              'Assignee': 'Sarah Chen',
              'Due Date': '2024-01-25',
              'Status': 'Completed',
              'Priority': 'High',
              'Estimated Hours': 4,
              'Notes': 'Include statistics and real-world examples'
            }
          ]
        },
        {
          name: 'Promotions & Performance',
          fields: [
            { name: 'Content Title', type: 'text', required: true },
            { name: 'Channel', type: 'select', options: ['Blog', 'Social', 'Newsletter', 'Video'] },
            { name: 'Publish Date', type: 'date' },
            { name: 'Views/Impressions', type: 'text' },
            { name: 'Engagement Rate', type: 'text' },
            { name: 'Clicks/CTR', type: 'text' },
            { name: 'Leads Generated', type: 'number' },
            { name: 'Performance Score', type: 'select', options: ['Excellent', 'Good', 'Average', 'Poor'] },
            { name: 'Notes', type: 'text' }
          ],
          sampleData: [
            {
              'Content Title': '10 Best Practices for Remote Team Management',
              'Channel': 'Blog',
              'Publish Date': '2024-02-01',
              'Views/Impressions': '12,450',
              'Engagement Rate': '4.2%',
              'Clicks/CTR': '524 (4.2%)',
              'Leads Generated': 23,
              'Performance Score': 'Excellent',
              'Notes': 'High engagement on LinkedIn share, consider follow-up content'
            }
          ]
        },
        {
          name: 'Ideas & Playbooks',
          fields: [
            { name: 'Title/Idea', type: 'text', required: true },
            { name: 'Type', type: 'select', options: ['Content Series', 'Social Content', 'Lead Magnet', 'Email Campaign', 'Playbook', 'Campaign'] },
            { name: 'Status', type: 'select', options: ['Backlog', 'In Planning', 'Approved', 'Draft'] },
            { name: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
            { name: 'Target Channel', type: 'text' },
            { name: 'Estimated Effort', type: 'select', options: ['High', 'Medium', 'Low'] },
            { name: 'Keywords/Theme', type: 'text' },
            { name: 'Notes/Brief', type: 'text' },
            { name: 'Created Date', type: 'date' }
          ],
          sampleData: [
            {
              'Title/Idea': 'AI Tools Comparison Series',
              'Type': 'Content Series',
              'Status': 'Backlog',
              'Priority': 'High',
              'Target Channel': 'Blog + Video',
              'Estimated Effort': 'High',
              'Keywords/Theme': 'AI tools, comparison, productivity, automation',
              'Notes/Brief': '5-part series comparing popular AI tools for different use cases',
              'Created Date': '2024-01-20'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'employee-directory',
    name: 'Employee Directory',
    category: 'hr',
    description: 'Manage employee information, departments, and organizational structure.',
    previewImage: '/templates/employee-directory.png',
    tags: ['hr', 'employees', 'directory', 'organization'],
    difficulty: 'Beginner',
    estimatedSetupTime: '6 minutes',
    useCases: ['Store employee contact info', 'Track department structure', 'Manage employee records'],
    schema: {
      tables: [
        {
          name: 'Employees',
          fields: [
            { name: 'Full Name', type: 'text', required: true },
            { name: 'Employee ID', type: 'text', required: true },
            { name: 'Email', type: 'email', required: true },
            { name: 'Phone', type: 'text' },
            { name: 'Department', type: 'select', options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'] },
            { name: 'Position', type: 'text' },
            { name: 'Manager', type: 'text' },
            { name: 'Start Date', type: 'date' },
            { name: 'Location', type: 'select', options: ['New York', 'San Francisco', 'Remote', 'London', 'Tokyo'] },
            { name: 'Status', type: 'select', options: ['Active', 'On Leave', 'Terminated'] }
          ],
          sampleData: [
            {
              'Full Name': 'Alice Johnson',
              'Employee ID': 'EMP001',
              'Email': 'alice.johnson@company.com',
              'Phone': '(555) 111-2222',
              'Department': 'Engineering',
              'Position': 'Senior Software Engineer',
              'Manager': 'Bob Smith',
              'Start Date': '2023-03-15',
              'Location': 'San Francisco',
              'Status': 'Active'
            },
            {
              'Full Name': 'Carlos Rodriguez',
              'Employee ID': 'EMP002',
              'Email': 'carlos.rodriguez@company.com',
              'Phone': '(555) 333-4444',
              'Department': 'Marketing',
              'Position': 'Marketing Manager',
              'Manager': 'Diana Lee',
              'Start Date': '2023-07-01',
              'Location': 'Remote',
              'Status': 'Active'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    category: 'finance',
    description: 'Track business expenses, receipts, and budget allocations by category.',
    previewImage: '/templates/expense-tracker.png',
    tags: ['expenses', 'finance', 'budget', 'receipts'],
    difficulty: 'Beginner',
    estimatedSetupTime: '4 minutes',
    useCases: ['Track business expenses', 'Monitor budget spending', 'Categorize transactions'],
    schema: {
      tables: [
        {
          name: 'Expenses',
          fields: [
            { name: 'Description', type: 'text', required: true },
            { name: 'Amount', type: 'number', required: true },
            { name: 'Category', type: 'select', options: ['Office Supplies', 'Travel', 'Meals', 'Software', 'Marketing', 'Utilities', 'Other'] },
            { name: 'Date', type: 'date', required: true },
            { name: 'Payment Method', type: 'select', options: ['Credit Card', 'Cash', 'Bank Transfer', 'Check'] },
            { name: 'Vendor', type: 'text' },
            { name: 'Receipt', type: 'checkbox' },
            { name: 'Reimbursable', type: 'checkbox' },
            { name: 'Notes', type: 'text' }
          ],
          sampleData: [
            {
              'Description': 'Office printer paper',
              'Amount': 45.99,
              'Category': 'Office Supplies',
              'Date': '2024-01-18',
              'Payment Method': 'Credit Card',
              'Vendor': 'Office Depot',
              'Receipt': true,
              'Reimbursable': false,
              'Notes': 'Bulk purchase for Q1'
            },
            {
              'Description': 'Client lunch meeting',
              'Amount': 127.50,
              'Category': 'Meals',
              'Date': '2024-01-19',
              'Payment Method': 'Credit Card',
              'Vendor': 'Downtown Bistro',
              'Receipt': true,
              'Reimbursable': true,
              'Notes': 'Meeting with potential client ABC Corp'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'blank-template',
    name: 'Blank Template',
    category: 'project-management',
    description: 'Start from scratch with a flexible template. Perfect for importing CSV/Excel files or building custom databases with professional Project Management Hub styling.',
    previewImage: '/templates/blank-template.png',
    tags: ['blank', 'import', 'csv', 'excel', 'custom', 'flexible'],
    difficulty: 'Beginner',
    estimatedSetupTime: '2 minutes',
    useCases: ['Import CSV/Excel data', 'Build custom databases', 'Start with flexible structure', 'Prototype new workflows'],
    schema: {
      tables: [
        {
          name: 'Data',
          fields: [
            { name: 'Name', type: 'text', required: true },
            { name: 'Status', type: 'select', options: ['Active', 'Inactive', 'Pending', 'Completed'], required: true },
            { name: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
            { name: 'Date Created', type: 'date' },
            { name: 'Category', type: 'text' },
            { name: 'Description', type: 'text' },
            { name: 'Tags', type: 'text' },
            { name: 'Notes', type: 'text' }
          ],
          sampleData: [
            {
              'Name': 'Sample Record 1',
              'Status': 'Active',
              'Priority': 'High',
              'Date Created': '2024-01-15',
              'Category': 'General',
              'Description': 'This is a sample record to demonstrate the template structure',
              'Tags': 'sample, demo',
              'Notes': 'You can customize these fields or import your own data'
            },
            {
              'Name': 'Sample Record 2',
              'Status': 'Pending',
              'Priority': 'Medium',
              'Date Created': '2024-01-16',
              'Category': 'General',
              'Description': 'Another example record showing flexible data entry',
              'Tags': 'example, flexible',
              'Notes': 'Perfect for CSV/Excel imports or manual data entry'
            }
          ]
        }
      ]
    }
  }
]

export function getTemplatesByCategory(categoryId: string): Template[] {
  if (categoryId === 'all') {
    return templates
  }
  return templates.filter(template => template.category === categoryId)
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id)
}

export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase()
  return templates.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
