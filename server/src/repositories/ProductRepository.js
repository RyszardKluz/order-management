import Product from '../models/product.js'
import { Op } from 'sequelize'
class ProductRepository {

  static filterProducts = async (query) => {

    const keys = Object.keys(Product.getAttributes())

    const conditions = keys.map((key) => ({ [key]: { [Op.like]: `%${query}%` } }))

    const products = await Product.findAll({
      where: { [Op.or]: conditions },
      attributes: ['id', 'title', 'price']

    })

    return products
  }

  static getProducts = async () => {
    const products = await Product.findAll({
      attributes: ['id', 'title', 'price']
    })


    return products;
  };

  static addProduct = async (productName, productPrice) => {
    const newProduct = await Product.create({
      title: productName,
      price: productPrice
    })
    return newProduct;
  };

  static changeProduct = async (
    productId,
    productName,
    productPrice,

  ) => {
    const product = await Product.findByPk(productId);

    if (productName.trim() !== '') {
      product.title = productName;
    }
    if (productPrice.trim() !== '' || typeof productPrice === 'number') {
      product.price = productPrice
    }

    const updatedClient = await product.save()

    return updatedClient



  };

  static deleteProduct = (productId) => {

    Product.destroy({ where: { id: productId } })

  };
}

export default ProductRepository;
