export interface Client {
  id: string;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
}

export interface Product {
  id: string;
  productPrice: number;
  productName: string;
}

export interface OrderProduct extends Product {
  productId: string;
  productCount: number;
}
export interface ClientFromDatabase extends Client {
  first_name: string;
  id: string;
  address: string;
}

export interface Order {
  orderId: string;
  totalPrice: number;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
  products: OrderProduct[];
}

export interface HasProductId {
  productId: string;
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

export const isOrderProductList = (
  resource: any,
): resource is OrderProduct[] => {
  return Array.isArray(resource) && resource.every(isOrderProduct);
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
