import nodemailer from 'nodemailer';
import { logger } from '../winston/winston.js';

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASS,
	},
});

transporter.verify(function (error, success) {
	if (error) {
		logger.error(`===> ⚠️ Nodemailer error: ${error}`);
	} else {
		logger.info(`===> ✉️ Nodemailer ready for send emails ✉️`);
	}
});
