const customForm = document.querySelector('form');

const URL = `http://localhost:8080/api/auth/`;

// Custom Auth
customForm.addEventListener('submit', event => {
	event.preventDefault();
	const email = document.querySelector('#emailInput');
	const password = document.querySelector('#passwordInput');

	const formData = {
		email: email.value,
		password: password.value,
	};

	fetch(URL + 'login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	})
		.then(resp => resp.json())
		.then(({ message, token }) => {
			if (message) {
				return console.error(message);
			}
			localStorage.setItem('token', token);
			window.location = 'chat.html';
		})
		.catch(console.warn);

	email.value = '';
	password.value = '';
});

// Google Auth
function handleCredentialResponse(response) {
	const body = { id_token: response.credential };

	fetch(URL + 'google', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then(resp => resp.json())
		.then(({ token }) => {
			localStorage.setItem('token', token);
			window.location = 'chat.html';
		})
		.catch(console.warn);
}

const button = document.getElementById('google_singout');
button.onclick = () => {
	google.accounts.id.disableAutoSelect();
	google.accounts.id.revoke(localStorage.getItem('token'), done => {
		localStorage.clear();
		location.reload();
	});
};
