import React from 'react'
import {
  Typography,
  Box,
  Chip,
  Avatar,
  Rating,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  Paper,
  TextField,
  IconButton,
  Alert,
  InputAdornment,
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import {
  CalendarToday,
  Person,
  Assignment,
  AttachFile,
  StarBorder,
  Star,
  Close,
  Search,
  Add,
  Edit,
  Visibility,
} from '@mui/icons-material'
import type { ModalConfig } from '../components/ModalSystem/types'

// RACI Avatar Component
const RACIAvatar: React.FC<{ letter: string; name: string; role: string }> = ({
  letter,
  name,
  role,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Avatar
      sx={{
        width: 32,
        height: 32,
        bgcolor: 'primary.main',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        mr: 2,
      }}
    >
      {letter}
    </Avatar>
    <Box>
      <Typography variant='body2' fontWeight={500}>
        {name}
      </Typography>
      <Typography variant='caption' color='text.secondary'>
        {role}
      </Typography>
    </Box>
  </Box>
)

// Overview Tab Content - 3 Equal Column Layout
const OverviewTabContent = () => (
  <Box sx={{ p: 3, display: 'flex', gap: 3 }}>
    {/* Column 1 - Equal Width */}
    <Box sx={{ flex: 1 }}>
      {/* Document Title */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant='subtitle2'
          gutterBottom
          sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
        >
          Document Title
        </Typography>
        <TextField
          fullWidth
          value='Business Continuity and Disaster Recovery Plan'
          size='small'
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '0.875rem',
              bgcolor: 'grey.50',
            },
          }}
        />
      </Box>

      {/* RACI Section */}
      <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Typography variant='subtitle1' gutterBottom fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          RACI
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            R
          </Avatar>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            A
          </Avatar>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            C
          </Avatar>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            I
          </Avatar>
        </Box>
      </Paper>

      {/* Accountable Oversight */}
      <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Typography variant='subtitle1' gutterBottom fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Accountable Oversight
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Person sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
          <Box>
            <Typography variant='body2' fontWeight={500} sx={{ fontSize: '0.875rem' }}>
              Incident Team Lead
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ fontSize: '0.75rem' }}>
              Dimitris Dovinos
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Notes */}
      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Typography variant='subtitle1' gutterBottom fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Notes
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder='Add notes here...'
          size='small'
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '0.875rem',
              bgcolor: 'grey.50',
            },
          }}
        />
      </Paper>
    </Box>

    {/* Column 2 - Equal Width */}
    <Box sx={{ flex: 1 }}>
      {/* Live Document */}
      <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Typography variant='subtitle1' gutterBottom fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Live Document
        </Typography>
        <Box
          sx={{
            height: 250,
            bgcolor: 'grey.50',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'grey.200',
            mb: 2,
          }}
        >
          <Typography color='text.secondary' sx={{ fontSize: '0.875rem', mb: 2 }}>
            PDF Preview
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                bgcolor: 'grey.100',
                border: '1px solid',
                borderColor: 'grey.300',
                '&:hover': { bgcolor: 'grey.200' },
              }}
            >
              <Visibility sx={{ fontSize: '1rem' }} />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: 'grey.100',
                border: '1px solid',
                borderColor: 'grey.300',
                '&:hover': { bgcolor: 'grey.200' },
              }}
            >
              <Edit sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Attachments */}
      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AttachFile sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
          <Typography variant='subtitle1' fontWeight={600} sx={{ fontSize: '0.875rem' }}>
            Attachments
          </Typography>
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ fontSize: '0.875rem' }}>
          No attachments
        </Typography>
      </Paper>
    </Box>

    {/* Column 3 - Equal Width */}
    <Box sx={{ flex: 1 }}>
      {/* Ratings */}
      <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Typography variant='subtitle1' gutterBottom fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Ratings
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' gutterBottom sx={{ fontSize: '0.875rem' }}>
            Suitability
          </Typography>
          <Rating
            value={3}
            readOnly
            emptyIcon={<StarBorder />}
            icon={<Star />}
            sx={{ fontSize: '1.25rem' }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' gutterBottom sx={{ fontSize: '0.875rem' }}>
            Experience
          </Typography>
          <Rating
            value={0}
            readOnly
            emptyIcon={<StarBorder />}
            icon={<Star />}
            sx={{ fontSize: '1.25rem' }}
          />
          <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.75rem' }}>
            No rating yet
          </Typography>
        </Box>

        <Typography variant='subtitle2' fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Overall Rating
        </Typography>
      </Paper>

      {/* Calendar */}
      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarToday sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
          <Typography variant='subtitle1' fontWeight={600} sx={{ fontSize: '0.875rem' }}>
            Next Review Date
          </Typography>
        </Box>

        <Typography variant='body2' fontWeight={500} gutterBottom sx={{ fontSize: '0.875rem' }}>
          November 2023
        </Typography>

        {/* Mock Calendar Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
            textAlign: 'center',
            mb: 2,
          }}
        >
          {/* Week headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <Typography
              key={day}
              variant='caption'
              sx={{ p: 0.5, fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}
            >
              {day}
            </Typography>
          ))}

          {/* Calendar days */}
          {Array.from({ length: 30 }, (_, i) => {
            const day = i + 1
            const isSelected = day === 19 // November 19 selected
            return (
              <Box
                key={day}
                sx={{
                  p: 0.5,
                  borderRadius: '50%',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'white' : 'text.primary',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.main' : 'grey.100',
                  },
                }}
              >
                {day}
              </Box>
            )
          })}
        </Box>

        <Typography
          variant='body2'
          color='primary.main'
          fontWeight={500}
          sx={{ fontSize: '0.875rem' }}
        >
          Sun, Nov 19
        </Typography>
      </Paper>
    </Box>
  </Box>
)

// Connect Tab Content
const ConnectTabContent = () => (
  <Box sx={{ p: 3 }}>
    {/* Blue Info Banner */}
    <Alert
      severity='info'
      sx={{
        mb: 3,
        bgcolor: 'info.light',
        '& .MuiAlert-message': { fontSize: '0.875rem' },
      }}
    >
      This feature is part of a Preview Release of FutureFeed Maintain...
    </Alert>

    {/* Manage Tags */}
    <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
      <Typography variant='subtitle1' gutterBottom fontWeight={600} sx={{ fontSize: '0.875rem' }}>
        Manage Tags
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label='CMMC'
          size='small'
          sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', fontWeight: 500 }}
        />
        <Chip
          label='CMMC'
          size='small'
          sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', fontWeight: 500 }}
        />
      </Box>
    </Paper>

    {/* Leaders Section */}
    <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='subtitle1' fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Leaders
        </Typography>
        <Button size='small' startIcon={<Add />} sx={{ fontSize: '0.75rem' }}>
          Add Leader
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
        <Typography variant='caption' sx={{ flex: 1 }}>
          Name
        </Typography>
        <Typography variant='caption' sx={{ flex: 1 }}>
          Role
        </Typography>
        <Typography variant='caption' sx={{ flex: 1 }}>
          Actions
        </Typography>
      </Box>
      <Divider />
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ p: 2, textAlign: 'center', fontSize: '0.875rem' }}
      >
        No leaders assigned
      </Typography>
    </Paper>

    {/* Followers Section */}
    <Paper sx={{ p: 2, border: '1px solid', borderColor: 'grey.200' }} variant='outlined'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant='subtitle1' fontWeight={600} sx={{ fontSize: '0.875rem' }}>
          Followers
        </Typography>
        <Button size='small' startIcon={<Add />} sx={{ fontSize: '0.75rem' }}>
          Add Follower
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
        <Typography variant='caption' sx={{ flex: 1 }}>
          Name
        </Typography>
        <Typography variant='caption' sx={{ flex: 1 }}>
          Role
        </Typography>
        <Typography variant='caption' sx={{ flex: 1 }}>
          Actions
        </Typography>
      </Box>
      <Divider />
      <Typography
        variant='body2'
        color='text.secondary'
        sx={{ p: 2, textAlign: 'center', fontSize: '0.875rem' }}
      >
        No followers assigned
      </Typography>
    </Paper>
  </Box>
)

// Task Assignments Tab Content
const TaskAssignmentsTabContent = () => (
  <Box sx={{ p: 3 }}>
    {/* Blue Info Banner */}
    <Alert
      severity='info'
      sx={{
        mb: 3,
        bgcolor: 'info.light',
        '& .MuiAlert-message': { fontSize: '0.875rem' },
      }}
    >
      This feature is part of a Preview Release of FutureFeed Maintain...
    </Alert>

    {/* Search and Button Row */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <TextField
        placeholder='Search tasks...'
        size='small'
        sx={{
          width: 300,
          '& .MuiOutlinedInput-root': { fontSize: '0.875rem' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search sx={{ fontSize: '1rem' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button variant='contained' startIcon={<Assignment />} sx={{ fontSize: '0.875rem' }}>
        ASSIGN NEW TASK
      </Button>
    </Box>

    {/* No Tasks Message */}
    <Paper
      sx={{ p: 4, border: '1px solid', borderColor: 'grey.200', textAlign: 'center' }}
      variant='outlined'
    >
      <Typography variant='body1' color='text.secondary' sx={{ fontSize: '0.875rem' }}>
        No outstanding tasks found
      </Typography>
    </Paper>
  </Box>
)

// Evidence Tab Content
const EvidenceTabContent = () => (
  <Box sx={{ p: 3 }}>
    {/* Blue Info Banner */}
    <Alert
      severity='info'
      sx={{
        mb: 3,
        bgcolor: 'info.light',
        '& .MuiAlert-message': { fontSize: '0.875rem' },
      }}
    >
      This feature is part of a Preview Release of FutureFeed Maintain...
    </Alert>

    {/* Search and Button Row */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <TextField
        placeholder='Search evidence...'
        size='small'
        sx={{
          width: 300,
          '& .MuiOutlinedInput-root': { fontSize: '0.875rem' },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search sx={{ fontSize: '1rem' }} />
            </InputAdornment>
          ),
        }}
      />
      <Button variant='contained' startIcon={<AttachFile />} sx={{ fontSize: '0.875rem' }}>
        ADD EVIDENCE
      </Button>
    </Box>

    {/* No Evidence Message */}
    <Paper
      sx={{ p: 4, border: '1px solid', borderColor: 'grey.200', textAlign: 'center' }}
      variant='outlined'
    >
      <Typography variant='body1' color='text.secondary' sx={{ fontSize: '0.875rem' }}>
        No evidence found
      </Typography>
    </Paper>
  </Box>
)

// Main Modal Content with TabContext
const ComplexModalContent = () => {
  const [tabValue, setTabValue] = React.useState('overview')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Box>
      {/* Modal Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant='h5' fontWeight={600} gutterBottom>
            Business Continuity and Disaster Recovery Plan
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='body2' color='text.secondary'>
              Plans
            </Typography>
            <Button size='small' sx={{ minWidth: 'auto', p: 0.5, fontSize: '0.75rem' }}>
              change
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            label='ACTIVE'
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              '& .MuiChip-label': { color: 'white' },
            }}
            size='small'
          />
          <Chip
            label='DRAFT'
            variant='outlined'
            sx={{
              borderColor: 'grey.400',
              color: 'text.primary',
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
            size='small'
          />
          <IconButton size='small' sx={{ ml: 1 }}>
            <Close />
          </IconButton>
        </Box>
      </Box>

      {/* Tab System */}
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} sx={{ px: 3 }}>
            <Tab label='OVERVIEW' value='overview' sx={{ px: 4, fontSize: '0.875rem' }} />
            <Tab label='CONNECT' value='connect' sx={{ px: 4, fontSize: '0.875rem' }} />
            <Tab
              label='TASK ASSIGNMENTS (CREATE EVIDENCE)'
              value='tasks'
              sx={{ px: 4, fontSize: '0.875rem' }}
            />
            <Tab label='EVIDENCE' value='evidence' sx={{ px: 4, fontSize: '0.875rem' }} />
          </TabList>
        </Box>

        <TabPanel value='overview' sx={{ p: 0 }}>
          <OverviewTabContent />
        </TabPanel>
        <TabPanel value='connect' sx={{ p: 0 }}>
          <ConnectTabContent />
        </TabPanel>
        <TabPanel value='tasks' sx={{ p: 0 }}>
          <TaskAssignmentsTabContent />
        </TabPanel>
        <TabPanel value='evidence' sx={{ p: 0 }}>
          <EvidenceTabContent />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export const complexDocumentModalConfig: ModalConfig = {
  id: 'complex-document-modal',
  type: 'simple',
  title: '', // Empty title since we have custom header

  content: {
    type: 'custom',
    customContent: React.createElement(ComplexModalContent),
  },

  actions: {
    layout: 'right',
    buttons: [
      {
        id: 'close-button',
        label: 'CLOSE',
        variant: 'text',
        color: 'primary',
        onClick: () => {
          console.log('Complex document modal closed')
        },
      },
      {
        id: 'save-button',
        label: 'SAVE CHANGES',
        variant: 'contained',
        color: 'primary',
        onClick: () => {
          console.log('Document changes saved')
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
    maxWidth: 'xl', // Extra large size
    customStyles: {
      '& .MuiDialog-paper': {
        minHeight: '80vh',
        maxHeight: '90vh',
      },
    },
  },
}
