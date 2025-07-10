import deleteResource from './deleteResource';
import generateMessage from './generateMessage';
import { ShowToastFunction } from '../types/toast';
const deleteHandler = async <T>(
  url: string,
  productId: string,
  method: string,
  resource: string,
  onShowToast: ShowToastFunction,
  onClose: () => void,
  fetchProducts: () => void,
): Promise<void> => {
  try {
    const response = await deleteResource(
      `${url}/${productId}`,
      onShowToast,
      resource,
    );
    if (!response) {
      throw new Error('Something went wrong!');
    }
    if (!response.ok) {
      throw new Error(generateMessage('error', method, resource));
    }
    onClose();
    fetchProducts();
    onShowToast('success', generateMessage('success', method, resource));
  } catch (error) {
    if (error instanceof Error) {
      onShowToast('danger', error.message);
    } else {
      onShowToast('danger', 'Unknown error ocured!');
    }
  }
};

export default deleteHandler;
