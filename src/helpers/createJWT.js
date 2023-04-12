import jwt from 'jsonwebtoken';
import { logger } from '../config/winston/winston.js';

export const createJWT = (uid = '') => {
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
};
