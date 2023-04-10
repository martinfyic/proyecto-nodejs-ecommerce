import { cartDAO, orderDAO } from '../dao/index.js';
import { orderDTO } from '../dto/index.js';

export const getAllOrders = async (limit, since) => {
	const allOrders = await orderDAO.getAllOrders(limit, since);
	return allOrders;
};

export const createOrder = async idCart => {
	const cartOrder = await cartDAO.getCart(idCart);

	console.log(cartOrder.products);
	if (cartOrder.products.length === 0) {
		return {
			message: `Carrito ID: ${idCart} vacio`,
			cart: cartOrder,
		};
	} else {
		const orderFormat = orderDTO(cartOrder);
		const newOrder = await orderDAO.createOrder(orderFormat);
		return newOrder;
	}
};
