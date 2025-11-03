export interface ContentCalendarData {
  id: string
  name: string
  type: 'content-pipeline' | 'tasks' | 'promotions' | 'ideas-playbooks'
  columns: string[]
  data: Record<string, any>[]
}

export const CONTENT_CALENDAR_TEMPLATES: Record<string, ContentCalendarData> = {
  'content-pipeline': {
    id: 'content-pipeline',
    name: 'Content Pipeline',
    type: 'content-pipeline',
    columns: ['Title', 'Status', 'Publishing Date', 'Channel', 'Owner/Writer', 'Summary/Brief', 'URL', 'Keywords/Tags', 'Priority'],
    data: [
      {
        id: 1,
        'Title': '10 Best Practices for Remote Team Management',
        'Status': 'Published',
        'Publishing Date': '2024-02-01',
        'Channel': 'Blog',
        'Owner/Writer': 'Sarah Chen',
        'Summary/Brief': 'Comprehensive guide covering communication tools, productivity tips, and team building strategies for remote teams.',
        'URL': 'https://blog.company.com/remote-team-management',
        'Keywords/Tags': 'remote work, management, productivity, team building',
        'Priority': 'High'
      },
      {
        id: 2,
        'Title': 'Social Media Strategy 2024: What\'s Changed',
        'Status': 'In Review',
        'Publishing Date': '2024-02-15',
        'Channel': 'Blog',
        'Owner/Writer': 'Mike Johnson',
        'Summary/Brief': 'Analysis of latest social media trends, algorithm changes, and platform updates affecting content strategy.',
        'URL': '',
        'Keywords/Tags': 'social media, strategy, trends, marketing',
        'Priority': 'High'
      },
      {
        id: 3,
        'Title': 'Quick Tips: Boost Your Morning Productivity',
        'Status': 'Scheduled',
        'Publishing Date': '2024-02-08',
        'Channel': 'Social',
        'Owner/Writer': 'Emma Wilson',
        'Summary/Brief': 'Instagram carousel with 5 actionable tips for starting your day productively.',
        'URL': '',
        'Keywords/Tags': 'productivity, morning routine, tips, lifestyle',
        'Priority': 'Medium'
      },
      {
        id: 4,
        'Title': 'Weekly Newsletter: Industry Roundup #47',
        'Status': 'In Draft',
        'Publishing Date': '2024-02-12',
        'Channel': 'Newsletter',
        'Owner/Writer': 'Alex Rodriguez',
        'Summary/Brief': 'Curated list of top industry news, tool recommendations, and community highlights.',
        'URL': '',
        'Keywords/Tags': 'newsletter, industry news, tools, community',
        'Priority': 'Medium'
      },
      {
        id: 5,
        'Title': 'How to Build a Personal Brand on LinkedIn',
        'Status': 'Idea',
        'Publishing Date': '2024-02-20',
        'Channel': 'Video',
        'Owner/Writer': 'Lisa Park',
        'Summary/Brief': '15-minute tutorial video covering profile optimization, content strategy, and networking tips.',
        'URL': '',
        'Keywords/Tags': 'LinkedIn, personal branding, networking, career',
        'Priority': 'High'
      },
      {
        id: 6,
        'Title': 'Customer Success Story: TechCorp Implementation',
        'Status': 'In Draft',
        'Publishing Date': '2024-02-18',
        'Channel': 'Blog',
        'Owner/Writer': 'David Kim',
        'Summary/Brief': 'Case study showcasing how TechCorp increased efficiency by 40% using our platform.',
        'URL': '',
        'Keywords/Tags': 'case study, customer success, implementation, ROI',
        'Priority': 'High'
      }
    ]
  },
  'tasks': {
    id: 'tasks',
    name: 'Tasks',
    type: 'tasks',
    columns: ['Task Title', 'Linked Content', 'Assignee', 'Due Date', 'Status', 'Priority', 'Estimated Hours', 'Notes'],
    data: [
      {
        id: 1,
        'Task Title': 'Write first draft - Remote Team Management',
        'Linked Content': '10 Best Practices for Remote Team Management',
        'Assignee': 'Sarah Chen',
        'Due Date': '2024-01-25',
        'Status': 'Completed',
        'Priority': 'High',
        'Estimated Hours': 4,
        'Notes': 'Include statistics and real-world examples'
      },
      {
        id: 2,
        'Task Title': 'Design social media graphics',
        'Linked Content': 'Quick Tips: Boost Your Morning Productivity',
        'Assignee': 'Emma Wilson',
        'Due Date': '2024-02-06',
        'Status': 'In Progress',
        'Priority': 'Medium',
        'Estimated Hours': 3,
        'Notes': 'Use brand colors and consistent typography'
      },
      {
        id: 3,
        'Task Title': 'Research industry trends and data',
        'Linked Content': 'Social Media Strategy 2024: What\'s Changed',
        'Assignee': 'Mike Johnson',
        'Due Date': '2024-02-10',
        'Status': 'In Progress',
        'Priority': 'High',
        'Estimated Hours': 6,
        'Notes': 'Focus on Instagram, TikTok, and LinkedIn updates'
      },
      {
        id: 4,
        'Task Title': 'Curate newsletter content',
        'Linked Content': 'Weekly Newsletter: Industry Roundup #47',
        'Assignee': 'Alex Rodriguez',
        'Due Date': '2024-02-11',
        'Status': 'Not Started',
        'Priority': 'Medium',
        'Estimated Hours': 2,
        'Notes': 'Include 5-7 top stories and 2-3 tool recommendations'
      },
      {
        id: 5,
        'Task Title': 'Script writing and storyboard',
        'Linked Content': 'How to Build a Personal Brand on LinkedIn',
        'Assignee': 'Lisa Park',
        'Due Date': '2024-02-15',
        'Status': 'Not Started',
        'Priority': 'High',
        'Estimated Hours': 5,
        'Notes': 'Keep it engaging and actionable, include screen recordings'
      },
      {
        id: 6,
        'Task Title': 'Interview TechCorp stakeholders',
        'Linked Content': 'Customer Success Story: TechCorp Implementation',
        'Assignee': 'David Kim',
        'Due Date': '2024-02-14',
        'Status': 'In Progress',
        'Priority': 'High',
        'Estimated Hours': 3,
        'Notes': 'Get quotes from CEO and implementation team'
      },
      {
        id: 7,
        'Task Title': 'SEO optimization and meta tags',
        'Linked Content': 'Social Media Strategy 2024: What\'s Changed',
        'Assignee': 'Sarah Chen',
        'Due Date': '2024-02-13',
        'Status': 'Not Started',
        'Priority': 'Medium',
        'Estimated Hours': 1,
        'Notes': 'Target keywords: social media strategy, 2024 trends'
      }
    ]
  },
  'promotions': {
    id: 'promotions',
    name: 'Promotions & Performance',
    type: 'promotions',
    columns: ['Content Title', 'Channel', 'Publish Date', 'Views/Impressions', 'Engagement Rate', 'Clicks/CTR', 'Leads Generated', 'Performance Score', 'Notes'],
    data: [
      {
        id: 1,
        'Content Title': '10 Best Practices for Remote Team Management',
        'Channel': 'Blog',
        'Publish Date': '2024-02-01',
        'Views/Impressions': '12,450',
        'Engagement Rate': '4.2%',
        'Clicks/CTR': '524 (4.2%)',
        'Leads Generated': 23,
        'Performance Score': 'Excellent',
        'Notes': 'High engagement on LinkedIn share, consider follow-up content'
      },
      {
        id: 2,
        'Content Title': 'Year-End Productivity Review 2023',
        'Channel': 'Blog',
        'Publish Date': '2024-01-15',
        'Views/Impressions': '8,920',
        'Engagement Rate': '3.8%',
        'Clicks/CTR': '339 (3.8%)',
        'Leads Generated': 15,
        'Performance Score': 'Good',
        'Notes': 'Performed well in email newsletter, lower social engagement'
      },
      {
        id: 3,
        'Content Title': 'New Year Motivation Tips',
        'Channel': 'Social',
        'Publish Date': '2024-01-02',
        'Views/Impressions': '25,680',
        'Engagement Rate': '6.1%',
        'Clicks/CTR': '1,567 (6.1%)',
        'Leads Generated': 8,
        'Performance Score': 'Excellent',
        'Notes': 'Viral on Instagram, high saves and shares'
      },
      {
        id: 4,
        'Content Title': 'Weekly Newsletter: Industry Roundup #44',
        'Channel': 'Newsletter',
        'Publish Date': '2024-01-22',
        'Views/Impressions': '5,240',
        'Engagement Rate': '18.5%',
        'Clicks/CTR': '970 (18.5%)',
        'Leads Generated': 12,
        'Performance Score': 'Excellent',
        'Notes': 'High open rate (42%), tool recommendations section most clicked'
      },
      {
        id: 5,
        'Content Title': 'Customer Interview: StartupXYZ Success',
        'Channel': 'Video',
        'Publish Date': '2024-01-28',
        'Views/Impressions': '3,890',
        'Engagement Rate': '8.2%',
        'Clicks/CTR': '319 (8.2%)',
        'Leads Generated': 18,
        'Performance Score': 'Good',
        'Notes': 'Strong conversion rate, consider more customer stories'
      }
    ]
  },
  'ideas-playbooks': {
    id: 'ideas-playbooks',
    name: 'Ideas & Playbooks',
    type: 'ideas-playbooks',
    columns: ['Title/Idea', 'Type', 'Status', 'Priority', 'Target Channel', 'Estimated Effort', 'Keywords/Theme', 'Notes/Brief', 'Created Date'],
    data: [
      {
        id: 1,
        'Title/Idea': 'AI Tools Comparison Series',
        'Type': 'Content Series',
        'Status': 'Backlog',
        'Priority': 'High',
        'Target Channel': 'Blog + Video',
        'Estimated Effort': 'High',
        'Keywords/Theme': 'AI tools, comparison, productivity, automation',
        'Notes/Brief': '5-part series comparing popular AI tools for different use cases',
        'Created Date': '2024-01-20'
      },
      {
        id: 2,
        'Title/Idea': 'Behind the Scenes: Our Remote Culture',
        'Type': 'Social Content',
        'Status': 'In Planning',
        'Priority': 'Medium',
        'Target Channel': 'Social + Blog',
        'Estimated Effort': 'Medium',
        'Keywords/Theme': 'company culture, remote work, team, transparency',
        'Notes/Brief': 'Show day-in-the-life content, team interviews, workspace tours',
        'Created Date': '2024-01-18'
      },
      {
        id: 3,
        'Title/Idea': 'Interactive ROI Calculator',
        'Type': 'Lead Magnet',
        'Status': 'Approved',
        'Priority': 'High',
        'Target Channel': 'Website + Email',
        'Estimated Effort': 'High',
        'Keywords/Theme': 'ROI, calculator, productivity, business value',
        'Notes/Brief': 'Web-based tool to calculate productivity gains and cost savings',
        'Created Date': '2024-01-15'
      },
      {
        id: 4,
        'Title/Idea': 'Weekly Tips Email Series',
        'Type': 'Email Campaign',
        'Status': 'Backlog',
        'Priority': 'Medium',
        'Target Channel': 'Email',
        'Estimated Effort': 'Medium',
        'Keywords/Theme': 'tips, productivity, weekly, automation',
        'Notes/Brief': '12-week email series with actionable productivity tips',
        'Created Date': '2024-01-25'
      },
      {
        id: 5,
        'Title/Idea': 'Podcast Guest Appearances Strategy',
        'Type': 'Playbook',
        'Status': 'Draft',
        'Priority': 'Medium',
        'Target Channel': 'External Podcasts',
        'Estimated Effort': 'Low',
        'Keywords/Theme': 'podcast, guest, thought leadership, outreach',
        'Notes/Brief': 'Process for identifying, pitching, and preparing for podcast appearances',
        'Created Date': '2024-01-30'
      },
      {
        id: 6,
        'Title/Idea': 'User-Generated Content Campaign',
        'Type': 'Campaign',
        'Status': 'Backlog',
        'Priority': 'Low',
        'Target Channel': 'Social',
        'Estimated Effort': 'Medium',
        'Keywords/Theme': 'UGC, community, social proof, engagement',
        'Notes/Brief': 'Encourage customers to share their success stories and workflows',
        'Created Date': '2024-02-02'
      }
    ]
  }
}

export function getContentCalendarDataById(sheetId: string): ContentCalendarData {
  // Map sheet names to template IDs
  const nameToId: Record<string, string> = {
    'Content Pipeline': 'content-pipeline',
    'Tasks': 'tasks',
    'Promotions & Performance': 'promotions',
    'Ideas & Playbooks': 'ideas-playbooks'
  }
  
  const templateId = nameToId[sheetId] || sheetId.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')
  return CONTENT_CALENDAR_TEMPLATES[templateId] || {
    id: sheetId,
    name: sheetId,
    type: 'content-pipeline',
    columns: ['Title', 'Status', 'Channel', 'Owner', 'Due Date'],
    data: []
  }
}
