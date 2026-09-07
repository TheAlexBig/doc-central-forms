import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { formatMutualDate, formatMutualMoney } from '../MutualFinancialPreview';

const SummaryValue = ({ label, value, emphasized = false }) => (
  <Grid item xs={6} md={3}>
    <Typography color="text.secondary" variant="caption">
      {label}
    </Typography>
    <Typography fontWeight={emphasized ? 750 : 650} variant="body2">
      {value}
    </Typography>
  </Grid>
);

export default function MutualPaymentPlanSummary({ preview }) {
  return (
    <Box
      sx={{
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1.5,
        mt: 2,
        p: { xs: 1.5, sm: 2 },
      }}
    >
      <Typography fontWeight={750} sx={{ mb: 1.5 }} variant="subtitle2">
        Resumen del plan de pagos
      </Typography>
      <Grid container spacing={1.5}>
        <SummaryValue
          label="Capital"
          value={formatMutualMoney(preview.capital)}
        />
        <SummaryValue
          label="Intereses"
          value={formatMutualMoney(preview.interest)}
        />
        <SummaryValue
          label="Total a pagar"
          value={formatMutualMoney(preview.total)}
          emphasized
        />
        <SummaryValue label="Periodicidad" value={preview.periodicity} />
        <SummaryValue
          label="Vencimiento final"
          value={formatMutualDate(preview.dueDate)}
        />
      </Grid>
      <Typography fontWeight={700} sx={{ mb: 1, mt: 2 }} variant="caption">
        Fechas de pago
      </Typography>
      <Stack
        spacing={0}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          maxHeight: 240,
          overflowY: 'auto',
        }}
      >
        {preview.installments.map((installment, index) => (
          <Stack
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            key={`${installment.date}-${index}`}
            spacing={0.5}
            sx={{
              borderBottom:
                index < preview.installments.length - 1 ? '1px solid' : 0,
              borderColor: 'divider',
              px: 1.5,
              py: 1,
            }}
          >
            <Box>
              <Typography fontWeight={700} variant="body2">
                Cuota {index + 1} · {formatMutualDate(installment.date)}
              </Typography>
              <Typography color="text.secondary" variant="caption">
                Capital {formatMutualMoney(installment.capital)} · Interés{' '}
                {formatMutualMoney(installment.interest)}
              </Typography>
            </Box>
            <Typography fontWeight={750} variant="body2">
              {formatMutualMoney(installment.total)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
