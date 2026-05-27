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

export async function listAgents() {
  const response = await localRequest(
    '/api/v1/agents',
    undefined,
    'No se pudieron cargar los agentes guardados.'
  );
  return response.json();
}

export async function createAgent(agent) {
  const response = await localRequest(
    '/api/v1/agents',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agent),
    },
    'No se pudo guardar el agente.'
  );
  return response.json();
}

export async function updateAgent(id, agent) {
  const response = await localRequest(
    `/api/v1/agents/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agent),
    },
    'No se pudieron guardar los cambios del agente.'
  );
  return response.json();
}

export async function deleteAgent(id) {
  await localRequest(
    `/api/v1/agents/${id}`,
    {
      method: 'DELETE',
    },
    'No se pudo eliminar el agente.'
  );
}
