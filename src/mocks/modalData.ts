// Mock data for different modal states and use cases

export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  lastLogin?: string
}

export interface MockNotification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
  actionUrl?: string
}

export interface MockFormData {
  name: string
  email: string
  message: string
  priority: 'low' | 'medium' | 'high'
  category: 'bug' | 'feature' | 'question' | 'other'
}

export interface MockProject {
  id: string
  name: string
  description: string
  status: 'draft' | 'active' | 'archived' | 'deleted'
  members: number
  createdAt: string
}

// Mock user data for user management modals
export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'editor',
    status: 'active',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    lastLogin: '2024-01-14T16:20:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'viewer',
    status: 'inactive',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    lastLogin: '2024-01-10T08:15:00Z',
  },
  {
    id: 'error-case',
    name: 'Error User',
    email: 'error@example.com',
    role: 'viewer',
    status: 'active',
  },
]

// Mock notifications for alert modals
export const mockNotifications: MockNotification[] = [
  {
    id: '1',
    title: 'System Maintenance Scheduled',
    message:
      'Our system will undergo maintenance on January 20th from 2:00 AM to 4:00 AM UTC. During this time, some features may be unavailable.',
    type: 'info',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    actionUrl: '/maintenance-schedule',
  },
  {
    id: '2',
    title: 'Backup Complete',
    message:
      'Your daily backup has been completed successfully. All your data is safely stored and can be restored if needed.',
    type: 'success',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Storage Limit Reached',
    message:
      'You have reached 95% of your storage limit. Please upgrade your plan or delete unnecessary files to continue.',
    type: 'warning',
    timestamp: '2024-01-15T08:45:00Z',
    read: true,
    actionUrl: '/upgrade-plan',
  },
  {
    id: '4',
    title: 'Payment Method Expired',
    message:
      'Your payment method will expire in 3 days. Please update your billing information to avoid service interruption.',
    type: 'error',
    timestamp: '2024-01-14T16:20:00Z',
    read: true,
    actionUrl: '/billing',
  },
]

// Mock projects for delete/archive confirmations
export const mockProjects: MockProject[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design and improved UX',
    status: 'active',
    members: 8,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Native mobile application for iOS and Android platforms',
    status: 'draft',
    members: 5,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Legacy System',
    description: 'Old system that needs to be archived',
    status: 'archived',
    members: 0,
    createdAt: '2023-06-01T00:00:00Z',
  },
]

// Mock form states for form submission modals
export const mockFormStates = {
  empty: {
    name: '',
    email: '',
    message: '',
    priority: 'medium' as const,
    category: 'question' as const,
  },
  filled: {
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    message:
      'I would like to request access to the premium features for my team. We need advanced analytics and reporting capabilities.',
    priority: 'high' as const,
    category: 'feature' as const,
  },
  invalid: {
    name: '',
    email: 'invalid-email',
    message: '',
    priority: 'low' as const,
    category: 'bug' as const,
  },
}

// Mock API response scenarios
export const mockApiResponses = {
  // Success responses
  deleteUserSuccess: {
    message: 'User deleted successfully',
    deletedAt: '2024-01-15T10:30:00Z',
    userId: '1',
  },
  deleteProjectSuccess: {
    message: 'Project archived successfully',
    archivedAt: '2024-01-15T10:30:00Z',
    projectId: '1',
  },
  saveSuccess: {
    message: 'Changes saved successfully',
    savedAt: '2024-01-15T10:30:00Z',
    version: '1.2.3',
  },
  submitFormSuccess: {
    message: 'Form submitted successfully! We will get back to you within 24 hours.',
    ticketId: 'TICK-12345',
    submittedAt: '2024-01-15T10:30:00Z',
  },
  uploadSuccess: {
    message: 'File uploaded successfully',
    fileUrl: 'https://example.com/files/document.pdf',
    fileName: 'document.pdf',
    size: '2.4 MB',
    uploadedAt: '2024-01-15T10:30:00Z',
  },

  // Error responses
  deleteUserError: {
    error: 'Cannot delete user',
    code: 'USER_HAS_ACTIVE_PROJECTS',
    message:
      'This user has active projects assigned and cannot be deleted. Please reassign their projects first.',
    details: {
      activeProjects: 3,
      assignedTasks: 12,
    },
  },
  deleteProjectError: {
    error: 'Cannot archive project',
    code: 'PROJECT_HAS_DEPENDENCIES',
    message:
      'This project has dependencies and cannot be archived. Please resolve dependencies first.',
    details: {
      dependencies: ['Mobile App', 'API Service'],
    },
  },
  saveError: {
    error: 'Validation failed',
    code: 'VALIDATION_ERROR',
    message: 'Please fix the following errors and try again.',
    fields: {
      email: 'Please enter a valid email address',
      name: 'Name is required',
      message: 'Message must be at least 10 characters long',
    },
  },
  networkError: {
    error: 'Network error',
    code: 'NETWORK_TIMEOUT',
    message:
      'Unable to connect to the server. Please check your internet connection and try again.',
    retryAfter: 5000,
  },
  serverError: {
    error: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
    message:
      'Something went wrong on our end. Our team has been notified and is working to fix this.',
    supportTicket: 'SUP-67890',
  },
}

// Mock loading states
export const mockLoadingStates = {
  deleting: 'Deleting user...',
  archiving: 'Archiving project...',
  saving: 'Saving changes...',
  submitting: 'Submitting form...',
  uploading: 'Uploading file...',
  processing: 'Processing request...',
}
