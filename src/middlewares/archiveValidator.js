export const archiveValidator = (req, res, next) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
		return res.status(400).json({
			status: 'Bad request',
			message: 'No hay archivos en la peticion',
		});
	}

	return next();
};
