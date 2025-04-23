import { DataTypes } from 'sequelize';

import sequelize from '../../config/database';

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});
export default Order;
