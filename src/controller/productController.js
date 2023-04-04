import { productService } from '../service/index.js';

export const getProducts = async (req, res) => {
	const { limit = 5, since = 0 } = req.query;

	const [products, totalProducts] = await productService.getAllProducts(
		limit,
		since
	);

	return res.json({
		status: 'Ok',
		message: 'Productos Activos',
		method: req.method,
		totalProducts,
		products,
	});
};

export const getProductById = async (req = request, res = response) => {
	const { id } = req.params;

	const product = await productService.getProductById(id);

	return res.status(200).json({
		status: 'Ok',
		message: 'Producto encontrado',
		method: req.method,
		product,
	});
};
