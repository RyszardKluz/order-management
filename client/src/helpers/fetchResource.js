import fetchFromAPI from '../api/fetchFromAPI';

const fetchResorce = async (url, resourceKey, setResource, showToast) => {
  try {
    const data = await fetchFromAPI(url);
    if (!data) {
      setResource([]);
    }
    setResource({ [resourceKey]: data });
  } catch (error) {
    console.log(error);
    showToast('danger', error.message);
    setResource([]);
  }
};

export default fetchResorce;
