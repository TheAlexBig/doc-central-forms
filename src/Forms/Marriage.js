import { useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import GetAge from '../Functions/GetAge';
import AgentSection from './Sections/AgentSection';
import DocumentWorkflowFrame from './Structure/DocumentWorkflowFrame';
import {
  MarriageCelebrationStructure,
  MarriageDecisionsStructure,
  MarriagePartyStructure,
  MarriageWitnessesStructure,
} from './Structure/MarriageStructures';
import MarriageReviewPanel from './Panels/MarriageReviewPanel';
import { createMarriagePayload } from './MarriagePayload';
import {
  clearMarriageDraft,
  readMarriageDraft,
  writeMarriageDraft,
} from './MarriageDraftStorage';
import {
  emptyMarriageParty,
  emptyMarriageWitness,
  initialMarriageDetails,
} from './MarriageState';
import { validateMarriageState } from './MarriageRules';
import { resolveMarriageRequirements } from '../Api/DocumentsApi';

const steps = [
  'Responsables',
  'Contrayente 1',
  'Contrayente 2',
  'Régimen y decisiones',
  'Testigos',
  'Acta y celebración',
];
const reviewStep = steps.length;

export default function Marriage({
  agents,
  people,
  savePerson,
  generateDocument,
}) {
  const [recoveredDraft] = useState(() =>
    readMarriageDraft(window.localStorage)
  );
  const recovered = recoveredDraft?.state || {};
  const [activeStep, setActiveStep] = useState(0);
  const [lastStep, setLastStep] = useState(recoveredDraft ? steps.length : 0);
  const [returnToReview, setReturnToReview] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [agent, setAgent] = useState(recovered.agent || '');
  const [preparer, setPreparer] = useState(recovered.preparer || '');
  const [partyOne, setPartyOne] = useState({
    ...emptyMarriageParty(),
    ...recovered.partyOne,
  });
  const [partyTwo, setPartyTwo] = useState({
    ...emptyMarriageParty(),
    ...recovered.partyTwo,
  });
  const [witnesses, setWitnesses] = useState(
    recovered.witnesses?.length
      ? recovered.witnesses
      : [emptyMarriageWitness(), emptyMarriageWitness()]
  );
  const [recognizedChildren, setRecognizedChildren] = useState(
    recovered.recognizedChildren || recovered.children || []
  );
  const [details, setDetails] = useState({
    ...initialMarriageDetails(),
    ...recovered.details,
    interpreter: {
      ...initialMarriageDetails().interpreter,
      ...recovered.details?.interpreter,
    },
  });
  const [autosave, setAutosave] = useState({
    savedAt: recoveredDraft?.savedAt || null,
    recovered: Boolean(recoveredDraft),
    saving: false,
  });
  const [generating, setGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [issues, setIssues] = useState([]);
  const skipInitialSave = useRef(Boolean(recoveredDraft));
  const state = {
    agent,
    preparer,
    partyOne,
    partyTwo,
    witnesses,
    recognizedChildren,
    details,
  };

  useEffect(() => {
    if (skipInitialSave.current) {
      skipInitialSave.current = false;
      return undefined;
    }
    const hasData =
      agent ||
      partyOne.documento ||
      partyTwo.documento ||
      witnesses.some((witness) => witness.documento) ||
      details.deedNumber;
    if (!hasData) {
      clearMarriageDraft(window.localStorage);
      return undefined;
    }
    setAutosave((current) => ({ ...current, saving: true }));
    const timeout = window.setTimeout(() => {
      const savedAt = new Date().toISOString();
      writeMarriageDraft(
        window.localStorage,
        {
          agent,
          preparer,
          partyOne,
          partyTwo,
          witnesses,
          recognizedChildren,
          details,
        },
        savedAt
      );
      setAutosave({ savedAt, recovered: false, saving: false });
    }, 750);
    return () => window.clearTimeout(timeout);
  }, [
    agent,
    preparer,
    partyOne,
    partyTwo,
    witnesses,
    recognizedChildren,
    details,
  ]);

  useEffect(() => {
    if (activeStep !== reviewStep) return;
    resolveMarriageRequirements(
      createMarriagePayload({
        agent,
        partyOne,
        partyTwo,
        witnesses,
        recognizedChildren,
        details,
      })
    )
      .then((result) => setIssues(result.issues || []))
      .catch((error) =>
        setIssues([{ severity: 'ERROR', message: error.message }])
      );
  }, [
    activeStep,
    agent,
    partyOne,
    partyTwo,
    witnesses,
    recognizedChildren,
    details,
  ]);

  const next = () => {
    const target = returnToReview ? reviewStep : activeStep + 1;
    setReturnToReview(false);
    setLastStep((current) => Math.max(current, target));
    setActiveStep(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const back = () => setActiveStep((current) => Math.max(0, current - 1));
  const selectStep = (step) => {
    if (!generating && step <= lastStep) {
      setActiveStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const editStep = (step) => {
    setReturnToReview(true);
    selectStep(step);
  };
  const discard = () => {
    clearMarriageDraft(window.localStorage);
    setAgent('');
    setPreparer('');
    setPartyOne(emptyMarriageParty());
    setPartyTwo(emptyMarriageParty());
    setWitnesses([emptyMarriageWitness(), emptyMarriageWitness()]);
    setRecognizedChildren([]);
    setDetails(initialMarriageDetails());
    setActiveStep(0);
    setLastStep(0);
    setAutosave({ savedAt: null, recovered: false, saving: false });
  };
  const saveCommonPerson = async (values) => {
    const usesDui =
      !values.identityType ||
      values.identityType.toLocaleLowerCase().includes('documento único');
    if (!usesDui || !/^\d{8}-\d$/.test(values.documento)) return true;
    return savePerson({ ...values, edad: GetAge(values.fecha_nacimiento) });
  };
  const generate = async (format) => {
    const errors = validateMarriageState(state);
    if (errors.length) {
      setMessage({ type: 'error', text: errors.join(' ') });
      return;
    }
    setGenerating(true);
    setGeneratingFormat(format);
    setMessage({ type: '', text: '' });
    try {
      await generateDocument(createMarriagePayload(state), state, format);
      setMessage({
        type: 'success',
        text: 'Expediente matrimonial generado correctamente.',
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setGenerating(false);
      setGeneratingFormat('');
    }
  };

  return (
    <DocumentWorkflowFrame
      title="Matrimonio"
      draftLabel="matrimonio"
      steps={steps}
      activeStep={activeStep}
      lastStep={lastStep}
      generating={generating}
      autosave={autosave}
      exitOpen={exitOpen}
      setExitOpen={setExitOpen}
      onDiscard={discard}
      onSelect={selectStep}
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
        <MarriagePartyStructure
          title="Datos del primer contrayente"
          values={partyOne}
          setValues={setPartyOne}
          people={people}
          savePerson={saveCommonPerson}
          premaritalDate={details.premaritalDate}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === 2 && (
        <MarriagePartyStructure
          title="Datos del segundo contrayente"
          values={partyTwo}
          setValues={setPartyTwo}
          people={people}
          savePerson={saveCommonPerson}
          premaritalDate={details.premaritalDate}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === 3 && (
        <MarriageDecisionsStructure
          values={details}
          setValues={setDetails}
          recognizedChildren={recognizedChildren}
          setRecognizedChildren={setRecognizedChildren}
          interpreterRequired={
            !partyOne.speaksSpanish || !partyTwo.speaksSpanish
          }
          people={people}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === 4 && (
        <MarriageWitnessesStructure
          witnesses={witnesses}
          setWitnesses={setWitnesses}
          people={people}
          savePerson={saveCommonPerson}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === 5 && (
        <MarriageCelebrationStructure
          values={details}
          setValues={setDetails}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === reviewStep && (
        <>
          {issues.some((issue) => issue.severity === 'WARNING') && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {issues
                .filter((issue) => issue.severity === 'WARNING')
                .map((issue) => issue.message)
                .join(' ')}
            </Alert>
          )}
          <MarriageReviewPanel
            data={state}
            generating={generating}
            generatingFormat={generatingFormat}
            message={message}
            onBack={() => setActiveStep(reviewStep - 1)}
            onEdit={editStep}
            onGenerate={generate}
          />
        </>
      )}
    </DocumentWorkflowFrame>
  );
}
