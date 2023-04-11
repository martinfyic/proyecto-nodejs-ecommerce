import { logger } from '../config/winston/winston.js';

export const orderDTO = (cartOrder, user) => {
	try {
		const { _id, name, email, address } = user;
		const dataFormat = {
			purchase: cartOrder.products,
			userId: _id,
			userEmail: email,
			userName: name,
			userAddress: address,
		};

		return dataFormat;
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderDTO: ${error}`);
	}
};
