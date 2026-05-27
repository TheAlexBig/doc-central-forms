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
  title: 'Documentos legales guiados.',
  description:
    'Seleccione una plantilla del catálogo, complete sus datos y genere el documento correspondiente.',
};

const featuredPosts = [
  {
    title: 'Compra venta de vehículos',
    description:
      'Contrato de compra venta de vehículo con sección de autenticación notarial para El Salvador.',
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
        maxWidth="lg"
        sx={{
          bgcolor: 'background.paper',
          borderLeft: { md: '1px solid' },
          borderRight: { md: '1px solid' },
          borderColor: 'divider',
          minHeight: 'calc(100vh - 76px)',
          px: { xs: 2.5, sm: 4, md: 7 },
          py: { xs: 4, md: 8 },
        }}
      >
        <MainFeaturedPost post={mainFeaturedPost} />
        <Box id="plantillas" sx={{ mb: 2.5, pt: { xs: 3, md: 5 } }}>
          <Typography color="primary.main" fontWeight={700} variant="overline">
            Catálogo
          </Typography>
          <Typography component="h2" variant="h4">
            Elija una plantilla
          </Typography>
        </Box>
        <Grid container sx={{ mb: { xs: 8, md: 11 } }}>
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
        <Grid container sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          {processSteps.map(([number, title, description]) => (
            <Grid item xs={12} md={4} key={number}>
              <Box
                sx={{
                  bgcolor: number === '02' ? '#f6f8fb' : 'background.paper',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  borderRight: { md: number !== '03' ? '1px solid' : 'none' },
                  height: '100%',
                  px: { xs: 0, md: 4 },
                  py: 4,
                }}
              >
                <Typography
                  color="primary.main"
                  fontWeight={700}
                  sx={{ mb: 2 }}
                >
                  {number}
                </Typography>
                <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                  {title}
                </Typography>
                <Typography color="text.secondary">{description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
