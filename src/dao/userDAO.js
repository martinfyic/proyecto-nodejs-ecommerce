import { User } from '../models/index.js';

export const getUsers = async (limit, since) => {
	const activUser = { state: true };
	const allUsers = await Promise.all([
		User.find(activUser).limit(Number(limit)).skip(Number(since)),
		User.countDocuments(activUser).exec(),
	]);
	return allUsers;
};

export const getUserById = async id => {
	const userById = await User.findById(id).lean().exec();
	return userById;
};

export const postUser = async user => {
	const newUser = new User(user);
	await newUser.save();
	return newUser;
};

export const putUser = async (id, rest) => {
	const user = await User.findByIdAndUpdate(id, rest, { new: true });
	return user;
};

export const deleteUser = async id => {
	const user = await User.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);
	return user;
};
