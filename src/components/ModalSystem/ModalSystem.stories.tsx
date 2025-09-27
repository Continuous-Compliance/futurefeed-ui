import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../theme'
import { ModalSystem } from './ModalSystem'
import { addRoleModalConfig } from '../../configs/addRoleModal.config'
import { complexDocumentModalConfig } from '../../configs/complexDocumentModal.config.tsx'

const meta: Meta<typeof ModalSystem> = {
  title: 'Components/ModalSystem',
  component: ModalSystem,
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
          'A config-driven modal system with visual indicators for testing. Two examples: simple role modal and complex document modal with tabs.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    config: {
      control: false,
      description: 'Modal configuration object',
    },
  },
  args: {
    open: true,
    onClose: () => {},
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Simple "Add New Role" Modal
export const AddNewRoleModal: Story = {
  args: {
    config: addRoleModalConfig,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simple form modal for adding new roles. Size: sm, Fields: Role Name and Description, Blue visual indicator for testing.',
      },
    },
  },
}

// Complex Document Modal with Tabs
export const ComplexDocumentModal: Story = {
  args: {
    config: complexDocumentModalConfig,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complex multi-tab modal. Size: xl, Tabs: Overview, Connect, Task Assignments, Evidence. Blue visual indicator for testing.',
      },
    },
  },
}

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [openRole, setOpenRole] = useState(false)
    const [openDocument, setOpenDocument] = useState(false)

    return (
      <Box sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Modal System Demo
        </Typography>
        <Typography variant='body2' color='text.secondary' paragraph>
          Two modal examples: simple form and complex tabbed interface.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant='contained' onClick={() => setOpenRole(true)}>
            Open Add Role Modal
          </Button>
          <Button variant='contained' onClick={() => setOpenDocument(true)}>
            Open Document Modal
          </Button>
        </Box>

        <ModalSystem
          config={addRoleModalConfig}
          open={openRole}
          onClose={() => setOpenRole(false)}
        />

        <ModalSystem
          config={complexDocumentModalConfig}
          open={openDocument}
          onClose={() => setOpenDocument(false)}
        />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with buttons to open both modal examples.',
      },
    },
  },
}
