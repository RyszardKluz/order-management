import AppError from '../errors/AppError.js';
import Product from '../models/Product.js';
import { Op } from 'sequelize';
class ProductRepository {
  static filterProducts = async (query) => {
    try {
      const keys = Object.keys(Product.getAttributes());

      const keysWithoutId = keys.filter((key) => key !== 'id');

      const conditions = keysWithoutId.map((key) => ({
        [key]: { [Op.like]: `%${query}%` },
      }));

      const products = await Product.findAll({
        where: { [Op.or]: conditions },
        attributes: ['id', 'title', 'price'],
      });

      if (!products || products.length === 0) {
        throw new AppError('Failed to find product by this query!', 404);
      }
      return products;
    } catch (error) {
      throw new AppError(error, 500);
    }
  };

  static getProducts = async () => {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'title', 'price'],
      });
      if (products || products.length === 0) {
        throw new AppError('Failed to fetch products!', 404);
      }
      return products;
    } catch (error) {
      throw new AppError(error, 500);
    }
  };

  static addProduct = async (productName, productPrice) => {
    try {
      const newProduct = await Product.create({
        title: productName,
        price: productPrice,
      });
      if (!newProduct) {
        throw new AppError('Failed to create a product!', 400);
      }
      return newProduct;
    } catch (error) {
      throw new AppError(error, 500);
    }
  };

  static changeProduct = async (productId, productName, productPrice) => {
    try {
      const product = await Product.findByPk(productId);

      if (productName.trim() !== '') {
        product.title = productName;
      }
      if (productPrice.trim() !== '' || typeof productPrice === 'number') {
        product.price = productPrice;
      }

      const updatedProduct = await product.save();
      if (!updatedProduct) {
        throw new AppError('Failed to update product', 400);
      }
      return updatedProduct;
    } catch (error) {
      throw new AppError(error, 500);
    }
  };

  static deleteProduct = (productId) => {
    try {
      Product.destroy({ where: { id: productId } });
    } catch (error) {
      throw new AppError(error, 500);
    }
  };
}

export default ProductRepository;
