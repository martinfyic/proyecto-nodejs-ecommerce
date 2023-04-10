import { Router } from 'express';
import { check } from 'express-validator';
import * as orderController from '../controller/orderController.js';
import { jwtValidator, fieldValidator } from '../middlewares/index.js';
import { cartByIdExist } from '../helpers/index.js';

export const orderRouter = Router();

orderRouter.get('/', orderController.getAllOrders);

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
