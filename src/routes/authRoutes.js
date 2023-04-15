import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import * as authController from '../controller/authController.js';
import { logger } from '../config/winston/winston.js';

export const authRouter = Router();

try {
	authRouter.post(
		'/login',
		[
			check('email', 'El email es obligatorio').isEmail(),
			check('password', 'El password es obligatorio').not().isEmpty(),
			fieldValidator,
		],
		authController.login
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in authRoutes/authRouter.post '/login': ${error}`
	);
}

try {
	authRouter.post(
		'/google',
		[
			check('id_token', 'El id_token es necesario').not().isEmpty(),
			fieldValidator,
		],
		authController.googleSingIn
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in authRoutes/authRouter.post '/google': ${error}`
	);
}

try {
	authRouter.get('/', jwtValidator, authController.renewToken);
} catch (error) {
	logger.error(`===> ⚠️ Error in authRoutes/authRouter.get '/': ${error}`);
}
