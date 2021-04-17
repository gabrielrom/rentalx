import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureUserIsAdmin from '../middlewares/ensureUserIsAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createSpecificationController.handle,
);

export default specificationsRoutes;
