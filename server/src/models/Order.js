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
    return this.products.reduce((sum, item) => {
      return sum + item.productCount * item.productPrice;
    }, 0);
  }
}
export default Order;
