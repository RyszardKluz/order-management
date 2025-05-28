const getKeys = (resourceList, isOrderDetailsList) => {
  if (!resourceList || resourceList.length === 0) {
    return [];
  }
  const keys = Object.keys(resourceList[0]);
  const filteredKeys = isOrderDetailsList
    ? keys.filter((key) => key !== 'productId' && key !== 'count')
    : keys;

  return filteredKeys;
};

export default getKeys;
