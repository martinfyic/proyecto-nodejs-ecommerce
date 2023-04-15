import { Router } from 'express';
import { check } from 'express-validator';
import * as cartController from '../controller/cartController.js';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import { cartByIdExist, productByIdExist } from '../helpers/index.js';
import { logger } from '../config/winston/winston.js';

export const cartRouter = Router();

try {
	cartRouter.get('/', cartController.getAllCarts);
} catch (error) {
	logger.error(`===> ⚠️ Error in cartRouter/cartRouter.get '/': ${error}`);
}

try {
	cartRouter.get(
		'/:id',
		[
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(cartByIdExist),
			fieldValidator,
		],
		cartController.getCart
	);
} catch (error) {
	logger.error(`===> ⚠️ Error in cartRouter/cartRouter.get '/:id': ${error}`);
}

try {
	cartRouter.post('/', [jwtValidator, fieldValidator], cartController.postCart);
} catch (error) {
	logger.error(`===> ⚠️ Error in cartRouter/cartRouter.post '/': ${error}`);
}

try {
	cartRouter.delete(
		'/:id',
		[
			jwtValidator,
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(cartByIdExist),
			fieldValidator,
		],
		cartController.deleteCart
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in cartRouter/cartRouter.delete '/:id': ${error}`
	);
}

try {
	cartRouter.post(
		'/:id/products',
		[
			jwtValidator,
			check('id', 'El cartID no es valido').isMongoId(),
			check('id').custom(cartByIdExist),
			check('prodId', 'El prodID no es valido').isMongoId(),
			check('prodId').custom(productByIdExist),
			fieldValidator,
		],
		cartController.addProductToCart
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in cartRouter/cartRouter.post '/:id/products': ${error}`
	);
}

try {
	cartRouter.delete(
		'/:id/products/:prodId',
		[
			jwtValidator,
			check('id', 'El cartID no es valido').isMongoId(),
			check('id').custom(cartByIdExist),
			check('prodId', 'El prodID no es valido').isMongoId(),
			fieldValidator,
		],
		cartController.deleteProductInCart
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in cartRouter/cartRouter.delete '/:id/products/:prodId': ${error}`
	);
}
