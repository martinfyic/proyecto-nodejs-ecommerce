import { User } from '../models/index.js';

export const findUserByEmail = async email => {
	try {
		const user = await User.findOne({ email }).exec();
		return user;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en findUserByEmail-authDAO - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const saveUserGoole = async newUser => {
	const user = new User(newUser);
	await user.save();
	return user;
};
