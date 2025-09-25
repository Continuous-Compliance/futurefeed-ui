import { http, HttpResponse, delay } from 'msw'
import { mockUsers, mockNotifications, mockProjects, mockApiResponses } from './modalData'

export const handlers = [
  // User management endpoints
  http.get('/api/users', async () => {
    await delay(800) // Simulate network delay
    return HttpResponse.json(mockUsers)
  }),

  http.get('/api/users/:id', async ({ params }) => {
    await delay(500)
    const user = mockUsers.find(u => u.id === params.id)
    if (!user) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return HttpResponse.json(user)
  }),

  http.delete('/api/users/:id', async ({ params }) => {
    await delay(1500) // Simulate deletion time

    if (params.id === 'error-case') {
      return HttpResponse.json(mockApiResponses.deleteUserError, { status: 400 })
    }

    return HttpResponse.json(mockApiResponses.deleteUserSuccess)
  }),

  http.patch('/api/users/:id', async ({ params, request }) => {
    await delay(1000)
    const updates = await request.json()

    if (!updates.name || !updates.email) {
      return HttpResponse.json(mockApiResponses.saveError, { status: 422 })
    }

    return HttpResponse.json({
      ...mockApiResponses.saveSuccess,
      user: { id: params.id, ...updates },
    })
  }),

  // Project management endpoints
  http.get('/api/projects', async () => {
    await delay(600)
    return HttpResponse.json(mockProjects)
  }),

  http.delete('/api/projects/:id', async ({ params }) => {
    await delay(1200)

    const project = mockProjects.find(p => p.id === params.id)
    if (project?.status === 'active' && project.members > 0) {
      return HttpResponse.json(mockApiResponses.deleteProjectError, { status: 400 })
    }

    return HttpResponse.json(mockApiResponses.deleteProjectSuccess)
  }),

  // Notification endpoints
  http.get('/api/notifications', async () => {
    await delay(400)
    return HttpResponse.json(mockNotifications)
  }),

  http.patch('/api/notifications/:id/read', async ({ params }) => {
    await delay(300)
    return HttpResponse.json({
      id: params.id,
      read: true,
      readAt: new Date().toISOString(),
    })
  }),

  // Form submission endpoints
  http.post('/api/contact', async ({ request }) => {
    await delay(2000) // Simulate form processing
    const data = (await request.json()) as { name: string; email: string; message: string }

    // Simulate validation errors
    if (!data.name || data.name.length < 2) {
      return HttpResponse.json(
        {
          ...mockApiResponses.saveError,
          fields: { name: 'Name must be at least 2 characters long' },
        },
        { status: 422 }
      )
    }

    if (!data.email || !data.email.includes('@')) {
      return HttpResponse.json(
        {
          ...mockApiResponses.saveError,
          fields: { email: 'Please enter a valid email address' },
        },
        { status: 422 }
      )
    }

    if (!data.message || data.message.length < 10) {
      return HttpResponse.json(
        {
          ...mockApiResponses.saveError,
          fields: { message: 'Message must be at least 10 characters long' },
        },
        { status: 422 }
      )
    }

    // Simulate server error for testing
    if (data.name.toLowerCase().includes('error')) {
      return HttpResponse.json(mockApiResponses.serverError, { status: 500 })
    }

    return HttpResponse.json(mockApiResponses.submitFormSuccess, { status: 201 })
  }),

  // File upload endpoint
  http.post('/api/upload', async ({ request }) => {
    await delay(3000) // Simulate file upload time
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return HttpResponse.json({ error: 'No file provided', code: 'NO_FILE' }, { status: 400 })
    }

    // Simulate file size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return HttpResponse.json(
        {
          error: 'File too large',
          code: 'FILE_TOO_LARGE',
          message: 'File size must be less than 5MB',
          maxSize: '5 MB',
          actualSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        },
        { status: 413 }
      )
    }

    return HttpResponse.json({
      ...mockApiResponses.uploadSuccess,
      fileName: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    })
  }),

  // Generic error simulation endpoints
  http.post('/api/network-error', async () => {
    await delay(10000) // Long delay to simulate timeout
    return HttpResponse.json(mockApiResponses.networkError, { status: 408 })
  }),

  http.post('/api/server-error', async () => {
    await delay(1000)
    return HttpResponse.json(mockApiResponses.serverError, { status: 500 })
  }),

  // Legacy endpoints (keeping for backward compatibility)
  http.get('/api/user', () => {
    return HttpResponse.json(mockUsers[0])
  }),

  http.post('/api/submit', () => {
    return HttpResponse.json(mockApiResponses.submitFormSuccess, { status: 201 })
  }),

  http.delete('/api/items/:id', () => {
    return HttpResponse.json(mockApiResponses.deleteUserSuccess, { status: 200 })
  }),
]
