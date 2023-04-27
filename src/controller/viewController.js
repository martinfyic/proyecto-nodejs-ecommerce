import { productService } from '../service/index.js';
import { logger } from '../config/winston/winston.js';

export const getViewsProducts = async (req, res) => {
	try {
		const { limit = 10, since = 0 } = req.query;

		const [products] = await productService.getAllProducts(limit, since);

		res.render('views/products', {
			title: 'Products 🤑 ',
			products,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in productController/getProducts: ${error}`);
	}
};

export const getViewsProductById = async (req = request, res = response) => {
	try {
		const { id } = req.params;

		const product = await productService.getProductById(id);

		res.render('views/productById', { title: 'Product 👔', product });
	} catch (error) {
		logger.error(`===> ⚠️ Error in productController/getProductById: ${error}`);
	}
};
