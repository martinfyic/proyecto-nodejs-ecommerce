const URL = 'http://localhost:8080/api/auth/';

let user = null;
let socket = null;

//Referencias HTML
const textUid = document.querySelector('#textUid');
const textMess = document.querySelector('#textMess');
const usersUl = document.querySelector('#usersUl');
const messUl = document.querySelector('#messUl');
const btnLogout = document.querySelector('#btnLogout');

const JWTValidation = async () => {
	const token = localStorage.getItem('token') || '';

	if (token.length <= 10) {
		window.location = 'index.html';
		throw new Error('No existe token en el servidor');
	}

	const resp = await fetch(URL, {
		headers: { 'auth-token': token },
	});
	const { user: userDB, token: tokenDB } = await resp.json();
	localStorage.setItem('token', tokenDB);
	user = userDB;
	document.title = `🗨️ ${user.name}`;

	await connectSocket();
};

const connectSocket = async () => {
	socket = io({
		extraHeaders: {
			'auth-token': localStorage.getItem('token'),
		},
	});

	socket.on('mess-recive', listMess);

	socket.on('activ-user', listUsers);

	socket.on('mess-private', payload => {
		console.log('Mess Privado: ', payload);
	});
};

const listUsers = (users = []) => {
	let usersHtml = '';
	users.forEach(({ uid, name }) => {
		usersHtml += `
			<li>
				<p>
					<h5 class="text-success">${name}</h5>
					<span class="fs-6 text-muted">${uid}</span>
				</p>
			</li>
		`;
	});

	usersUl.innerHTML = usersHtml;
};

const listMess = (messages = []) => {
	let messHtml = '';
	messages.forEach(({ name, mess, messDate }) => {
		messHtml += `
			<li>
				<p>
					<span class="text-primary fw-bold">${name}: </span>
					<span class="fw-semibold">${mess} </span>
					<span class="fst-italic text-body-secondary"> [${messDate}]</span>
				</p>
			</li>
		`;
	});

	messUl.innerHTML = messHtml;
};

textMess.addEventListener('keyup', ({ keyCode }) => {
	const uid = textUid.value;
	const message = textMess.value;

	if (keyCode !== 13) return;
	if (message.length === 0) return;

	const messDate = new Date().toLocaleString();
	socket.emit('send-message', { uid, message, messDate });

	textMess.value = '';
	textUid.value = '';
});

btnLogout.addEventListener('click', () => {
	localStorage.clear();
	location.reload();
});

const main = async () => {
	await JWTValidation();
};

main();
