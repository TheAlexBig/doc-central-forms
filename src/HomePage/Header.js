import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import packageInfo from '../../package.json';

export default function Header(props) {
  const { title } = props;
  const location = useLocation();
  const documentRoutes = ['/', '/compra-venta', '/mutuo'];

  return (
    <AppBar
      color="inherit"
      elevation={0}
      position="sticky"
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}
          >
            <Box
              sx={{
                alignItems: 'center',
                bgcolor: 'primary.main',
                borderRadius: 1,
                color: 'common.white',
                display: 'flex',
                fontSize: 17,
                fontWeight: 700,
                height: 42,
                justifyContent: 'center',
                width: 42,
              }}
            >
              C
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box sx={{ alignItems: 'baseline', display: 'flex', gap: 0.75 }}>
                <Typography component="span" variant="h6">
                  {title}
                </Typography>
                <Typography
                  aria-label={`Versión ${packageInfo.version}`}
                  color="text.secondary"
                  component="span"
                  sx={{ fontSize: 11, fontWeight: 650 }}
                >
                  v{packageInfo.version}
                </Typography>
              </Box>
              <Typography
                color="text.secondary"
                component="span"
                sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 12 }}
              >
                Generador de documentos
              </Typography>
            </Box>
          </Box>
          <Box
            component="nav"
            sx={{
              display: 'flex',
              gap: { xs: 1.5, sm: 3 },
              ml: 2,
              overflowX: 'auto',
            }}
          >
            {[
              ['/', 'Documentos'],
              ['/historial', 'Historial'],
              ['/configuracion', 'Configuración'],
            ].map(([to, label]) => (
              <Box
                component={RouterLink}
                key={to}
                to={to}
                sx={{
                  bgcolor:
                    location.pathname === to ||
                    (to === '/' && documentRoutes.includes(location.pathname))
                      ? 'primary.light'
                      : 'transparent',
                  borderRadius: 1,
                  color:
                    location.pathname === to ||
                    (to === '/' && documentRoutes.includes(location.pathname))
                      ? 'primary.dark'
                      : 'text.secondary',
                  fontSize: { xs: 12, sm: 14 },
                  fontWeight: 650,
                  px: { xs: 0.75, sm: 1.25 },
                  py: 0.75,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                  },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};
