import AppError from '../errors/AppError';
import { ProductModel } from '../models/Product';
import ProductRepository from '../repositories/ProductRepository';
import ProductType from '../types/ProductType';

class ProductsService {
  getProducts = async (searchValue: string): Promise<ProductModel[]> => {
    if (!searchValue) {
      const products = await ProductRepository.getProducts();

      return products;
    } else {
      const filteredProducts =
        await ProductRepository.filterProducts(searchValue);

      return filteredProducts;
    }
  };
  addProduct = async (body: ProductType) => {
    const { title, price } = body;
    if (!title || typeof title !== 'string' || !price || isNaN(price)) {
      throw new AppError('Invalid product details', 400);
    }
    const product = await ProductRepository.addProduct(title, price);
    return product;
  };
  changeProduct = async (
    productId: string,
    productName: string,
    productPrice: number,
  ): Promise<ProductModel> => {
    if (!productId && !productName && !productPrice) {
      throw new AppError('Wrong product details', 400);
    }

    const product = await ProductRepository.changeProduct(
      productId,
      productName,
      productPrice,
    );

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product;
  };
  deleteProduct = async (productId: string): Promise<void> => {
    await ProductRepository.deleteProduct(productId);
  };
}

export default ProductsService;
