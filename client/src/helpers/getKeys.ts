import { Resource } from '../types/resource';

const getKeys = <T extends Resource>(
  resourceList: T[],
  isOrderDetailsList: boolean,
): (keyof T)[] => {
  if (isOrderDetailsList) {
  }
  if (!resourceList || resourceList.length === 0) {
    throw new Error('No list entries !');
  }
  const keys = Object.keys(resourceList[0]) as (keyof T)[];
  const filteredKeys = isOrderDetailsList
    ? keys.filter((key) => key !== 'productCount')
    : keys;

  return filteredKeys;
};

export default getKeys;
