import { DataTypes, Model, UUID } from 'sequelize';

import sequelize from '../../config/database';

export interface OrderModel extends Model {
  id: string;
  clientId: string;
}

const Order = sequelize.define<OrderModel>('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  clientId: {
    type: UUID,
    references: {
      model: 'clients',
      key: 'id',
    },
  },
});
export default Order;
