import OrdersService from '../services/OrdersService';
import { ControllerFunction } from '../types/ControllerFunction';

class OrdersController {
  private readonly ordersService: OrdersService;
  constructor() {
    this.ordersService = new OrdersService();
  }
  createOrder: ControllerFunction = async (req, res, next) => {
    try {
      const order = await this.ordersService.createOrder(req.body);
      res
        .status(200)
        .send({ message: 'Created order', orderDetails: order, ok: true });
    } catch (error) {
      next(error);
    }
  };

  getOrders: ControllerFunction = async (req, res, next) => {
    try {
      const orders = await this.ordersService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  showOrderDetails: ControllerFunction = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
      const currentOrder = await this.ordersService.showOrderDetails(orderId);
      res.status(200).json(currentOrder);
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
