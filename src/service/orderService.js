import { cartDAO, orderDAO } from '../dao/index.js';
import { orderDTO } from '../dto/index.js';
import { orderEmail } from '../config/nodemailer/template/orderEmail.js';
import { logger } from '../config/winston/winston.js';

export const getAllOrders = async (limit, since) => {
	try {
		const allOrders = await orderDAO.getAllOrders(limit, since);
		return allOrders;
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderService/getAllOrders: ${error}`);
	}
};

export const createOrder = async (idCart, user) => {
	try {
		const cartOrder = await cartDAO.getCart(idCart);

		if (cartOrder.products.length === 0) {
			return {
				message: `Carrito ID: ${idCart} vacio`,
				cart: cartOrder,
			};
		} else {
			const orderFormat = orderDTO(cartOrder, user);
			const newOrder = await orderDAO.createOrder(orderFormat);
			await orderEmail(newOrder);
			return newOrder;
		}
	} catch (error) {
		logger.error(`===> ⚠️ Error in orderService/createOrder: ${error}`);
	}
};
