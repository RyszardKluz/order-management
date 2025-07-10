import ResourceListTable from './ResourceListTable';
import getKeys from '../../helpers/getKeys';
import uniqueById from '../../helpers/uniqueById';
import getResourceId from '../../helpers/getResourceId';
import { useResourceContext } from '../../store/ResourceLContext';
import { Resource, Product, isProductList } from '../../types/resource';

const ResourceList = <T extends Resource>() => {
  const { resourceList, columnHeadings } = useResourceContext<T>();

  if (!resourceList || resourceList.length === 0) {
    return (
      <ResourceListTable
        resourceId={''}
        resourceList={[]}
        keyList={[]}
        columnHeadings={columnHeadings}
      />
    );
  }

  if (isProductList(resourceList)) {
    const uniqueOrderProducts = uniqueById(resourceList);

    let keyList: (keyof Product)[] = [];
    let resourceId: keyof Product;

    try {
      keyList = getKeys<Product>(uniqueOrderProducts, true);
      resourceId = getResourceId(uniqueOrderProducts) as keyof Product;

      return (
        <ResourceListTable
          resourceId={resourceId}
          resourceList={uniqueOrderProducts}
          keyList={keyList}
          columnHeadings={columnHeadings}
        />
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return (
          <ResourceListTable
            resourceId={''}
            resourceList={[]}
            keyList={[]}
            columnHeadings={columnHeadings}
          />
        );
      }
    }
  }

  let keyList: (keyof T)[] = [];
  let resourceId: keyof T;

  try {
    keyList = getKeys(resourceList, false);
    resourceId = getResourceId(resourceList) as keyof T;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return <div>Error loading resource list.</div>;
  }

  return (
    <ResourceListTable
      resourceId={resourceId}
      resourceList={resourceList}
      keyList={keyList}
      columnHeadings={columnHeadings}
    />
  );
};

export default ResourceList;
