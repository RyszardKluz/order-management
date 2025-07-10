const fetchFromAPI = async function <T>(path: string): Promise<T> {
  try {
    const response = await fetch(`http://localhost:5000${path}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unkown error occured! ');
    }
  }
};

export default fetchFromAPI;
