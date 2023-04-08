import { categoryDAO, productDAO, searchDAO, userDAO } from '../dao/index.js';

export const searchUsers = async term => {
	const user = await userDAO.getUserById(term);
	return user;
};

export const searchUserByNameOrEmail = async regex => {
	const users = await searchDAO.searchUserByNameOrEmail(regex);
	return users;
};

export const searchCategory = async term => {
	const category = await categoryDAO.getCategoryById(term);
	return category;
};

export const searchCategoryByNameOrEmail = async regex => {
	const categories = await searchDAO.searchCategoryByNameOrEmail(regex);
	return categories;
};

export const searchProduct = async term => {
	const product = await productDAO.getProductById(term);
	return product;
};

export const searchProductByNameOrEmail = async regex => {
	const products = await searchDAO.searchProductByNameOrEmail(regex);
	return products;
};
