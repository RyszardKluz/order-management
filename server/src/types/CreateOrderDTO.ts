import Product from './ProductType';

type CreateOrderDTO = {
  clientId: string;
  clientName: string;
  clientAddress: string;
  products: Product[];
};

export default CreateOrderDTO;
