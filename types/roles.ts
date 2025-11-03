export type UserRole = 'super_admin' | 'owner' | 'admin' | 'editor' | 'viewer'

export interface WorkspaceMember {
  id: string
  userId: string
  workspaceId: string
  email: string
  name: string
  role: UserRole
  joinedAt: Date
  invitedBy: string
  status: 'active' | 'pending' | 'inactive'
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

export interface Workspace {
  id: string
  name: string
  description?: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface RolePermissions {
  canManageMembers: boolean
  canEditWorkspace: boolean
  canDeleteWorkspace: boolean
  canShareWorkspace: boolean
  canEditRecords: boolean
  canViewRecords: boolean
  canManageViews: boolean
  canExportData: boolean
  canManageIntegrations: boolean
  canAccessAllWorkspaces: boolean
  canManageUsers: boolean
  canManageTemplates: boolean
  canViewAnalytics: boolean
  canManagePlatform: boolean
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  super_admin: {
    canManageMembers: true,
    canEditWorkspace: true,
    canDeleteWorkspace: true,
    canShareWorkspace: true,
    canEditRecords: true,
    canViewRecords: true,
    canManageViews: true,
    canExportData: true,
    canManageIntegrations: true,
    canAccessAllWorkspaces: true,
    canManageUsers: true,
    canManageTemplates: true,
    canViewAnalytics: true,
    canManagePlatform: true,
  },
  owner: {
    canManageMembers: true,
    canEditWorkspace: true,
    canDeleteWorkspace: true,
    canShareWorkspace: true,
    canEditRecords: true,
    canViewRecords: true,
    canManageViews: true,
    canExportData: true,
    canManageIntegrations: true,
    canAccessAllWorkspaces: false,
    canManageUsers: false,
    canManageTemplates: false,
    canViewAnalytics: false,
    canManagePlatform: false,
  },
  admin: {
    canManageMembers: true,
    canEditWorkspace: true,
    canDeleteWorkspace: false, // Only owner can delete
    canShareWorkspace: true,
    canEditRecords: true,
    canViewRecords: true,
    canManageViews: true,
    canExportData: true,
    canManageIntegrations: true,
    canAccessAllWorkspaces: false,
    canManageUsers: false,
    canManageTemplates: false,
    canViewAnalytics: false,
    canManagePlatform: false,
  },
  editor: {
    canManageMembers: false,
    canEditWorkspace: false,
    canDeleteWorkspace: false,
    canShareWorkspace: true,
    canEditRecords: true,
    canViewRecords: true,
    canManageViews: true,
    canExportData: true,
    canManageIntegrations: false,
    canAccessAllWorkspaces: false,
    canManageUsers: false,
    canManageTemplates: false,
    canViewAnalytics: false,
    canManagePlatform: false,
  },
  viewer: {
    canManageMembers: false,
    canEditWorkspace: false,
    canDeleteWorkspace: false,
    canShareWorkspace: false,
    canEditRecords: false,
    canViewRecords: true,
    canManageViews: false,
    canExportData: true,
    canManageIntegrations: false,
    canAccessAllWorkspaces: false,
    canManageUsers: false,
    canManageTemplates: false,
    canViewAnalytics: false,
    canManagePlatform: false,
  },
}
