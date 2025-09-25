import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import { Button, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../theme'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible modal component built with Material-UI that supports different variants, actions, and configurations.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant of the modal',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Maximum width of the modal',
    },
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width up to maxWidth',
    },
    disableBackdropClick: {
      control: 'boolean',
      description: 'Disable closing on backdrop click',
    },
    disableEscapeKeyDown: {
      control: 'boolean',
      description: 'Disable closing on escape key',
    },
  },
  args: {
    onClose: () => {},
    open: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Default Modal',
    children: (
      <Typography>
        This is a default modal with basic content. You can customize it with different variants,
        actions, and configurations.
      </Typography>
    ),
  },
}

export const Success: Story = {
  args: {
    title: 'Success Modal',
    variant: 'success',
    children: (
      <Typography>
        Your action was completed successfully! The success variant includes a green color scheme
        and checkmark icon.
      </Typography>
    ),
    primaryAction: {
      label: 'Continue',
      onClick: () => {},
    },
  },
}

export const Warning: Story = {
  args: {
    title: 'Warning Modal',
    variant: 'warning',
    children: (
      <Typography>
        Please review your action carefully. This warning modal alerts users to potential issues or
        required attention.
      </Typography>
    ),
    primaryAction: {
      label: 'Proceed',
      onClick: () => {},
    },
    secondaryAction: {
      label: 'Cancel',
      onClick: () => {},
    },
  },
}

export const Error: Story = {
  args: {
    title: 'Error Modal',
    variant: 'error',
    children: (
      <Typography>
        Something went wrong with your request. The error variant uses red styling to indicate
        critical issues that need attention.
      </Typography>
    ),
    primaryAction: {
      label: 'Retry',
      onClick: () => {},
    },
    secondaryAction: {
      label: 'Cancel',
      onClick: () => {},
    },
  },
}

export const Info: Story = {
  args: {
    title: 'Information Modal',
    variant: 'info',
    children: (
      <Typography>
        Here's some helpful information about this feature. The info variant uses blue styling for
        informational content.
      </Typography>
    ),
    primaryAction: {
      label: 'Got it',
      onClick: () => {},
    },
  },
}

export const WithActions: Story = {
  args: {
    title: 'Confirm Action',
    children: (
      <Typography>
        Are you sure you want to delete this item? This action cannot be undone.
      </Typography>
    ),
    primaryAction: {
      label: 'Delete',
      onClick: () => {},
      color: 'error',
    },
    secondaryAction: {
      label: 'Cancel',
      onClick: () => {},
      variant: 'outlined',
    },
  },
}

export const WithoutCloseButton: Story = {
  args: {
    title: 'Modal Without Close Button',
    showCloseButton: false,
    children: (
      <Typography>
        This modal doesn't have a close button in the header. Users must use one of the action
        buttons to close it.
      </Typography>
    ),
    primaryAction: {
      label: 'Close',
      onClick: () => {},
    },
  },
}

export const LargeContent: Story = {
  args: {
    title: 'Large Content Modal',
    maxWidth: 'md',
    children: (
      <div>
        <Typography paragraph>
          This modal contains more content and uses a larger maximum width. It demonstrates how the
          modal scales with different amounts of content.
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </Typography>
        <Typography paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </Typography>
      </div>
    ),
    primaryAction: {
      label: 'Close',
      onClick: () => {},
    },
  },
}

export const DisabledBackdrop: Story = {
  args: {
    title: 'Modal with Disabled Backdrop',
    disableBackdropClick: true,
    children: (
      <Typography>
        This modal cannot be closed by clicking on the backdrop. Users must use the close button or
        action buttons.
      </Typography>
    ),
    primaryAction: {
      label: 'Close',
      onClick: () => {},
    },
  },
}

// Interactive demo for testing different states
export const InteractiveDemo: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [variant, setVariant] = React.useState<
      'default' | 'success' | 'warning' | 'error' | 'info'
    >('default')

    const variants = [
      { value: 'default', label: 'Default' },
      { value: 'success', label: 'Success' },
      { value: 'warning', label: 'Warning' },
      { value: 'error', label: 'Error' },
      { value: 'info', label: 'Info' },
    ] as const

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {variants.map(({ value, label }) => (
            <Button
              key={value}
              variant='outlined'
              onClick={() => {
                setVariant(value)
                setOpen(true)
              }}
            >
              Open {label} Modal
            </Button>
          ))}
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Modal`}
          variant={variant}
          primaryAction={{
            label: 'Confirm',
            onClick: () => {
              // eslint-disable-next-line no-console
              console.log('Primary action clicked')
              setOpen(false)
            },
          }}
          secondaryAction={{
            label: 'Cancel',
            onClick: () => {
              // eslint-disable-next-line no-console
              console.log('Secondary action clicked')
              setOpen(false)
            },
          }}
        >
          <Typography>
            This is a {variant} modal variant. Each variant has different styling and icons to
            convey the appropriate message to users.
          </Typography>
        </Modal>
      </div>
    )
  },
}

// Real-world examples using MSW mock data
export const DeleteUserConfirmation: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleDelete = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/users/1', { method: 'DELETE' })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Failed to delete user')
        }

        setSuccess(true)
        setTimeout(() => {
          setOpen(false)
          setSuccess(false)
          setLoading(false)
        }, 2000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    const resetAndClose = () => {
      setOpen(false)
      setSuccess(false)
      setError(null)
      setLoading(false)
    }

    if (success) {
      return (
        <div style={{ padding: '20px' }}>
          <Button variant='contained' onClick={() => setOpen(true)}>
            Delete User
          </Button>
          <Modal
            open={open}
            onClose={resetAndClose}
            title='User Deleted'
            variant='success'
            primaryAction={{
              label: 'Close',
              onClick: resetAndClose,
            }}
          >
            <Typography>John Doe has been successfully deleted from the system.</Typography>
          </Modal>
        </div>
      )
    }

    return (
      <div style={{ padding: '20px' }}>
        <Button variant='contained' color='error' onClick={() => setOpen(true)}>
          Delete User
        </Button>
        <Modal
          open={open}
          onClose={resetAndClose}
          title={error ? 'Error Deleting User' : 'Confirm Delete User'}
          variant={error ? 'error' : 'warning'}
          primaryAction={{
            label: loading ? 'Deleting...' : error ? 'Try Again' : 'Delete User',
            onClick: error ? handleDelete : handleDelete,
            color: 'error',
          }}
          secondaryAction={
            !loading
              ? {
                  label: 'Cancel',
                  onClick: resetAndClose,
                }
              : undefined
          }
          disableBackdropClick={loading}
          disableEscapeKeyDown={loading}
        >
          {error ? (
            <Typography color='error'>{error}</Typography>
          ) : (
            <div>
              <Typography paragraph>
                Are you sure you want to delete <strong>John Doe</strong>?
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                This action cannot be undone. The user will be permanently removed from the system.
              </Typography>
            </div>
          )}
        </Modal>
      </div>
    )
  },
}

export const DeleteUserWithError: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleDelete = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/users/error-case', { method: 'DELETE' })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Failed to delete user')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    const resetAndClose = () => {
      setOpen(false)
      setError(null)
      setLoading(false)
    }

    return (
      <div style={{ padding: '20px' }}>
        <Button variant='contained' color='error' onClick={() => setOpen(true)}>
          Delete User (Error Case)
        </Button>
        <Modal
          open={open}
          onClose={resetAndClose}
          title={error ? 'Cannot Delete User' : 'Confirm Delete User'}
          variant={error ? 'error' : 'warning'}
          primaryAction={{
            label: loading ? 'Deleting...' : error ? 'Close' : 'Delete User',
            onClick: error ? resetAndClose : handleDelete,
            color: error ? 'primary' : 'error',
          }}
          secondaryAction={
            !loading && !error
              ? {
                  label: 'Cancel',
                  onClick: resetAndClose,
                }
              : undefined
          }
          disableBackdropClick={loading}
          disableEscapeKeyDown={loading}
        >
          {error ? (
            <div>
              <Typography paragraph color='error'>
                This user has active projects assigned and cannot be deleted.
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Please reassign their projects first, then try again.
              </Typography>
            </div>
          ) : (
            <div>
              <Typography paragraph>
                Are you sure you want to delete <strong>Error User</strong>?
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                This action cannot be undone. The user will be permanently removed from the system.
              </Typography>
            </div>
          )}
        </Modal>
      </div>
    )
  },
}

export const ContactFormSubmission: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
      priority: 'medium',
    })

    const handleSubmit = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || 'Failed to submit form')
        }

        setSuccess(true)
        setTimeout(() => {
          resetAndClose()
        }, 3000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    const resetAndClose = () => {
      setOpen(false)
      setSuccess(false)
      setError(null)
      setLoading(false)
      setFormData({ name: '', email: '', message: '', priority: 'medium' })
    }

    if (success) {
      return (
        <div style={{ padding: '20px' }}>
          <Button variant='contained' onClick={() => setOpen(true)}>
            Contact Us
          </Button>
          <Modal
            open={open}
            onClose={resetAndClose}
            title='Message Sent!'
            variant='success'
            primaryAction={{
              label: 'Close',
              onClick: resetAndClose,
            }}
          >
            <Typography>
              Thank you for your message! We'll get back to you within 24 hours.
            </Typography>
          </Modal>
        </div>
      )
    }

    return (
      <div style={{ padding: '20px' }}>
        <Button variant='contained' onClick={() => setOpen(true)}>
          Contact Us
        </Button>
        <Modal
          open={open}
          onClose={resetAndClose}
          title={error ? 'Error Sending Message' : 'Contact Us'}
          variant={error ? 'error' : 'default'}
          maxWidth='md'
          primaryAction={{
            label: loading ? 'Sending...' : error ? 'Try Again' : 'Send Message',
            onClick: handleSubmit,
          }}
          secondaryAction={
            !loading
              ? {
                  label: 'Cancel',
                  onClick: resetAndClose,
                }
              : undefined
          }
          disableBackdropClick={loading}
          disableEscapeKeyDown={loading}
        >
          {error ? (
            <Typography color='error' paragraph>
              {error}
            </Typography>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input
                type='text'
                placeholder='Your Name'
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                disabled={loading}
              />
              <input
                type='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                disabled={loading}
              />
            </div>
            <textarea
              placeholder='Your Message'
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
              disabled={loading}
            />
            <select
              value={formData.priority}
              onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
              disabled={loading}
            >
              <option value='low'>Low Priority</option>
              <option value='medium'>Medium Priority</option>
              <option value='high'>High Priority</option>
            </select>
          </div>
        </Modal>
      </div>
    )
  },
}

export const NotificationAlert: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [notifications, setNotifications] = React.useState<
      Array<{
        id: string
        title: string
        message: string
        type: string
        timestamp: string
        read: boolean
      }>
    >([])
    const [loading, setLoading] = React.useState(false)

    const loadNotifications = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/notifications')
        const data = await response.json()
        setNotifications(data)
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
      setLoading(false)
    }

    const handleOpen = () => {
      setOpen(true)
      loadNotifications()
    }

    return (
      <div style={{ padding: '20px' }}>
        <Button variant='contained' onClick={handleOpen}>
          View Notifications
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title='System Notifications'
          variant='info'
          maxWidth='md'
          primaryAction={{
            label: 'Close',
            onClick: () => setOpen(false),
          }}
        >
          {loading ? (
            <Typography>Loading notifications...</Typography>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: notification.read ? '#f9f9f9' : '#fff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor:
                          notification.type === 'error'
                            ? '#f44336'
                            : notification.type === 'warning'
                              ? '#ff9800'
                              : notification.type === 'success'
                                ? '#4caf50'
                                : '#2196f3',
                      }}
                    />
                    <Typography variant='subtitle2' fontWeight='bold'>
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <span
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#2196f3',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '10px',
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <Typography variant='body2' color='text.secondary'>
                    {notification.message}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.disabled'
                    style={{ marginTop: '8px', display: 'block' }}
                  >
                    {new Date(notification.timestamp).toLocaleString()}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
    )
  },
}
