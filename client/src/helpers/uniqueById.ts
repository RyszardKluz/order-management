import { HasProductId } from '../types/resource';

const uniqueById = <T extends HasProductId>(array: T[]): T[] => {
  const filteredResourceList = new Set();

  return array.filter((item) => {
    if (!filteredResourceList.has(item.id)) {
      filteredResourceList.add(item.id);
      return true;
    }
    return false;
  });
};

export default uniqueById;
