const deleteFromAPI = async (path: string): Promise<unknown> => {
  try {
    const response = await fetch(`http://localhost:5000${path}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default deleteFromAPI;
