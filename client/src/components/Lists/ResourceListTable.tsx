import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Checkbox from '../Checkbox';
import { useResourceContext } from '../../store/ResourceLContext';
import { isClientList, Resource, isProductList } from '../../types/resource';

interface HasProductCount {
  productCount: number;
}

type Props<T extends Resource> = {
  resourceId: keyof T;
  resourceList: T[];
  keyList: (keyof T)[];
  columnHeadings: string[];
};

const ResourceListTable = <T extends Resource>({
  resourceList,
  resourceId,
  keyList,
  columnHeadings,
}: Props<T>) => {
  const {
    onCheckboxClick,
    onRowSelect,
    onProductCountChange,
    hasCheckButton,
    hasCountInput,
    isOrderDetailsList,
    isOrderList,
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

  const hasProductCount = (resource: any): resource is HasProductCount => {
    return typeof resource.productCount === 'number';
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
                    isOrderDetailsList && hasProductCount(resource)
                      ? resource.productCount
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
            {hasCheckButton &&
              onCheckboxClick &&
              isProductList(resourceList) && (
                <td>
                  <Checkbox
                    handleClick={() => {
                      onCheckboxClick(
                        {
                          ...resource,
                          productCount:
                            productCounts[String(resource[resourceId])] || 1,
                        },
                        'product',
                      );
                    }}
                  />
                </td>
              )}
            {hasCheckButton &&
              onCheckboxClick &&
              isClientList(resourceList) && (
                <td>
                  <Checkbox
                    handleClick={() => {
                      onCheckboxClick(resource, 'client', '1');
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
