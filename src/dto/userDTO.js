export const userDTO = ({ name, email, password }) => {
	const newUser = {
		name,
		email,
		password,
	};

	return newUser;
};
