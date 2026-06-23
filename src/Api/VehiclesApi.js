const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const requestError = async (response, fallbackMessage) => {
  try {
    const error = await response.json();
    if (error.fields && Object.keys(error.fields).length) {
      return `${fallbackMessage} Revise los campos obligatorios.`;
    }
  } catch (_error) {
    // Use the operation-specific message if the response is not JSON.
  }
  return `${fallbackMessage} Intente nuevamente.`;
};

const localRequest = async (path, options, failureMessage) => {
  let response;
  try {
    response = await fetch(`${apiUrl}${path}`, options);
  } catch (_error) {
    throw new Error(
      `${failureMessage} No se pudo conectar con la aplicación local.`
    );
  }

  if (!response.ok) {
    throw new Error(await requestError(response, failureMessage));
  }
  return response;
};

export async function listVehicleOptions() {
  const response = await localRequest(
    '/api/v1/vehicles/options',
    undefined,
    'No se pudieron cargar las opciones de vehículos.'
  );
  return response.json();
}

export async function saveVehicle(vehicle) {
  const response = await localRequest(
    '/api/v1/vehicles',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placa: vehicle.placa,
        marca: vehicle.marca,
        modelo: vehicle.modelo,
        color: vehicle.color,
        fabricado: vehicle.fabricado,
        capacidad: vehicle.capacidad?.toString() || '',
        dominio: vehicle.dominio,
        clase: vehicle.clase,
        num_motor: vehicle.num_motor,
        num_chasis: vehicle.num_chasis,
        num_vin: vehicle.num_vin,
      }),
    },
    'No se pudo guardar el vehículo.'
  );
  return response.json();
}

export async function removeVehicleOption(kind, value) {
  const response = await localRequest(
    '/api/v1/vehicles/options',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kind, value }),
    },
    'No se pudo remover la opción del catálogo.'
  );
  return response.json();
}
