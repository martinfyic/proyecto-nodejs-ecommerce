import { Router } from 'express';

export const errorRouter = Router();

errorRouter.get('/', (req, res) => {
	res.status(404).json({
		status: 404,
		message: 'Error 404 | Not Found',
	});
});
