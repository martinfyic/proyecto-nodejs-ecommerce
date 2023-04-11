import { authDAO } from '../dao/index.js';
import bcrypt from 'bcryptjs';
import { createJWT, googleVerify } from '../helpers/index.js';
import { newUserDTO } from '../dto/index.js';
import { logger } from '../config/winston/winston.js';

export const findUserByEmail = async email => {
	try {
		const user = await authDAO.findUserByEmail(email);
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in authService/findUserByEmail: ${error}`);
	}
};

export const validPass = (password, userPassword) => {
	try {
		const isValidPass = bcrypt.compareSync(password, userPassword);
		return isValidPass;
	} catch (error) {
		logger.error(`===> ⚠️ Error in authService/validPass: ${error}`);
	}
};

export const createToken = async userId => {
	try {
		const token = await createJWT(userId);
		return token;
	} catch (error) {
		logger.error(`===> ⚠️ Error in authService/createToken: ${error}`);
	}
};

export const googleSingIn = async id_token => {
	try {
		const google = await googleVerify(id_token);
		return google;
	} catch (error) {
		logger.error(`===> ⚠️ Error in authService/googleSingIn: ${error}`);
	}
};

export const saveUserGoole = async user => {
	try {
		const newUser = newUserDTO(user);

		user = await authDAO.saveUserGoole(newUser);
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in authService/saveUserGoole: ${error}`);
	}
};
