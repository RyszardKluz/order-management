import ProductsService from '../services/ProductsService.js';
class ProductsController {
  constructor() {
    this.productsService = new ProductsService();
  }

  getProducts = async (req, res, next) => {
    const searchValue = req.query.query;
    try {
      const data = await this.productsService.getProducts(searchValue);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req, res, next) => {
    try {
      const product = await this.productsService.addProduct(req.body);
      res.status(200).json({ message: `Created ${product}`, ok: true });
    } catch (error) {
      next(error);
    }
  };
  changeProduct = async (req, res, next) => {
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
  deleteProduct = async (req, res, next) => {
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
