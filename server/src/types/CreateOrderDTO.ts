import Product from './Product';

type CreateOrderDTO = {
  clientId: string;
  clientName: string;
  clientAddress: string;
  products: Product[];
};

export default CreateOrderDTO;
