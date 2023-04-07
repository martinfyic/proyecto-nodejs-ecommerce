export const productDTO = (name, user, body) => {
	const newProduct = {
		...body,
		name,
		user,
	};
	return newProduct;
};
