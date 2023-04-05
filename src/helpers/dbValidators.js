import { Category, Product, Role, User } from '../models/index.js';

export const productByIdExist = async (id = '') => {
	const productById = await Product.findById(id);
	if (!productById) {
		throw new Error(`El ID: ${id} no existe`);
	}
	return true;
};

export const userByIdExist = async (id = '') => {
	const userById = await User.findById(id);
	if (!userById) {
		throw new Error(`El ID: ${id} no existe`);
	}
};

export const categoryByIdExist = async (id = '') => {
	const categoryById = await Category.findById(id);
	if (!categoryById) {
		throw new Error(`El ID: ${id} no existe`);
	}
	return true;
};

export const isValidRole = async (role = '') => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(`El role ${role} no esta registrado en BD`);
	}
	return true;
};

export const emailExist = async (email = '') => {
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error(`El email: ${email} ya esta registrado`);
	}
	return true;
};
