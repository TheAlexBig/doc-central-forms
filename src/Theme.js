import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      dark: '#3730a3',
      light: '#eef2ff',
    },
    secondary: {
      main: '#0f766e',
      dark: '#115e59',
    },
    background: {
      default: '#eef2f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
    divider: '#d5dde7',
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.045em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.035em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 650,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
  },
});

export default theme;
