import ProductsService from '../services/ProductsService';
import { ControllerFunction } from '../types/ControllerFunction';
class ProductsController {
  private readonly productsService: ProductsService;
  constructor() {
    this.productsService = new ProductsService();
  }

  getProducts: ControllerFunction = async (req, res, next) => {
    let searchValue = req.query.query;
    if (!searchValue) {
      throw new Error();
    } else if (typeof searchValue !== 'string') {
      const parsedSearchValue = JSON.stringify(searchValue);
      searchValue = parsedSearchValue;
    }

    try {
      const data = await this.productsService.getProducts(searchValue);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  addProduct: ControllerFunction = async (req, res, next) => {
    try {
      const product = await this.productsService.addProduct(req.body);
      res.status(200).json({ message: `Created ${product}`, ok: true });
    } catch (error) {
      next(error);
    }
  };
  changeProduct: ControllerFunction = async (req, res, next) => {
    const { productId } = req.params;
    const { productName, productPrice } = req.body;

    console.log(productId, productName);

    try {
      const product = await this.productsService.changeProduct(
        productId,
        productName,
        productPrice,
      );

      res.status(200).json({
        message: 'Product updated successfully!',
        product: product,
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  };
  deleteProduct: ControllerFunction = async (req, res, next) => {
    const { productId } = req.params;
    console.log(productId);

    try {
      this.productsService.deleteProduct(productId);
      res
        .status(200)
        .json({ message: 'Product deleted succesfully', ok: true });
    } catch (error) {
      next(error);
    }
  };
}

export { ProductsController };
