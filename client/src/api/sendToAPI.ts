const sendToAPI = async <T>(
  path: string,
  body: {},
  method: string,
): Promise<T> => {
  try {
    const response = await fetch(`http://localhost:5000${path}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw new Error();
  }
};

export default sendToAPI;
