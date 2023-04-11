import { transporter } from '../nodemailer.js';

export const singupEmailAdmin = async body => {
	const email = await transporter.sendMail({
		from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
		to: `${process.env.NODEMAILER_EMAIL_ADMIN}`,
		subject: 'Nuevo registro en DB ✔',
		html: `
			<h1>Nuevo registro en DB 🔥</h1>
			<hr/>
			<h3>Informacion del Usuario:</h3>
			<ul>
				<li>
					<p><strong>Nombre:</strong> ${body.name}</p>
				</li>
				<li>
					<strong>Role:</strong> ${body.role}</p>
				</li>
				<li>
					<strong>Email:</strong> ${body.email}</p>
				</li>
				<li>
					<strong>Logueado con google:</strong> ${body.google}</p>
				</li>
				<li>
					<strong>Alta de usuario:</strong> ${body.createdAt}</p>
				</li>
			</ul>
			<hr/>
			`,
	});

	return email;
};

export const singupEmailUser = async body => {
	const email = await transporter.sendMail({
		from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
		to: `${body.email}`,
		subject: 'Registro exitoso ✔',
		html: `
			<h1>Gracias por registrarte 🚀</h1>
			<hr/>
			<h3>Informacion del Usuario:</h3>
			<ul>
				<li>
					<p><strong>Nombre:</strong> ${body.name}</p>
				</li>
				<li>
					<strong>Email:</strong> ${body.email}</p>
				</li>
				<li>
					<strong>Alta de usuario:</strong> ${body.createdAt}</p>
				</li>
			</ul>
			<hr/>
			`,
	});

	return email;
};
