import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const emptyReviewValue = 'Pendiente';

export function ReviewSummary({ title, chips = [] }) {
  return (
    <Box
      sx={{
        bgcolor: 'primary.surface',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 2.5,
        px: { xs: 2, md: 2.5 },
        py: 2,
      }}
    >
      <Stack
        alignItems={{ xs: 'flex-start', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography color="text.secondary" fontWeight={650} variant="body2">
            Resumen del documento
          </Typography>
          <Typography component="h3" fontWeight={750} variant="h5">
            {title}
          </Typography>
        </Box>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {chips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              sx={{ bgcolor: 'background.paper' }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export function ReviewField({ label, value, wide = false }) {
  return (
    <Grid item xs={12} sm={wide ? 12 : 6} md={wide ? 12 : 4}>
      <Typography
        color="text.secondary"
        component="dt"
        fontWeight={650}
        variant="caption"
      >
        {label}
      </Typography>
      <Typography
        component="dd"
        sx={{ m: 0, overflowWrap: 'anywhere' }}
        variant="body2"
      >
        {value || emptyReviewValue}
      </Typography>
    </Grid>
  );
}

export function ReviewSection({
  number,
  title,
  summary,
  rows = [],
  content,
  onEdit,
}) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 2,
        px: { xs: 2, md: 2.5 },
        py: 2.5,
      }}
    >
      <Stack
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1.5}>
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'primary.main',
              borderRadius: 1,
              color: 'primary.contrastText',
              display: 'flex',
              flexShrink: 0,
              fontSize: 13,
              fontWeight: 800,
              height: 34,
              justifyContent: 'center',
              width: 34,
            }}
          >
            {number}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h3" fontWeight={750} variant="h6">
              {title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {summary || emptyReviewValue}
            </Typography>
          </Box>
        </Stack>
        <Button onClick={onEdit} size="small" variant="outlined">
          Editar
        </Button>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {content || (
        <Grid
          columnSpacing={{ xs: 2, md: 3 }}
          component="dl"
          container
          rowSpacing={1.75}
          sx={{ m: 0 }}
        >
          {rows.map(([label, value, wide]) => (
            <ReviewField key={label} label={label} value={value} wide={wide} />
          ))}
        </Grid>
      )}
    </Box>
  );
}
