import { v4 as uuidv4 } from 'uuid';

class Order {
  constructor(products, clientId, clientName, clientAddress) {
    this.id = uuidv4();

    this.products = [];

    for (const productItem of products) {
      const product = {
        productId: productItem.productId,
        productName: productItem.productName,
        productPrice: productItem.productPrice,
        productCount: productItem.productCount,
      };
      this.products.push(product);
    }

    this.clientId = clientId;
    this.clientName = clientName;
    this.clientAddress = clientAddress;
  }

  get totalPrice() {
    let totalPrice = 0;
    for (const productItem of this.products) {
      const price = productItem.productCount * productItem.productPrice;
      totalPrice += price;
    }
    return totalPrice;
  }
}
export default Order;
