import { orderService } from '../service/index.js';

export const getAllOrders = async (req, res) => {
	const { limit = 10, since = 0 } = req.query;
	const [orders, totalOrders] = await orderService.getAllOrders(limit, since);

	return res.json({
		status: 'Ok',
		message: 'Ordenes Activas',
		method: req.method,
		totalOrders,
		orders,
	});
};

export const createOrder = async (req, res) => {
	const { idCart } = req.params;

	const newOrder = await orderService.createOrder(idCart);

	if (newOrder.message) {
		return res.status(400).json({
			status: 'Bad request',
			message: newOrder.message,
			method: req.method,
			cart: newOrder.cart,
		});
	}

	return res.status(201).json({
		status: 'Ok',
		message: `Orden ${newOrder._id} creada exitosamente`,
		method: req.method,
		newOrder,
	});
};
