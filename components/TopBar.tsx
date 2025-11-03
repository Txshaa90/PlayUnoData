'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  Search, 
  Bell, 
  Settings, 
  User,
  ChevronDown
} from 'lucide-react'

export function TopBar() {
  const [searchValue, setSearchValue] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo/Title (for mobile when sidebar is collapsed) */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-gray-900">PlayUnoData</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search datasets or workspaces..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-component text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-component transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-component shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[
                    { id: 1, title: 'New workspace shared', time: '2 min ago', unread: true },
                    { id: 2, title: 'Data sync completed', time: '1 hour ago', unread: true },
                    { id: 3, title: 'Weekly report ready', time: '3 hours ago', unread: false },
                  ].map(notification => (
                    <div key={notification.id} className={cn(
                      "p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer",
                      notification.unread && "bg-blue-50"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-2",
                          notification.unread ? "bg-primary" : "bg-gray-300"
                        )} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-primary hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            className="p-2 hover:bg-gray-100 rounded-component transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-component transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">T</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Trisha</span>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-component shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Trisha</p>
                  <p className="text-xs text-gray-500">trisha@playunodata.com</p>
                </div>
                <div className="py-1">
                  {[
                    { label: 'Profile Settings', icon: User },
                    { label: 'Account Settings', icon: Settings },
                  ].map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="h-4 w-4 text-gray-400" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
