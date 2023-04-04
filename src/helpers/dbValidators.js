import { Product } from '../models/index.js';

export const productByIdExist = async (id = '') => {
	const productById = await Product.findById(id);
	if (!productById) {
		throw new Error(`El ID: ${id} no existe`);
	}
	return true;
};
