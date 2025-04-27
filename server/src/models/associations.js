import Client from './client.js';
import Product from './product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

const setupAssociations = () => {
  Client.hasMany(Order, { foreignKey: 'clientId' });
  Order.belongsTo(Client, { foreignKey: 'clientId' });

  Order.belongsToMany(Product, {
    through: OrderItem,
    foreignKey: 'orderId',
    otherKey: 'productId',
  });
  Product.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: 'productId',
    otherKey: 'orderId',
  });

  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
};

export default setupAssociations;
