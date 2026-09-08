import { useMemo, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  EmptyState,
  SectionHeader,
  SurfaceRow,
} from '../Forms/Structure/FormScaffold';
import { useDocumentTemplates } from '../Hooks/useDocumentTemplates';

const TEMPLATE_ORDER = [
  'people-document.txt',
  'car-document.txt',
  'document.txt',
  'first-section-end.txt',
  'people-authentic.txt',
  'car-authentic.txt',
  'document-authentic.txt',
  'second-section-end.txt',
  'legal-authentic.txt',
];

const TemplatePreview = ({ content }) => (
  <Box
    sx={{
      bgcolor: 'action.hover',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      lineHeight: 1.8,
      maxHeight: 180,
      overflowY: 'auto',
      p: 2,
    }}
  >
    <Typography component="div" sx={{ whiteSpace: 'pre-wrap' }} variant="body2">
      {content.split(/(:[A-Za-z][A-Za-z0-9]*)/g).map((part, index) =>
        part.startsWith(':') ? (
          <Box
            component="span"
            key={`${part}-${index}`}
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 0.75,
              color: 'primary.contrastText',
              fontFamily: 'monospace',
              fontSize: '0.8em',
              mx: 0.25,
              px: 0.5,
              py: 0.2,
            }}
          >
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </Typography>
  </Box>
);

const TEMPLATE_DOCUMENTS = [
  { id: 'car-sale', label: 'Compraventa de vehículo' },
  { id: 'mutual', label: 'Mutuo' },
  { id: 'marriage', label: 'Matrimonio' },
];

const DocumentTemplateSettings = () => {
  const [documentType, setDocumentType] = useState(TEMPLATE_DOCUMENTS[0].id);
  const selected = TEMPLATE_DOCUMENTS.find(
    (document) => document.id === documentType
  );
  return (
    <Box>
      <TextField
        select
        fullWidth
        size="small"
        label="Tipo de documento"
        value={documentType}
        onChange={(event) => setDocumentType(event.target.value)}
        sx={{ maxWidth: 420, mb: 3 }}
      >
        {TEMPLATE_DOCUMENTS.map((document) => (
          <MenuItem key={document.id} value={document.id}>
            {document.label}
          </MenuItem>
        ))}
      </TextField>
      <TemplateManager
        key={documentType}
        documentType={documentType}
        documentLabel={selected.label}
      />
    </Box>
  );
};

const TemplateManager = ({ documentType, documentLabel }) => {
  const {
    templates,
    busy,
    loading,
    error,
    retry,
    saveTemplate: onSave,
    resetTemplate: onReset,
  } = useDocumentTemplates(documentType);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState('');
  const editorRef = useRef(null);
  const ordered = useMemo(
    () =>
      [...templates].sort((left, right) =>
        documentType === 'car-sale'
          ? TEMPLATE_ORDER.indexOf(left.name) -
            TEMPLATE_ORDER.indexOf(right.name)
          : 0
      ),
    [templates, documentType]
  );

  const visible = ordered
    .map((template, index) => ({ template, index }))
    .filter(
      ({ template }) =>
        `${template.label} ${template.section || ''}`
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()) &&
        (filter === 'all' ||
          (filter === 'custom'
            ? !template.usingDefault
            : template.usingDefault))
    );
  const closeEditor = () => {
    if (busy) return;
    if (
      editing &&
      content !== editing.content &&
      !window.confirm('Hay cambios sin guardar. ¿Deseas descartarlos?')
    )
      return;
    setEditing(null);
  };

  const openEditor = (template) => {
    setEditing(template);
    setContent(template.content);
    setSuccess('');
  };
  const presentVariables = new Set(
    content.match(/:[A-Za-z][A-Za-z0-9]*/g) || []
  );
  const missingVariables = editing
    ? editing.requiredVariables.filter(
        (variable) => !presentVariables.has(variable)
      )
    : [];
  const insertVariable = (variable) => {
    const editor = editorRef.current;
    const start = editor?.selectionStart ?? content.length;
    const end = editor?.selectionEnd ?? start;
    const nextContent = `${content.slice(0, start)}${variable}${content.slice(end)}`;
    setContent(nextContent);
    window.requestAnimationFrame(() => {
      editor?.focus();
      editor?.setSelectionRange(
        start + variable.length,
        start + variable.length
      );
    });
  };

  return (
    <Box>
      <SectionHeader
        title={`Plantilla: ${documentLabel}`}
        description="Edita los bloques que se utilizan al generar nuevos documentos Word y PDF. Los documentos del historial conservan su contenido."
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          size="small"
          label="Buscar bloque"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <TextField
          select
          size="small"
          label="Mostrar"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          sx={{ minWidth: 190 }}
        >
          <MenuItem value="all">Todos los bloques</MenuItem>
          <MenuItem value="custom">Personalizados</MenuItem>
          <MenuItem value="default">Originales</MenuItem>
        </TextField>
      </Stack>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" onClick={retry}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      {loading ? (
        <Typography role="status">Cargando bloques...</Typography>
      ) : (
        <Stack spacing={1}>
          {visible.map(({ template, index }) => {
            const authentic =
              template.section === 'Auténtica' ||
              template.name.includes('authentic') ||
              template.name === 'second-section-end.txt';
            return (
              <SurfaceRow key={template.name}>
                <Stack
                  alignItems={{ xs: 'stretch', sm: 'center' }}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  spacing={1.5}
                >
                  <Stack alignItems="center" direction="row" spacing={1.5}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: authentic ? 'secondary.light' : 'primary.main',
                        borderRadius: 1,
                        color: authentic
                          ? 'secondary.contrastText'
                          : 'primary.contrastText',
                        display: 'flex',
                        flexShrink: 0,
                        fontSize: 13,
                        fontWeight: 700,
                        height: 32,
                        justifyContent: 'center',
                        width: 32,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={650} variant="body2">
                        {template.label}
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        {template.section ||
                          (authentic ? 'Auténtica notarial' : 'Contrato')}{' '}
                        · {template.requiredVariables.length} variables ·{' '}
                        {template.usingDefault
                          ? 'Texto original'
                          : 'Personalizada'}
                      </Typography>
                      {template.condition && (
                        <Typography
                          display="block"
                          color="text.secondary"
                          variant="caption"
                        >
                          {template.condition}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                  <Button
                    onClick={() => openEditor(template)}
                    size="small"
                    variant="outlined"
                  >
                    Abrir bloque
                  </Button>
                </Stack>
              </SurfaceRow>
            );
          })}
        </Stack>
      )}
      {!loading && visible.length === 0 && (
        <EmptyState>No se encontraron bloques.</EmptyState>
      )}
      <Dialog
        fullWidth
        maxWidth="xl"
        onClose={closeEditor}
        open={Boolean(editing)}
        PaperProps={{ sx: { minHeight: { md: '78vh' } } }}
      >
        {editing && (
          <>
            <DialogTitle>
              {documentLabel} · {editing.label}
            </DialogTitle>
            <DialogContent dividers>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              {editing.condition && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {editing.condition}
                </Alert>
              )}
              <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
                Este bloque forma parte de {documentLabel}. Conserva las
                variables obligatorias para que los datos puedan insertarse
                correctamente.
              </Typography>
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={3}>
                  <Box
                    sx={{
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                      p: 2,
                      position: { md: 'sticky' },
                      top: { md: 0 },
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      sx={{ mb: 0.5 }}
                      variant="body2"
                    >
                      Variables del bloque
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 1.5 }}
                      variant="caption"
                    >
                      Coloca el cursor en el texto y selecciona una variable
                      para insertarla.
                    </Typography>
                    <Stack alignItems="flex-start" spacing={1}>
                      {editing.requiredVariables.length === 0 ? (
                        <Typography color="text.secondary" variant="caption">
                          Este bloque no utiliza variables.
                        </Typography>
                      ) : (
                        editing.requiredVariables.map((variable) => {
                          const present = presentVariables.has(variable);
                          return (
                            <Chip
                              color={present ? 'success' : 'warning'}
                              key={variable}
                              label={`${present ? '✓' : '+'} ${variable}`}
                              onClick={() => insertVariable(variable)}
                              size="small"
                              variant={present ? 'outlined' : 'filled'}
                            />
                          );
                        })
                      )}
                    </Stack>
                    {missingVariables.length > 0 && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        Faltan {missingVariables.length} variables.
                      </Alert>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography fontWeight={700} sx={{ mb: 1 }} variant="body2">
                    Contenido editable
                  </Typography>
                  <TextField
                    error={missingVariables.length > 0}
                    fullWidth
                    helperText={`${content.length} caracteres · ${missingVariables.length ? `Faltan: ${missingVariables.join(', ')}` : 'Todas las variables están presentes'}`}
                    inputRef={editorRef}
                    minRows={14}
                    multiline
                    disabled={Boolean(busy)}
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                    InputProps={{
                      sx: {
                        alignItems: 'flex-start',
                        fontFamily: 'Consolas, "Courier New", monospace',
                        fontSize: 14,
                        lineHeight: 1.7,
                      },
                    }}
                  />
                  <Typography
                    fontWeight={700}
                    sx={{ mb: 1, mt: 2.5 }}
                    variant="body2"
                  >
                    Vista rápida
                  </Typography>
                  <TemplatePreview content={content} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button disabled={Boolean(busy)} onClick={closeEditor}>
                Cerrar
              </Button>
              <Button
                disabled={busy === 'template' || editing.usingDefault}
                onClick={async () => {
                  const updated = await onReset(editing.name);
                  if (updated) {
                    setEditing(updated);
                    setContent(updated.content);
                    setSuccess('Bloque restaurado al texto original.');
                  }
                }}
              >
                Restaurar original
              </Button>
              <Button
                disabled={
                  busy === 'template' ||
                  !content.trim() ||
                  content === editing.content ||
                  missingVariables.length > 0
                }
                onClick={async () => {
                  if (missingVariables.length > 0) return;
                  const updated = await onSave(editing.name, content);
                  if (updated) {
                    setEditing(null);
                    setSuccess(
                      'Bloque guardado. Se aplicará a los próximos documentos.'
                    );
                  }
                }}
                variant="contained"
              >
                Guardar bloque
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DocumentTemplateSettings;
