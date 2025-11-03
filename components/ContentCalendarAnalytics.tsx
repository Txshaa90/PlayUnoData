'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2, 
  Calendar,
  Target,
  Users,
  Activity,
  ArrowUp,
  ArrowDown,
  ChevronRight
} from 'lucide-react'

interface ContentCalendarAnalyticsProps {
  className?: string
}

export function ContentCalendarAnalytics({ className }: ContentCalendarAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalContent: 156,
      totalViews: 45200,
      totalEngagement: 3420,
      avgPerformance: 4.2
    },
    trends: {
      views: { value: 12.5, direction: 'up' },
      engagement: { value: 8.3, direction: 'up' },
      content: { value: 15.2, direction: 'up' },
      performance: { value: 2.1, direction: 'down' }
    },
    contentByChannel: [
      { channel: 'Blog', count: 45, percentage: 28.8, color: 'bg-blue-500' },
      { channel: 'Social', count: 62, percentage: 39.7, color: 'bg-green-500' },
      { channel: 'Newsletter', count: 28, percentage: 17.9, color: 'bg-purple-500' },
      { channel: 'Video', count: 21, percentage: 13.5, color: 'bg-orange-500' }
    ],
    performanceByStatus: [
      { status: 'Published', count: 89, performance: 4.5, color: 'bg-green-500' },
      { status: 'Scheduled', count: 34, performance: 0, color: 'bg-blue-500' },
      { status: 'In Review', count: 23, performance: 3.8, color: 'bg-yellow-500' },
      { status: 'In Draft', count: 10, performance: 0, color: 'bg-gray-500' }
    ],
    topContent: [
      { title: '10 Best Practices for Remote Team Management', views: 12450, engagement: 4.2, channel: 'Blog' },
      { title: 'Social Media Strategy 2024', views: 8920, engagement: 3.9, channel: 'Blog' },
      { title: 'Quick Productivity Tips', views: 6780, engagement: 4.7, channel: 'Social' },
      { title: 'Weekly Newsletter #45', views: 5640, engagement: 3.2, channel: 'Newsletter' }
    ]
  }

  const StatCard = ({ icon: Icon, title, value, change, trend }: any) => (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span>{change}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </motion.div>
  )

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Analytics</h2>
          <p className="text-gray-600">Track your content performance and engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Calendar}
          title="Total Content"
          value={analyticsData.overview.totalContent}
          change={analyticsData.trends.content.value}
          trend={analyticsData.trends.content.direction}
        />
        <StatCard
          icon={Eye}
          title="Total Views"
          value={analyticsData.overview.totalViews.toLocaleString()}
          change={analyticsData.trends.views.value}
          trend={analyticsData.trends.views.direction}
        />
        <StatCard
          icon={Heart}
          title="Engagement"
          value={analyticsData.overview.totalEngagement.toLocaleString()}
          change={analyticsData.trends.engagement.value}
          trend={analyticsData.trends.engagement.direction}
        />
        <StatCard
          icon={TrendingUp}
          title="Avg Performance"
          value={analyticsData.overview.avgPerformance}
          change={analyticsData.trends.performance.value}
          trend={analyticsData.trends.performance.direction}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content by Channel */}
        <motion.div
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Content by Channel</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.contentByChannel.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.channel}</span>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance by Status */}
        <motion.div
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance by Status</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.performanceByStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-gray-900">{item.status}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.count} items</span>
                  {item.performance > 0 && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">{item.performance}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Performing Content */}
      <motion.div
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4">
          {analyticsData.topContent.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.views.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{item.engagement}</span>
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                    {item.channel}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
