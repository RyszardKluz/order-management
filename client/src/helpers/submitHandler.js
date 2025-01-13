import sendToAPI from '../api/sendToAPI'
import generateMessage from './generateMessage';
import validateInputData from './validateInputData';

const submitHandler = async (

  
  e,
  url,
  method,
  resourceData,
  resourceDataFields,
  resource,
  onShowToast,
  onClose,
  fetchProducts,
  resetFormFields
) => {
  e.preventDefault();
  console.log(resourceData)

  try {
    validateInputData(resourceData, resourceDataFields)
    const response = await sendToAPI(
      url,
      resourceData,
      method
    );

    if (!response.ok) {
      throw new Error(generateMessage('error', method, resource));
    }
    onShowToast('success', generateMessage('success', method, resource))
    onClose();
    fetchProducts();
    resetFormFields();
  } catch (error) {
    console.log(error)
    onShowToast('danger', error.message);
    return;
  }
};
export default submitHandler;
