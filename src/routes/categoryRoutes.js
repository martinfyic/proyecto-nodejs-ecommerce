import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import * as categoryController from '../controller/categoryController.js';

export const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);

categoryRouter.get('/:id', [], categoryController.getCategoryById);

categoryRouter.post(
	'/',
	[
		jwtValidator,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		fieldValidator,
	],
	categoryController.postCategory
);
