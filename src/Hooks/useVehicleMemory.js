import { useEffect, useState } from 'react';
import {
  listVehicleOptions,
  removeVehicleOption,
  saveVehicle,
} from '../Api/VehiclesApi';

const moveOptionToTop = (options, nextOption) => [
  nextOption,
  ...options.filter(
    (option) => option.toLocaleLowerCase() !== nextOption.toLocaleLowerCase()
  ),
];

export function useVehicleMemory() {
  const [vehicleOptions, setVehicleOptions] = useState({
    colors: [],
    brands: [],
    models: [],
    modelsByBrand: {},
  });
  const [vehicleError, setVehicleError] = useState('');

  useEffect(() => {
    listVehicleOptions()
      .then(setVehicleOptions)
      .catch((error) => setVehicleError(error.message));
  }, []);

  const saveVehicleMemory = async (values) => {
    setVehicleError('');
    try {
      const savedVehicle = await saveVehicle(values);
      setVehicleOptions((currentOptions) => {
        const brandModels =
          currentOptions.modelsByBrand[savedVehicle.marca] || [];
        return {
          colors: moveOptionToTop(currentOptions.colors, savedVehicle.color),
          brands: moveOptionToTop(currentOptions.brands, savedVehicle.marca),
          models: moveOptionToTop(currentOptions.models, savedVehicle.modelo),
          modelsByBrand: {
            ...currentOptions.modelsByBrand,
            [savedVehicle.marca]: moveOptionToTop(
              brandModels,
              savedVehicle.modelo
            ),
          },
        };
      });
      return true;
    } catch (error) {
      setVehicleError(error.message);
      return false;
    }
  };

  const removeVehicleCatalogOption = async (kind, value) => {
    try {
      setVehicleError('');
      setVehicleOptions(await removeVehicleOption(kind, value));
    } catch (error) {
      setVehicleError(error.message);
    }
  };

  return {
    vehicleOptions,
    vehicleError,
    saveVehicleMemory,
    removeVehicleCatalogOption,
  };
}
