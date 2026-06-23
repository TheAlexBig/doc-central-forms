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

export async function listPeople() {
  const response = await localRequest(
    '/api/v1/people',
    undefined,
    'No se pudieron cargar las personas guardadas.'
  );
  return response.json();
}

export async function listOccupations() {
  const response = await localRequest(
    '/api/v1/people/occupations',
    undefined,
    'No se pudieron cargar los oficios guardados.'
  );
  return response.json();
}

export async function savePerson(person) {
  const {
    nombre,
    apellido,
    departamento,
    municipio,
    domicilio,
    fecha_nacimiento,
    documento,
    genero,
    oficio,
  } = person;
  const response = await localRequest(
    '/api/v1/people',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        apellido,
        departamento,
        municipio,
        domicilio,
        fecha_nacimiento,
        documento,
        genero,
        oficio,
      }),
    },
    'No se pudo guardar la persona.'
  );
  return response.json();
}

export async function deletePerson(documento) {
  await localRequest(
    `/api/v1/people/${encodeURIComponent(documento)}`,
    {
      method: 'DELETE',
    },
    'No se pudo remover la persona guardada.'
  );
}
