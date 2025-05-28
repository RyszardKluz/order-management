import AppError from '../errors/AppError';
import checkIfPriceIsNumber from '../helpers/checkIFPriceIsNumber';
import Product, { ProductModel } from '../models/Product';
import { Op } from 'sequelize';
class ProductRepository {
  static filterProducts = async (query: string): Promise<ProductModel[]> => {
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
      throw new AppError((error as Error).message, 500);
    }
  };

  static getProducts = async () => {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'title', 'price'],
      });
      if (!products || products.length === 0) {
        throw new AppError('Failed to fetch products!', 404);
      }
      return products;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static addProduct = async (
    productName: string,
    productPrice: number,
  ): Promise<ProductModel> => {
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
      throw new AppError((error as Error).message, 500);
    }
  };

  static changeProduct = async (
    productId: string,
    productName: string,
    productPrice: number,
  ) => {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new AppError('Failed to find product!', 404);
      }

      const price = checkIfPriceIsNumber(productPrice);

      if (typeof product.price === 'string') {
        Number.parseInt(product.price);
      }

      if (productName.trim() !== '') {
        product.title = productName;
      }

      product.price = price;

      const updatedProduct = await product.save();
      if (!updatedProduct) {
        throw new AppError('Failed to update product', 400);
      }
      return updatedProduct;
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };

  static deleteProduct = (productId: string): void => {
    try {
      Product.destroy({ where: { id: productId } });
    } catch (error) {
      throw new AppError((error as Error).message, 500);
    }
  };
}

export default ProductRepository;
