import mongoose from 'mongoose';
import { logger } from '../config/winston/winston.js';

export const dbConnection = async () => {
	try {
		await mongoose
			.connect(process.env.MONGODB_URL)
			.then(logger.info(`===> ✨ Successful connection to DB ✨ `));
	} catch (error) {
		logger.error(`===> ⚠️ Error connecting to database: ${error?.message}} ⚠️`);
	}
};
