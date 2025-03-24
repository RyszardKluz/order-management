import { Router } from 'express';
import OrdersController from '../controllers/ordersController.js';

const ordersRoutes = Router();
const ordersCntrl = new OrdersController();

ordersRoutes.post('/', ordersCntrl.createOrder);

ordersRoutes.get('/details', ordersCntrl.showOrderDetails);

export { ordersRoutes };
