import { authDAO } from '../dao/index.js';
import bcrypt from 'bcryptjs';
import { createJWT, googleVerify } from '../helpers/index.js';
import { newUserDTO } from '../dto/index.js';

export const findUserByEmail = async email => {
	try {
		const user = await authDAO.findUserByEmail(email);
		return user;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en findUserByEmail-authService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const validPass = (password, userPassword) => {
	try {
		const isValidPass = bcrypt.compareSync(password, userPassword);
		return isValidPass;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en validPass-authService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const createToken = async userId => {
	try {
		const token = await createJWT(userId);
		return token;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en createToken-authService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const googleSingIn = async id_token => {
	try {
		const google = await googleVerify(id_token);
		return google;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en googleSingIn-authService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const saveUserGoole = async user => {
	const newUser = newUserDTO(user);

	user = await authDAO.saveUserGoole(newUser);
	return user;
};
