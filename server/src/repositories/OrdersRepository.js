import Order from '../models/Order.js';
class OrdersRepository {
  static orders = [];

  static createOrder = (body) => {
    const { products, clientId, clientName, clientAddress } = body;

    const newOrder = new Order(products, clientId, clientName, clientAddress);
    this.orders.push(newOrder);
    return newOrder;
  };

  static getOrders = () => {
    if (!this.orders || this.orders.length === 0) {
      return null;
    }

    return this.orders.map((order) => ({
      ...order,
      totalPrice: order.totalPrice,
    }));
  };

  static showOrderDetails = (orderId) => {
    const order = this.orders.find((order) => order.id === orderId);

    if (!order) {
      return null;
    }
    const orderWithPrice = { ...order, totalPrice: order.totalPrice };
    return orderWithPrice;
  };
}

export default OrdersRepository;
