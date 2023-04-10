import { cartDAO, productDAO } from '../dao/index.js';
import { cartDTO } from '../dto/index.js';

export const getAllCarts = async (limit, since) => {
	const allCarts = await cartDAO.getAllCarts(limit, since);
	return allCarts;
};

export const getCart = async id => {
	const cart = await cartDAO.getCart(id);
	return cart;
};

export const findCartByUser = async userId => {
	const findCartUser = await cartDAO.findCartByUser(userId);
	return findCartUser;
};

export const postCart = async userId => {
	const cartFormat = cartDTO(userId);

	const cartGenerated = await cartDAO.postCart(cartFormat);
	return cartGenerated;
};

export const deleteCart = async id => {
	const cartDeleted = await cartDAO.deleteCart(id);
	return cartDeleted;
};

export const addProductToCart = async (id, prodId) => {
	const productAdded = await productDAO.getProductById(prodId);
	const cart = await cartDAO.addProductToCart(id, productAdded);
	return cart;
};

export const deleteProductInCart = async (id, prodId) => {
	const cart = await cartDAO.deleteProductInCart(id, prodId);
	return cart;
};
