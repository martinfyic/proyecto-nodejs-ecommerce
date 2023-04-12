import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const jwtValidator = async (req, res, next) => {
	const token = req.header('auth-token');

	if (!token) {
		return res.status(401).json({
			message: 'No hay token en la peticion',
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

		const user = await User.findById(uid).exec();

		if (!user) {
			return res.status(401).json({
				message: 'Token no valido',
			});
		}

		if (!user.state) {
			return res.status(401).json({
				message: 'Token no valido',
			});
		}

		req.user = user;
		next();
	} catch (error) {
		logger.warn(`⚠️ ==> ${error}`);
		return res.status(401).json({
			message: 'Token no valido',
		});
	}
};
