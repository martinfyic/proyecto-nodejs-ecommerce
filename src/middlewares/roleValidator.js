export const isAdminRole = (req, res, next) => {
	if (!req.user) {
		return res.status(500).json({
			message: 'Se debe verificar el token antes de validar el role',
		});
	}

	const { name, role } = req.user;

	if (role !== 'ADMIN_ROLE') {
		return res.status(401).json({
			message: `El usuario: ${name} no es administrador`,
		});
	}

	next();
};
