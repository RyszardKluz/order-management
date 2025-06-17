export interface Client {
  clientId: string;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
}

export interface Product {
  productId: string;
  productPrice: number;
  productName: string;
}

export interface OrderProduct extends Product {
  productCount: number;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
  totalPrice: number;
  products: OrderProduct[];
}

export interface HasProductId {
  productId: string;
}

export type Resource = Order | Product | Client;
