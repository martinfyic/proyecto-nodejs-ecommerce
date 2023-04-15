import { cartDAO, productDAO } from '../dao/index.js';
import { cartDTO } from '../dto/index.js';
import { logger } from '../config/winston/winston.js';

export const getAllCarts = async (limit, since) => {
	try {
		const allCarts = await cartDAO.getAllCarts(limit, since);
		return allCarts;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/getAllCarts: ${error}`);
	}
};

export const getCart = async id => {
	try {
		const cart = await cartDAO.getCart(id);
		return cart;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/getCart: ${error}`);
	}
};

export const findCartByUser = async userId => {
	try {
		const findCartUser = await cartDAO.findCartByUser(userId);
		return findCartUser;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/findCartByUser: ${error}`);
	}
};

export const postCart = async userId => {
	try {
		const cartFormat = cartDTO(userId);

		const cartGenerated = await cartDAO.postCart(cartFormat);
		return cartGenerated;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/postCart: ${error}`);
	}
};

export const deleteCart = async id => {
	try {
		const cartDeleted = await cartDAO.deleteCart(id);
		return cartDeleted;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/deleteCart: ${error}`);
	}
};

export const addProductToCart = async (id, prodId) => {
	try {
		const productAdded = await productDAO.getProductById(prodId);
		const cart = await cartDAO.addProductToCart(id, productAdded);
		return cart;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/addProductToCart: ${error}`);
	}
};

export const deleteProductInCart = async (id, prodId) => {
	try {
		const cart = await cartDAO.deleteProductInCart(id, prodId);
		return cart;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartService/deleteProductInCart: ${error}`);
	}
};
