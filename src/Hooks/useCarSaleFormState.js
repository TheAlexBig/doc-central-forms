import { useEffect, useRef, useState } from 'react';
import { DataPerson } from '../Data/DataPerson';
import { DataCar } from '../Data/DataCar';
import { DataDetails } from '../Data/DataDetails';
import GetAge from '../Functions/GetAge';
import {
  clearCarSaleDraft,
  readCarSaleDraft,
  writeCarSaleDraft,
} from '../Forms/CarSaleDraftStorage';

export const initialCarSaleState = {
  detailStates: JSON.parse(JSON.stringify(DataDetails)),
  vendorStates: JSON.parse(JSON.stringify(DataPerson)),
  personStates: JSON.parse(JSON.stringify(DataPerson)),
  carStates: JSON.parse(JSON.stringify(DataCar)),
  agentStates: '',
};

const hasFormData = (state) =>
  JSON.stringify(state) !== JSON.stringify(initialCarSaleState);

export function useCarSaleFormState() {
  const [initialAutosave] = useState(() =>
    readCarSaleDraft(window.localStorage)
  );
  const [state, setState] = useState(
    initialAutosave?.state || initialCarSaleState
  );
  const [activeDraft, setActiveDraft] = useState(null);
  const [autosave, setAutosave] = useState({
    savedAt: initialAutosave?.savedAt || null,
    recovered: Boolean(initialAutosave),
    saving: false,
  });
  const skipRecoveredInitialSave = useRef(Boolean(initialAutosave));

  useEffect(() => {
    if (skipRecoveredInitialSave.current) {
      skipRecoveredInitialSave.current = false;
      return undefined;
    }
    if (!hasFormData(state)) {
      clearCarSaleDraft(window.localStorage);
      setAutosave({ savedAt: null, recovered: false, saving: false });
      return undefined;
    }
    setAutosave((current) => ({ ...current, saving: true }));
    const timeout = window.setTimeout(() => {
      const savedAt = new Date().toISOString();
      writeCarSaleDraft(window.localStorage, state, savedAt);
      setAutosave({ savedAt, recovered: false, saving: false });
    }, 750);
    return () => window.clearTimeout(timeout);
  }, [state]);

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
      carStates: {
        ...initialCarSaleState.carStates,
        ...historyItem.draft.carStates,
      },
    });
    setActiveDraft(historyItem);
  };

  const clearHistoryDraft = () => {
    setState(initialCarSaleState);
    setActiveDraft(null);
  };

  const discardAutosavedDraft = () => {
    clearCarSaleDraft(window.localStorage);
    setState(initialCarSaleState);
    setActiveDraft(null);
    setAutosave({ savedAt: null, recovered: false, saving: false });
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
    autosave,
    discardAutosavedDraft,
  };
}
