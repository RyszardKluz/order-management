import Order from "../../models/order.js";
class OrdersRepository {
  static orders = []

  static createOrder = (body) => {
    const {
      productPrice,
      productName,
      productCount,
      clientId,
      clientName,
      clientAddress
    } = body;

    const newOrder = new Order(
      productPrice,
      productName,
      productCount,
      clientId,
      clientName,
      clientAddress)
    this.orders.push(newOrder);

    return newOrder;
  }

  static showOrderDetails = (orderId) => {
    const order = this.orders.find(order => order.id === orderId);

    if (!order) {
      return null
    }
    return order
  }

}

export default OrdersRepository;