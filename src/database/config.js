import mongoose from 'mongoose';

export const dbConnection = async () => {
	try {
		await mongoose
			.connect(process.env.MONGODB_URL)
			.then(
				console.log(
					`===> ✨ Conección a DB💽 exitosa - ⌚ - ${new Date().toLocaleString()} ✨ `
				)
			);
	} catch (error) {
		throw new Error(
			`===> ⚠️ Error al iniciar la base de datos: ${error?.message}} ⚠️`
		);
	}
};
