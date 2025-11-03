'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Crown, 
  Shield, 
  Edit3, 
  Eye, 
  MoreHorizontal,
  Mail,
  Calendar,
  X,
  Check,
  AlertTriangle
} from 'lucide-react'
import { useUserRole } from '@/hooks/useUserRole'
import { UserRole, WorkspaceMember } from '@/types/roles'

interface TeamManagementProps {
  workspaceId?: string
}

export function TeamManagement({ workspaceId = 'workspace-1' }: TeamManagementProps) {
  const {
    currentUser,
    workspaceMembers,
    loading,
    hasPermission,
    canManageUser,
    updateMemberRole,
    removeMember,
    inviteMember,
    isSuperAdmin,
    isOwner,
    isAdmin
  } = useUserRole(workspaceId)

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<UserRole>('viewer')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!hasPermission('canManageMembers')) {
    return (
      <div className="text-center p-8">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
        <p className="text-gray-500">You don't have permission to manage team members.</p>
      </div>
    )
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return <Crown className="h-4 w-4 text-purple-600" />
      case 'owner': return <Crown className="h-4 w-4 text-yellow-500" />
      case 'admin': return <Shield className="h-4 w-4 text-blue-500" />
      case 'editor': return <Edit3 className="h-4 w-4 text-green-500" />
      case 'viewer': return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800'
      case 'owner': return 'bg-yellow-100 text-yellow-800'
      case 'admin': return 'bg-blue-100 text-blue-800'
      case 'editor': return 'bg-green-100 text-green-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
    }
  }

  const handleInvite = () => {
    if (inviteEmail && inviteMember(inviteEmail, inviteRole)) {
      setInviteEmail('')
      setInviteRole('viewer')
      setIsInviteModalOpen(false)
    }
  }

  const handleRoleChange = (memberId: string, newRole: UserRole) => {
    updateMemberRole(memberId, newRole)
    setActiveDropdown(null)
  }

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      removeMember(memberId)
    }
    setActiveDropdown(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-gray-700" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
              <p className="text-sm text-gray-500">
                Manage workspace access and permissions
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {workspaceMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    {member.userId === currentUser?.userId && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Joined {member.joinedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getRoleIcon(member.role)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(member.status)}`}>
                  {member.status}
                </span>

                {canManageUser(member.userId) && member.userId !== currentUser?.userId && (
                  <div className="relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>

                    {activeDropdown === member.id && (
                      <motion.div
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">Change Role</p>
                        </div>
                        {(['viewer', 'editor', 'admin', 'owner'] as UserRole[]).map((role) => {
                          // Only super admin can assign owner role
                          // Only super admin and owners can assign admin role
                          const canAssignRole = 
                            (role === 'owner' && isSuperAdmin) ||
                            (role === 'admin' && (isSuperAdmin || isOwner)) ||
                            (role === 'editor' || role === 'viewer')
                          
                          if (!canAssignRole) return null
                          
                          return (
                            <button
                              key={role}
                              onClick={() => handleRoleChange(member.id, role)}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-2 ${
                                member.role === role ? 'bg-gray-50' : ''
                              }`}
                            >
                              {getRoleIcon(role)}
                              <span className="capitalize">{role.replace('_', ' ')}</span>
                              {member.role === role && <Check className="h-3 w-3 text-green-500 ml-auto" />}
                            </button>
                          )
                        })}
                        <div className="border-t border-gray-100 mt-2">
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                          >
                            <X className="h-4 w-4" />
                            <span>Remove Member</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInviteModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Invite Team Member</h2>
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="viewer">Viewer - Can view records</option>
                    <option value="editor">Editor - Can edit records</option>
                    {(isOwner || isSuperAdmin) && <option value="admin">Admin - Can manage team</option>}
                    {isSuperAdmin && <option value="owner">Owner - Full workspace control</option>}
                  </select>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Role Permissions:</p>
                      <ul className="mt-1 space-y-1 text-xs">
                        {inviteRole === 'viewer' && (
                          <>
                            <li>• View records and data</li>
                            <li>• Export data</li>
                          </>
                        )}
                        {inviteRole === 'editor' && (
                          <>
                            <li>• View and edit records</li>
                            <li>• Manage views and filters</li>
                            <li>• Share workspace</li>
                          </>
                        )}
                        {inviteRole === 'admin' && (
                          <>
                            <li>• All editor permissions</li>
                            <li>• Manage team members</li>
                            <li>• Edit workspace settings</li>
                          </>
                        )}
                        {inviteRole === 'owner' && (
                          <>
                            <li>• All admin permissions</li>
                            <li>• Delete workspace</li>
                            <li>• Full workspace control</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Invite</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
