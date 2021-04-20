import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@configs/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadImagesCarController } from '@modules/cars/useCases/uploadImagesCar/UploadImagesCarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureUserIsAdmin from '../middlewares/ensureUserIsAdmin';

const carsRouter = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadImagesCarController = new UploadImagesCarController();

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle,
);

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarSpecificationController.handle,
);

carsRouter.post(
  '/images/:id',
  ensureAuthenticated,
  ensureUserIsAdmin,
  upload.array('images'),
  uploadImagesCarController.handle,
);

export default carsRouter;
