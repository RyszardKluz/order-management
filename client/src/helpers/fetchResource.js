import fetchFromAPI from '../api/fetchFromAPI';

const fetchResorce = async (url, resourceKey, setResource, showToast) => {
  try {
    const data = await fetchFromAPI(url);
    if (!setResource) {
      return data;
    }
    if (!data) {
      setResource([]);
    }
    setResource({ [resourceKey]: data });
  } catch (error) {
    console.log(error);
    if (showToast) {
      showToast('danger', `Failed to fetch ${resourceKey}`);
    }
    setResource({ [resourceKey]: [] });
    throw error
  }
};

export default fetchResorce;
