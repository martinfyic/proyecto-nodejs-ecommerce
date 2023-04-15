import { categoryService } from '../service/index.js';
import { categoryDTO } from '../dto/index.js';
import { logger } from '../config/winston/winston.js';

export const getCategories = async (req, res) => {
	try {
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
	} catch (error) {
		logger.error(`===> ⚠️ Error in categoryController/getCategories: ${error}`);
	}
};

export const getCategoryById = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await categoryService.getCategoryById(id);

		return res.status(200).json({
			status: 'Ok',
			message: 'Categoria encontrada',
			method: req.method,
			category,
		});
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in categoryController/getCategoryById: ${error}`
		);
	}
};

export const postCategory = async (req, res) => {
	try {
		const name = req.body.name.toUpperCase();

		const existCategory = await categoryService.getCategoryByName(name);
		if (existCategory) {
			return res.status(400).json({
				message: `La categoria ${existCategory.name} ya existe`,
			});
		}

		const newCategory = categoryDTO(name, req.user._id);
		const categoryCreated = await categoryService.postCategory(newCategory);

		return res.status(201).json({
			status: 'Ok',
			message: 'Categotia creada correctamente',
			method: req.method,
			categoryCreated,
		});
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in categoryController/getCategoryById: ${error}`
		);
	}
};

export const updateCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const { state, user, ...body } = req.body;

		if (body.name) {
			body.name = body.name.toUpperCase();
		}
		body.user = req.user._id;

		const categoryUpdated = await categoryService.updateCategory(id, body);

		return res.status(200).json({
			status: 'Ok',
			message: 'Categotia actualizada correctamente',
			method: req.method,
			categoryUpdated,
		});
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in categoryController/updateCategory: ${error}`
		);
	}
};

export const deletedCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const categoryDeleted = await categoryService.deletedCategory(id);

		return res.status(200).json({
			status: 'Ok',
			message: 'Categotia eliminada correctamente',
			method: req.method,
			categoryDeleted,
		});
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in categoryController/deletedCategory: ${error}`
		);
	}
};
