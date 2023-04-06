import { Category } from '../models/index.js';

export const getCategories = async (limit, since) => {
	const activCategory = { state: true };
	const [categories, totalCategories] = await Promise.all([
		Category.find(activCategory)
			.populate('user', 'name')
			.limit(Number(limit))
			.skip(Number(since)),
		Category.countDocuments(activCategory),
	]);

	return [categories, totalCategories];
};

export const getCategoryById = async id => {
	const category = await Category.findById(id).lean().exec();
	return category;
};

export const getCategoryByName = async name => {
	const categoryName = await Category.findOne({ name }).lean().exec();
	return categoryName;
};

export const postCategory = async name => {
	const newCategory = new Category(name);
	await newCategory.save();
	return newCategory;
};
