import { categoryService } from '../service/index.js';
import { categoryDTO } from '../dto/index.js';

export const getCategories = async (req, res) => {
	const { limit = 10, since = 0 } = req.query;

	const [categories, totalCategories] = await categoryService.getCategories(
		limit,
		since
	);

	return res.json({
		status: 'Ok',
		message: 'Categorias Activas',
		method: req.method,
		totalCategories,
		categories,
	});
};

export const getCategoryById = async (req, res) => {
	const { id } = req.params;

	const category = await categoryService.getCategoryById(id);

	return res.status(200).json({
		status: 'Ok',
		message: 'Categoria encontrada',
		method: req.method,
		category,
	});
};

export const postCategory = async (req, res) => {
	const name = req.body.name.toUpperCase();

	const existCategory = await categoryService.getCategoryByName(name);
	if (existCategory) {
		return res.status(400).json({
			message: `La categoria ${existCategory.name} ya existe`,
		});
	}

	const newCategory = categoryDTO(name, req.user._id);
	const category = await categoryService.postCategory(newCategory);

	return res.status(201).json({
		status: 'Ok',
		message: 'Categotia creada correctamente',
		method: req.method,
		category,
	});
};
