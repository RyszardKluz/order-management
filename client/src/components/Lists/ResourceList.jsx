import ResourceListTable from './ResourceListTable';
import { v4 as uuidv4 } from 'uuid';

const ResourceList = ({
  resourceList,
  columnHeadings,
  onRowSelect,
  onCheckboxClick,
  hasCheckButton,
  hasCountInput,
  isOrderDetailsList,
}) => {
  const getResourceId = () => {
    if (!resourceList || resourceList.length === 0) {
      return [];
    }
    const keys = Object.keys(resourceList[0]);
    return keys[0];
  };

  const getKeys = () => {
    if (!resourceList || resourceList.length === 0) {
      return [];
    }
    const keys = Object.keys(resourceList[0]);
    const filteredKeys = isOrderDetailsList
      ? keys.filter((key) => key !== 'productId' && key !== 'count')
      : keys;

    return filteredKeys;
  };

  const keyList = getKeys();

  const resourceId = getResourceId();

  const handleCheckboxClick = (resource) => {
    if (!keyList || keyList.length === 0) {
      return;
    }
    onCheckboxClick(resource);
  };

  const handleRowClick = (resource) => {
    if (!keyList || keyList.length === 0) {
      return;
    }
    const resourceId = resource[keyList[0]];
    onRowSelect(resourceId);
  };

  return (
    <ResourceListTable
      columnHeadings={columnHeadings}
      handleRowClick={handleRowClick}
      handleCheckboxClick={handleCheckboxClick}
      hasCheckButton={hasCheckButton}
      resourceId={resourceId}
      resourceList={resourceList}
      keyList={keyList}
      hasCountInput={hasCountInput}
      isOrderDetailsList={isOrderDetailsList}
    />
  );
};

export default ResourceList;
