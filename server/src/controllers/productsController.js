import { v4 as uuidv4 } from 'uuid';
class ProductsController {
  products = [
    {
      productId: '2fbf70b4-2b67-448c-97e1-9a33dcd8de27',
      productName: 'Item 12',
      productPrice: 19.99,
    },
    {
      productId: '4bb7ca3a-070e-4be1-a4a1-d63c79fbce65',
      productName: 'Item2',
      productPrice: 25.99,
    },
  ];

  getProducts = (req, res) => {
    const searchValue = req.query.query;
    if (req.query.query) {

      if (!searchValue) {
        return res.status(400).json({ error: 'Search value is required!' })
      }
      const matchedProducts = this.products.filter((product) =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase()) || product.productId === +searchValue
      );

      if (matchedProducts.length === 0) {
        return res.status(404).json({ error: 'No products found' })
      }

      return res.status(200).json(matchedProducts)
    }
    return res.status(200).json(this.products);
  };


  addProduct = (req, res) => {
    const { productName, productPrice } = req.body;

    if (!productName || typeof productName !== 'string' || !productPrice || isNaN(productPrice)) {
      return res.status(400).json({ error: 'Invalid product details!' });
    }

    const newProduct = {
      productId: uuidv4(),
      productPrice: productPrice,
      productName: productName,
    };
    this.products.push(newProduct);
    res.status(200).json({ message: `Created ${productName}` });
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
