import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function FormHeading({ title, description }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Box>
  );
}

export function FieldGroup({ title, description, children }) {
  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        mb: { xs: 3, md: 4 },
        px: { xs: 1.5, sm: 2 },
        pt: { xs: 2.5, md: 3 },
        pb: { xs: 1, md: 1.5 },
        '&:nth-of-type(even)': {
          bgcolor: '#f6f8fb',
        },
      }}
    >
      <Typography fontWeight={650} sx={{ mb: description ? 0.4 : 2 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2.5 }}>
          {description}
        </Typography>
      )}
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
