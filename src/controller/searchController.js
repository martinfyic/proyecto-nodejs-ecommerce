import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
import { searchService } from '../service/index.js';

const allowedCollections = ['categories', 'products', 'roles', 'users'];

const searchUsers = async (term = '', res) => {
	const isMongoId = ObjectId.isValid(term);
	if (isMongoId) {
		const user = await searchService.searchUsers(term);
		return res.status(200).json({
			status: 'Ok',
			results: user ? [user] : [],
		});
	}

	const regex = new RegExp(term, 'i');

	const [users, usersTotal] = await searchService.searchUserByNameOrEmail(
		regex
	);

	return res.status(200).json({
		status: 'Ok',
		counts: usersTotal,
		results: users ? [users] : [],
	});
};

const searchCategories = async (term = '', res) => {
	const isMongoId = ObjectId.isValid(term);

	if (isMongoId) {
		const category = await searchService.searchCategory(term);
		return res.status(200).json({
			status: 'Ok',
			results: category ? [category] : [],
		});
	}

	const regex = new RegExp(term, 'i');

	const [categories, categoriesTotal] =
		await searchService.searchCategoryByNameOrEmail(regex);

	return res.status(200).json({
		status: 'Ok',
		counts: categoriesTotal,
		results: categories ? [categories] : [],
	});
};

const searchProducts = async (term = '', res) => {
	const isMongoId = ObjectId.isValid(term);

	if (isMongoId) {
		const product = await searchService.searchProduct(term);

		return res.status(200).json({
			status: 'Ok',
			results: product ? [product] : [],
		});
	}

	const regex = new RegExp(term, 'i');

	const [products, productsTotal] =
		await searchService.searchProductByNameOrEmail(regex);

	return res.status(200).json({
		status: 'Ok',
		counts: productsTotal,
		results: products ? [products] : [],
	});
};

const searchController = (req, res) => {
	const { collection, term } = req.params;

	if (!allowedCollections.includes(collection)) {
		return res.status(400).json({
			status: 'Bad request',
			message: `La colleccion ${collection} no esta incluida en: ${allowedCollections}`,
		});
	}

	switch (collection) {
		case 'categories':
			searchCategories(term, res);
			break;
		case 'products':
			searchProducts(term, res);
			break;
		case 'users':
			searchUsers(term, res);
			break;

		default:
			res.status(500).json({
				message: 'Busqueda no implementada',
			});
	}
};

export default searchController;
