import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

export default function Header(props) {
  const { title } = props;

  return (
    <AppBar
      color="inherit"
      elevation={0}
      position="sticky"
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
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
                borderRadius: 0,
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
            <Box>
              <Typography
                component="span"
                variant="h6"
                sx={{ display: 'block' }}
              >
                {title}
              </Typography>
              <Typography
                color="text.secondary"
                component="span"
                sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 12 }}
              >
                Generador de documentos
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 4 }}>
            <Link href="/#plantillas" underline="none">
              Plantillas
            </Link>
            <Link href="/#proceso" color="text.secondary" underline="none">
              Proceso
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};
