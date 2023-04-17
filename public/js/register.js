const customForm = document.querySelector('form');

const URL = 'https://proyecto-nodejs-ecommerce.onrender.com/api/users';

customForm.addEventListener('submit', event => {
	event.preventDefault();
	const name = document.querySelector('#nameInput');
	const email = document.querySelector('#emailInput');
	const password = document.querySelector('#passwordInput');

	const formData = {
		name: name.value,
		email: email.value,
		password: password.value,
	};

	fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	})
		.then(resp => resp.json())
		.then(({ errors }) => {
			if (errors) {
				let listErrors = '';
				errors.forEach(({ msg }) => {
					listErrors += `
        <div class="container alert alert-danger mt-3" role="alert">
          <p class="fw-semibold text-center">
            ${msg}
          </p>
        </div>
        `;
				});

				const divError = document.querySelector('#divError');
				divError.innerHTML = listErrors;
				return console.error(errors);
			} else {
				window.location = 'index.html';
			}
		})
		.catch(console.warn);

	name.value = '';
	email.value = '';
	password.value = '';
});
