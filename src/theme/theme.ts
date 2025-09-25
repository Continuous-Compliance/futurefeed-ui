import { createTheme } from '@mui/material/styles'
import { red, blue, green, orange } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: green[600],
    },
    warning: {
      main: orange[600],
    },
    error: {
      main: red[600],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
  },
})
