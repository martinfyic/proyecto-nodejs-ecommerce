import bcrypt from 'bcryptjs';
import { userDAO } from '../dao/index.js';
import { userDTO } from '../dto/index.js';
import {
	singupEmailAdmin,
	singupEmailUser,
} from '../config/nodemailer/template/singupEmail.js';

export const getUsers = async (limit, since) => {
	const allUsers = await userDAO.getUsers(limit, since);
	return allUsers;
};

export const getUserById = async id => {
	const userById = await userDAO.getUserById(id);
	return userById;
};

export const postUser = async body => {
	let user = userDTO(body);

	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(body.password, salt);

	const newUser = await userDAO.postUser(user);

	await singupEmailAdmin(newUser);
	await singupEmailUser(newUser);
	return newUser;
};

export const putUser = async (id, body) => {
	const { _id, password, google, ...rest } = body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		rest.password = bcrypt.hashSync(password, salt);
	}

	const user = await userDAO.putUser(id, rest);
	return user;
};

export const deleteUser = async id => {
	const user = await userDAO.deleteUser(id);
	return user;
};
