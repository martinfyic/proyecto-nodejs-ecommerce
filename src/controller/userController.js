import { userService } from '../service/index.js';

export const getUsers = async (req, res) => {
	const { limit = 10, since = 0 } = req.query;

	const [users, totalUsers] = await userService.getUsers(limit, since);

	res.json({
		message: 'Usuarios en DB',
		totalUsers,
		users,
	});
};

export const getUserById = async (req, res) => {
	const { id } = req.params;
	const user = await userService.getUserById(id);

	res.json({
		message: `Usuario ID: ${id} encontrado`,
		user,
	});
};

export const postUser = async (req, res) => {
	const body = req.body;
	const user = await userService.postUser(body);

	res.status(201).json({
		message: 'Usuario creado correctamente',
		user,
	});
};

export const putUser = async (req, res) => {
	const { id } = req.params;
	const body = req.body;

	const user = await userService.putUser(id, body);

	res.status(200).json({
		message: 'Usuario actualizado correctamente',
		user,
	});
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;

	const user = await userService.deleteUser(id);

	return res.status(200).json({
		message: 'Usuario desactivado de la DB',
		user,
	});
};
