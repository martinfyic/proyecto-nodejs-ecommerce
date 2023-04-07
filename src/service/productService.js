import { productDAO } from '../dao/index.js';

export const getAllProducts = async (limit, since) => {
	try {
		const allProducts = await productDAO.getAllProducts(limit, since);
		return allProducts;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en getAllProducts-productService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const getProductById = async id => {
	try {
		const product = await productDAO.getProductById(id);
		return product;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en getProductById-productService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const getProductByName = async name => {
	try {
		const product = await productDAO.getProductByName(name);
		return product;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en getProductById-productService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const postProduct = async product => {
	try {
		const newProduct = await productDAO.postProduct(product);
		return newProduct;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en postProduct-productService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const updateProduct = async (id, body) => {
	try {
		const productUpdated = await productDAO.updateProduct(id, body);
		return productUpdated;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en updateProduct-productService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};

export const deleteProduct = async id => {
	try {
		const productDeleted = await productDAO.deleteProduct(id);
		return productDeleted;
	} catch (error) {
		console.log(
			`===> ⚠️ Error en updateProduct-productService - ⌚ - ${new Date().toLocaleString()} ==> ${error}`
		);
	}
};
