import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const Arrow = (props) => (
  <ArrowForwardIcon {...props}>
    <path d="M12.29 6.29 13.7 4.88 20.83 12l-7.12 7.12-1.42-1.41L17 13H3v-2h14z" />
  </ArrowForwardIcon>
);

export default function FeaturedPost({ post }) {
  return (
    <Grid item xs={12}>
      <ButtonBase
        component={RouterLink}
        to="/compra-venta"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          borderTop: '1px solid',
          bgcolor: '#f6f8fb',
          display: 'block',
          px: { xs: 0, sm: 3 },
          py: { xs: 3, md: 4 },
          textAlign: 'left',
          width: '100%',
          '&:hover': { bgcolor: '#edf2ff' },
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography
              color="secondary.main"
              fontWeight={700}
              variant="overline"
            >
              Disponible
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="h3" variant="h5" sx={{ mb: 1 }}>
              {post.title}
            </Typography>
            <Typography color="text.secondary">{post.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                alignItems: 'center',
                color: 'primary.main',
                display: 'flex',
                fontWeight: 650,
                gap: 1,
                justifyContent: { sm: 'flex-end' },
              }}
            >
              Abrir plantilla
              <Arrow fontSize="small" />
            </Box>
          </Grid>
        </Grid>
      </ButtonBase>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
