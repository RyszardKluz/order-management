import Product from './ProductType';

interface CreateOrderDTO {
  clientId: string;
  clientName: string;
  clientAddress: string;
  products: Product[];
}

export default CreateOrderDTO;
