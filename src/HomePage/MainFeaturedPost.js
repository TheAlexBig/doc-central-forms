import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MainFeaturedPost = ({ post }) => (
  <Box
    component="section"
    sx={{
      borderBottom: '1px solid',
      borderColor: 'divider',
      pb: { xs: 6, md: 9 },
      pt: { xs: 2, md: 3 },
    }}
  >
    <Typography
      color="primary.main"
      fontWeight={700}
      sx={{ letterSpacing: '0.16em', mb: 3 }}
      variant="overline"
    >
      Central Docs
    </Typography>
    <Typography
      component="h1"
      variant="h1"
      sx={{
        fontSize: { xs: '3rem', sm: '4.25rem', md: '5.2rem' },
        lineHeight: 1.02,
        maxWidth: 780,
        mb: 3,
      }}
    >
      {post.title}
    </Typography>
    <Typography
      color="text.secondary"
      variant="h6"
      sx={{ fontWeight: 400, lineHeight: 1.7, maxWidth: 570, mb: 5 }}
    >
      {post.description}
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Button component="a" href="#plantillas" size="large" variant="contained">
        Explorar plantillas
      </Button>
      <Button component="a" href="#proceso" size="large" variant="text">
        Conocer el proceso
      </Button>
    </Stack>
  </Box>
);

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
