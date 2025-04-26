import { DataTypes, UUID } from 'sequelize';

import sequelize from '../../config/database.js';

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  clientId: {
    type: UUID, references: {
      model: 'clients',
      key: 'id'
    }
  }
});
export default Order;
