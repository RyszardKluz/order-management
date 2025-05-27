import { Sequelize } from 'sequelize';
import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } from './env';

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port:DB_PORT,
});

export default sequelize;
