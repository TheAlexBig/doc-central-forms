import React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Header from './Header';
import FeaturedPost from './FeaturedPost';

const featuredPosts = [
  {
    title: 'Compra venta de vehículos',
    description:
      'Contrato de compra venta de vehículo con sección de autenticación notarial para El Salvador.',
    meta: 'Formulario guiado / Word y PDF',
  },
];

const quickLinks = [
  {
    title: 'Historial de documentos',
    description: 'Consulte, descargue o retome documentos anteriores.',
    to: '/historial',
  },
  {
    title: 'Datos y configuración',
    description:
      'Administre personas, vehículos, profesionales, colaboradores y plantillas.',
    to: '/configuracion',
  },
];

export default function Blog() {
  return (
    <>
      <Header title="Central Docs" />
      <Box
        component="main"
        sx={{
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 76px)',
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Box id="documentos" sx={{ mb: 3, scrollMarginTop: 96 }}>
            <Typography
              color="primary.main"
              fontWeight={700}
              variant="overline"
            >
              Espacio de trabajo
            </Typography>
            <Typography component="h1" variant="h4">
              ¿Qué necesita hacer?
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.75 }}>
              Cree un documento nuevo o continúe con información guardada.
            </Typography>
          </Box>

          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  height: '100%',
                  p: { xs: 2, md: 3 },
                }}
              >
                <Typography component="h2" variant="h6" sx={{ mb: 0.5 }}>
                  Crear documento
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mb: 2 }}
                >
                  Seleccione uno de los documentos disponibles.
                </Typography>
                <Grid container>
                  {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  height: '100%',
                  p: { xs: 2, md: 3 },
                }}
              >
                <Typography component="h2" variant="h6" sx={{ mb: 1.5 }}>
                  Accesos rápidos
                </Typography>
                {quickLinks.map((link) => (
                  <ButtonBase
                    component={RouterLink}
                    key={link.to}
                    to={link.to}
                    sx={{
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      display: 'block',
                      py: 1.75,
                      textAlign: 'left',
                      width: '100%',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    <Typography fontWeight={650}>{link.title}</Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ mt: 0.4 }}
                    >
                      {link.description}
                    </Typography>
                  </ButtonBase>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
