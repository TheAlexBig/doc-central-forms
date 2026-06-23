import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import desktopImage from '../Images/escritorio3.jpg';

const MainFeaturedPost = ({ post }) => (
  <Box
    component="section"
    sx={{
      alignItems: 'flex-end',
      backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.42)), url(${desktopImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      color: 'common.white',
      display: 'flex',
      minHeight: { xs: 360, md: 420 },
      mb: { xs: 4, md: 5 },
      mx: { xs: -2, sm: -3, md: -4 },
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 3, md: 4 },
    }}
  >
    <Box sx={{ maxWidth: 680 }}>
      <Typography fontWeight={700} sx={{ mb: 1 }} variant="overline">
        Central Docs
      </Typography>
      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', sm: '3.4rem', md: '4rem' },
          lineHeight: 1.05,
          mb: 2,
        }}
      >
        {post.title}
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: 'rgba(255,255,255,0.86)', fontWeight: 400, mb: 3 }}
      >
        {post.description}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button
          component="a"
          href="#plantillas"
          size="large"
          variant="contained"
        >
          Explorar plantillas
        </Button>
        <Button
          component="a"
          href="#proceso"
          size="large"
          sx={{ color: 'common.white' }}
          variant="text"
        >
          Ver proceso
        </Button>
      </Stack>
    </Box>
  </Box>
);

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
