import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import swaggerDoc from '../../../swagger.json';
import globalError from './middlewares/globalError';
import router from './routes';

createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(router);
app.use(globalError);

export { app };
