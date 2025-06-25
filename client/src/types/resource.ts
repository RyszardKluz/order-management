export interface Product {
  id: string;
  price: number;
  title: string;
  productCount?: number;
}

export interface OrderProduct extends Product {
  totalPrice: number;
}

export interface Client {
  first_name: string;
  last_name: string;
  id: string;
  address: string;
}

export interface Order {
  id: string;
  totalPrice: number;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
  products: Product[];
}

export interface HasProductId {
  id: string;
}

export type Resource = Order | Product | Client | OrderProduct;

export const isOrderProduct = (resource: any): resource is OrderProduct[] => {
  return (
    resource !== null &&
    typeof resource === 'object' &&
    typeof resource.productCount === 'number' &&
    typeof resource.id === 'string' &&
    typeof resource.productId === 'string' &&
    typeof resource.productName === 'string' &&
    typeof resource.productPrice === 'number'
  );
};

export const isProduct = (resource: any): resource is Product => {
  return (
    resource !== null &&
    typeof resource === 'object' &&
    typeof resource.id === 'string' &&
    typeof resource.price === 'number' &&
    typeof resource.title === 'string'
  );
};

export const isClient = (resource: any): resource is Client => {
  return (
    resource !== null &&
    typeof resource === 'object' &&
    typeof resource.first_name === 'string' &&
    typeof resource.address === 'string' &&
    typeof resource.id === 'string'
  );
};

export const isOrderProductList = (
  resource: any,
): resource is OrderProduct[] => {
  return Array.isArray(resource) && resource.every(isOrderProduct);
};

export const isProductList = (resource: any): resource is Product[] => {
  return Array.isArray(resource) && resource.every(isProduct);
};

export const isClientList = (resource: any): resource is Client[] => {
  return Array.isArray(resource) && resource.every(isClient);
};
export const hasProductId = (
  resourceList: any,
): resourceList is HasProductId[] => {
  return (
    Array.isArray(resourceList) &&
    resourceList.every((entry) => {
      return entry && typeof entry.productId === 'string';
    })
  );
};
