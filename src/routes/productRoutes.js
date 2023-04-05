import { Router } from 'express';
import { check } from 'express-validator';
import * as productController from '../controller/productController.js';
import { productByIdExist, categoryByIdExist } from '../helpers/index.js';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';

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

productRouter.post(
	'/',
	[
		jwtValidator,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('category', 'No es un ID de mongo').isMongoId(),
		check('category').custom(categoryByIdExist),
		fieldValidator,
	],
	productController.postProduct
);
