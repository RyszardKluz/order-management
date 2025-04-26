import Client from "./client.js";
import Product from "./product.js";
import Order from "./order.js";
import OrderItem from "./orderItem.js";

const setupAssociations = () => {

  Client.hasMany(Order);
  Order.belongsTo(Client);

  Product.belongsToMany(Order, { through: OrderItem });
  Order.belongsToMany(Product, { through: OrderItem });

  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });

}

export default setupAssociations



