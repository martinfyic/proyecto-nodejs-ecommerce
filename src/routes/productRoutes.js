import { Router } from 'express';
import { check } from 'express-validator';
import * as productController from '../controller/productController.js';
import { productByIdExist, categoryByIdExist } from '../helpers/index.js';
import {
	fieldValidator,
	jwtValidator,
	isAdminRole,
} from '../middlewares/index.js';
import { logger } from '../config/winston/winston.js';

export const productRouter = Router();

try {
	productRouter.get('/', productController.getProducts);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productRoutes/productRouter.get '/': ${error}`
	);
}

try {
	productRouter.get(
		'/:id',
		[
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(productByIdExist),
			fieldValidator,
		],
		productController.getProductById
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productRoutes/productRouter.get '/:id': ${error}`
	);
}

try {
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
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productRoutes/productRouter.post '/': ${error}`
	);
}

try {
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
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productRoutes/productRouter.put '/:id': ${error}`
	);
}

try {
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
} catch (error) {
	logger.error(
		`===> ⚠️ Error in productRoutes/productRouter.delete '/:id': ${error}`
	);
}
