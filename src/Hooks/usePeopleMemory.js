import { useEffect, useState } from 'react';
import {
  deletePerson,
  listOccupations,
  listPeople,
  savePerson,
  updatePerson,
} from '../Api/PeopleApi';
import { normalizeDui } from '../Forms/PersonMemory';

export function usePeopleMemory() {
  const [savedPeople, setSavedPeople] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [peopleError, setPeopleError] = useState('');

  const refreshPeopleMemory = async () => {
    const [people, occupations] = await Promise.all([
      listPeople(),
      listOccupations(),
    ]);
    setSavedPeople(people);
    setOccupationOptions(occupations);
  };

  useEffect(() => {
    refreshPeopleMemory().catch((error) => setPeopleError(error.message));
  }, []);

  const savePersonMemory = async (values) => {
    setPeopleError('');
    try {
      const savedPerson = await savePerson(values);
      const savedDui = normalizeDui(savedPerson.documento);
      setSavedPeople((currentPeople) => [
        savedPerson,
        ...currentPeople.filter(
          (currentPerson) => normalizeDui(currentPerson.documento) !== savedDui
        ),
      ]);
      setOccupationOptions((currentOccupations) => [
        savedPerson.oficio,
        ...currentOccupations.filter(
          (occupation) =>
            occupation.toLocaleLowerCase() !==
            savedPerson.oficio.toLocaleLowerCase()
        ),
      ]);
      return true;
    } catch (error) {
      setPeopleError(error.message);
      return false;
    }
  };

  const removeSavedPerson = async (person) => {
    setPeopleError('');
    try {
      await deletePerson(person.documento);
      await refreshPeopleMemory();
    } catch (error) {
      setPeopleError(error.message);
    }
  };

  const updateSavedPerson = async (currentPerson, values) => {
    setPeopleError('');
    try {
      await updatePerson(currentPerson.documento, values);
      await refreshPeopleMemory();
      return true;
    } catch (error) {
      setPeopleError(error.message);
      return false;
    }
  };

  return {
    savedPeople,
    occupationOptions,
    peopleError,
    savePersonMemory,
    removeSavedPerson,
    updateSavedPerson,
    refreshPeopleMemory,
  };
}
