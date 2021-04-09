import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import globalError from './middlewares/globalError';
import router from './routes';
import swaggerDoc from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(router);
app.use(globalError);

app.listen(3333, () => console.log('Server is running! 🚀'));
