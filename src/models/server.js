import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config.js';
import {
	authRouter,
	cartRouter,
	categoryRouter,
	orderRouter,
	productRouter,
	searchRouter,
	userRouter,
} from '../routes/index.js';

export class Server {
	constructor() {
		this.app = express();
		this.PORT = process.env.PORT || 8080;

		// Path
		this.path = {
			auth: '/api/auth',
			carts: '/api/carts',
			categories: '/api/categories',
			orders: '/api/orders',
			products: '/api/products',
			search: '/api/search',
			user: '/api/users',
		};

		this.connectDB();

		this.middlewares();

		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		// cors
		this.app.use(cors());
		// Lectura y parseo
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		// Dir publico
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.path.auth, authRouter);
		this.app.use(this.path.carts, cartRouter);
		this.app.use(this.path.categories, categoryRouter);
		this.app.use(this.path.orders, orderRouter);
		this.app.use(this.path.products, productRouter);
		this.app.use(this.path.search, searchRouter);
		this.app.use(this.path.user, userRouter);
	}

	listen() {
		this.app
			.listen(this.PORT, () => {
				console.log(
					`===> 🚀 Servidor en http://localhost:${
						this.PORT
					} - ⌚ - ${new Date().toLocaleString()} 🚀`
				);
			})
			.on('error', err => {
				console.log(`===> ⚠️ Error en servidor: ${err?.message}`);
			});
	}
}
