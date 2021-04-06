import 'reflect-metadata';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import router from './routes';
import swaggerDoc from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(router);

app.listen(3333, () => console.log('Server is running! 🚀'));
