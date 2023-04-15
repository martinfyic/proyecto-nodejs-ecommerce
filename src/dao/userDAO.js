import { User } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const getUsers = async (limit, since) => {
	try {
		const activUser = { state: true };
		const allUsers = await Promise.all([
			User.find(activUser).limit(Number(limit)).skip(Number(since)),
			User.countDocuments(activUser).exec(),
		]);
		return allUsers;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userDAO/getUsers: ${error}`);
	}
};

export const getUserById = async id => {
	try {
		const userById = await User.findById(id).lean().exec();
		return userById;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userDAO/getUserById: ${error}`);
	}
};

export const postUser = async user => {
	try {
		const newUser = new User(user);
		await newUser.save();
		return newUser;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userDAO/postUser: ${error}`);
	}
};

export const putUser = async (id, rest) => {
	try {
		const user = await User.findByIdAndUpdate(id, rest, { new: true });
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userDAO/putUser: ${error}`);
	}
};

export const deleteUser = async id => {
	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ state: false },
			{ new: true }
		);
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userDAO/deleteUser: ${error}`);
	}
};

export const putUserRoleUpdate = async (id, role) => {
	try {
		const roleUpdate = await User.findByIdAndUpdate(id, role, { new: true });
		return roleUpdate;
	} catch (error) {
		logger.error(`===> ⚠️ Error in userDAO/putUserRoleUpdate: ${error}`);
	}
};
