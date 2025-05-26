import AppError from '../errors/AppError.js';
import ProductRepository from '../repositories/ProductRepository';
import ProductType from '../types/Product';

class ProductsService {
  getProducts = async (searchValue: string) => {
    if (!searchValue) {
      const products = await ProductRepository.getProducts();

      return products;
    } else {
      const filteredProducts = ProductRepository.filterProducts(searchValue);

      return filteredProducts;
    }
  };
  addProduct = async (body: ProductType) => {
    const { productName, productPrice } = body;
    if (
      !productName ||
      typeof productName !== 'string' ||
      !productPrice ||
      isNaN(productPrice)
    ) {
      throw new AppError('Invalid product details', 400);
    }

    const product = ProductRepository.addProduct(productName, productPrice);
    return product;
  };
  changeProduct = async (
    productId: string,
    productName: string,
    productPrice: string,
  ) => {
    if (!productId && !productName && !productPrice) {
      throw new AppError('Wrong product details', 400);
    }

    const product = ProductRepository.changeProduct(
      productId,
      productName,
      productPrice,
    );

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product;
  };
  deleteProduct = async (productId: string) => {
    if (!productId) {
      throw new AppError('Failed to delete product !', 400);
    }

    ProductRepository.deleteProduct(productId);
  };
}

export default ProductsService;
