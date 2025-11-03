export interface GroupedData<T> {
  [key: string]: T[]
}

export function groupDataBy<T extends Record<string, any>>(
  data: T[], 
  field: string
): GroupedData<T> {
  return data.reduce((groups, item) => {
    const key = String(item[field] || 'Uncategorized')
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {} as GroupedData<T>)
}

export function sortGroupedData<T>(
  groupedData: GroupedData<T>,
  sortBy?: { field: string, direction: 'asc' | 'desc' }
): GroupedData<T> {
  if (!sortBy) return groupedData

  const sortedGroups: GroupedData<T> = {}
  
  // Sort group keys
  const sortedKeys = Object.keys(groupedData).sort((a, b) => {
    if (sortBy.direction === 'asc') {
      return a.localeCompare(b)
    } else {
      return b.localeCompare(a)
    }
  })

  // Sort items within each group
  sortedKeys.forEach(key => {
    sortedGroups[key] = [...groupedData[key]].sort((a, b) => {
      const aVal = a[sortBy.field]
      const bVal = b[sortBy.field]
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortBy.direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortBy.direction === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      return 0
    })
  })

  return sortedGroups
}

export function getGroupColor(groupName: string): string {
  const colors = [
    'bg-blue-50 border-l-4 border-blue-400',
    'bg-green-50 border-l-4 border-green-400', 
    'bg-yellow-50 border-l-4 border-yellow-400',
    'bg-purple-50 border-l-4 border-purple-400',
    'bg-pink-50 border-l-4 border-pink-400',
    'bg-indigo-50 border-l-4 border-indigo-400',
  ]
  
  // Simple hash function to consistently assign colors
  let hash = 0
  for (let i = 0; i < groupName.length; i++) {
    hash = groupName.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}
