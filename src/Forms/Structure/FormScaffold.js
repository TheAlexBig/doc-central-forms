import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function FormHeading({ title, description }) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 3,
        pb: 2.5,
      }}
    >
      <Typography component="h2" variant="h5" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {description}
      </Typography>
    </Box>
  );
}

export function FieldGroup({ title, description, children }) {
  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        mb: { xs: 3, md: 3.5 },
        pt: { xs: 2.25, md: 2.75 },
      }}
    >
      <Stack spacing={0.5} sx={{ mb: 2.25 }}>
        <Typography fontWeight={650}>{title}</Typography>
        {description && (
          <Typography color="text.secondary" variant="body2">
            {description}
          </Typography>
        )}
      </Stack>
      <Box
        sx={{
          bgcolor: '#f8fafc',
          border: '1px solid',
          borderColor: '#e3e8ef',
          borderRadius: 1,
          p: { xs: 1.5, sm: 2 },
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
