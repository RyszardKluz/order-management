import { DataTypes, Model } from 'sequelize';

import sequelize from '../../config/database';

export interface ProductModel extends Model {
  id: string;
  price: number;
  title: string;
}

const Product = sequelize.define<ProductModel>('product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
