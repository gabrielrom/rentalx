"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CreateSpecificationController_1 = __importDefault(require("@modules/cars/useCases/createSpecification/CreateSpecificationController"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var specificationsRoutes = express_1.Router();
var createSpecificationController = new CreateSpecificationController_1.default();
specificationsRoutes.use(ensureAuthenticated_1.default);
specificationsRoutes.post('/', createSpecificationController.handle);
exports.default = specificationsRoutes;
