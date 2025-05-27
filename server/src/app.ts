import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { homeRoutes } from './routes/homeRoutes';
import { productsRoutes } from './routes/productsRoutes';
import { clientsRoutes } from './routes/clientsRoutes';
import { ordersRoutes } from './routes/ordersRoutes';
import errorHandler from './middleware/errorMiddleware';
import sequelize from '../config/database';
import setupAssociations from './models/associations';
import { CLIENT_URL, PORT } from '../config/env';

const app = express();
const port = PORT;
const corsOptions = {
  origin: CLIENT_URL,
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
