import { Router } from 'express';
import { ProductsController } from '../controllers/productsController.js';

const productsRoutes = Router();
const prodCtrl = new ProductsController();

productsRoutes.get('/', prodCtrl.getProducts);

productsRoutes.post('/', prodCtrl.addProduct);

productsRoutes.patch('/:productId', prodCtrl.changeProduct);

productsRoutes.delete('/:productId', prodCtrl.deleteProduct);

export { productsRoutes };
