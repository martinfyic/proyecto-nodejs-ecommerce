import { Router } from 'express';
import * as viewController from '../controller/viewController.js';
import { logger } from '../config/winston/winston.js';

export const productViewsRouter = Router();

try {
	productViewsRouter.get('/', viewController.getViewsProducts);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productViewsRouter/productViewsRouter.get '/': ${error}`
	);
}

try {
	productViewsRouter.get('/:id', viewController.getViewsProductById);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productViewsRouter/productViewsRouter.get '/:id': ${error}`
	);
}
