import OrdersRepository from '../repositories/OrdersRepository.js';
import AppError from '../errors/AppError.js';

class OrdersService {
  createOrder = async (body) => {
    if (
      !body ||
      !body.productPrice ||
      !body.productName ||
      !body.productCount
    ) {
      throw new AppError('Missing or invalid order details', 400);
    }
    if (
      typeof body.productPrice !== 'number' ||
      typeof body.productName !== 'string'
    ) {
      throw new AppError('Invalid product price or name format', 400);
    }
    const order = OrdersRepository.createOrder(body);

    return order;
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
