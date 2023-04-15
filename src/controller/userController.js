import { userService } from '../service/index.js';
import { logger } from '../config/winston/winston.js';

export const getUsers = async (req, res) => {
	try {
		const { limit = 10, since = 0 } = req.query;

		const [users, totalUsers] = await userService.getUsers(limit, since);

		res.json({
			message: 'Usuarios en DB',
			totalUsers,
			users,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in userController/getUsers: ${error}`);
	}
};

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await userService.getUserById(id);

		res.json({
			message: `Usuario ID: ${id} encontrado`,
			user,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in userController/getUserById: ${error}`);
	}
};

export const postUser = async (req, res) => {
	try {
		const body = req.body;
		const user = await userService.postUser(body);

		res.status(201).json({
			message: 'Usuario creado correctamente',
			user,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in userController/postUser: ${error}`);
	}
};

export const putUser = async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;

		const user = await userService.putUser(id, body);

		res.status(200).json({
			message: 'Usuario actualizado correctamente',
			user,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in userController/putUser: ${error}`);
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await userService.deleteUser(id);

		return res.status(200).json({
			message: 'Usuario desactivado de la DB',
			user,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in userController/deleteUser: ${error}`);
	}
};

export const putUserRoleUpdate = async (req, res) => {
	try {
		const { id } = req.params;
		const role = req.body;

		const roleUpdate = await userService.putUserRoleUpdate(id, role);

		return res.status(200).json({
			message: `Usuario actualizado con el role ${role}`,
			roleUpdate,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in userController/putUserRoleUpdate: ${error}`);
	}
};
