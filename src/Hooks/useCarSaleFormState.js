import { useState } from 'react';
import { DataPerson } from '../Data/DataPerson';
import { DataCar } from '../Data/DataCar';
import { DataDetails } from '../Data/DataDetails';
import GetAge from '../Functions/GetAge';

export const initialCarSaleState = {
  detailStates: JSON.parse(JSON.stringify(DataDetails)),
  vendorStates: JSON.parse(JSON.stringify(DataPerson)),
  personStates: JSON.parse(JSON.stringify(DataPerson)),
  carStates: JSON.parse(JSON.stringify(DataCar)),
  agentStates: '',
};

export function useCarSaleFormState() {
  const [state, setState] = useState(initialCarSaleState);
  const [activeDraft, setActiveDraft] = useState(null);

  const selectAgent = (agent) => {
    setState((currentState) => ({
      ...currentState,
      agentStates: agent,
    }));
  };

  const clearSelectedAgent = (agentId) => {
    setState((currentState) => ({
      ...currentState,
      agentStates:
        currentState.agentStates?.id === agentId
          ? ''
          : currentState.agentStates,
    }));
  };

  const updateSelectedAgent = (agent) => {
    setState((currentState) => ({
      ...currentState,
      agentStates:
        currentState.agentStates?.id === agent.id
          ? agent
          : currentState.agentStates,
    }));
  };

  const saveBuyer = (values) => {
    setState((currentState) => ({
      ...currentState,
      personStates: {
        ...values,
        edad: GetAge(values.fecha_nacimiento),
      },
    }));
  };

  const saveSeller = (values) => {
    setState((currentState) => ({
      ...currentState,
      vendorStates: {
        ...values,
        edad: GetAge(values.fecha_nacimiento),
      },
    }));
  };

  const saveVehicle = (values) => {
    setState((currentState) => ({
      ...currentState,
      carStates: values,
    }));
  };

  const saveDetails = (values) => {
    setState((currentState) => ({
      ...currentState,
      detailStates: values,
    }));
  };

  const loadHistoryDraft = (historyItem) => {
    setState({
      ...initialCarSaleState,
      ...historyItem.draft,
    });
    setActiveDraft(historyItem);
  };

  const clearHistoryDraft = () => {
    setState(initialCarSaleState);
    setActiveDraft(null);
  };

  return {
    state,
    activeDraft,
    selectAgent,
    clearSelectedAgent,
    updateSelectedAgent,
    saveBuyer,
    saveSeller,
    saveVehicle,
    saveDetails,
    loadHistoryDraft,
    clearHistoryDraft,
  };
}
