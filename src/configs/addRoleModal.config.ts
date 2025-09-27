import type { ModalConfig } from '../components/ModalSystem/types'

export const addRoleModalConfig: ModalConfig = {
  id: 'add-role-modal',
  type: 'simple',
  title: 'Add Role',

  content: {
    type: 'form',
    fields: [
      {
        id: 'role-name',
        name: 'name',
        label: 'Role Name',
        type: 'text',
        placeholder: 'Enter role name',
        required: true,
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        sx: {
          mb: 2, // 16px spacing between fields
        },
      },
      {
        id: 'role-description',
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter description of the role...',
        required: false, // Not required in screenshot
        validation: {
          maxLength: 500,
        },
        sx: {
          mb: 3, // Extra spacing before buttons
        },
      },
    ],
  },

  actions: {
    layout: 'left', // Left-aligned buttons as per screenshot
    buttons: [
      {
        id: 'save-button',
        label: 'SAVE',
        variant: 'contained',
        color: 'primary',
        onClick: async () => {
          console.log('Role data submitted')
          await new Promise(resolve => setTimeout(resolve, 1000))
          console.log('Role saved successfully!')
        },
      },
      {
        id: 'cancel-button',
        label: 'CANCEL',
        variant: 'text',
        color: 'primary',
        onClick: () => {
          console.log('Add role modal cancelled')
        },
      },
    ],
  },

  behavior: {
    dismissible: true,
    showIndicator: true, // Blue visual indicator for testing
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
  },

  styling: {
    maxWidth: 'xs', // More compact width to match screenshot
    customStyles: {
      '& .MuiDialog-paper': {
        minWidth: '400px', // Ensure minimum width
        maxWidth: '480px', // Control maximum width
      },
    },
  },

  onSubmit: async (data, context) => {
    console.log('Role form submitted:', { data, context })
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Role created successfully:', data)
  },
}
