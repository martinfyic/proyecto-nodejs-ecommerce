import { Product } from '../models/index.js';

export const getAllProducts = async (limit, since) => {
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
};

export const getProductById = async id => {
	const product = await Product.findById(id)
		.populate('user', ['name', 'state'])
		.populate('category', 'name')
		.lean()
		.exec();

	return product;
};

export const getProductByName = async name => {
	const product = await Product.findOne({ name }).lean().exec();
	return product;
};

export const postProduct = async product => {
	const newProduct = new Product(product);
	await newProduct.save();
	return newProduct;
};

export const updateProduct = async (id, body) => {
	const productUpdated = await Product.findByIdAndUpdate(id, body, {
		new: true,
	});
	return productUpdated;
};

export const deleteProduct = async id => {
	const productDeleted = await Product.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);
	return productDeleted;
};
