import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { homeRoutes } from './routes/homeRoutes.js';

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

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${port}`);
  } else {
    console.error(`Error occurred: ${error}`);
  }
});
