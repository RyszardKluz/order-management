const sendToAPI = async (path: string, body: {}, method: string) => {
  try {
    const response = await fetch(`http://localhost:5000${path}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default sendToAPI;
