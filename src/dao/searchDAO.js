import { Category, Product, User } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const searchUserByNameOrEmail = async regex => {
	try {
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
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in searchDAO/searchUserByNameOrEmail: ${error}`
		);
	}
};

export const searchCategoryByNameOrEmail = async regex => {
	try {
		const categories = await Category.find({ name: regex, state: true })
			.lean()
			.exec();

		const categoriesTotal = await Category.count({ name: regex, state: true })
			.lean()
			.exec();

		return [categories, categoriesTotal];
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in searchDAO/searchCategoryByNameOrEmail: ${error}`
		);
	}
};

export const searchProductByNameOrEmail = async regex => {
	try {
		const products = await Product.find({ name: regex, state: true })
			.populate('category', 'name')
			.lean()
			.exec();

		const productsTotal = await Product.count({ name: regex, state: true })
			.lean()
			.exec();

		return [products, productsTotal];
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in searchDAO/searchProductByNameOrEmail: ${error}`
		);
	}
};
