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
  changeProduct = (req, res) => {
    const { productId } = req.params
    const { productName, productPrice } = req.body

    const productIndex = this.products.findIndex((product) => product.productId === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found!' });
    }
    if (productName.trim() !== '') {
      this.products[productIndex].productName = productName;
    }
    if (productPrice.trim() !== '') {
      this.products[productIndex].productPrice = parseFloat(productPrice);
    }

    res.status(200).json({
      message: 'Product updated successfully!',
      product: this.products[productIndex],
    });
  };
  deleteProduct = (req, res) => {
    const { productId } = req.params;
    const productIndex = this.products.findIndex((product) => product.productId === productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found!' })
    }
    this.products.splice(productIndex, 1)

    res.status(200).json({ message: 'Product deleted succesfully' })

  }
}



export { ProductsController };
