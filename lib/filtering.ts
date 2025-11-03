export interface FilterCondition {
  id: string
  field: string
  operator: string
  value: string | number | Date
}

export interface FilterGroup {
  id: string
  conditions: FilterCondition[]
  operator: 'AND' | 'OR'
}

export const FIELD_OPTIONS = [
  { value: 'name', label: 'Project Name', type: 'text' },
  { value: 'status', label: 'Status', type: 'select' },
  { value: 'priority', label: 'Priority', type: 'select' },
  { value: 'assignee', label: 'Assignee', type: 'text' },
  { value: 'dueDate', label: 'Due Date', type: 'date' },
  { value: 'category', label: 'Category', type: 'select' },
  { value: 'progress', label: 'Progress', type: 'number' },
]

export const OPERATORS = {
  text: [
    { value: 'contains', label: 'contains' },
    { value: 'not_contains', label: 'does not contain' },
    { value: 'equals', label: 'is' },
    { value: 'not_equals', label: 'is not' },
    { value: 'empty', label: 'is empty' },
    { value: 'not_empty', label: 'is not empty' },
  ],
  select: [
    { value: 'equals', label: 'is' },
    { value: 'not_equals', label: 'is not' },
    { value: 'in', label: 'is any of' },
    { value: 'not_in', label: 'is none of' },
  ],
  date: [
    { value: 'equals', label: 'is' },
    { value: 'before', label: 'is before' },
    { value: 'after', label: 'is after' },
    { value: 'on_or_before', label: 'is on or before' },
    { value: 'on_or_after', label: 'is on or after' },
    { value: 'within_days', label: 'is within the next' },
  ],
  number: [
    { value: 'equals', label: 'equals' },
    { value: 'not_equals', label: 'does not equal' },
    { value: 'greater_than', label: 'is greater than' },
    { value: 'less_than', label: 'is less than' },
    { value: 'greater_equal', label: 'is greater than or equal to' },
    { value: 'less_equal', label: 'is less than or equal to' },
  ],
}

export function applyFilter(data: any[], condition: FilterCondition): any[] {
  return data.filter(item => {
    const fieldValue = item[condition.field]
    const filterValue = condition.value

    switch (condition.operator) {
      case 'contains':
        return String(fieldValue).toLowerCase().includes(String(filterValue).toLowerCase())
      case 'not_contains':
        return !String(fieldValue).toLowerCase().includes(String(filterValue).toLowerCase())
      case 'equals':
        return fieldValue === filterValue
      case 'not_equals':
        return fieldValue !== filterValue
      case 'before':
        return new Date(fieldValue) < new Date(filterValue as string)
      case 'after':
        return new Date(fieldValue) > new Date(filterValue as string)
      case 'on_or_before':
        return new Date(fieldValue) <= new Date(filterValue as string)
      case 'on_or_after':
        return new Date(fieldValue) >= new Date(filterValue as string)
      case 'greater_than':
        return Number(fieldValue) > Number(filterValue)
      case 'less_than':
        return Number(fieldValue) < Number(filterValue)
      case 'greater_equal':
        return Number(fieldValue) >= Number(filterValue)
      case 'less_equal':
        return Number(fieldValue) <= Number(filterValue)
      case 'empty':
        return !fieldValue || fieldValue === ''
      case 'not_empty':
        return fieldValue && fieldValue !== ''
      default:
        return true
    }
  })
}

export function applyFilters(data: any[], conditions: FilterCondition[]): any[] {
  return conditions.reduce((filteredData, condition) => {
    return applyFilter(filteredData, condition)
  }, data)
}

export function getRowColorClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-50 border-l-4 border-green-400'
    case 'in progress':
      return 'bg-blue-50 border-l-4 border-blue-400'
    case 'pending':
      return 'bg-yellow-50 border-l-4 border-yellow-400'
    case 'rejected':
    case 'blocked':
      return 'bg-red-50 border-l-4 border-red-400'
    default:
      return 'bg-white'
  }
}

export function getPriorityColorClass(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-50'
    case 'medium':
      return 'bg-yellow-50'
    case 'low':
      return 'bg-gray-50'
    default:
      return 'bg-white'
  }
}
