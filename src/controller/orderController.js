import { orderService, cartService } from '../service/index.js';
import { logger } from '../config/winston/winston.js';

export const getAllOrders = async (req, res) => {
	try {
		const { limit = 10, since = 0 } = req.query;
		const [orders, totalOrders] = await orderService.getAllOrders(limit, since);

		return res.json({
			status: 'Ok',
			message: 'Ordenes Activas',
			method: req.method,
			totalOrders,
			orders,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderController/getAllOrders: ${error}`);
	}
};

export const createOrder = async (req, res) => {
	try {
		const { idCart } = req.params;

		const newOrder = await orderService.createOrder(idCart, req.user);

		if (newOrder.message) {
			return res.status(400).json({
				status: 'Bad request',
				message: newOrder.message,
				method: req.method,
				cart: newOrder.cart,
			});
		}

		await cartService.deleteCart(idCart);

		return res.status(201).json({
			status: 'Ok',
			message: `Orden ${newOrder._id} creada exitosamente`,
			method: req.method,
			newOrder,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderController/createOrder: ${error}`);
	}
};
