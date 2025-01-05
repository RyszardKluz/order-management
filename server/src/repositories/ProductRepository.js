import { v4 as uuidv4 } from 'uuid';
import Product from '../../models/product.js';
class ProductRepository {
  static products = [
    {
      productId: '2fbf70b4-2b67-448c-97e1-9a33dcd8de27',
      productName: 'Item 12',
      productPrice: 19.99,
    },
    {
      productId: '4bb7ca3a-070e-4be1-a4a1-d63c79fbce65',
      productName: 'Item2',
      productPrice: 25.99,
    },
  ];

  static getProducts() {
    return this.products;
  }
  static addProduct = (productName, productPrice) => {
    const newProduct = new Product(uuidv4(), productName, productPrice)

    return newProduct
  }
  static changeProduct = () => { }
  static deleteProduct = () => { }
}

export default ProductRepository;
