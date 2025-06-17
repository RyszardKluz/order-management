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
  orderId: string;
  totalPrice: number;
  clientId: string;
  products: OrderProduct[];
}
