import { Cart } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

export const getAllCarts = async (limit, since) => {
	try {
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
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/getAllCarts: ${error}`);
	}
};

export const getCart = async id => {
	try {
		const cart = await Cart.findById(id).populate('user', 'name').lean().exec();
		return cart;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/getCart: ${error}`);
	}
};

export const findCartByUser = async userId => {
	try {
		const findUserCart = await Cart.findOne({ user: userId, state: true })
			.lean()
			.exec();
		return findUserCart;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/findCartByUser: ${error}`);
	}
};

export const postCart = async userId => {
	try {
		const newCart = new Cart(userId);
		await newCart.save();
		return newCart;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/postCart: ${error}`);
	}
};

export const deleteCart = async id => {
	try {
		const cartDeleted = await Cart.findByIdAndUpdate(
			id,
			{ state: false },
			{ new: true }
		);
		return cartDeleted;
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/deleteCart: ${error}`);
	}
};

export const addProductToCart = async (id, productAdded) => {
	try {
		const { user, state, ...productSelected } = productAdded;
		const cart = await Cart.findById(id).lean().exec();

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
		} else {
			let addProd = [
				...cart.products,
				{
					...productSelected,
					quantity: 1,
					total: productSelected.price,
					stock: productSelected.stock - 1,
				},
			];
			cart.products = addProd;
			await Cart.findByIdAndUpdate(id, cart, { new: true });
			return cart;
		}
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/addProductToCart: ${error}`);
	}
};

export const deleteProductInCart = async (id, prodId) => {
	try {
		const cart = await Cart.findById(id).lean().exec();

		const existProduct = cart?.products.find(
			prod => prod._id.toString() === prodId
		);

		if (existProduct === undefined)
			return {
				message: `Producto ID: ${prodId} no existe en el carrito`,
				cart,
			};

		if (existProduct.quantity === 1) {
			const products = cart.products.filter(
				prodInCart => prodInCart._id.toString() !== prodId
			);
			cart.products = products;
			await Cart.findByIdAndUpdate(id, cart, { new: true });
			return cart;
		}

		if (existProduct) {
			const products = cart.products.map(prodInCart => {
				if (prodInCart._id.toString() === prodId) {
					prodInCart.quantity -= 1;
					prodInCart.stock += 1;
					prodInCart.total = prodInCart.quantity * prodInCart.price;
				}
				return prodInCart;
			});

			cart.products = products;
			await Cart.findByIdAndUpdate(id, cart, { new: true });
			return cart;
		}
	} catch (error) {
		logger.error(`===> ⚠️ Error in cartDAO/deleteProductInCart: ${error}`);
	}
};
