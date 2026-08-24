const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const responseMessage = async (response, fallback) => {
  try {
    const body = await response.json();
    return body.message || fallback;
  } catch (_error) {
    return fallback;
  }
};

export async function localRequest(path, options, fallback) {
  let response;
  try {
    response = await fetch(`${apiUrl}${path}`, options);
  } catch (_error) {
    throw new Error(`${fallback} No se pudo conectar con la aplicación local.`);
  }
  if (!response.ok) {
    throw new Error(await responseMessage(response, fallback));
  }
  return response;
}
