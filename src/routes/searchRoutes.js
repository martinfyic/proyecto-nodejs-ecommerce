import { Router } from 'express';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import searchController from '../controller/searchController.js';
import { logger } from '../config/winston/winston.js';

export const searchRouter = Router();

try {
	searchRouter.get(
		'/:collection/:term',
		[jwtValidator, fieldValidator],
		searchController
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in searchRoutes/searchRouter.get '/:collection/:term': ${error}`
	);
}
