import { Category } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const getCategories = async (limit, since) => {
	try {
		const activCategory = { state: true };
		const [categories, totalCategories] = await Promise.all([
			Category.find(activCategory)
				.populate('user', 'name')
				.limit(Number(limit))
				.skip(Number(since)),
			Category.countDocuments(activCategory),
		]);

		return [categories, totalCategories];
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryDAO/getCategories: ${error}`);
	}
};

export const getCategoryById = async id => {
	try {
		const category = await Category.findById(id).lean().exec();
		return category;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryDAO/getCategoryById: ${error}`);
	}
};

export const getCategoryByName = async name => {
	try {
		const categoryName = await Category.findOne({ name }).lean().exec();
		return categoryName;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryDAO/getCategoryByName: ${error}`);
	}
};

export const postCategory = async name => {
	try {
		const newCategory = new Category(name);
		await newCategory.save();
		return newCategory;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryDAO/postCategory: ${error}`);
	}
};

export const updateCategory = async (id, body) => {
	try {
		const categoryUpdated = await Category.findByIdAndUpdate(id, body, {
			new: true,
		});
		return categoryUpdated;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryDAO/updateCategory: ${error}`);
	}
};

export const deletedCategory = async id => {
	try {
		const categoryDeleted = await Category.findByIdAndUpdate(
			id,
			{ state: false },
			{ new: true }
		);
		return categoryDeleted;
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryDAO/deletedCategory: ${error}`);
	}
};
