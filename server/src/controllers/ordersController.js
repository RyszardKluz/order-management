import OrdersService from '../services/ordersService.js';

class OrdersController {
  constructor() {
    this.OrdersService = new OrdersService()
  }
  createOrder = async (req, res, next) => {

    try {
      const order = await this.OrdersService.createOrder(req.body)
      res.status(200).send({ message: 'Created order', orderDetails: order })

    } catch (error) {
      next(error);
    }
  }

  showOrderDetails = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
      const currentOrder = await this.OrdersService.showOrderDetails(orderId)
      res.status(200).json(currentOrder)
    } catch (error) {
      next(error)
    }
  }

}

export default OrdersController;