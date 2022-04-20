import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import errorHandler from '../middlewares/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config();

import routes from '../routes';

const app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(compression())
  .use(cookieParser())
  .use(cors())
  .use(express.json())
  .use(helmet())
  .use(morgan('dev'));

app.use(routes);

app.use(errorHandler);

export default app;
