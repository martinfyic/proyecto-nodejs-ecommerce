import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const uuidPass = uuidv4();
const salt = bcrypt.genSaltSync();
const passwordToSave = bcrypt.hashSync(uuidPass, salt);

export const newUserDTO = user => {
	const newUser = {
		name: user.name,
		email: user.email,
		password: passwordToSave,
		role: 'USER_ROLE',
		picture: user.picture,
		google: true,
	};
	return newUser;
};
