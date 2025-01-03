import { v4 as uuidv4 } from 'uuid';
import Order from '../../models/order.js';

class OrdersController {
  orders = []

  createOrder = (req, res) => {
    const {
      productPrice,
      productName,
      productCount,
      clientId,
      clientName,
      clientAddress
    } = req.body;

    const newOrder = new Order(
      uuidv4(),
      productPrice,
      productName,
      productCount,
      clientId,
      clientName,
      clientAddress)

    this.orders.push(newOrder);

    res.status(200).send({ message: 'Done' })
  }

  showOrderDetails = (req, res) => {
    const orderId = req.params.orderId;

    const currentOrder = this.orders.find(order => orderId === order.orderId);

    res.status(200).json(currentOrder);
  }

}

export default OrdersController;