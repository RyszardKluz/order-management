import OrdersRepository from '../repositories/OrdersRepository.js';
import AppError from '../errors/AppError.js';

class OrdersService {
  createOrder = async (body) => {
    console.log('Dupa', body, body.products, body.clientName);
    if (
      !body ||
      !body.products ||
      !body.clientName ||
      !body.clientId ||
      !body.clientAddress ||
      body.products.some((product) => {
        !Object.hasOwn(product, 'productId') ||
          !Object.hasOwn(product, 'productPrice') ||
          !Object.hasOwn(product, 'productCount') ||
          !Object.hasOwn(product, 'productName');
      })
    ) {
      throw new AppError('Missing or invalid order details', 400);
    }

    const order = OrdersRepository.createOrder(body);

    return order;
  };

  getOrders = async () => {
    const orders = OrdersRepository.getOrders();
    if (!orders) {
      throw new AppError('No orders found!', 404);
    }
    return orders;
  };

  showOrderDetails = async (orderId) => {
    const order = OrdersRepository.showOrderDetails(orderId);
    if (!order) {
      throw new AppError('Order not found!', 404);
    }
    return order;
  };
}

export default OrdersService;
