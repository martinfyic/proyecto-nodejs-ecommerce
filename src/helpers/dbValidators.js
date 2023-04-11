import { Cart, Category, Product, Role, User } from '../models/index.js';

export const productByIdExist = async (id = '') => {
	const productById = await Product.findById(id).lean().exec();
	if (!productById) {
		throw new Error(`El ID: ${id} no existe`);
	}
	return true;
};

export const userByIdExist = async (id = '') => {
	const userById = await User.findById(id).lean().exec();
	if (!userById) {
		throw new Error(`El ID: ${id} no existe`);
	}
};

export const categoryByIdExist = async (id = '') => {
	const categoryById = await Category.findById(id).lean().exec();
	if (!categoryById) {
		throw new Error(`El ID: ${id} no existe`);
	}
	return true;
};

export const isValidRole = async (role = '') => {
	const existRole = await Role.findOne({ role }).lean().exec();
	if (!existRole) {
		throw new Error(`El role ${role} no esta registrado en BD`);
	}
	return true;
};

export const emailExist = async (email = '') => {
	const existEmail = await User.findOne({ email }).lean().exec();
	if (existEmail) {
		throw new Error(`El email: ${email} ya esta registrado`);
	}
	return true;
};

export const cartByIdExist = async (id = '') => {
	const cartById = await Cart.findById(id).lean().exec();
	if (!cartById) {
		throw new Error(`El ID: ${id} no existe`);
	}
	return true;
};

export const validCollection = (collection = '', collections = []) => {
	const isValidCollection = collections.includes(collection);
	if (!isValidCollection) {
		throw new error(
			`La coleccion ${collection} no es permitida, permitidas ${collections}`
		);
	}
	return true;
};
