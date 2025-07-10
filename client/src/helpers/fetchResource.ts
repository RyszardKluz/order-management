import { ShowToastFunction } from '../types/toast';
import fetchFromAPI from '../api/fetchFromAPI';

const fetchResorce = async <T>(
  url: string,
  resourceKey: string,
  showToast: ShowToastFunction,
): Promise<T[]> => {
  try {
    const data = (await fetchFromAPI(url)) as T[];
    if (data === undefined) {
      throw new Error(`Failed to fetch${resourceKey}`);
    }
    return data;
  } catch (error) {
    showToast('error', `Failed to fetch${resourceKey}`);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else throw new Error('Something went wrong!');
  }
};

export default fetchResorce;
