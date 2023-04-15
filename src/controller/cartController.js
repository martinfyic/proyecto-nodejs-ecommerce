import { cartService } from '../service/index.js';
import { logger } from '../config/winston/winston.js';

export const getAllCarts = async (req, res) => {
	try {
		const { limit = 10, since = 0 } = req.query;

		const [carts, totalCarts] = await cartService.getAllCarts(limit, since);

		return res.json({
			status: 'Ok',
			message: 'Carros Activos',
			method: req.method,
			totalCarts,
			carts,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartController/getAllCarts: ${error}`);
	}
};

export const getCart = async (req, res) => {
	try {
		const { id } = req.params;

		const cart = await cartService.getCart(id);

		return res.json({
			status: 'Ok',
			message: `Carro ID ${id}`,
			method: req.method,
			cart,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartController/getCart: ${error}`);
	}
};

export const postCart = async (req, res) => {
	try {
		const userId = req.user._id;

		const userCart = await cartService.findCartByUser(userId);
		if (userCart) {
			return res.status(400).json({
				status: 'Bad request',
				message: `El usuario: ${req.user.name.toUpperCase()} ya tiene un carro activo`,
				method: req.method,
				userCart,
			});
		}

		const newCart = await cartService.postCart(userId);
		return res.status(201).json({
			status: 'Ok',
			message: 'Carro creado',
			method: req.method,
			newCart,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartController/postCart: ${error}`);
	}
};

export const deleteCart = async (req, res) => {
	try {
		const { id } = req.params;

		const cartDeleted = await cartService.deleteCart(id);

		return res.status(200).json({
			status: 'Ok',
			message: `Carro ${id} borrado correctamente`,
			method: req.method,
			cartDeleted,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartController/deleteCart: ${error}`);
	}
};

export const addProductToCart = async (req, res) => {
	try {
		const { id } = req.params;
		const { prodId } = req.body;

		const productAdded = await cartService.addProductToCart(id, prodId);

		return res.status(200).json({
			status: 'Ok',
			message: `Producto ${id} agregado correctamente`,
			method: req.method,
			productAdded,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartController/addProductToCart: ${error}`);
	}
};

export const deleteProductInCart = async (req, res) => {
	try {
		const { id, prodId } = req.params;

		const productDeleted = await cartService.deleteProductInCart(id, prodId);

		if (productDeleted.message) {
			return res.status(400).json({
				status: 'Bad request',
				message: productDeleted.message,
				method: req.method,
				productDeleted: productDeleted.cart,
			});
		}

		return res.status(200).json({
			status: 'Ok',
			message: `Producto ${id} eliminado correctamente`,
			method: req.method,
			productDeleted,
		});
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in cartController/deleteProductInCart: ${error}`
		);
	}
};
