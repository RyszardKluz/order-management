const fetchFromAPI = async function (path) {
  try {
    const response = await fetch(`http://localhost:5000${path}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchFromAPI;
