import { DataTypes, Model } from 'sequelize';

import sequelize from '../../config/database';

export interface ClientModel extends Model {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
}

const Client = sequelize.define<ClientModel>('client', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Client;
