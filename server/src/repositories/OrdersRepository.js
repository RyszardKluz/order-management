import Order from '../models/Order.js';
class OrdersRepository {
  static orders = [];

  static createOrder = (body) => {
    const { products, clientId, clientName, clientAddress } = body;

    const newOrder = new Order(products, clientId, clientName, clientAddress);
    this.orders.push(newOrder);
    console.log(this.orders);
    return newOrder;
  };

  static showOrderDetails = (orderId) => {
    const order = this.orders.find((order) => order.id === orderId);

    if (!order) {
      return null;
    }
    return order;
  };
}

export default OrdersRepository;
