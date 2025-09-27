import React from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonVariant = 'text' | 'outlined' | 'contained'
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
export type ActionLayout = 'left' | 'right' | 'split'

export interface ButtonConfig {
  id: string
  label: string
  variant?: ButtonVariant
  color?: ButtonColor
  onClick: () => void | Promise<void>
  disabled?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  position?: 'left' | 'right'
}

export interface FieldConfig {
  id: string
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  disabled?: boolean
  helperText?: string
  error?: boolean
  errorText?: string
  options?: Array<{ label: string; value: string | number }>
  defaultValue?: any
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (_value: string | number | boolean) => string | null
  }
  sx?: any
}

export interface TabConfig {
  id: string
  label: string
  component?: string
  content?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
  badge?: string | number
  icon?: React.ReactNode
}

export interface ContentConfig {
  type: 'form' | 'custom' | 'tabbed'
  component?: string
  fields?: FieldConfig[]
  customContent?: React.ReactNode
}

export interface StylingConfig {
  maxWidth?: ModalSize
  customStyles?: any
  border?: {
    color?: string
    width?: string | number
    style?: string
  }
  spacing?: {
    padding?: string | number
    margin?: string | number
  }
}

export interface BehaviorConfig {
  dismissible: boolean
  showUnsavedWarning?: boolean
  showIndicator?: boolean
  autoFocus?: boolean
  disableBackdropClick?: boolean
  disableEscapeKeyDown?: boolean
  fullScreen?: boolean
  scroll?: 'paper' | 'body'
}

export interface ModalConfig {
  id: string
  type: 'simple' | 'tabbed'
  title: string | ((_context?: Record<string, unknown>) => string)
  subtitle?: string | ((_context?: Record<string, unknown>) => string)

  content: ContentConfig

  tabs?: {
    items: TabConfig[]
    defaultTab: string
    orientation?: 'horizontal' | 'vertical'
    variant?: 'standard' | 'scrollable' | 'fullWidth'
  }

  actions: {
    buttons: ButtonConfig[]
    layout: ActionLayout
    spacing?: number
    fullWidth?: boolean
  }

  behavior: BehaviorConfig
  styling?: StylingConfig

  // Context data passed to dynamic functions
  context?: Record<string, unknown>

  // Event handlers
  onOpen?: (_context?: Record<string, unknown>) => void
  onClose?: (_context?: Record<string, unknown>) => void
  onSubmit?: (_data: ModalFormData, _context?: Record<string, unknown>) => void | Promise<void>
  onChange?: (
    _field: string,
    _value: string | number | boolean,
    _context?: Record<string, unknown>
  ) => void
  onTabChange?: (_tabId: string, _context?: Record<string, unknown>) => void
}

export interface ModalSystemProps {
  config: ModalConfig
  open: boolean
  onClose: () => void
  context?: any
  overrides?: Partial<ModalConfig>
}

export interface ModalFormData {
  [key: string]: string | number | boolean
}

export interface ValidationResult {
  isValid: boolean
  errors: { [fieldName: string]: string }
}

export interface ModalContextValue {
  config: ModalConfig
  formData: ModalFormData
  errors: Record<string, string>
  isSubmitting: boolean
  activeTab?: string
  updateField: (_fieldName: string, _value: string | number | boolean) => void
  setError: (_fieldName: string, _error: string) => void
  clearError: (_fieldName: string) => void
  setActiveTab: (_tabId: string) => void
  handleSubmit: () => void
  handleClose: () => void
}

// Component registry for dynamic components
export interface ComponentRegistry {
  [key: string]: React.ComponentType<any>
}

// Form validation utilities
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  custom?: (value: string | number | boolean) => string | null
}

export interface FormValidationConfig {
  [fieldName: string]: ValidationRule
}
