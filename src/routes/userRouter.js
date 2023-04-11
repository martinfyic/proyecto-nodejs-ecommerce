import { Router } from 'express';
import { check } from 'express-validator';
import * as userControllers from '../controller/userController.js';
import {
	isValidRole,
	emailExist,
	userByIdExist,
} from '../helpers/dbValidators.js';
import {
	fieldValidator,
	jwtValidator,
	isAdminRole,
} from '../middlewares/index.js';

export const userRouter = Router();

userRouter.get(
	'/',
	check('role').custom(isValidRole),
	userControllers.getUsers
);

userRouter.get(
	'/:id',
	[
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(userByIdExist),
		check('role').custom(isValidRole),
		fieldValidator,
	],
	userControllers.getUserById
);

userRouter.post(
	'/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email no es valido').isEmail(),
		check('email').custom(emailExist),
		check('password', 'El password deben de ser 8 o mas caracteres ').isLength({
			min: 8,
		}),
		fieldValidator,
	],
	userControllers.postUser
);

userRouter.put(
	'/:id',
	[
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(userByIdExist),
		check('role').custom(isValidRole),
		fieldValidator,
	],
	userControllers.putUser
);

userRouter.delete(
	'/:id',
	[
		jwtValidator,
		isAdminRole,
		check('id', 'El ID no es valido').isMongoId(),
		check('id').custom(userByIdExist),
		fieldValidator,
	],
	userControllers.deleteUser
);
