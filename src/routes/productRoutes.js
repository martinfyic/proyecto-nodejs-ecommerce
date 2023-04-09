import { Router } from 'express';
import { check } from 'express-validator';
import * as productController from '../controller/productController.js';
import { productByIdExist, categoryByIdExist } from '../helpers/index.js';
import {
	fieldValidator,
	jwtValidator,
	isAdminRole,
} from '../middlewares/index.js';

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
		isAdminRole,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('category', 'No es un ID de mongo').isMongoId(),
		check('category').custom(categoryByIdExist),
		check('price', 'El precio es obligatorio y numerico')
			.not()
			.isEmpty()
			.isNumeric(),
		check('stock', 'El stock es obligatorio y numerico')
			.not()
			.isEmpty()
			.isNumeric(),
		fieldValidator,
	],
	productController.postProduct
);

productRouter.put(
	'/:id',
	[
		jwtValidator,
		isAdminRole,
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(productByIdExist),
		fieldValidator,
	],
	productController.updateProduct
);

productRouter.delete(
	'/:id',
	[
		jwtValidator,
		isAdminRole,
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(productByIdExist),
		fieldValidator,
	],
	productController.deleteProduct
);
