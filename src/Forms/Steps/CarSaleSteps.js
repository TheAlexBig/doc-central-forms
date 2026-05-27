import AgentSection from '../Sections/AgentSection';
import PersonSection from '../Sections/PersonSection';
import CarSection from '../Sections/CarSection';
import DetailSection from '../Sections/DetailSection';

export function getStepContent(
  step,
  { agentProps, personProps, carProps, vendorProps, detailProps },
  handleNext,
  handleBack
) {
  const stepComponents = [
    {
      component: (
        <AgentSection
          agentProps={agentProps}
          click={handleNext}
          title="Selección de agente"
        />
      ),
    },
    {
      component: (
        <PersonSection
          personProps={personProps}
          click={handleNext}
          back={handleBack}
          title="Datos del comprador"
        />
      ),
    },
    {
      component: (
        <CarSection
          carProps={carProps}
          click={handleNext}
          back={handleBack}
          title="Datos del vehículo"
        />
      ),
    },
    {
      component: (
        <PersonSection
          personProps={vendorProps}
          click={handleNext}
          back={handleBack}
          title="Datos del vendedor"
        />
      ),
    },
    {
      component: (
        <DetailSection
          detailProps={detailProps}
          click={handleNext}
          back={handleBack}
          title="Firma y condiciones de venta"
        />
      ),
    },
  ];

  if (step >= 0 && step < stepComponents.length) {
    return stepComponents[step].component;
  }
  throw new Error('Unknown step');
}
