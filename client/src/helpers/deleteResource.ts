import { ShowToastFunction } from '../types/toast';
import deleteFromAPI from '../api/deleteFromAPI';
const deleteResource = async (
  url: string,
  showToast: ShowToastFunction,
  resourceType: string,
) => {
  try {
    const response: Response = await deleteFromAPI(url);

    if (!response.ok) {
      throw new Error(`Failed to update ${resourceType} `);
    }

    showToast('success', `Sucessfuly deleted ${resourceType}`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      showToast('danger', error.message);
    } else showToast('danger', 'Unexpected error occured');
  }
};

export default deleteResource;
