import { DataTypes } from 'sequelize';

import sequelize from '../../config/database';

const OrderItem = sequelize.define('order_item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  count: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,
    references: {
      model: 'orders',
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    references: {
      model: 'products',
      key: 'id',
    },
  },
});

export default OrderItem;
