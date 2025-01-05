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
  changeProduct = async () => { }
  deleteProduct = async () => { }
}


export default ProductsService;