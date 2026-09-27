import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { getStepContent } from './Steps/CarSaleSteps';
import CarSaleReviewPanel from './Panels/CarSaleReviewPanel';
import DocumentWorkflowFrame from './Structure/DocumentWorkflowFrame';
import useDocumentWorkflow from '../Hooks/useDocumentWorkflow';

const steps = [
  'Responsables',
  'Comprador',
  'Vehículo',
  'Vendedor',
  'Firma y venta',
];

export default function CarSale({
  agentProps,
  personProps,
  carProps,
  vendorProps,
  detailProps,
  reviewData,
  autosave = { savedAt: null, recovered: false, saving: false },
  discardAutosavedDraft = () => {},
  generateDocument,
  validateDocument = () => '',
  historyProps = { activeDraft: null, clearDraft: () => {} },
}) {
  const [generating, setGenerating] = useState(false);
  const [generatingFormat, setGeneratingFormat] = useState('');
  const [generationError, setGenerationError] = useState('');
  const [generated, setGenerated] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const workflow = useDocumentWorkflow({
    reviewStep: steps.length,
    initialStep: historyProps.activeDraft ? steps.length : 0,
    initialLastStep: historyProps.activeDraft ? steps.length : 0,
    generating,
  });

  const next = () => {
    setGenerationError('');
    workflow.next();
  };
  const back = () => {
    setGenerationError('');
    setGenerated(false);
    workflow.back();
  };
  const edit = (step) => {
    setGenerationError('');
    setGenerated(false);
    workflow.editStep(step);
  };
  const generate = async (format) => {
    const validationError = validateDocument();
    if (validationError) {
      setGenerationError(validationError);
      return;
    }
    setGenerating(true);
    setGeneratingFormat(format);
    setGenerationError('');
    try {
      await generateDocument(format);
      setGenerated(true);
    } catch (error) {
      setGenerationError(error.message);
    } finally {
      setGenerating(false);
      setGeneratingFormat('');
    }
  };

  return (
    <DocumentWorkflowFrame
      title="Compra venta de vehículos"
      draftLabel="compraventa"
      steps={steps}
      activeStep={workflow.activeStep}
      lastStep={workflow.lastStep}
      generating={generating}
      autosave={autosave}
      exitOpen={exitOpen}
      setExitOpen={setExitOpen}
      onDiscard={discardAutosavedDraft}
      onSelect={workflow.selectStep}
      headerActions={
        historyProps.activeDraft ? (
          <Button
            variant="outlined"
            onClick={() => {
              historyProps.clearDraft();
              setGenerated(false);
              setGenerationError('');
              workflow.resetWorkflow();
            }}
          >
            Cerrar borrador
          </Button>
        ) : null
      }
      notice={
        historyProps.activeDraft ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            Borrador abierto: {historyProps.activeDraft.title}
          </Alert>
        ) : null
      }
    >
      {workflow.activeStep === steps.length ? (
        <CarSaleReviewPanel
          documentData={reviewData}
          generating={generating}
          generatingFormat={generatingFormat}
          generationError={generationError}
          generated={generated}
          onBack={back}
          onEdit={edit}
          onGenerate={generate}
        />
      ) : (
        getStepContent(
          workflow.activeStep,
          { agentProps, personProps, carProps, vendorProps, detailProps },
          next,
          back
        )
      )}
    </DocumentWorkflowFrame>
  );
}
