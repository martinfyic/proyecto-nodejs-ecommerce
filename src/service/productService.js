import { productDAO } from '../dao/index.js';
import { logger } from '../config/winston/winston.js';

export const getAllProducts = async (limit, since) => {
	try {
		const allProducts = await productDAO.getAllProducts(limit, since);
		return allProducts;
	} catch (error) {
		logger.error(`===> ⚠️ Error en productService/getAllProducts: ${error}`);
	}
};

export const getProductById = async id => {
	try {
		const product = await productDAO.getProductById(id);
		return product;
	} catch (error) {
		logger.error(`===> ⚠️ Error en productService/getProductById: ${error}`);
	}
};

export const getProductByName = async name => {
	try {
		const product = await productDAO.getProductByName(name);
		return product;
	} catch (error) {
		logger.error(`===> ⚠️ Error en productService/getProductById: ${error}`);
	}
};

export const postProduct = async product => {
	try {
		const newProduct = await productDAO.postProduct(product);
		return newProduct;
	} catch (error) {
		logger.error(`===> ⚠️ Error en productService/postProduct: ${error}`);
	}
};

export const updateProduct = async (id, body) => {
	try {
		const productUpdated = await productDAO.updateProduct(id, body);
		return productUpdated;
	} catch (error) {
		logger.error(`===> ⚠️ Error en productService/updateProduct: ${error}`);
	}
};

export const deleteProduct = async id => {
	try {
		const productDeleted = await productDAO.deleteProduct(id);
		return productDeleted;
	} catch (error) {
		logger.error(`===> ⚠️ Error en productService/updateProduct: ${error}`);
	}
};
