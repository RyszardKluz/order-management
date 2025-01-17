import { Table } from 'react-bootstrap';

import Checkbox from '../Checkbox';
import ResourceListTable from './ResourceListTable';

const ResourceList = ({
  resourceList,
  columnHeadings,
  onRowSelect,
  hasCheckButton,
}) => {
  const getKeys = () => {
    if (!resourceList || resourceList.length === 0) {
      return [];
    }
    return Object.keys(resourceList[0]);
  };

  const keyList = getKeys();

  const resourceId = keyList[0];

  const handleRowClick = (resource) => {
    if (!keyList || keyList.length === 0) {
      return;
    }
    const resourceId = resource[keyList[0]];
    onRowSelect(resourceId);
  };

  console;

  return (
    <ResourceListTable
      columnHeadings={columnHeadings}
      handleRowClick={handleRowClick}
      hasCheckButton={hasCheckButton}
      resourceId={resourceId}
      resourceList={resourceList}
      keyList={keyList}
    />
  );
};

export default ResourceList;
