import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: { xs: 6, md: 8 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: { sm: 'center' },
          display: { sm: 'flex' },
          justifyContent: 'space-between',
          py: 4,
        }}
      >
        <Typography fontWeight={700}>Central Docs</Typography>
        <Typography color="text.secondary" variant="body2">
          Generación guiada de documentos legales en formato Word y PDF.
        </Typography>
      </Container>
    </Box>
  );
}
