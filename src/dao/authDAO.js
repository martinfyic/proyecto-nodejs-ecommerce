import { User } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const findUserByEmail = async email => {
	try {
		const user = await User.findOne({ email }).lean().exec();
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error en authDAO/findUserByEmail: ${error}`);
	}
};

export const saveUserGoole = async newUser => {
	try {
		const user = new User(newUser);
		await user.save();
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error en authDAO/saveUserGoole: ${error}`);
	}
};
