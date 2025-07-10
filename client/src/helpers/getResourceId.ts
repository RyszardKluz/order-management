import { Resource } from '../types/resource';

const getResourceId = <T extends Resource>(resourceList: T[]): string => {
  if (!resourceList || resourceList.length === 0) {
    throw new Error('Empty list');
  }
  const keys = Object.keys(resourceList[0]);
  return keys[0] as string;
};

export default getResourceId;
