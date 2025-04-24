import fetchFromAPI from '../api/fetchFromAPI';

const fetchResorce = async (url, resourceKey, setResource, showToast) => {
  try {
    const data = await fetchFromAPI(url);

    if (setResource) {
      if (!data) {
        setResource({ [resourceKey]: [] });
      } else {
        setResource({ [resourceKey]: data });
      }
    }

    return data;
  } catch (error) {
    console.log(error);
    if (showToast) {
      showToast('danger', `Failed to fetch ${resourceKey}`);
    }
    if (setResource) {
      setResource({ [resourceKey]: [] });
    }
    throw error;
  }
};

export default fetchResorce;
