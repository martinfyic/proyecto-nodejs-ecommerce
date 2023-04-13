import { findOutJWT } from '../helpers/index.js';
import ChatMessages from '../models/chat.js';

const chatMessages = new ChatMessages();

export const socketController = async (socket, io) => {
	const token = socket.handshake.headers['auth-token'];
	const user = await findOutJWT(token);
	if (!user) return socket.disconnect();

	chatMessages.connectUser(user);
	io.emit('activ-user', chatMessages.usersArr);
	socket.emit('mess-recive', chatMessages.lastTenMessages);

	socket.join(user.id);

	socket.on('disconnect', () => {
		chatMessages.disconnectUser(user.id);
		io.emit('activ-user', chatMessages.usersArr);
	});

	socket.on('send-message', ({ uid, message, messDate }) => {
		if (uid) {
			socket.to(uid).emit('mess-private', { from: user.name, message });
		} else {
			chatMessages.sendMessage(user.id, user.name, message, messDate);
			io.emit('mess-recive', chatMessages.lastTenMessages);
		}
	});
};
