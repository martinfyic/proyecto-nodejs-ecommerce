import { productDAO } from '../dao/index.js';

export const getAllProducts = async (limit, since) => {
	const allProducts = await productDAO.getAllProducts(limit, since);
	return allProducts;
};

export const getProductById = async id => {
	const product = await productDAO.getProductById(id);
	return product;
};
