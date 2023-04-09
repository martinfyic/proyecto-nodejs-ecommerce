import { Cart } from '../models/index.js';

export const getAllCarts = async (limit, since) => {
	const activCart = { state: true };

	const [carts, totalCarts] = await Promise.all([
		Cart.find(activCart)
			.populate('user', 'name')
			.limit(Number(limit))
			.skip(Number(since))
			.lean()
			.exec(),
		Cart.countDocuments(activCart),
	]);

	return [carts, totalCarts];
};

export const getCart = async id => {
	const cart = await Cart.findById(id).populate('user', 'name').lean().exec();
	return cart;
};

export const findCartByUser = async userId => {
	const findUserCart = await Cart.findOne({ user: userId, state: true })
		.lean()
		.exec();
	return findUserCart;
};

export const postCart = async userId => {
	const newCart = new Cart(userId);
	await newCart.save();
	return newCart;
};

export const deleteCart = async id => {
	const cartDeleted = await Cart.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);
	return cartDeleted;
};

export const addProductToCart = async (id, productAdded) => {
	const { user, state, ...productSelected } = productAdded;
	const cart = await Cart.findById(id).lean().exec();

	if (!cart.products) {
		const added = [
			{
				...productSelected,
				quantity: 1,
				total: productSelected.price,
				stock: productSelected.stock - 1,
			},
		];
		cart.products = added;
		await Cart.findByIdAndUpdate(id, cart, { new: true });
		return cart;
	}

	const existProduct = cart.products.find(
		product => product._id.toString() === productSelected._id.toString()
	);
	if (existProduct) {
		const products = cart.products.map(prodInCart => {
			if (prodInCart._id.toString() === productSelected._id.toString()) {
				prodInCart.quantity += 1;
				prodInCart.stock -= 1;
				prodInCart.total = prodInCart.quantity * prodInCart.price;
			}
			return prodInCart;
		});

		cart.products = products;
		await Cart.findByIdAndUpdate(id, cart, { new: true });
		return cart;
	}
};
