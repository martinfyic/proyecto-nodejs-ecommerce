import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Solucion __dirname is not defined
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const archiveExtensionValid = [
	'png',
	'PNG',
	'jpg',
	'JPG',
	'svg',
	'SVG',
	'jpeg',
	'JPEG',
];

export const uploadArchive = async (
	files,
	extensions = archiveExtensionValid,
	folder = ''
) => {
	return new Promise((resolve, reject) => {
		const { archive } = files;
		const archiveNameSplit = archive.name.split('.');
		const archiveExtension = archiveNameSplit[archiveNameSplit.length - 1];

		if (!extensions.includes(archiveExtension)) {
			return reject(
				`La extencion ${archiveExtension} no es valida, deben ser del tipo ${extensions}`
			);
		}

		const archiveIdName = `${uuidv4()}.${archiveExtension}`;

		const uploadPath = path.join(
			__dirname,
			'../uploads',
			folder,
			archiveIdName
		);

		archive.mv(uploadPath, error => {
			if (error) return reject(error);

			resolve(archiveIdName);
		});
	});
};
