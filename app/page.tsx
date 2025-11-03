'use client'

import { useEffect, useState } from 'react'
import LandingPage from '@/components/LandingPage'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // For demo purposes, always start with landing page
    // Only show dashboard if explicitly logged in during this session
    const authStatus = sessionStorage.getItem('isAuthenticated')
    setIsAuthenticated(authStatus === 'true')
    setIsLoading(false)
  }, [])

  if (isLoading) {
    // Simple loading state
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading PlayUnoData...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <LandingPage />
}
