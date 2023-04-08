import { Router } from 'express';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import searchController from '../controller/searchController.js';

export const searchRouter = Router();

searchRouter.get(
	'/:collection/:term',
	[jwtValidator, fieldValidator],
	searchController
);
