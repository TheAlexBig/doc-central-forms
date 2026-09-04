import { useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import GetAge from '../Functions/GetAge';
import { DataPerson } from '../Data/DataPerson';
import Header from '../HomePage/Header';
import AgentSection from './Sections/AgentSection';
import PersonSection from './Sections/PersonSection';
import MutualTermsStructure from './Structure/MutualTermsStructure';
import { createMutualPayload } from './MutualPayload';
import MutualReviewPanel from './Panels/MutualReviewPanel';
import ReturnDialog from './Dialogs/ReturnDialog';
import {
  clearMutualDraft,
  readMutualDraft,
  writeMutualDraft,
} from './MutualDraftStorage';

const steps = ['Responsables', 'Deudor', 'Acreedor', 'Condiciones', 'Revisión'];
const emptyPerson = () => ({ ...DataPerson });
const today = () => new Date().toISOString().slice(0, 10);
const currentTime = () => {
  const value = new Date();
  return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
};
const initialTerms = {
  amount: '',
  term: '',
  dueDate: '',
  installmentCount: '1',
  installmentAmount: '',
  paymentBank: '',
  paymentAccount: '',
  monthlyInterest: '',
  defaultInterest: '',
  fundsPurpose: 'gastos personales o consumo personal',
  billOfExchangeGuarantee: false,
  guaranteeDueDate: '',
  administrativeExpenses: '',
  specialDomicile: '',
  signingState: '',
  signingMunicipality: '',
  signingDistrict: '',
  signingDate: today(),
  signingTime: currentTime(),
  identifiesDebtor: 'No',
  identifiesCreditor: 'No',
};
const hasDraftData = ({ agent, preparer, debtor, creditor, terms }) =>
  Boolean(
    agent ||
    preparer ||
    debtor.documento ||
    creditor.documento ||
    terms.amount ||
    terms.term ||
    terms.paymentAccount
  );

export default function Mutual({
  agents,
  people,
  savePerson,
  generateDocument,
}) {
  const [recoveredDraft] = useState(() => readMutualDraft(window.localStorage));
  const recoveredState = recoveredDraft?.state || {};
  const [activeStep, setActiveStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);
  const [exitOpen, setExitOpen] = useState(false);
  const [agent, setAgent] = useState(recoveredState.agent || '');
  const [preparer, setPreparer] = useState(recoveredState.preparer || '');
  const [debtor, setDebtor] = useState({
    ...emptyPerson(),
    ...recoveredState.debtor,
  });
  const [creditor, setCreditor] = useState({
    ...emptyPerson(),
    ...recoveredState.creditor,
  });
  const [terms, setTerms] = useState({
    ...initialTerms,
    ...recoveredState.terms,
  });
  const [autosave, setAutosave] = useState({
    savedAt: recoveredDraft?.savedAt || null,
    recovered: Boolean(recoveredDraft),
    saving: false,
  });
  const skipRecoveredInitialSave = useRef(Boolean(recoveredDraft));
  const [generating, setGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (skipRecoveredInitialSave.current) {
      skipRecoveredInitialSave.current = false;
      return undefined;
    }
    const state = { agent, preparer, debtor, creditor, terms };
    if (!hasDraftData(state)) {
      clearMutualDraft(window.localStorage);
      setAutosave({ savedAt: null, recovered: false, saving: false });
      return undefined;
    }
    setAutosave((current) => ({ ...current, saving: true }));
    const timeout = window.setTimeout(() => {
      const savedAt = new Date().toISOString();
      writeMutualDraft(window.localStorage, state, savedAt);
      setAutosave({ savedAt, recovered: false, saving: false });
    }, 750);
    return () => window.clearTimeout(timeout);
  }, [agent, preparer, debtor, creditor, terms]);

  const discardDraft = () => {
    clearMutualDraft(window.localStorage);
    setAgent('');
    setPreparer('');
    setDebtor(emptyPerson());
    setCreditor(emptyPerson());
    setTerms({
      ...initialTerms,
      signingDate: today(),
      signingTime: currentTime(),
    });
    setActiveStep(0);
    setLastStep(0);
    setAutosave({ savedAt: null, recovered: false, saving: false });
  };
  const next = () => {
    setActiveStep((value) => {
      const nextStep = value + 1;
      setLastStep((last) => Math.max(last, nextStep));
      return nextStep;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const selectStep = (step) => {
    if (!generating && step <= lastStep) {
      setActiveStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const saveParty = (setter) => async (values) => {
    const saved = await savePerson(values);
    if (!saved) return false;
    setter({ ...values, edad: GetAge(values.fecha_nacimiento) });
    return true;
  };
  const generate = async (format) => {
    setGenerating(true);
    setGeneratingFormat(format);
    setMessage({ type: '', text: '' });
    try {
      await generateDocument(
        createMutualPayload({ debtor, creditor, terms, agent }),
        { agent, preparer, debtor, creditor, terms },
        format
      );
      setMessage({
        type: 'success',
        text: 'El mutuo fue generado y descargado correctamente.',
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setGenerating(false);
      setGeneratingFormat('');
    }
  };
  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

  return (
    <>
      <Header title="Central Docs" />
      <Box
        component="main"
        sx={{
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
          py: { xs: 2, md: 3 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'background.paper',
            border: { md: '1px solid' },
            borderColor: 'divider',
            borderRadius: { md: 2 },
            boxShadow: { md: '0 12px 36px rgba(19, 47, 43, 0.07)' },
            minHeight: 'calc(100vh - 104px)',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Stack
            alignItems={{ xs: 'stretch', md: 'flex-start' }}
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Breadcrumbs sx={{ mb: 0.75 }} separator="/">
                <Link color="inherit" href="/" underline="hover">
                  Documentos
                </Link>
                <Typography color="text.secondary" variant="body2">
                  Mutuo
                </Typography>
              </Breadcrumbs>
              <Typography component="h1" variant="h4">
                Mutuo
              </Typography>
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setExitOpen(true)}
            >
              Salir
            </Button>
          </Stack>
          <ReturnDialog
            open={exitOpen}
            handleClose={() => setExitOpen(false)}
          />
          {autosave.recovered && (
            <Alert
              action={
                <Button color="inherit" onClick={discardDraft} size="small">
                  Descartar
                </Button>
              }
              severity="info"
              sx={{ mb: 2 }}
            >
              Se recuperó el borrador de mutuo guardado automáticamente.
            </Alert>
          )}
          {(autosave.saving || autosave.savedAt) && (
            <Typography color="text.secondary" sx={{ mb: 2 }} variant="caption">
              {autosave.saving
                ? 'Guardando borrador...'
                : `Borrador guardado automáticamente a las ${new Intl.DateTimeFormat('es-SV', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(new Date(autosave.savedAt))}`}
            </Typography>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  borderRight: { md: '1px solid' },
                  borderColor: 'divider',
                  pr: { md: 3 },
                  position: { md: 'sticky' },
                  top: { md: 100 },
                }}
              >
                <Typography
                  color="text.secondary"
                  fontWeight={650}
                  sx={{ mb: 1.5 }}
                  variant="overline"
                >
                  {activeStep === steps.length - 1
                    ? 'Revisión final'
                    : steps[activeStep]}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography fontWeight={650} variant="body2">
                    Progreso
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {progress}%
                  </Typography>
                </Stack>
                <LinearProgress
                  value={progress}
                  variant="determinate"
                  sx={{ borderRadius: 1, height: 6, mb: { xs: 2, md: 3 } }}
                />
                <Stepper
                  activeStep={activeStep}
                  nonLinear
                  orientation="vertical"
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  {steps.map((label, index) => (
                    <Step
                      key={label}
                      completed={index < activeStep || index < lastStep}
                    >
                      <StepButton
                        disabled={generating || index > lastStep}
                        onClick={() => selectStep(index)}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <Typography
                  color="text.secondary"
                  sx={{ display: { xs: 'block', md: 'none' } }}
                  variant="body2"
                >
                  Paso actual: {steps[activeStep]}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box
                sx={{
                  minHeight: 560,
                  pl: { md: 2 },
                  py: { xs: 1, md: 0 },
                }}
              >
                {activeStep === 0 && (
                  <AgentSection
                    title="Preparación y autorización"
                    agentProps={{
                      data: agents.data,
                      loading: agents.loading,
                      error: agents.error,
                      selected: agent,
                      preparer,
                      save: setAgent,
                      savePreparer: setPreparer,
                      create: agents.create,
                      update: agents.update,
                      remove: agents.remove,
                    }}
                    click={next}
                  />
                )}
                {activeStep === 1 && (
                  <PersonSection
                    title="Datos del deudor"
                    personProps={{
                      data: debtor,
                      people,
                      occupations: [],
                      excludedDui: creditor.documento,
                      save: saveParty(setDebtor),
                    }}
                    click={next}
                    back={() => setActiveStep(0)}
                  />
                )}
                {activeStep === 2 && (
                  <PersonSection
                    title="Datos del acreedor"
                    personProps={{
                      data: creditor,
                      people,
                      occupations: [],
                      excludedDui: debtor.documento,
                      save: saveParty(setCreditor),
                    }}
                    click={next}
                    back={() => setActiveStep(1)}
                  />
                )}
                {activeStep === 3 && (
                  <MutualTermsStructure
                    data={terms}
                    onSubmit={(values) => {
                      setTerms(values);
                      next();
                    }}
                    onBack={() => setActiveStep(2)}
                  />
                )}
                {activeStep === 4 && (
                  <MutualReviewPanel
                    data={{ agent, preparer, debtor, creditor, terms }}
                    generating={generating}
                    generatingFormat={generatingFormat}
                    message={message}
                    onEdit={selectStep}
                    onGenerate={generate}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
