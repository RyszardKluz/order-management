const getResourceId = (resourceList) => {
  if (!resourceList || resourceList.length === 0) {
    return [];
  }
  const keys = Object.keys(resourceList[0]);
  return keys[0];
};

export default getResourceId;
