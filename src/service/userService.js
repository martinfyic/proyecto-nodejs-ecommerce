import bcrypt from 'bcryptjs';
import { userDAO } from '../dao/index.js';
import { userDTO } from '../dto/index.js';
import {
	singupEmailAdmin,
	singupEmailUser,
} from '../config/nodemailer/template/singupEmail.js';
import { logger } from '../config/winston/winston.js';

export const getUsers = async (limit, since) => {
	try {
		const allUsers = await userDAO.getUsers(limit, since);
		return allUsers;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userService/getUsers: ${error}`);
	}
};

export const getUserById = async id => {
	try {
		const userById = await userDAO.getUserById(id);
		return userById;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userService/getUserById: ${error}`);
	}
};

export const postUser = async body => {
	try {
		let user = userDTO(body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(body.password, salt);

		const newUser = await userDAO.postUser(user);

		await singupEmailAdmin(newUser);
		await singupEmailUser(newUser);
		return newUser;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userService/postUser: ${error}`);
	}
};

export const putUser = async (id, body) => {
	try {
		const { _id, password, google, role, ...rest } = body;

		if (password) {
			const salt = bcrypt.genSaltSync();
			rest.password = bcrypt.hashSync(password, salt);
		}

		const user = await userDAO.putUser(id, rest);
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userService/putUser: ${error}`);
	}
};

export const deleteUser = async id => {
	try {
		const user = await userDAO.deleteUser(id);
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userService/deleteUser: ${error}`);
	}
};

export const putUserRoleUpdate = async (id, role) => {
	try {
		const roleUpdate = await userDAO.putUserRoleUpdate(id, role);
		return roleUpdate;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userService/putUserRoleUpdate: ${error}`);
	}
};
