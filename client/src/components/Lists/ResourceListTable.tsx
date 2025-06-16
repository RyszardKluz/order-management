import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Checkbox from '../Checkbox';
import { useResourceContext } from '../../store/ResourceLContext';

type HasProductCount = { productCount?: number };

type Props<T extends HasProductCount> = {
  resourceId: keyof T;
  resourceList: T[];
  keyList: (keyof T)[];
};

const ResourceListTable = <T extends HasProductCount>({
  resourceList,
  resourceId,
  keyList,
}: Props<T>) => {
  const {
    onCheckboxClick,
    onRowSelect,
    onProductCountChange,
    hasCheckButton,
    hasCountInput,
    isOrderDetailsList,
    isOrderList,
    columnHeadings,
  } = useResourceContext<T>();

  const [productCounts, setProductCounts] = useState<Record<string, number>>(
    {},
  );

  const getSafeKey = (value: unknown) =>
    typeof value === 'string' || typeof value === 'number'
      ? value
      : String(value);

  const handleCountChange = (id: string, value: number) => {
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
            key={getSafeKey(resource[resourceId])}
            onClick={
              onRowSelect && !(hasCheckButton || hasCountInput || isOrderList)
                ? () => onRowSelect(resource)
                : undefined
            }
          >
            <td>{index + 1}</td>
            {keyList.map((key) => (
              <td key={String(resource[key as keyof T])}>
                {String(resource[key as keyof T])}
              </td>
            ))}

            {hasCountInput && (
              <td>
                <input
                  type="number"
                  style={{ width: '50px', fontSize: '0.8rem', padding: '2px' }}
                  min={1}
                  defaultValue={
                    isOrderDetailsList
                      ? resource.productCount || 1
                      : productCounts[String(resource[resourceId])] || 1
                  }
                  onChange={(e) => {
                    if (onProductCountChange) {
                      onProductCountChange(
                        resource[resourceId] as string,
                        Number(e.target.value),
                      );
                    }
                    handleCountChange(
                      resource[resourceId] as string,
                      Number(e.target.value),
                    );
                  }}
                />
              </td>
            )}
            {hasCheckButton && (
              <td>
                <Checkbox
                  handleClick={() => {
                    onCheckboxClick
                      ? onCheckboxClick({
                          ...resource,
                          productCount:
                            productCounts[String(resource[resourceId])] || 1,
                        })
                      : undefined;
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
