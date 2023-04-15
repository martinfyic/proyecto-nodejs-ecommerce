import { Router } from 'express';
import { check } from 'express-validator';
import {
	fieldValidator,
	jwtValidator,
	isAdminRole,
} from '../middlewares/index.js';
import { categoryByIdExist } from '../helpers/index.js';
import * as categoryController from '../controller/categoryController.js';
import { logger } from '../config/winston/winston.js';

export const categoryRouter = Router();

try {
	categoryRouter.get('/', categoryController.getCategories);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in categoryRoutes/categoryRouter.get '/': ${error}`
	);
}

try {
	categoryRouter.get(
		'/:id',
		[
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(categoryByIdExist),
			fieldValidator,
		],
		categoryController.getCategoryById
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in categoryRoutes/categoryRouter.get '/:id': ${error}`
	);
}

try {
	categoryRouter.post(
		'/',
		[
			jwtValidator,
			isAdminRole,
			check('name', 'El nombre es obligatorio').not().isEmpty(),
			fieldValidator,
		],
		categoryController.postCategory
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in categoryRoutes/categoryRouter.post '/': ${error}`
	);
}

try {
	categoryRouter.put(
		'/:id',
		[
			jwtValidator,
			isAdminRole,
			check('name', 'El nombre es obligatorio').not().isEmpty(),
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(categoryByIdExist),
			fieldValidator,
		],
		categoryController.updateCategory
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in categoryRoutes/categoryRouter.put '/:id': ${error}`
	);
}

try {
	categoryRouter.delete(
		'/:id',
		[
			jwtValidator,
			isAdminRole,
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(categoryByIdExist),
			fieldValidator,
		],
		categoryController.deletedCategory
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in categoryRoutes/categoryRouter.delete '/:id': ${error}`
	);
}
