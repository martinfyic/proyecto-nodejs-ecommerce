import { v2 as cloudinary } from 'cloudinary';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { uploadArchive } from '../helpers/index.js';
import { User, Product } from '../models/index.js';
import { logger } from '../config/winston/winston.js';

cloudinary.config(process.env.CLOUDINARY_URL);

// Solucion __dirname is not defined cuando usamos type: "modules"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = async (req, res) => {
	try {
		const imgSaved = await uploadArchive(req.files, undefined, 'images');
		res.json({
			status: 'OK',
			message: 'Imagen guardada correctamente',
			imgSaved,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Error in uploadsController/uploadFile: ${error}`);
		res.status(400).json({
			status: 'Bad request',
			message: error,
		});
	}
};

export const updateImageCloudinary = async (req, res) => {
	try {
		const { id, collection } = req.params;

		let model;

		switch (collection) {
			case 'users':
				model = await User.findById(id);
				if (!model) {
					return res.status(400).json({
						status: 'Bad request',
						message: `No existe un usuario con el id ${id}`,
					});
				}
				break;

			case 'products':
				model = await Product.findById(id);
				if (!model) {
					return res.status(400).json({
						status: 'Bad request',
						message: `No existe un producto con el id ${id}`,
					});
				}
				break;

			default:
				return res.status(500).json({ message: 'Por validar' });
		}

		if (model.img) {
			const imgArr = model.img.split('/');
			const imgName = imgArr[imgArr.length - 1];
			const [public_id] = imgName.split('.');
			cloudinary.uploader.destroy(public_id);
		}

		const { tempFilePath } = req.files.archive;
		const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
		model.img = secure_url;

		await model.save();

		res.json({
			status: 'OK',
			message: 'imagen guardada correctamente',
			data: model,
		});
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in uploadsController/updateImageCloudinary: ${error}`
		);
		res.status(400).json({
			status: 'Bad request',
			message: error,
		});
	}
};

export const imageServeCloudinary = async (req, res) => {
	try {
		const { id, collection } = req.params;

		let model;

		switch (collection) {
			case 'users':
				model = await User.findById(id);
				if (!model) {
					return res.status(400).json({
						status: 'Bad request',
						message: `No existe un usuario con el id ${id}`,
					});
				}
				break;

			case 'products':
				model = await Product.findById(id);
				if (!model) {
					return res.status(400).json({
						status: 'Bad request',
						message: `No existe un producto con el id ${id}`,
					});
				}
				break;

			default:
				return res.status(500).json({ message: 'Por validar' });
		}

		if (model.img) {
			return res.redirect(model.img);
		}

		const noImage = path.join(__dirname, '../../src/assets/no-image.jpg');
		res.sendFile(noImage);
	} catch (error) {
		logger.error(
			`===> ⚠️ Error in uploadsController/imageServeCloudinary: ${error}`
		);
	}
};
