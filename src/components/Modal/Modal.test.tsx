import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../theme'
import { Modal } from './Modal'

const MockedModal = (props: any) => (
  <ThemeProvider theme={theme}>
    <Modal {...props} />
  </ThemeProvider>
)

describe('Modal', () => {
  it('renders when open', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Test Modal' />)

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    const onClose = vi.fn()
    render(<MockedModal open={false} onClose={onClose} title='Test Modal' />)

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Test Modal' />)

    const closeButton = screen.getByLabelText('close')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders children content', () => {
    const onClose = vi.fn()
    render(
      <MockedModal open={true} onClose={onClose} title='Test Modal'>
        <div>Modal content</div>
      </MockedModal>
    )

    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('renders primary and secondary actions', () => {
    const onClose = vi.fn()
    const primaryAction = {
      label: 'Confirm',
      onClick: vi.fn(),
    }
    const secondaryAction = {
      label: 'Cancel',
      onClick: vi.fn(),
    }

    render(
      <MockedModal
        open={true}
        onClose={onClose}
        title='Test Modal'
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
    )

    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('calls action handlers when buttons are clicked', () => {
    const onClose = vi.fn()
    const primaryAction = {
      label: 'Confirm',
      onClick: vi.fn(),
    }
    const secondaryAction = {
      label: 'Cancel',
      onClick: vi.fn(),
    }

    render(
      <MockedModal
        open={true}
        onClose={onClose}
        title='Test Modal'
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />
    )

    fireEvent.click(screen.getByText('Confirm'))
    fireEvent.click(screen.getByText('Cancel'))

    expect(primaryAction.onClick).toHaveBeenCalledTimes(1)
    expect(secondaryAction.onClick).toHaveBeenCalledTimes(1)
  })

  it('renders success variant with icon', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Success' variant='success' />)

    expect(screen.getByText('Success')).toBeInTheDocument()
    // Success icon should be rendered
    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument()
  })

  it('renders warning variant with icon', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Warning' variant='warning' />)

    expect(screen.getByText('Warning')).toBeInTheDocument()
    // Warning icon should be rendered
    expect(screen.getByTestId('WarningIcon')).toBeInTheDocument()
  })

  it('renders error variant with icon', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Error' variant='error' />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    // Error icon should be rendered
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument()
  })

  it('renders info variant with icon', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Info' variant='info' />)

    expect(screen.getByText('Info')).toBeInTheDocument()
    // Info icon should be rendered
    expect(screen.getByTestId('InfoIcon')).toBeInTheDocument()
  })

  it('hides close button when showCloseButton is false', () => {
    const onClose = vi.fn()
    render(<MockedModal open={true} onClose={onClose} title='Test Modal' showCloseButton={false} />)

    expect(screen.queryByLabelText('close')).not.toBeInTheDocument()
  })
})
