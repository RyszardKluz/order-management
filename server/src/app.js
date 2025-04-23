import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { homeRoutes } from './routes/homeRoutes.js';
import { productsRoutes } from './routes/productsRoutes.js';
import { clientsRoutes } from './routes/clientsRoutes.js';
import { ordersRoutes } from './routes/ordersRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import sequelize from '../config/database.js';
import setupAssociations from './models/associations.js';

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: process.env.CLIENT_URL,
};

setupAssociations();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('combined'));

app.use('/', homeRoutes);
app.use('/products', productsRoutes);
app.use('/clients', clientsRoutes);
app.use('/orders', ordersRoutes);

app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database!');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database synchronized');
    return app.listen(port);
  })
  .then(() => {
    console.log(`Server is up and running at http://localhost/${port}`);
  })
  .catch((err) => {
    console.error('Database connection error ', err);
  });
