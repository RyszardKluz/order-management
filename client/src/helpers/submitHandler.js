import sendToAPI from '../api/sendToAPI';
import generateMessage from './generateMessage';
import validateInputData from './validateInputData';

const submitHandler = async (
  e,
  endpoint,
  method,
  resourceData,
  resourceDataFields,
  resourceName,
  onShowToast,
  onClose,
  onSubmitSuccess,
  resetFormFields,
) => {
  e.preventDefault();

  try {
    if (resourceDataFields) {
      validateInputData(resourceData, resourceDataFields);
    }

    const response = await sendToAPI(endpoint, resourceData, method);

    if (!response.ok) {
      throw new Error(generateMessage('error', method, resourceName));
    }
    onShowToast('success', generateMessage('success', method, resourceName));
    onClose();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    resetFormFields();
  } catch (error) {
    onShowToast('danger', error.message);
    return;
  }
};
export default submitHandler;
