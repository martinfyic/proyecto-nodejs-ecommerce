import { categoryDAO, productDAO, searchDAO, userDAO } from '../dao/index.js';
import { logger } from '../config/winston/winston.js';

export const searchUsers = async term => {
	try {
		const user = await userDAO.getUserById(term);
		return user;
	} catch (error) {
		logger.error(`===> ⚠️ Error in searchService/searchUsers: ${error}`);
	}
};

export const searchUserByNameOrEmail = async regex => {
	try {
		const users = await searchDAO.searchUserByNameOrEmail(regex);
		return users;
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in searchService/searchUserByNameOrEmail: ${error}`
		);
	}
};

export const searchCategory = async term => {
	try {
		const category = await categoryDAO.getCategoryById(term);
		return category;
	} catch (error) {
		logger.error(`===> ⚠️ Error in searchService/searchCategory: ${error}`);
	}
};

export const searchCategoryByNameOrEmail = async regex => {
	try {
		const categories = await searchDAO.searchCategoryByNameOrEmail(regex);
		return categories;
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in searchService/searchCategoryByNameOrEmail: ${error}`
		);
	}
};

export const searchProduct = async term => {
	try {
		const product = await productDAO.getProductById(term);
		return product;
	} catch (error) {
		logger.error(`===> ⚠️ Error in searchService/searchProduct: ${error}`);
	}
};

export const searchProductByNameOrEmail = async regex => {
	try {
		const products = await searchDAO.searchProductByNameOrEmail(regex);
		return products;
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in searchService/searchProductByNameOrEmail: ${error}`
		);
	}
};
