import { createTheme } from '@mui/material/styles'
import { red, blue, green, orange, grey } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[600], // #1976d2
      light: blue[500],
      dark: blue[700],
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: green[600], // #43a047
      light: green[500],
      dark: green[700],
    },
    warning: {
      main: orange[600], // #fb8c00
      light: orange[500],
      dark: orange[700],
    },
    error: {
      main: red[600], // #e53935
      light: red[500],
      dark: red[700],
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: grey[500],
      600: grey[600],
      700: grey[700],
      800: grey[800],
      900: grey[900],
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8, // Global border radius: 8px
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  components: {
    // Global Modal Styling
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow:
            '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px 24px',
          fontSize: '1.25rem',
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0 24px 16px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px 24px',
          gap: '12px',
        },
      },
    },
    // Global Button Styling
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          height: 40, // Button height: 40px
          fontWeight: 500,
          fontSize: '0.875rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          '&:hover': {
            boxShadow:
              '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    // Global TextField Styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: blue[600],
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
            '&.Mui-required': {
              '& .MuiInputLabel-asterisk': {
                color: red[600],
              },
            },
          },
        },
      },
    },
    // Global Tab Styling
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderBottom: '1px solid #e0e0e0',
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 48,
          padding: '12px 16px', // Tab padding: 16px horizontal, 12px vertical
          fontSize: '0.875rem',
          fontWeight: 500,
          '&.Mui-selected': {
            color: blue[600],
            fontWeight: 600,
          },
        },
      },
    },
    // Global Chip Styling
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 'auto',
          fontSize: '0.75rem',
          fontWeight: 500,
        },
        outlined: {
          borderWidth: 1,
        },
      },
    },
    // Global Card/Paper Styling
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        outlined: {
          borderColor: '#e0e0e0',
        },
      },
    },
  },
})
