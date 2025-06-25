export type Product = {
  id:string  
  title: string;
  price: number;
  productCount: number;
};

interface OrderDTO {
  id: string;
  totalPrice: number;
  clientName: string;
  clientSurname: string;
  clientAddress: string;
  products: Product[];
}

export default OrderDTO;
