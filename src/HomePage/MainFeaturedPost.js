import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import escritorioImage from '../Images/escritorio3.jpg';
import UseClasses from '../Utils/UseClasses';

const styles = (_theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    marginBottom: '4px',
    backgroundImage: escritorioImage,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: '6px',
  },
});

const MainFeaturedPost = (props) => {
  const classes = UseClasses(styles);
  const { post } = props;

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <img style={{ display: 'none' }} src={post.image} alt={post.imageText} />
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};

export default MainFeaturedPost;
