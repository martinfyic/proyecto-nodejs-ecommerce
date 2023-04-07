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

export const updateCategory = async (id, body) => {
	const categoryUpdated = await Category.findByIdAndUpdate(id, body, {
		new: true,
	});
	return categoryUpdated;
};

export const deletedCategory = async id => {
	const categoryDeleted = await Category.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);
	return categoryDeleted;
};
