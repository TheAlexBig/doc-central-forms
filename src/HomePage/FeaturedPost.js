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
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: '#f8fafc',
          display: 'block',
          px: { xs: 1.5, sm: 2 },
          py: { xs: 2, md: 2.5 },
          textAlign: 'left',
          width: '100%',
          '&:hover': {
            bgcolor: '#eef4ff',
            borderColor: 'primary.light',
          },
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={2}>
            <Typography
              color="secondary.main"
              fontWeight={700}
              variant="overline"
            >
              Disponible
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography component="h3" variant="h5" sx={{ mb: 1 }}>
              {post.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {post.description}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="caption">
              {post.meta}
            </Typography>
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
    meta: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
