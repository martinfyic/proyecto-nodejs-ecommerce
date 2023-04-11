import { Router } from 'express';
import { check } from 'express-validator';
import { fieldValidator, jwtValidator } from '../middlewares/index.js';
import * as authController from '../controller/authController.js';

export const authRouter = Router();

authRouter.post(
	'/login',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		fieldValidator,
	],
	authController.login
);

authRouter.post(
	'/google',
	[
		check('id_token', 'El id_token es necesario').not().isEmpty(),
		fieldValidator,
	],
	authController.googleSingIn
);

authRouter.get('/', jwtValidator, authController.renewToken);
