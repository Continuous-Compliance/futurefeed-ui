/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  Tabs,
  Tab,
  Chip,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import type {
  ModalSystemProps,
  ModalConfig,
  ModalFormData,
  ValidationResult,
  ModalContextValue,
  FieldConfig,
  ButtonConfig,
} from './types'

// Create context for modal state
const ModalSystemContext = createContext<ModalContextValue | null>(null)

// Hook to access modal context
export const useModalSystem = () => {
  const context = useContext(ModalSystemContext)
  if (!context) {
    throw new Error('useModalSystem must be used within ModalSystemProvider')
  }
  return context
}

// Form field validation utilities
const validateField = (value: any, config: FieldConfig): string | null => {
  const { validation, required } = config

  if (required && (!value || value.toString().trim() === '')) {
    return `${config.label} is required`
  }

  if (!validation || !value) {
    return null
  }

  if (validation.minLength && value.toString().length < validation.minLength) {
    return `${config.label} must be at least ${validation.minLength} characters`
  }

  if (validation.maxLength && value.toString().length > validation.maxLength) {
    return `${config.label} must be no more than ${validation.maxLength} characters`
  }

  if (validation.pattern && !validation.pattern.test(value.toString())) {
    return `${config.label} format is invalid`
  }

  if (validation.custom) {
    return validation.custom(value)
  }

  return null
}

// Form validation utility
const validateForm = (formData: ModalFormData, fields: FieldConfig[]): ValidationResult => {
  const errors: { [fieldName: string]: string } = {}

  fields.forEach(field => {
    const error = validateField(formData[field.name], field)
    if (error) {
      errors[field.name] = error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Individual form field component
const FormField: React.FC<{ config: FieldConfig }> = ({ config }) => {
  const { formData, errors, updateField, clearError } = useModalSystem()
  const theme = useTheme()

  const value = formData[config.name] || config.defaultValue || ''
  const error = errors[config.name]

  const handleChange = (newValue: any) => {
    updateField(config.name, newValue)
    if (error) {
      clearError(config.name)
    }
  }

  const baseProps = {
    id: config.id,
    name: config.name,
    label: config.label,
    disabled: config.disabled,
    error: !!error,
    helperText: error || config.helperText,
    required: config.required,
    fullWidth: true,
    sx: {
      mb: theme.spacing(2),
      ...config.sx,
    },
  }

  switch (config.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        <TextField
          {...baseProps}
          type={config.type}
          placeholder={config.placeholder}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
      )

    case 'textarea':
      return (
        <TextField
          {...baseProps}
          multiline
          rows={4}
          placeholder={config.placeholder}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
      )

    case 'select':
      return (
        <FormControl {...baseProps}>
          <FormLabel>{config.label}</FormLabel>
          <Select value={value} onChange={e => handleChange(e.target.value)} displayEmpty>
            {config.placeholder && (
              <MenuItem value='' disabled>
                {config.placeholder}
              </MenuItem>
            )}
            {config.options?.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(error || config.helperText) && (
            <FormHelperText error={!!error}>{error || config.helperText}</FormHelperText>
          )}
        </FormControl>
      )

    case 'checkbox':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={Boolean(value)}
              onChange={e => handleChange(e.target.checked)}
              disabled={config.disabled}
            />
          }
          label={config.label}
          sx={{ mb: theme.spacing(2), ...config.sx }}
        />
      )

    case 'radio':
      return (
        <FormControl {...baseProps}>
          <FormLabel>{config.label}</FormLabel>
          <RadioGroup value={value} onChange={e => handleChange(e.target.value)}>
            {config.options?.map(option => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                disabled={config.disabled}
              />
            ))}
          </RadioGroup>
          {(error || config.helperText) && (
            <FormHelperText error={!!error}>{error || config.helperText}</FormHelperText>
          )}
        </FormControl>
      )

    default:
      return <Box>Unsupported field type: {config.type}</Box>
  }
}

// Form component
const FormContent: React.FC<{ fields: FieldConfig[] }> = ({ fields }) => {
  return (
    <Box component='form' sx={{ mt: 2 }}>
      {fields.map(field => (
        <FormField key={field.id} config={field} />
      ))}
    </Box>
  )
}

// Tab panel component
const TabPanel: React.FC<{
  children?: React.ReactNode
  index: number
  value: number
}> = ({ children, value, index }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`modal-tabpanel-${index}`}
      aria-labelledby={`modal-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  )
}

// Tabbed content component
const TabbedContent: React.FC<{ config: ModalConfig }> = ({ config }) => {
  const { activeTab, setActiveTab } = useModalSystem()
  const theme = useTheme()

  if (!config.tabs) {
    return null
  }

  const visibleTabs = config.tabs.items.filter(tab => !tab.hidden)
  const activeTabIndex = visibleTabs.findIndex(tab => tab.id === activeTab)

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTabIndex >= 0 ? activeTabIndex : 0}
        onChange={(_, newIndex) => {
          const tabId = visibleTabs[newIndex]?.id
          if (tabId) {
            setActiveTab(tabId)
          }
        }}
        variant={config.tabs.variant || 'standard'}
        orientation={config.tabs.orientation || 'horizontal'}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: theme.spacing(2),
        }}
      >
        {visibleTabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {tab.icon}
                {tab.label}
                {tab.badge && (
                  <Chip label={tab.badge} size='small' color='primary' variant='filled' />
                )}
              </Box>
            }
            id={`modal-tab-${index}`}
            aria-controls={`modal-tabpanel-${index}`}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>

      {visibleTabs.map((tab, index) => (
        <TabPanel key={tab.id} value={activeTabIndex >= 0 ? activeTabIndex : 0} index={index}>
          {tab.content || (
            <Typography color='text.secondary'>Content for {tab.label} tab</Typography>
          )}
        </TabPanel>
      ))}
    </Box>
  )
}

// Action buttons component
const ActionButtons: React.FC<{ config: ModalConfig }> = ({ config }) => {
  const { isSubmitting } = useModalSystem()
  const theme = useTheme()

  const leftButtons = config.actions.buttons.filter(btn => btn.position === 'left')
  const rightButtons = config.actions.buttons.filter(btn => btn.position !== 'left')

  const renderButton = (button: ButtonConfig) => (
    <Button
      key={button.id}
      variant={button.variant || 'contained'}
      color={button.color || 'primary'}
      onClick={button.onClick}
      disabled={button.disabled || isSubmitting}
      startIcon={button.loading || isSubmitting ? <CircularProgress size={16} /> : button.startIcon}
      endIcon={button.endIcon}
      fullWidth={config.actions.fullWidth}
      sx={{
        minWidth: 'auto',
        ...(config.actions.spacing && { mx: theme.spacing(config.actions.spacing / 2) }),
      }}
    >
      {button.label}
    </Button>
  )

  if (config.actions.layout === 'split') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: theme.spacing(1),
          p: theme.spacing(2),
        }}
      >
        <Box sx={{ display: 'flex', gap: theme.spacing(1) }}>{leftButtons.map(renderButton)}</Box>
        <Box sx={{ display: 'flex', gap: theme.spacing(1) }}>{rightButtons.map(renderButton)}</Box>
      </Box>
    )
  }

  const allButtons =
    config.actions.layout === 'left'
      ? [...leftButtons, ...rightButtons]
      : [...rightButtons, ...leftButtons]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: config.actions.layout === 'left' ? 'flex-start' : 'flex-end',
        gap: theme.spacing(1),
        p: theme.spacing(2),
      }}
    >
      {allButtons.map(renderButton)}
    </Box>
  )
}

// Config indicator component
const ConfigIndicator: React.FC = () => {
  const theme = useTheme()

  return (
    <Chip
      label='Config-Driven Modal'
      size='small'
      sx={{
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: 1300,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: '0.75rem',
        height: 24,
        '& .MuiChip-label': {
          px: 1,
        },
      }}
    />
  )
}

// Main ModalSystem component
export const ModalSystem: React.FC<ModalSystemProps> = ({
  config: baseConfig,
  open,
  onClose,
  context = {},
  overrides = {},
}) => {
  const theme = useTheme()
  const config = useMemo(() => ({ ...baseConfig, ...overrides }), [baseConfig, overrides])

  // Form state
  const [formData, setFormData] = useState<ModalFormData>({})
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState(
    config.tabs?.defaultTab || config.tabs?.items?.[0]?.id || ''
  )

  // Initialize form data with default values
  useEffect(() => {
    if (config.content.type === 'form' && config.content.fields) {
      const initialData: ModalFormData = {}
      config.content.fields.forEach(field => {
        if (field.defaultValue !== undefined) {
          initialData[field.name] = field.defaultValue
        }
      })
      setFormData(initialData)
    }
  }, [config.id, config.content.type, config.content.fields]) // Only depend on stable values

  // Context value
  const contextValue: ModalContextValue = {
    config,
    formData,
    errors,
    isSubmitting,
    activeTab,
    updateField: (fieldName: string, value: any) => {
      setFormData(prev => ({ ...prev, [fieldName]: value }))
      if (config.onChange) {
        config.onChange(fieldName, value, context)
      }
    },
    setError: (fieldName: string, error: string) => {
      setErrors(prev => ({ ...prev, [fieldName]: error }))
    },
    clearError: (fieldName: string) => {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    },
    setActiveTab: (tabId: string) => {
      setActiveTab(tabId)
      if (config.onTabChange) {
        config.onTabChange(tabId, context)
      }
    },
    handleSubmit: async () => {
      if (isSubmitting) {
        return
      }

      setIsSubmitting(true)
      try {
        if (config.content.type === 'form' && config.content.fields) {
          const validation = validateForm(formData, config.content.fields)
          if (!validation.isValid) {
            setErrors(validation.errors)
            return
          }
        }

        if (config.onSubmit) {
          await config.onSubmit(formData, context)
        }

        onClose()
      } catch (error) {
        console.error('Modal submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    handleClose: () => {
      if (config.onClose) {
        config.onClose(context)
      }
      onClose()
    },
  }

  // Resolve dynamic title and subtitle
  const title = typeof config.title === 'function' ? config.title(context) : config.title
  const subtitle =
    typeof config.subtitle === 'function' ? config.subtitle(context) : config.subtitle

  // Dialog paper styles with config indicator border
  const paperSx = useMemo(
    () => ({
      borderRadius: theme.spacing(1),
      position: 'relative',
      ...(config.behavior.showIndicator && {
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing(1.5),
      }),
      ...(config.styling?.customStyles || {}),
    }),
    [theme, config.behavior.showIndicator, config.styling?.customStyles]
  )

  // Render content based on type
  const renderContent = () => {
    switch (config.content.type) {
      case 'form':
        return config.content.fields ? <FormContent fields={config.content.fields} /> : null

      case 'tabbed':
        return <TabbedContent config={config} />

      case 'custom':
        return config.content.customContent || <Typography>Custom content placeholder</Typography>

      default:
        return <Typography>Unknown content type</Typography>
    }
  }

  return (
    <ModalSystemContext.Provider value={contextValue}>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (config.behavior.disableBackdropClick && reason === 'backdropClick') {
            return
          }
          if (config.behavior.disableEscapeKeyDown && reason === 'escapeKeyDown') {
            return
          }
          contextValue.handleClose()
        }}
        maxWidth={config.styling?.maxWidth || 'sm'}
        fullWidth
        fullScreen={config.behavior.fullScreen}
        scroll={config.behavior.scroll || 'paper'}
        PaperProps={{
          sx: paperSx,
        }}
      >
        {config.behavior.showIndicator && <ConfigIndicator />}

        <DialogTitle
          sx={{
            m: 0,
            p: theme.spacing(3),
            pb: subtitle ? theme.spacing(1) : theme.spacing(3),
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant='h6' component='h2' fontWeight='bold'>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          {config.behavior.dismissible && (
            <IconButton
              aria-label='close'
              onClick={contextValue.handleClose}
              sx={{
                color: theme.palette.grey[500],
                ml: theme.spacing(2),
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            p: theme.spacing(3),
            pt: subtitle ? theme.spacing(2) : theme.spacing(3),
          }}
        >
          {renderContent()}
        </DialogContent>

        {config.actions.buttons.length > 0 && (
          <DialogActions sx={{ p: 0 }}>
            <ActionButtons config={config} />
          </DialogActions>
        )}
      </Dialog>
    </ModalSystemContext.Provider>
  )
}

export type { ModalSystemProps, ModalConfig } from './types'
