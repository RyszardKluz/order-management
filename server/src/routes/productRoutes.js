import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';

const productRoutes = Router();
const prodCtrl = new ProductController();

productRoutes.get('/products/get-all-products', prodCtrl.getAllProducts);
productRoutes.get('/products/:prodId', prodCtrl.getProdById);

productRoutes.post('/products/add-product', prodCtrl.addProduct);

export { productRoutes };
