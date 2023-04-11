import { transporter } from '../nodemailer.js';
import { logger } from '../../winston/winston.js';

export const orderEmail = async savedOrder => {
	try {
		let prodDetail = '';
		savedOrder.purchase.forEach(prod => {
			prodDetail += `
			<ul>
				<li>
					<strong>Producto: </strong>${prod.name}
				</li>
				<li>
					<strong>Precio: </strong>$${prod.price}
				</li>
				<li>
					<strong>Cantidad: </strong>${prod.quantity}
				</li>
				<li>
					<strong>Total: </strong>$${prod.total}
				</li>
			</ul>`;
		});

		await transporter.sendMail({
			from: `"Nodemailer ⚡" <${process.env.NODEMAILER_EMAIL}>`,
			to: `${savedOrder.userEmail}`,
			subject: '📦 Detalle de pedido',
			html: `
			<h1>Nuevo pedido 🔥</h1>
			<hr/>
			<h3>Informacion:</h3>
			<h4><strong>Nro de Orden: </strong> ${savedOrder._id}</h4>
			<h4><strong>Nombre: </strong> ${savedOrder.userName}</h4>
			<h4><strong>Id usuario: </strong> ${savedOrder.userId}</h4>
			<h4><strong>Fecha: </strong> ${savedOrder.createdAt}</h4>
			<h4><strong>Productos: </strong></h4>
			<div>${prodDetail}</div>
			<hr/>
			`,
		});
	} catch (error) {
		logger.error(`===> ⚠️ Nodemailer - orderEmail error: ${error}`);
	}
};
