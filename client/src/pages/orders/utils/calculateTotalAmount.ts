import { OrderProduct } from "../../../types/resource";

const calculateTotalAmount = (products: OrderProduct[]) => {
  if (!products || products.length === 0) {
    return 0
  }
  let totalAmount = 0;

  for (const product of products) {
    const price = product.price * product.productCount;
    totalAmount += price;
  } return totalAmount.toFixed(2)
};

export default calculateTotalAmount;
