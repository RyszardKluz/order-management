import AppError from "../errors/AppError.js";
import ProductRepository from "../repositories/productRepository.js";

class ProductsService {
  getProducts = async (searchValue) => {
    const products = ProductRepository.getProducts()
    if (!searchValue) {
      return products
    }
    const matchedProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase()) || product.productId === +searchValue
    );

    if (matchedProducts.length === 0) {
      throw new AppError('No products found!', 404)
    }

    return matchedProducts
  }
  addProduct = async (body) => {
    const { productName, productPrice } = body;
    if (!productName || typeof productName !== 'string' || !productPrice || isNaN(productPrice)) {
      throw new AppError('Invalid product details', 400)
    }

    const product = ProductRepository.addProduct(productName, productPrice)
    return product
  }
  changeProduct = async (productId, productName, productPrice) => {

    if (!productId && !productName && !productPrice) {
      throw new AppError('Wrong product details', 400)
    }


    const product = ProductRepository.changeProduct(product, productName, productPrice);

    if (!product) {
      throw new AppError('Product not found!', 404)
    }

    return product;



  }
  deleteProduct = async (productId) => {

    if (!productId) {
      throw new AppError('Failed to delete product !', 400)
    }
    const isProduct = ProductRepository.deleteProduct(productId);

    if (!isProduct) {
      throw new AppError('Product not found!', 404)
    }
  }
}


export default ProductsService;