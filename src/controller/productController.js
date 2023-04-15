import { productService } from '../service/index.js';
import { productDTO } from '../dto/index.js';

export const getProducts = async (req, res) => {
	const { limit = 10, since = 0 } = req.query;

	const [products, totalProducts] = await productService.getAllProducts(
		limit,
		since
	);

	// --- Para enviar json con la info de productos y consumir la api desde el front y no ejs ---
	// return res.json({
	// 	status: 'Ok',
	// 	message: 'Productos Activos',
	// 	method: req.method,
	// 	totalProducts,
	// 	products,
	// });

	res.render('views/products', {
		title: 'Products 🤑 ',
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

	const newProduct = productDTO(name, req.user._id, body);

	const productCreated = await productService.postProduct(newProduct);

	return res.status(201).json({
		status: 'Ok',
		message: 'Producto creado correctamente',
		method: req.method,
		productCreated,
	});
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { state, user, ...body } = req.body;

	if (body.name) {
		body.name = body.name.toUpperCase();
	}
	body.user = req.user._id;

	const productUpdated = await productService.updateProduct(id, body);

	return res.status(200).json({
		status: 'Ok',
		message: 'Producto actualizado correctamente',
		method: req.method,
		productUpdated,
	});
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	const productDeleted = await productService.deleteProduct(id);

	return res.status(200).json({
		status: 'Ok',
		message: `Producto ${id} borrado correctamente`,
		method: req.method,
		productDeleted,
	});
};
