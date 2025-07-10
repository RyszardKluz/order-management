import { GenerateMessageFuntction } from '../types/toast';

const generateMessage: GenerateMessageFuntction = (
  status,
  method,
  resource,
) => {
  const successActions: Record<string, string> = {
    POST: 'created',
    DELETE: 'deleted',
    PATCH: 'updated',
    GET: 'loaded',
  };
  const failedActions: Record<string, string> = {
    POST: 'create',
    DELETE: 'delete',
    PATCH: 'update',
    GET: 'load',
  };

  if (status === 'success') {
    return `${resource} sucessfully ${successActions[method]}`;
  } else if (status === 'error') {
    return `Failed to ${failedActions[method]} ${resource}. Try again`;
  }
  return '';
};

export default generateMessage;
