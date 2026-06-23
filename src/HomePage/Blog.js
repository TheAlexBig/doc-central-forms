import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './Header';
import Footer from './Footer';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';

const mainFeaturedPost = {
  title: 'Documentos legales guiados',
  description:
    'Seleccione una plantilla, complete los datos y genere documentos Word con historial, borradores y valores reutilizables.',
};

const featuredPosts = [
  {
    title: 'Compra venta de vehículos',
    description:
      'Contrato de compra venta de vehículo con sección de autenticación notarial para El Salvador.',
    meta: 'Formulario guiado / Word',
  },
];

const processSteps = [
  ['01', 'Selecciona', 'Elige el tipo de documento disponible en el catálogo.'],
  [
    '02',
    'Completa',
    'Ingresa los datos requeridos mediante un formulario guiado.',
  ],
  ['03', 'Descarga', 'Revisa la información y genera tu documento Word.'],
];

export default function Blog() {
  return (
    <>
      <Header title="Central Docs" />
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: 'background.paper',
          border: { md: '1px solid' },
          borderColor: 'divider',
          boxShadow: { md: '0 12px 36px rgba(15, 23, 42, 0.06)' },
          minHeight: 'calc(100vh - 104px)',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >
        <MainFeaturedPost post={mainFeaturedPost} />
        <Box id="plantillas" sx={{ mb: 2.5, scrollMarginTop: 96 }}>
          <Typography color="primary.main" fontWeight={700} variant="overline">
            Catálogo
          </Typography>
          <Typography component="h2" variant="h4">
            Elija una plantilla
          </Typography>
        </Box>
        <Grid container sx={{ mb: { xs: 6, md: 8 } }}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Box id="proceso" sx={{ mb: 3, scrollMarginTop: 96 }}>
          <Typography color="primary.main" fontWeight={700} variant="overline">
            Flujo simple
          </Typography>
          <Typography component="h2" variant="h4">
            De formulario a documento
          </Typography>
        </Box>
        <Grid container spacing={1.25} sx={{ mb: { xs: 3, md: 4 } }}>
          {processSteps.map(([number, title, description]) => (
            <Grid item xs={12} md={4} key={number}>
              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  height: '100%',
                  px: 2,
                  py: 2.25,
                }}
              >
                <Typography
                  color="primary.main"
                  fontWeight={700}
                  sx={{ mb: 1.5 }}
                >
                  {number}
                </Typography>
                <Typography component="h3" fontWeight={650} sx={{ mb: 0.75 }}>
                  {title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
