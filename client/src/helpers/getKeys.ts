const getKeys = <T extends Record<string, unknown>>(
  resourceList: T[],
  isOrderDetailsList: boolean,
): (keyof T)[] => {
  if (!resourceList || resourceList.length === 0) {
    throw new Error('No list entries !');
  }
  const keys = Object.keys(resourceList[0]) as (keyof T)[];
  const filteredKeys = isOrderDetailsList
    ? keys.filter((key) => key !== 'productId' && key !== 'count')
    : keys;

  return filteredKeys;
};

export default getKeys;
