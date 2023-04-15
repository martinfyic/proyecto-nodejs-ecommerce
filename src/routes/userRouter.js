import { Router } from 'express';
import { check } from 'express-validator';
import * as userControllers from '../controller/userController.js';
import {
	emailExist,
	userByIdExist,
	isValidRole,
} from '../helpers/dbValidators.js';
import {
	fieldValidator,
	jwtValidator,
	isAdminRole,
} from '../middlewares/index.js';
import { logger } from '../config/winston/winston.js';

export const userRouter = Router();

try {
	userRouter.get('/', userControllers.getUsers);
} catch (error) {
	logger.error(`===> ⚠️ Error in userRoutes/userRouter.get '/': ${error}`);
}

try {
	userRouter.get(
		'/:id',
		[
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(userByIdExist),
			fieldValidator,
		],
		userControllers.getUserById
	);
} catch (error) {
	logger.error(`===> ⚠️ Error in userRoutes/userRouter.get '/:id': ${error}`);
}

try {
	userRouter.post(
		'/',
		[
			check('name', 'El nombre es obligatorio').not().isEmpty(),
			check('email', 'El email no es valido').isEmail(),
			check('email').custom(emailExist),
			check(
				'password',
				'El password deben de ser 8 o mas caracteres '
			).isLength({
				min: 8,
			}),
			fieldValidator,
		],
		userControllers.postUser
	);
} catch (error) {
	logger.error(`===> ⚠️ Error in userRoutes/userRouter.post '/': ${error}`);
}

try {
	userRouter.put(
		'/:id',
		[
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(userByIdExist),
			fieldValidator,
		],
		userControllers.putUser
	);
} catch (error) {
	logger.error(`===> ⚠️ Error in userRoutes/userRouter.put '/:id': ${error}`);
}

try {
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
} catch (error) {
	logger.error(
		`===> ⚠️ Error in userRoutes/userRouter.delete '/:id': ${error}`
	);
}

try {
	userRouter.put(
		'/:id/roleupdate',
		[
			jwtValidator,
			isAdminRole,
			check('id', 'El ID no es valido').isMongoId(),
			check('id').custom(userByIdExist),
			check('role').custom(isValidRole),
			fieldValidator,
		],
		userControllers.putUserRoleUpdate
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in userRoutes/userRouter.put '/:id/roleupdate': ${error}`
	);
}
