export const userDTO = ({ name, email, password, role }) => {
	const newUser = {
		name,
		email,
		password,
		role,
	};

	return newUser;
};
