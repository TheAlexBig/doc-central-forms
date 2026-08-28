import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#17695d',
      dark: '#132f2b',
      light: '#dff2ea',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d9a441',
      dark: '#a8751f',
      light: '#f4dfb3',
      contrastText: '#132f2b',
    },
    background: {
      default: '#f3f6f2',
      paper: '#fbfcf9',
    },
    text: {
      primary: '#172321',
      secondary: '#60706c',
    },
    divider: '#dce4df',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Libre Franklin", "Segoe UI", sans-serif',
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 700,
      fontFamily: '"Libre Franklin", "Segoe UI", sans-serif',
      letterSpacing: '-0.035em',
    },
    h3: {
      fontWeight: 700,
      fontFamily: '"Libre Franklin", "Segoe UI", sans-serif',
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 700,
      fontFamily: '"Libre Franklin", "Segoe UI", sans-serif',
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 650,
      fontFamily: '"Libre Franklin", "Segoe UI", sans-serif',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontFamily: '"Libre Franklin", "Segoe UI", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.12em',
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
          borderRadius: 7,
          padding: '10px 16px',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 44,
          paddingLeft: 18,
          paddingRight: 18,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: '#ffffff',
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
          },
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
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: '#cbd9d3',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fbfcf9',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '1px solid #dce4df',
          borderRadius: 12,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#edf4f0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#34504a',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        },
      },
    },
  },
});

export default theme;
