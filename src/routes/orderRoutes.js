import { Router } from 'express';
import { check } from 'express-validator';
import * as orderController from '../controller/orderController.js';
import { jwtValidator, fieldValidator } from '../middlewares/index.js';
import { cartByIdExist } from '../helpers/index.js';
import { logger } from '../config/winston/winston.js';

export const orderRouter = Router();

try {
	orderRouter.get('/', orderController.getAllOrders);
} catch (error) {
	logger.error(`===> ⚠️ Error in orderRoutes/orderRouter.get '/': ${error}`);
}

try {
	orderRouter.post(
		'/:idCart',
		[
			jwtValidator,
			check('idCart', 'El ID no es valido').isMongoId(),
			check('idCart').custom(cartByIdExist),
			fieldValidator,
		],
		orderController.createOrder
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in orderRoutes/orderRouter.post '/:idCart': ${error}`
	);
}
