import deleteFromAPI from '../api/deleteFromAPI';
const deleteResource = async (url, showToast, resourceType) => {
  try {
    const response = await deleteFromAPI(url);

    if (!response.ok) {
      throw new Error(`Failed to update ${resourceType} `);
    }

    showToast('success', `Sucessfuly deleted ${resourceType}`);
    return response;
  } catch (error) {
    showToast('danger', error.message);
  }
};

export default deleteResource;
