import { useState } from 'react';
import GetAge from '../Functions/GetAge';
import { DataPerson } from '../Data/DataPerson';
import { DataCar } from '../Data/DataCar';
import AgentSection from './Sections/AgentSection';
import PersonSection from './Sections/PersonSection';
import CarSection from './Sections/CarSection';
import MutualTermsStructure from './Structure/MutualTermsStructure';
import { createMutualPayload } from './MutualPayload';
import MutualReviewPanel from './Panels/MutualReviewPanel';
import DocumentWorkflowFrame from './Structure/DocumentWorkflowFrame';
import useDraftAutosave from '../Hooks/useDraftAutosave';
import useDocumentWorkflow from '../Hooks/useDocumentWorkflow';
import {
  clearMutualDraft,
  readMutualDraft,
  writeMutualDraft,
} from './MutualDraftStorage';

const baseSteps = ['Responsables', 'Deudor', 'Acreedor', 'Condiciones'];
const emptyPerson = () => ({ ...DataPerson });
const today = () => new Date().toISOString().slice(0, 10);
const currentTime = () => {
  const value = new Date();
  return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
};
const initialTerms = {
  amount: '',
  term: '',
  termMode: 'DURATION',
  termQuantity: '12',
  termUnit: 'MONTHS',
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
  instrumentType: 'PRIVATE_AUTHENTICATED',
  guaranteeType: 'NONE',
  guaranteeDetails: '',
  pledgeValue: '',
  deedNumber: '',
  signingState: '',
  signingMunicipality: '',
  signingDistrict: '',
  signingDate: today(),
  signingTime: currentTime(),
  identifiesDebtor: 'No',
  identifiesCreditor: 'No',
};
const hasDraftData = ({
  agent,
  preparer,
  debtor,
  creditor,
  guarantor,
  pledgedVehicle,
  terms,
}) =>
  Boolean(
    agent ||
    preparer ||
    debtor.documento ||
    creditor.documento ||
    guarantor.documento ||
    pledgedVehicle.placa ||
    terms.amount ||
    terms.term ||
    terms.paymentAccount
  );

export default function Mutual({
  agents,
  people,
  vehicleProps,
  savePerson,
  generateDocument,
}) {
  const [recoveredDraft] = useState(() => readMutualDraft(window.localStorage));
  const recoveredState = recoveredDraft?.state || {};
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
  const [guarantor, setGuarantor] = useState({
    ...emptyPerson(),
    ...recoveredState.guarantor,
  });
  const [pledgedVehicle, setPledgedVehicle] = useState({
    ...DataCar,
    ...recoveredState.pledgedVehicle,
  });
  const [terms, setTerms] = useState({
    ...initialTerms,
    ...recoveredState.terms,
    ...(recoveredState.terms?.termMode
      ? {}
      : recoveredState.terms?.dueDate
        ? { termMode: 'SPECIFIC_DATE' }
        : {}),
  });
  const hasGuarantor = terms.guaranteeType === 'PERSONAL_GUARANTOR';
  const hasVehiclePledge = terms.guaranteeType === 'VEHICLE_PLEDGE';
  const steps = [
    ...baseSteps,
    ...(hasGuarantor
      ? ['Fiador']
      : hasVehiclePledge
        ? ['Vehículo en garantía']
        : []),
  ];
  const reviewStep = steps.length;
  const [generating, setGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const {
    activeStep,
    lastStep,
    returnToReview,
    setActiveStep,
    setReturnToReview,
    next,
    selectStep,
    editStep,
    resetWorkflow,
  } = useDocumentWorkflow({
    reviewStep,
    initialLastStep: recoveredDraft ? reviewStep : 0,
    generating,
  });

  const draftState = {
    agent,
    preparer,
    debtor,
    creditor,
    guarantor,
    pledgedVehicle,
    terms,
  };
  const { autosave, resetAutosave } = useDraftAutosave({
    state: draftState,
    recoveredDraft,
    hasData: hasDraftData,
    writeDraft: writeMutualDraft,
    clearDraft: clearMutualDraft,
  });

  const discardDraft = () => {
    clearMutualDraft(window.localStorage);
    setAgent('');
    setPreparer('');
    setDebtor(emptyPerson());
    setCreditor(emptyPerson());
    setGuarantor(emptyPerson());
    setPledgedVehicle({ ...DataCar });
    setTerms({
      ...initialTerms,
      signingDate: today(),
      signingTime: currentTime(),
    });
    resetWorkflow();
    resetAutosave();
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
        createMutualPayload({
          debtor,
          creditor,
          guarantor,
          pledgedVehicle,
          terms,
          agent,
        }),
        {
          agent,
          preparer,
          debtor,
          creditor,
          guarantor,
          pledgedVehicle,
          terms,
        },
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
  return (
    <DocumentWorkflowFrame
      title="Mutuo"
      draftLabel="mutuo"
      steps={steps}
      activeStep={activeStep}
      lastStep={lastStep}
      generating={generating}
      autosave={autosave}
      exitOpen={exitOpen}
      setExitOpen={setExitOpen}
      onDiscard={discardDraft}
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
            if (returnToReview) {
              const needsGuarantor =
                values.guaranteeType === 'PERSONAL_GUARANTOR' &&
                !guarantor.documento;
              const needsVehicle =
                values.guaranteeType === 'VEHICLE_PLEDGE' &&
                !pledgedVehicle.placa;
              const needsGuaranteeStep = needsGuarantor || needsVehicle;
              setReturnToReview(needsGuaranteeStep);
              setActiveStep(
                needsGuaranteeStep
                  ? baseSteps.length
                  : baseSteps.length +
                      (['PERSONAL_GUARANTOR', 'VEHICLE_PLEDGE'].includes(
                        values.guaranteeType
                      )
                        ? 1
                        : 0)
              );
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              next();
            }
          }}
          onBack={() => setActiveStep(2)}
        />
      )}
      {hasGuarantor && activeStep === 4 && (
        <PersonSection
          title="Datos del fiador o garante"
          personProps={{
            data: guarantor,
            people,
            occupations: [],
            excludedDui: [debtor.documento, creditor.documento],
            save: saveParty(setGuarantor),
          }}
          click={next}
          back={() => setActiveStep(3)}
        />
      )}
      {hasVehiclePledge && activeStep === 4 && (
        <CarSection
          title="Vehículo dado en garantía prendaria"
          carProps={{
            data: pledgedVehicle,
            error: vehicleProps.error,
            options: vehicleProps.options,
            save: async (values) => {
              const saved = await vehicleProps.save(values);
              if (saved !== false) setPledgedVehicle(values);
              return saved;
            },
          }}
          click={next}
          back={() => setActiveStep(3)}
        />
      )}
      {activeStep === reviewStep && (
        <MutualReviewPanel
          data={{
            agent,
            preparer,
            debtor,
            creditor,
            guarantor,
            pledgedVehicle,
            terms,
          }}
          generating={generating}
          generatingFormat={generatingFormat}
          message={message}
          onBack={() => setActiveStep(reviewStep - 1)}
          onEdit={editStep}
          onGenerate={generate}
        />
      )}
    </DocumentWorkflowFrame>
  );
}
