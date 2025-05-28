const generateMessage = (status, method, resource) => {
  const successActions = {
    POST: 'created',
    DELETE: 'deleted',
    PATCH: 'updated',
    GET: 'loaded',
  };
  const failedActions = {
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
};

export default generateMessage;
