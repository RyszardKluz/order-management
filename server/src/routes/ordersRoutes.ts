import { Router } from 'express';
import OrdersController from '../controllers/ordersController';

const ordersRoutes = Router();
const ordersCntrl = new OrdersController();

ordersRoutes.post('/', ordersCntrl.createOrder);

ordersRoutes.get('/', ordersCntrl.getOrders);

export { ordersRoutes };
