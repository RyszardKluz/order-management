import { Router } from 'express';
import OrdersController from '../controllers/ordersController.js';

const ordersRoutes = Router();

const ordersController = new OrdersController()

ordersRoutes.get('/:orderId', ordersController.showOrderDetails);

ordersRoutes.post('/', ordersController.createOrder);

export { ordersRoutes }; 