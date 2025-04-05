import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Checkbox from '../Checkbox';

const ResourceListTable = ({
  columnHeadings,
  resourceList,
  resourceId,
  hasCheckButton,
  hasCountInput,
  onRowClick,
  onCheckboxClick,
  keyList,
  isOrderDetailsList,
}) => {
  const [productCounts, setProductCounts] = useState({});

  const handleCountChange = (id, value) => {
    if (!hasCountInput) {
      return;
    }
    setProductCounts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {columnHeadings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
          {hasCountInput && !isOrderDetailsList && <th>Confirm</th>}
        </tr>
      </thead>
      <tbody>
        {resourceList.map((resource, index) => (
          <tr
            key={resource[resourceId]}
            onClick={
              hasCheckButton || hasCountInput
                ? undefined
                : () => onRowClick(resource)
            }
          >
            <td>{index + 1}</td>
            {keyList.map((key) => (
              <td key={resource[key]}>{resource[key]}</td>
            ))}

            {hasCountInput && (
              <td>
                <input
                  type="number"
                  style={{ width: '50px', fontSize: '0.8rem', padding: '2px' }}
                  min={1}
                  value={
                    isOrderDetailsList
                      ? resource.productCount || 1
                      : productCounts[resource[resourceId]] || 1
                  }
                  onChange={(e) =>
                    handleCountChange(
                      resource[resourceId],
                      Number(e.target.value),
                    )
                  }
                />
              </td>
            )}
            {hasCheckButton && (
              <td>
                <Checkbox
                  handleClick={() => {
                    onCheckboxClick({
                      ...resource,
                      productCount: productCounts[resource[resourceId]] || 1,
                    });
                  }}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResourceListTable;
