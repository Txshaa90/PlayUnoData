'use client'

import { useState, useEffect } from 'react'
import { UserRole, WorkspaceMember, ROLE_PERMISSIONS, RolePermissions } from '@/types/roles'

// Mock data for demonstration
const MOCK_WORKSPACE_MEMBERS: WorkspaceMember[] = [
  {
    id: '1',
    userId: 'user-tc',
    workspaceId: 'workspace-1',
    email: 'trishcaisip_playunodata.com',
    name: 'TC',
    role: 'super_admin',
    joinedAt: new Date('2024-01-01'),
    invitedBy: 'system',
    status: 'active'
  },
  {
    id: '2',
    userId: 'user-john',
    workspaceId: 'workspace-1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'admin',
    joinedAt: new Date('2024-01-15'),
    invitedBy: 'user-tc',
    status: 'active'
  },
  {
    id: '3',
    userId: 'user-sarah',
    workspaceId: 'workspace-1',
    email: 'sarah.chen@example.com',
    name: 'Sarah Chen',
    role: 'editor',
    joinedAt: new Date('2024-02-01'),
    invitedBy: 'user-tc',
    status: 'active'
  },
  {
    id: '4',
    userId: 'user-mike',
    workspaceId: 'workspace-1',
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    role: 'viewer',
    joinedAt: new Date('2024-02-10'),
    invitedBy: 'user-john',
    status: 'pending'
  }
]

export function useUserRole(workspaceId: string = 'workspace-1') {
  const [currentUser, setCurrentUser] = useState<WorkspaceMember | null>(null)
  const [workspaceMembers, setWorkspaceMembers] = useState<WorkspaceMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get user role and workspace members
    const loadUserRole = async () => {
      setLoading(true)
      
      // In a real app, this would be an API call
      // For demo, we'll use the TC user as current user
      const currentUserId = 'user-tc' // This would come from auth context
      const members = MOCK_WORKSPACE_MEMBERS.filter(m => m.workspaceId === workspaceId)
      const user = members.find(m => m.userId === currentUserId)
      
      setWorkspaceMembers(members)
      setCurrentUser(user || null)
      setLoading(false)
    }

    loadUserRole()
  }, [workspaceId])

  const getUserPermissions = (role: UserRole): RolePermissions => {
    return ROLE_PERMISSIONS[role]
  }

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!currentUser) return false
    return getUserPermissions(currentUser.role)[permission]
  }

  const canManageUser = (targetUserId: string): boolean => {
    if (!currentUser) return false
    
    const targetUser = workspaceMembers.find(m => m.userId === targetUserId)
    if (!targetUser) return false

    // Super Admin can manage everyone
    if (currentUser.role === 'super_admin') return true

    // Owner can manage everyone except super admin
    if (currentUser.role === 'owner') {
      return targetUser.role !== 'super_admin'
    }
    
    // Admin can manage editors and viewers, but not other admins, owners, or super admins
    if (currentUser.role === 'admin') {
      return targetUser.role === 'editor' || targetUser.role === 'viewer'
    }

    return false
  }

  const updateMemberRole = (memberId: string, newRole: UserRole) => {
    if (!hasPermission('canManageMembers')) return false

    setWorkspaceMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, role: newRole }
          : member
      )
    )
    return true
  }

  const removeMember = (memberId: string) => {
    if (!hasPermission('canManageMembers')) return false

    const targetMember = workspaceMembers.find(m => m.id === memberId)
    if (!targetMember || !canManageUser(targetMember.userId)) return false

    setWorkspaceMembers(prev => prev.filter(member => member.id !== memberId))
    return true
  }

  const inviteMember = (email: string, role: UserRole) => {
    if (!hasPermission('canManageMembers')) return false

    const newMember: WorkspaceMember = {
      id: `member-${Date.now()}`,
      userId: `user-${Date.now()}`,
      workspaceId,
      email,
      name: email.split('@')[0],
      role,
      joinedAt: new Date(),
      invitedBy: currentUser?.userId || '',
      status: 'pending'
    }

    setWorkspaceMembers(prev => [...prev, newMember])
    return true
  }

  return {
    currentUser,
    workspaceMembers,
    loading,
    hasPermission,
    canManageUser,
    getUserPermissions,
    updateMemberRole,
    removeMember,
    inviteMember,
    isSuperAdmin: currentUser?.role === 'super_admin',
    isOwner: currentUser?.role === 'owner',
    isAdmin: currentUser?.role === 'admin' || currentUser?.role === 'owner' || currentUser?.role === 'super_admin',
    canEdit: currentUser?.role !== 'viewer',
    canAccessAllWorkspaces: hasPermission('canAccessAllWorkspaces'),
    canManagePlatform: hasPermission('canManagePlatform'),
  }
}
