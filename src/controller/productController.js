import { productService } from '../service/index.js';
import { productDTO } from '../dto/index.js';

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

export const postProduct = async (req, res) => {
	const { state, user, ...body } = req.body;
	const name = body.name.toUpperCase();

	const existProduct = await productService.getProductByName(name);

	if (existProduct) {
		return res.status(400).json({
			message: `El producto ${existProduct.name} ya existe`,
		});
	}

	const newProduct = productDTO(name, req.user._id, ...body);

	const product = await productService.postProduct(newProduct);

	return res.status(201).json({
		status: 'Ok',
		message: 'Producto creado correctamente',
		method: req.method,
		product,
	});
};
