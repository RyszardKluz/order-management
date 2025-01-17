import { v4 as uuidv4 } from 'uuid'

class Order {
  constructor(
    productId,
    productPrice,
    productName,
    productCount,
    clientId,
    clientName,
    clientAddress) {

    this.id = uuidv4()
    this.productPrice = productId;
    this.productPrice = productPrice;
    this.productName = productName;
    this.productCount = productCount;
    this.clientId = clientId;
    this.clientName = clientName
    this.clientAddress = clientAddress;

  }

  get price() {
    return this.productPrice * this.productCount
  }
}
export default Order;