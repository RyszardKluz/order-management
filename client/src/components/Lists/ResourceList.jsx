import ResourceListTable from './ResourceListTable';
import getKeys from '../../helpers/getKeys';
import uniqueById from '../../helpers/uniqueById';
import getResourceId from '../../helpers/getResourceId';

const ResourceList = ({
  resourceList,
  columnHeadings,
  onRowSelect,
  onCheckboxClick,
  hasCheckButton,
  hasCountInput,
  isOrderDetailsList,
}) => {
  const filteredResourceList = isOrderDetailsList
    ? uniqueById(resourceList)
    : resourceList;

  const keyList = getKeys(resourceList, isOrderDetailsList);

  const resourceId = getResourceId(resourceList);

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
      onRowClick={handleRowClick}
      onCheckboxClick={handleCheckboxClick}
      hasCheckButton={hasCheckButton}
      resourceId={resourceId}
      resourceList={filteredResourceList}
      keyList={keyList}
      hasCountInput={hasCountInput}
      isOrderDetailsList={isOrderDetailsList}
    />
  );
};

export default ResourceList;
