import { Router } from 'express';
import { check } from 'express-validator';
import {
	fieldValidator,
	jwtValidator,
	isAdminRole,
} from '../middlewares/index.js';
import { categoryByIdExist } from '../helpers/index.js';
import * as categoryController from '../controller/categoryController.js';

export const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);

categoryRouter.get(
	'/:id',
	[
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(categoryByIdExist),
		fieldValidator,
	],
	categoryController.getCategoryById
);

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
