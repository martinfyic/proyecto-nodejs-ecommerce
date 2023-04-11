import winston from 'winston';

const config = {
	levels: {
		error: 0,
		debug: 1,
		warn: 2,
		data: 3,
		info: 4,
		verbose: 5,
		silly: 6,
		custom: 7,
	},
	colors: {
		error: 'red',
		debug: 'blue',
		warn: 'yellow',
		data: 'grey',
		info: 'green',
		verbose: 'cyan',
		silly: 'magenta',
		custom: 'yellow',
	},
};

winston.addColors(config.colors);

export const logger = winston.createLogger({
	levels: config.levels,
	format: winston.format.combine(
		winston.format.simple(),
		winston.format.timestamp(),
		winston.format.printf(
			info => `[${info.timestamp}] - level: ${info.level} - ${info.message}`
		),
		winston.format.colorize({ all: true })
	),
	transports: [
		new winston.transports.Console({
			level: 'custom',
		}),
		new winston.transports.File({
			filename: './logs/error.log',
			level: 'error',
		}),
	],
});
