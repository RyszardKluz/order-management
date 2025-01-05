import ProductsService from '../services/productsService.js';
class ProductsController {
  constructor() {
    this.ProductsService = new ProductsService()
  }


  getProducts = async (req, res, next) => {
    const searchValue = req.query.query;
    try {
      const data = await ProductsService.getProducts(searchValue)
      res.status(200).json(data);

    } catch (error) {
      next(error)
    }

  };


  addProduct = async (req, res, next) => {

    try {
      const product = await this.ProductsService(req.body);
      res.status(200).json({ message: `Created ${product}` });
    } catch (error) {
      next(error)
    }
  };
  changeProduct = (req, res, next) => {
    const { productId } = req.params
    const { productName, productPrice } = req.body

    try {

      const product = await this.ProductsService.changeProduct(productId, productName, productPrice);

      res.status(200).json({
        message: 'Product updated successfully!',
        product: product
      });

    } catch (error) {

      next(error)

    }

  };
  deleteProduct = async (req, res, next) => {
    const { productId } = req.params;

    try {
      this.ProductsService.deleteProduct(productId);

      res.status(200).json({ message: 'Product deleted succesfully' });

    } catch (error) {
      next(error);
    }

  }
}



export { ProductsController };
