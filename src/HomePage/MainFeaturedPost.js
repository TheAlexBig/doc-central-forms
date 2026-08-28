import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MainFeaturedPost = ({ post }) => (
  <Box
    component="section"
    sx={{
      alignItems: 'center',
      bgcolor: 'primary.dark',
      borderRadius: { md: 2 },
      color: 'common.white',
      display: 'flex',
      minHeight: { xs: 310, md: 340 },
      mb: { xs: 4, md: 5 },
      overflow: 'hidden',
      position: 'relative',
      px: { xs: 2.5, sm: 4, md: 5 },
      py: { xs: 4, md: 5 },
      '&::after': {
        border: '70px solid rgba(217, 164, 65, 0.12)',
        borderRadius: '50%',
        content: '""',
        height: 300,
        position: 'absolute',
        right: -100,
        top: -145,
        width: 300,
      },
    }}
  >
    <Box sx={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
      <Typography
        color="secondary.main"
        fontWeight={700}
        sx={{ mb: 1 }}
        variant="overline"
      >
        Central Docs
      </Typography>
      <Typography
        component="h1"
        variant="h1"
        sx={{
          fontSize: { xs: '2.35rem', sm: '3rem', md: '3.5rem' },
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
          color="secondary"
          href="#documentos"
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
