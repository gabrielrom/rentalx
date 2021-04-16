"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@configs/upload"));
var CreateUserController_1 = __importDefault(require("@modules/accounts/useCases/createUser/CreateUserController"));
var UpdateAvatarController_1 = __importDefault(require("@modules/accounts/useCases/updateAvatar/UpdateAvatarController"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var usersRoutes = express_1.Router();
var uploadAvatar = multer_1.default(upload_1.default.upload('./tmp/avatar'));
var createUserController = new CreateUserController_1.default();
var updateAvatarController = new UpdateAvatarController_1.default();
usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated_1.default, uploadAvatar.single('avatar'), updateAvatarController.handle);
exports.default = usersRoutes;
