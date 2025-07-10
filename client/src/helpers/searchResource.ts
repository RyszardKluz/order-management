import fetchFromAPI from '../api/fetchFromAPI';
import { ShowToastFunction } from '../types/toast';
import generateMessage from './generateMessage';

const searchResource = async <T>(
  url: string,
  searchValue: string,
  showToast: ShowToastFunction,
  resource: string,
  method: string,
): Promise<T> => {
  try {
    const data = await fetchFromAPI<T>(
      `${url}?query=${encodeURIComponent(searchValue)}`,
    );
    if (searchValue.toString().trim() === '') {
      throw new Error('Enter any value');
    }
    if (!data) {
      showToast('danger', generateMessage('error', method, resource));
      throw new Error('No data found');
    }
    showToast('success', generateMessage('success', method, resource));
    return data;
  } catch (error) {
    if (error instanceof Error) {
      showToast('danger', error.message);
      throw error;
    } else {
      showToast('danger', 'Something went wrong');
      throw new Error('Something went wrong');
    }
  }
};

export default searchResource;
