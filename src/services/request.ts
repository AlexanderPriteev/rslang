const request = async (
  url: string,
  method = 'GET',
  body: string | null = null,
  headers = { 'Content-type': 'application/json' }
) => {
  const response = await fetch(url, { method, body, headers });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  const data = (await response.json()) as unknown;
  return data;
};

export default request;
