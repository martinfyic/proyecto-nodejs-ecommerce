import { authService } from '../service/index.js';
import { createJWT } from '../helpers/index.js';
import { logger } from '../config/winston/winston.js';

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await authService.findUserByEmail(email);
		if (!user) {
			return res.status(400).json({
				message: 'Usuario / Password incorrectos',
			});
		}

		if (!user.state) {
			return res.status(400).json({
				message: 'Usuario / Password incorrectos',
			});
		}

		const isValidPass = authService.validPass(password, user.password);
		if (!isValidPass) {
			return res.status(400).json({
				message: 'Usuario / Password incorrectos',
			});
		}

		const token = await authService.createToken(user._id);

		res.json({
			message: 'Usuario logueado correctamente',
			user,
			token,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in authController/login: ${error}`);
		return res.status(500).json({
			message: 'Algo salio mal, hable con el administrador',
		});
	}
};

export const googleSingIn = async (req, res) => {
	const { id_token } = req.body;

	try {
		const googleData = await authService.googleSingIn(id_token);

		let user = await authService.findUserByEmail(googleData.email);

		if (!user) {
			user = await authService.saveUserGoole(googleData);
		}

		if (!user.state) {
			return res.status(401).json({
				message: `Hable con el administrador, Usuario: ${user.name} bloqueado`,
			});
		}

		const token = await authService.createToken(user._id);

		return res.json({
			message: 'Usuario logueado correctamente con Google',
			user,
			token,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in authController/googleSingIn: ${error}`);
		return res.status(400).json({
			message: 'El Token no se pudo verificar',
		});
	}
};

export const renewToken = async (req, res) => {
	try {
		const user = req.user;
		const token = await createJWT(user._id);
		res.json({
			user,
			token,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in authController/renewToken: ${error}`);
		return res.status(400).json({
			message: 'El Token no se pudo verificar',
		});
	}
};
