import { v4 as uuidv4 } from 'uuid';
class ProductController {
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

  getAllProducts = (req, res) => {
    res.status(200).json(this.products);
  };

  getProdById = (req, res) => {
    const productId = +req.params.prodId;

    const product = this.products.find((p) => p.productId === productId);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  };

  addProduct = (req, res) => {
    const { productName, price } = req.body;

    if (!productName || typeof price !== 'number') {
      res.status(400).json({ message: 'Wrong product details' });
    }

    const newProduct = {
      productId: uuidv4(),
      price: price,
      productName: productName,
    };
    this.products.push(newProduct);
    res.status(200).json({ message: `Created ${productName}` });
  };
}

export { ProductController };
