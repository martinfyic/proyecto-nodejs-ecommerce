import 'dotenv/config';
import { ServerApp } from './models/index.js';

const server = new ServerApp();

server.listen();
