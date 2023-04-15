import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import fileUpload from 'express-fileupload';
import { createServer } from 'node:http';
import { dbConnection } from '../database/config.js';
import {
	authRouter,
	cartRouter,
	categoryRouter,
	orderRouter,
	productRouter,
	searchRouter,
	uploadsRouter,
	userRouter,
} from '../routes/index.js';
import { socketController } from '../sockets/socketsController.js';
import { logger } from '../config/winston/winston.js';

export class ServerApp {
	constructor() {
		this.app = express();
		this.PORT = process.env.PORT || 8080;
		this.server = createServer(this.app);
		this.io = new Server(this.server);

		this.path = {
			auth: '/api/auth',
			carts: '/api/carts',
			categories: '/api/categories',
			orders: '/api/orders',
			products: '/api/products',
			search: '/api/search',
			uploads: '/api/uploads',
			user: '/api/users',
		};

		this.connectDB();

		this.middlewares();

		this.routes();

		this.socket();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static('public'));
		this.app.set('view engine', 'ejs');
		this.app.set('views', 'public');
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.path.auth, authRouter);
		this.app.use(this.path.carts, cartRouter);
		this.app.use(this.path.categories, categoryRouter);
		this.app.use(this.path.orders, orderRouter);
		this.app.use(this.path.products, productRouter);
		this.app.use(this.path.search, searchRouter);
		this.app.use(this.path.uploads, uploadsRouter);
		this.app.use(this.path.user, userRouter);
	}

	socket() {
		this.io.on('connection', socket => socketController(socket, this.io));
	}

	listen() {
		this.server
			.listen(this.PORT, () => {
				logger.info(`===> 🚀 Server listening on port: ${this.PORT} 🚀`);
			})
			.on('error', err => {
				logger.error(`===> ⚠️ Server error: ${err?.message}`);
			});
	}
}
