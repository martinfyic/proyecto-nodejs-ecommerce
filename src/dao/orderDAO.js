import { Order } from '../models/index.js';

export const getAllOrders = async (limit, since) => {
	try {
		const activOrder = { state: true };

		const [orders, totalOrders] = await Promise.all([
			Order.find(activOrder)
				.populate('purchase', ['products', 'user'])
				.limit(Number(limit))
				.skip(Number(since))
				.lean()
				.exec(),
			Order.countDocuments(activOrder),
		]);

		return [orders, totalOrders];
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderDAO/getAllOrders: ${error}`);
	}
};

export const createOrder = async orderFormat => {
	try {
		const newOrder = new Order(orderFormat);
		await newOrder.save();
		return newOrder;
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderDAO/createOrder: ${error}`);
	}
};
