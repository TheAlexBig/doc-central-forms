import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const emptySummary = 'Pendiente';

export function FormHeading({ title, description, eyebrow, summary = [] }) {
  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: 3,
        px: { xs: 2, md: 2.5 },
        py: 2.25,
      }}
    >
      <Stack
        alignItems={{ xs: 'flex-start', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box sx={{ minWidth: 0 }}>
          {eyebrow && (
            <Typography
              color="primary.main"
              fontWeight={700}
              sx={{ mb: 0.25 }}
              variant="overline"
            >
              {eyebrow}
            </Typography>
          )}
          <Typography component="h2" variant="h5" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {description}
          </Typography>
        </Box>
        {summary.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            sx={{ maxWidth: { md: 420 } }}
          >
            {summary.map(({ label, value }) => (
              <Chip
                key={label}
                label={`${label}: ${value || emptySummary}`}
                size="small"
                sx={{ bgcolor: 'background.paper' }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export function FieldGroup({
  title,
  description,
  children,
  accent = '#4f46e5',
}) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        mb: { xs: 3, md: 3.5 },
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: { xs: 1.5, sm: 2 },
          py: 1.75,
        }}
      >
        <Box
          sx={{
            bgcolor: accent,
            borderRadius: 1,
            flexShrink: 0,
            height: 8,
            mt: { sm: 0.8 },
            width: { xs: 42, sm: 8 },
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={700}>{title}</Typography>
          {description && (
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
      <Box
        sx={{
          bgcolor: '#fbfdff',
          p: { xs: 1.5, sm: 2.25 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export function EmptyState({ children }) {
  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        px: 2,
        py: 2.25,
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {children}
      </Typography>
    </Box>
  );
}

export function SectionHeader({ title, description }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
          {description}
        </Typography>
      )}
    </Box>
  );
}

export function SurfaceRow({ children }) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        px: { xs: 1.5, sm: 2 },
        py: 1.5,
      }}
    >
      {children}
    </Box>
  );
}

export function FormActions({ buttons }) {
  return (
    <Stack
      direction={{ xs: 'column-reverse', sm: 'row' }}
      justifyContent="flex-end"
      spacing={1.5}
      sx={{ mt: 3 }}
    >
      {buttons.map((buttonItem) => (
        <Button
          key={buttonItem.text}
          color={buttonItem.color}
          onClick={buttonItem.action}
          type={buttonItem.type}
          variant={buttonItem.variant}
        >
          {buttonItem.text}
        </Button>
      ))}
    </Stack>
  );
}
