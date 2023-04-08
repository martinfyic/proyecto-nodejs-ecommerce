import { Category, Product, User } from '../models/index.js';

export const searchUserByNameOrEmail = async regex => {
	const users = await User.find({
		$or: [{ name: regex }, { email: regex }],
		$and: [{ state: true }],
	})
		.lean()
		.exec();

	const usersTotal = await User.count({
		$or: [{ name: regex }, { email: regex }],
		$and: [{ state: true }],
	})
		.lean()
		.exec();

	return [users, usersTotal];
};

export const searchCategoryByNameOrEmail = async regex => {
	const categories = await Category.find({ name: regex, state: true })
		.lean()
		.exec();

	const categoriesTotal = await Category.count({ name: regex, state: true })
		.lean()
		.exec();

	return [categories, categoriesTotal];
};

export const searchProductByNameOrEmail = async regex => {
	const products = await Product.find({ name: regex, state: true })
		.populate('category', 'name')
		.lean()
		.exec();

	const productsTotal = await Product.count({ name: regex, state: true })
		.lean()
		.exec();

	return [products, productsTotal];
};
