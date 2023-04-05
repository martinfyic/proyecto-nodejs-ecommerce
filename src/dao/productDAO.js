import { Product } from '../models/index.js';

export const getAllProducts = async (limit, since) => {
	const activProduct = { state: true };

	const [products, totalProducts] = await Promise.all([
		Product.find(activProduct)
			.populate('user', 'name')
			.populate('category', 'name')
			.limit(Number(limit))
			.skip(Number(since)),
		Product.countDocuments(activProduct),
	]);

	return [products, totalProducts];
};

export const getProductById = async id => {
	const product = await Product.findById(id)
		.populate('user', ['name', 'state'])
		.populate('category', 'name')
		.exec();

	return product;
};

export const getProductByName = async name => {
	const product = await Product.findOne({ name });
	return product;
};

export const postProduct = async product => {
	const newProduct = new Product(product);
	await newProduct.save();
	return newProduct;
};
