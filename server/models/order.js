class Order {
  constructor(
    orderId,
    productId,
    productPrice,
    productName,
    productCount,
    clientId,
    clientName,
    clientAddress) {
    this.orderId = orderId;
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productCount = productCount;
    this.clientId = clientId;
    this.clientName = clientName;
    this.clientAddress = clientAddress;
  }
  get price() {
    return this.productCount * this.productPrice
  }
}

export default Order; 