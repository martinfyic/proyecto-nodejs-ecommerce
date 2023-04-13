class Message {
	constructor(uid, name, mess, messDate) {
		this.uid = uid;
		this.name = name;
		this.mess = mess;
		this.messDate = messDate;
	}
}

class ChatMessages {
	constructor() {
		this.messages = [];
		this.users = {};
	}

	get lastTenMessages() {
		this.messages = this.messages.splice(0, 15);
		return this.messages;
	}

	get usersArr() {
		return Object.values(this.users);
	}

	sendMessage(uid, name, mess, messDate) {
		this.messages.unshift(new Message(uid, name, mess, messDate));
	}

	connectUser(user) {
		this.users[user.id] = user;
	}

	disconnectUser(id) {
		delete this.users[id];
	}
}

export default ChatMessages;
