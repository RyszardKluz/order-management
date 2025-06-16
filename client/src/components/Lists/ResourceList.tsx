import ResourceListTable from './ResourceListTable';
import getKeys from '../../helpers/getKeys';
import uniqueById from '../../helpers/uniqueById';
import getResourceId from '../../helpers/getResourceId';
import { useResourceContext } from '../../store/ResourceLContext';

const ResourceList = <T extends Object>() => {
  const { resourceList, isOrderDetailsList } = useResourceContext<T>();

  const filteredResourceList = isOrderDetailsList
    ? uniqueById(resourceList)
    : resourceList;

  const keyList = getKeys(resourceList, isOrderDetailsList);

  const resourceId = getResourceId(resourceList) as keyof T;

  return (
    <ResourceListTable
      resourceId={resourceId}
      resourceList={filteredResourceList}
      keyList={keyList}
    />
  );
};

export default ResourceList;
