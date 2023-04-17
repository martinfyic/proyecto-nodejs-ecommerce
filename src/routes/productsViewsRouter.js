import { Router } from 'express';
import * as productController from '../controller/productController.js';

export const productViewsRouter = Router();

try {
	productViewsRouter.get('/', productController.getViewsProducts);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productViewsRouter/productViewsRouter.get '/': ${error}`
	);
}
