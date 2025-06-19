import { FormEvent } from 'react';
import sendToAPI from '../api/sendToAPI';
import generateMessage from './generateMessage';
import validateInputData from './validateInputData';
import { Method } from '../types/api';
import { ShowToastFunction } from '../types/toast';
import { Resource } from '../types/resource';
import { ResourceFormState } from '../types/form';

const submitHandler = async <T extends Resource>(
  e: FormEvent,
  endpoint: string,
  method: Method,
  resourceData: ResourceFormState,
  resourceDataFields: string[] | null,
  resourceName: string,
  onShowToast: ShowToastFunction,
  onClose: () => void,
  onSubmitSuccess: null | (() => void),
  resetFormFields: null | (() => void),
): Promise<void> => {
  e.preventDefault();

  try {
    if (resourceDataFields) {
      validateInputData(resourceData, resourceDataFields);
    }

    const response: Response = await sendToAPI(endpoint, resourceData, method);

    if (!response.ok) {
      throw new Error(generateMessage('error', method, resourceName));
    }
    onShowToast('success', generateMessage('success', method, resourceName));
    onClose();
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    if (resetFormFields) {
      resetFormFields();
    }
  } catch (error) {
    if (error instanceof Error) {
      onShowToast('danger', error.message);
      return;
    } else {
      onShowToast('danger', 'Something went wrong');
    }
  }
};
export default submitHandler;
