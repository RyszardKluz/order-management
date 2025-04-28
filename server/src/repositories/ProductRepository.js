import AppError from '../errors/AppError.js';
import Product from '../models/product.js';
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
        throw new AppError('Failed to find product by this query!');
      }
      return products;
    } catch (error) {
      throw new AppError(error);
    }
  };

  static getProducts = async () => {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'title', 'price'],
      });
      if (products || products.length === 0) {
        throw new AppError('Failed to fetch products!');
      }
      return products;
    } catch (error) {
      throw new AppError(error);
    }
  };

  static addProduct = async (productName, productPrice) => {
    try {
      const newProduct = await Product.create({
        title: productName,
        price: productPrice,
      });
      if (!newProduct) {
        throw new AppError('Failed to create a product!');
      }
      return newProduct;
    } catch (error) {
      throw new AppError(error);
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
        throw new AppError('Failed to update product');
      }
      return updatedProduct;
    } catch (error) {
      throw new AppError(error);
    }
  };

  static deleteProduct = (productId) => {
    try {
      Product.destroy({ where: { id: productId } });
    } catch (error) {
      throw new AppError(error);
    }
  };
}

export default ProductRepository;
