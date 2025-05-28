const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(`http://localhost:5000${url}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchFromAPI;
