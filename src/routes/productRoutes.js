import { Router } from 'express';
import { check } from 'express-validator';
import * as productController from '../controller/productController.js';
import { productByIdExist } from '../helpers/index.js';
import { fieldValidator } from '../middlewares/index.js';

export const productRouter = Router();

productRouter.get('/', productController.getProducts);

productRouter.get(
	'/:id',
	[
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(productByIdExist),
		fieldValidator,
	],
	productController.getProductById
);
