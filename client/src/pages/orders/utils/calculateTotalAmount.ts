import { Product } from '../../../types/resource';

const calculateTotalAmount = (products: Product[]) => {
  if (!products || products.length === 0) {
    return 0;
  }
  let totalAmount = 0;

  for (const product of products) {
    if (product.productCount) {
      const price = product.price * product.productCount;
      totalAmount += price;
    }
  }
  return totalAmount.toFixed(2);
};

export default calculateTotalAmount;
