async function onLogin() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    localStorage.removeItem('token');

    let response = await fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    let json = await response.json();

    if (response.status !== 200) {
        let label_error = document.getElementById("label__error");
        if (label_error) {
            label_error.textContent = json.message;
        }
    }
    else {
        if (json.token) {

            const { token, ...user } = json;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            window.location = '/';
        }
    }
}

async function onRegister() {
    const username = document.getElementById('username');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const password = document.getElementById('password');
    const repassword = document.getElementById('repassword');

    localStorage.removeItem('token');

    let response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            repassword: repassword.value,
        }),
    });

    let json = await response.json();

    if (response.status !== 200) {
        let label_error = document.getElementById("label__error");
        if (label_error) {
            label_error.textContent = json.message;
        }
    }
    else {
        if (json.token) {

            const { token, ...user } = json;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            window.location = '/';
        }
    }
}

