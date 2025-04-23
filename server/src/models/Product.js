import { DataTypes } from 'sequelize';

import sequelize from '../../config/database.js';

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
