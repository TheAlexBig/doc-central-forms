import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const PropertyViewItem = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle1">
      <b>{label.charAt(0).toUpperCase() + label.slice(1)}: </b> {value}
    </Typography>
  </Grid>
);

export default PropertyViewItem;
