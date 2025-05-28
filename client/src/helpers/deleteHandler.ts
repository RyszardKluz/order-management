import deleteResource from './deleteResource';
import generateMessage from './generateMessage';



const deleteHandler = async (
  url,
  productId,
  method,
  resource,
  onShowToast,
  onClose,
  fetchProducts,
) => {
  try {
    const response = await deleteResource(
      `${url}/${productId}`,
      onShowToast,
      resource,
    );

    if (!response.ok) {
      throw new Error(generateMessage('error', method, resource));
    }
    onClose();
    fetchProducts();
    onShowToast('success', generateMessage('success', method, resource));
  } catch (error) {
    onShowToast('danger', error.message);
  }
};

export default deleteHandler;
