const calculateTotalAmount = (products) => {
  let totalAmount = 0;

  for (const product of products) {
    const price = product.productPrice * product.count;
    totalAmount += price;
  }

  return totalAmount;
};

export default calculateTotalAmount;
