import { Router } from 'express';
import { check } from 'express-validator';
import * as cartController from '../controller/cartController.js';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import { cartByIdExist, productByIdExist } from '../helpers/index.js';

export const cartRouter = Router();

cartRouter.get('/', cartController.getAllCarts);

cartRouter.get(
	'/:id',
	[
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(cartByIdExist),
		fieldValidator,
	],
	cartController.getCart
);

cartRouter.post('/', [jwtValidator, fieldValidator], cartController.postCart);

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
