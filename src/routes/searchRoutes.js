import { Router } from 'express';
import searchController from '../controller/searchController.js';
import { logger } from '../config/winston/winston.js';

export const searchRouter = Router();

try {
	searchRouter.get('/:collection/:term', searchController);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in searchRoutes/searchRouter.get '/:collection/:term': ${error}`
	);
}
