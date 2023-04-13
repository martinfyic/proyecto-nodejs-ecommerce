import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const createJWT = (uid = '') => {
	try {
		return new Promise((resolve, reject) => {
			const payload = { uid };

			jwt.sign(
				payload,
				process.env.SECRET_PRIVATE_KEY,
				{
					expiresIn: '2h',
				},
				(error, token) => {
					if (error) {
						logger.error(`⚠️ ==> ${error}`);
						reject('No se pudo generar el token');
					} else {
						resolve(token);
					}
				}
			);
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error en helpers/createJWT: ${error}`);
	}
};

export const findOutJWT = async (token = '') => {
	try {
		if (token.length <= 10) return null;
		const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
		const user = await User.findById(uid).exec();

		if (!user) return null;
		if (!user.state) return null;

		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error en helpers/findOutJWT: ${error}`);
	}
};
