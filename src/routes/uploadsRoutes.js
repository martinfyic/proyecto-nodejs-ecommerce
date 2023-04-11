import { Router } from 'express';
import { check } from 'express-validator';
import * as uploadsController from '../controller/uploadsController.js';
import { fieldValidator, archiveValidator } from '../middlewares/index.js';
import { validCollection } from '../helpers/index.js';
import { logger } from '../config/winston/winston.js';

export const uploadsRouter = Router();

try {
	uploadsRouter.post('/', archiveValidator, uploadsController.uploadFile);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in uploadsRoutes/uploadsRouter.post '/': ${error}`
	);
}

try {
	uploadsRouter.put(
		'/:collection/:id',
		[
			archiveValidator,
			check('id', 'El ID no es valido').isMongoId(),
			check('collection').custom(c =>
				validCollection(c, ['users', 'products'])
			),
			fieldValidator,
		],
		uploadsController.updateImageCloudinary
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in uploadsRoutes/uploadsRouter.put '/:collection/:id': ${error}`
	);
}

try {
	uploadsRouter.get(
		'/:collection/:id',
		[
			check('id', 'El ID no es valido').isMongoId(),
			check('collection').custom(c =>
				validCollection(c, ['users', 'products'])
			),
			fieldValidator,
		],
		uploadsController.imageServeCloudinary
	);
} catch (error) {
	logger.error(
		`===> ⚠️ Error in uploadsRoutes/uploadsRouter.get '/:collection/:id': ${error}`
	);
}
