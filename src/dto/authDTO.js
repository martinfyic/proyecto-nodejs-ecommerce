export const newUserDTO = user => {
	const newUser = {
		name: user.name,
		email: user.email,
		password: 'google',
		role: 'USER_ROLE',
		picture: user.picture,
		google: true,
	};
	return newUser;
};
