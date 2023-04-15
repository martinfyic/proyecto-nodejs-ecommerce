import { Product } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const getAllProducts = async (limit, since) => {
	try {
		const activProduct = { state: true };

		const [products, totalProducts] = await Promise.all([
			Product.find(activProduct)
				.populate('user', 'name')
				.populate('category', 'name')
				.limit(Number(limit))
				.skip(Number(since))
				.lean()
				.exec(),
			Product.countDocuments(activProduct),
		]);

		return [products, totalProducts];
	} catch (error) {
		logger.error(`===> ⚠️ Error in productDAO/getAllProducts: ${error}`);
	}
};

export const getProductById = async id => {
	try {
		const product = await Product.findById(id)
			.populate('user', ['name', 'state'])
			.populate('category', 'name')
			.lean()
			.exec();

		return product;
	} catch (error) {
		logger.error(`===> ⚠️ Error in productDAO/getProductById: ${error}`);
	}
};

export const getProductByName = async name => {
	try {
		const product = await Product.findOne({ name }).lean().exec();
		return product;
	} catch (error) {
		logger.error(`===> ⚠️ Error in productDAO/getProductByName: ${error}`);
	}
};

export const postProduct = async product => {
	try {
		const newProduct = new Product(product);
		await newProduct.save();
		return newProduct;
	} catch (error) {
		logger.error(`===> ⚠️ Error in productDAO/postProduct: ${error}`);
	}
};

export const updateProduct = async (id, body) => {
	try {
		const productUpdated = await Product.findByIdAndUpdate(id, body, {
			new: true,
		});
		return productUpdated;
	} catch (error) {
		logger.error(`===> ⚠️ Error in productDAO/updateProduct: ${error}`);
	}
};

export const deleteProduct = async id => {
	try {
		const productDeleted = await Product.findByIdAndUpdate(
			id,
			{ state: false },
			{ new: true }
		);
		return productDeleted;
	} catch (error) {
		logger.error(`===> ⚠️ Error in productDAO/deleteProduct: ${error}`);
	}
};
