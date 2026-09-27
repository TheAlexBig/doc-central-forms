import { useEffect, useState } from 'react';
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
import { marriageErrorsForStep, validateMarriageState } from './MarriageRules';
import { resolveMarriageRequirements } from '../Api/DocumentsApi';
import useDraftAutosave from '../Hooks/useDraftAutosave';
import useDocumentWorkflow from '../Hooks/useDocumentWorkflow';

const steps = [
  'Responsables',
  'Contrayente 1',
  'Contrayente 2',
  'Régimen y decisiones',
  'Testigos',
  'Acta y celebración',
];
const reviewStep = steps.length;
const hasMarriageDraftData = ({
  agent,
  partyOne,
  partyTwo,
  witnesses,
  details,
}) =>
  Boolean(
    agent ||
    partyOne.documento ||
    partyTwo.documento ||
    witnesses.some((witness) => witness.documento) ||
    details.deedNumber
  );

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
    recovered.recognizedChildren || []
  );
  const [details, setDetails] = useState({
    ...initialMarriageDetails(),
    ...recovered.details,
    interpreter: {
      ...initialMarriageDetails().interpreter,
      ...recovered.details?.interpreter,
    },
  });
  const [generating, setGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [issues, setIssues] = useState([]);
  const [validatedSteps, setValidatedSteps] = useState([]);
  const {
    activeStep,
    lastStep,
    setActiveStep,
    next,
    back,
    selectStep,
    editStep,
    resetWorkflow,
  } = useDocumentWorkflow({
    reviewStep,
    initialLastStep: recoveredDraft ? reviewStep : 0,
    generating,
  });
  const state = {
    agent,
    preparer,
    partyOne,
    partyTwo,
    witnesses,
    recognizedChildren,
    details,
  };
  const { autosave, resetAutosave } = useDraftAutosave({
    state,
    recoveredDraft,
    hasData: hasMarriageDraftData,
    writeDraft: writeMarriageDraft,
    clearDraft: clearMarriageDraft,
  });
  const fieldErrors = Object.assign(
    {},
    ...validatedSteps.map((step) => marriageErrorsForStep(state, step))
  );

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

  const validateStep = (step) => {
    setValidatedSteps((current) =>
      current.includes(step) ? current : [...current, step]
    );
    const errors = marriageErrorsForStep(state, step);
    if (Object.keys(errors).length) {
      setMessage({
        type: 'error',
        text: 'Revise los campos marcados en rojo antes de continuar.',
      });
      return false;
    }
    setMessage({ type: '', text: '' });
    return true;
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
    resetWorkflow();
    resetAutosave();
    setValidatedSteps([]);
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
      setValidatedSteps([1, 2, 3, 4, 5]);
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
          errors={fieldErrors}
          errorPrefix="partyOne"
          onValidate={() => validateStep(1)}
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
          errors={fieldErrors}
          errorPrefix="partyTwo"
          onValidate={() => validateStep(2)}
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
          errors={fieldErrors}
          onValidate={() => validateStep(3)}
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
          errors={fieldErrors}
          onValidate={() => validateStep(4)}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === 5 && (
        <MarriageCelebrationStructure
          values={details}
          setValues={setDetails}
          errors={fieldErrors}
          onValidate={() => validateStep(5)}
          onBack={back}
          onNext={next}
        />
      )}
      {activeStep === reviewStep && (
        <>
          {issues.length > 0 && (
            <Alert
              severity={
                issues.some((issue) => issue.severity !== 'WARNING')
                  ? 'error'
                  : 'warning'
              }
              sx={{ mb: 2 }}
            >
              <strong>Requisitos detectados:</strong>
              <ul>
                {[...new Set(issues.map((issue) => issue.message))].map(
                  (issue) => (
                    <li key={issue}>{issue}</li>
                  )
                )}
              </ul>
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
