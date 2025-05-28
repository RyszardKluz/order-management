import Client from './Client';
import Product from './Product';
import Order from './Order';
import OrderItem from './OrderItem';

const setupAssociations = (): void => {
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
