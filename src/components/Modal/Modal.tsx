import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material'

export type ModalVariant = 'success' | 'warning' | 'error' | 'info' | 'default'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  variant?: ModalVariant
  showCloseButton?: boolean
  primaryAction?: {
    label: string
    onClick: () => void
    variant?: 'text' | 'outlined' | 'contained'
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: 'text' | 'outlined' | 'contained'
  }
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  disableBackdropClick?: boolean
  disableEscapeKeyDown?: boolean
}

const getVariantIcon = (variant: ModalVariant) => {
  const iconProps = { sx: { fontSize: 24, mr: 1 } }

  switch (variant) {
    case 'success':
      return <SuccessIcon {...iconProps} color='success' />
    case 'warning':
      return <WarningIcon {...iconProps} color='warning' />
    case 'error':
      return <ErrorIcon {...iconProps} color='error' />
    case 'info':
      return <InfoIcon {...iconProps} color='info' />
    default:
      return null
  }
}

const getVariantColor = (variant: ModalVariant) => {
  switch (variant) {
    case 'success':
      return 'success.main'
    case 'warning':
      return 'warning.main'
    case 'error':
      return 'error.main'
    case 'info':
      return 'info.main'
    default:
      return 'primary.main'
  }
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  variant = 'default',
  showCloseButton = true,
  primaryAction,
  secondaryAction,
  maxWidth = 'sm',
  fullWidth = true,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
}) => {
  const handleClose = (_event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return
    }
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return
    }
    onClose()
  }

  const variantIcon = getVariantIcon(variant)
  const variantColor = getVariantColor(variant)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderTop: `4px solid`,
          borderTopColor: variantColor,
        },
      }}
    >
      {(title || showCloseButton) && (
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {variantIcon}
            <Typography variant='h6' component='span'>
              {title}
            </Typography>
          </Box>
          {showCloseButton && (
            <IconButton
              aria-label='close'
              onClick={onClose}
              sx={{
                color: theme => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      {children && <DialogContent dividers={!!title}>{children}</DialogContent>}

      {(primaryAction || secondaryAction) && (
        <DialogActions sx={{ p: 2, gap: 1 }}>
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} variant={secondaryAction.variant || 'text'}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              variant={primaryAction.variant || 'contained'}
              color={primaryAction.color || (variant !== 'default' ? variant : 'primary')}
            >
              {primaryAction.label}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}
