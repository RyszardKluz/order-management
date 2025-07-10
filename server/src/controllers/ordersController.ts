import AppError from '../errors/AppError';
import { ProductModel } from '../models/Product';
import OrdersService from '../services/OrdersService';
import { ControllerFunction } from '../types/ControllerFunction';
import OrderDTO, { Product } from '../types/OrderDTO';

class OrdersController {
  private readonly ordersService: OrdersService;
  constructor() {
    this.ordersService = new OrdersService();
  }
  createOrder: ControllerFunction = async (req, res, next): Promise<void> => {
    try {
      const { clientName, clientAddress, clientId, products, totalPrice } =
        req.body;

      if (
        !clientName ||
        !clientAddress ||
        !clientId ||
        !products ||
        !totalPrice ||
        !Array.isArray(products) ||
        products.some(
          (product: Product) =>
            !product.id ||
            !product.price ||
            !product.title ||
            !product.productCount,
        )
      ) {
        throw new AppError('Missing order detail!', 404);
      }

      const order = await this.ordersService.createOrder(req.body);
      res
        .status(200)
        .send({ message: 'Created order', orderDetails: order, ok: true });
    } catch (error) {
      next(error);
    }
  };

  getOrders: ControllerFunction = async (req, res, next): Promise<void> => {
    try {
      const orders = await this.ordersService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  showOrderDetails: ControllerFunction = async (
    req,
    res,
    next,
  ): Promise<void> => {
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
