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

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('combined'));

app.use('/', homeRoutes);
app.use('/products', productsRoutes);
app.use('/clients', clientsRoutes)
app.use('/orders', ordersRoutes)

app.use(errorHandler)

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${port}`);
  } else {
    console.error(`Error occurred: ${error}`);
  }
});
