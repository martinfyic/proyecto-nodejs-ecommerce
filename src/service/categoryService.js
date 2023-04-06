import { categoryDAO } from '../dao/index.js';

export const getCategories = async (limit, since) => {
	const allCategories = await categoryDAO.getCategories(limit, since);
	return allCategories;
};

export const getCategoryById = async id => {
	const category = await categoryDAO.getCategoryById(id);
	return category;
};

export const getCategoryByName = async name => {
	const categoryName = await categoryDAO.getCategoryByName(name);
	return categoryName;
};

export const postCategory = async name => {
	const newCategory = await categoryDAO.postCategory(name);
	return newCategory;
};
