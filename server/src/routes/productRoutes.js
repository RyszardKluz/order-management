import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';

const productRoutes = Router();
const prodCtrl = new ProductController();

productRoutes.get('/products/get-all-products', prodCtrl.getAllProducts);
productRoutes.get('/products/get-product', prodCtrl.getProductByValue);

productRoutes.post('/products/add-product', prodCtrl.addProduct);

productRoutes.patch('/products/update-product/:productId', prodCtrl.changeProduct);

productRoutes.delete('/products/delete-product/:productId', prodCtrl.deleteProduct)

export { productRoutes };
