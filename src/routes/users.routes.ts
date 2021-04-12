import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../configs/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserController from '../modules/accounts/useCases/createUser/CreateUserController';
import UpdateAvatarController from '../modules/accounts/useCases/updateAvatar/UpdateAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateAvatarController.handle,
);

export default usersRoutes;
