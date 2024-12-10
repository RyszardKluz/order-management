class productController {
  products = [{
    productId: 1,
    productName: 'Item 1 ',
    price: 19.99
  },
  {
    productId: 2,
    productName: 'Item2',
    price: 25.99
  }];

  getAllProducts = (req, res) => {
    res.status(200).json(this.products)
  }

  getProdById = (req, res) => {
    const productId = +req.params.prodId

    const product = this.products.find((p) => p.productId === productId)

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);

  }
  addProduct = (req, res) => {

    const { productName, price } = req.body;

    if (!productName || typeof price !== "number") {
      res.status(404).json({ message: 'Wrong product details' })
    }

    let newProductId;
    if (this.products.length > 0) {
      newProductId = Math.max(...this.products.map(p => p.productId)) + 1;
    }
    else {
      newProductId = 1;

    }

    const newProduct = {
      productId: newProductId,
      price: price,
      productName: productName
    }
    this.products.push(newProduct)
    res.status(200).json({ message: `Created ${productName}` })
  }

}

export { productController };
