import { DataTypes } from "sequelize";

import sequelize from "../../config/database";

const OrderItem = sequelize.define('order_item', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL
    , allowNull: false
  },
  count: {
    type: DataTypes.DECIMAL
    , allowNull: false
  }
});

export default OrderItem;

