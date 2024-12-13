import { Router } from 'express';
import { ProductsController } from '../controllers/productsController.js';

const productsRoutes = Router();
const prodCtrl = new ProductsController();

productsRoutes.get('/products', prodCtrl.getAllProducts);
productsRoutes.get('/products/search', prodCtrl.getProductByQuery);

productsRoutes.post('/products', prodCtrl.addProduct);

productsRoutes.patch('/products/:productId', prodCtrl.changeProduct);

productsRoutes.delete('/products/:productId', prodCtrl.deleteProduct)

export { productsRoutes };
