import { categoryDAO } from '../dao/index.js';
import { logger } from '../config/winston/winston.js';

export const getCategories = async (limit, since) => {
	try {
		const allCategories = await categoryDAO.getCategories(limit, since);
		return allCategories;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryService/getCategories: ${error}`);
	}
};

export const getCategoryById = async id => {
	try {
		const category = await categoryDAO.getCategoryById(id);
		return category;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryService/getCategoryById: ${error}`);
	}
};

export const getCategoryByName = async name => {
	try {
		const categoryName = await categoryDAO.getCategoryByName(name);
		return categoryName;
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in categoryService/getCategoryByName: ${error}`
		);
	}
};

export const postCategory = async name => {
	try {
		const newCategory = await categoryDAO.postCategory(name);
		return newCategory;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryService/postCategory: ${error}`);
	}
};

export const updateCategory = async (id, body) => {
	try {
		const categoryUpdated = await categoryDAO.updateCategory(id, body);
		return categoryUpdated;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryService/updateCategory: ${error}`);
	}
};

export const deletedCategory = async id => {
	try {
		const categoryDeleted = await categoryDAO.deletedCategory(id);
		return categoryDeleted;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryService/deletedCategory: ${error}`);
	}
};
