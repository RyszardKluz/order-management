import fetchFromAPI from '../api/fetchFromAPI';
import generateMessage from './generateMessage';

const searchResource = async (
  url,
  searchValue,
  setResource,
  showToast,
  resource,
  method,
) => {
  try {
    let resourceKey;

    if (resource === 'Product') {
      resourceKey = 'products';
    } else if (resource === 'Client') {
      resourceKey = 'clients';
    } else {
      resourceKey = 'orders';
    }

    const data = await fetchFromAPI(
      `${url}?query=${encodeURIComponent(searchValue)}`,
    );
    if (searchValue.toString().trim() === '') {
      throw new Error('Enter any value');
    }
    if (!data) {
      showToast('danger', generateMessage('error', method, resource));
      setResource({ [resourceKey]: [] });
      return;
    }
    setResource({ [resourceKey]: data });
    showToast('success', generateMessage('success', method, resource));
  } catch (error) {
    showToast('danger', error.message);
  }
};

export default searchResource;
