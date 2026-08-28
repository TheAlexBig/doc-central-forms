import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../HomePage/Header';

export default function GlobalPageLayout({ children }) {
  return (
    <>
      <Header title="Central Docs" />
      <Box
        component="main"
        sx={{
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
          py: { xs: 2, md: 3 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'background.paper',
            border: { md: '1px solid' },
            borderColor: 'divider',
            borderRadius: { md: 2 },
            boxShadow: { md: '0 12px 36px rgba(19, 47, 43, 0.07)' },
            minHeight: 'calc(100vh - 104px)',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, md: 3 },
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
}
