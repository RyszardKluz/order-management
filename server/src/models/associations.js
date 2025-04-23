import Client from "./Client";
import Product from "./Product";
import Order from "./Order";
import OrderItem from "./OrderItem";

const setupAssociations = () => {

  Client.hasMany(Order);
  Order.belongsTo(Client);

  Product.belongsToMany(Order, { through: OrderItem });
  Order.belongsToMany(Product, { through: OrderItem });
}

export default setupAssociations



