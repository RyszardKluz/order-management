type Products = {
  productName: string;
  productPrice: number;
  productCount: number;
};

interface OrderDTO {
  orderId: string;
  totalPrice: number;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
  products: Products[];
}

export default OrderDTO;
