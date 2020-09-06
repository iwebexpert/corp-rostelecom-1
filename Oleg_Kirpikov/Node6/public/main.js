const root = 'http://localhost:4000';
var jwt = '';
var user;
var selectors = ['add', 'list', 'register', 'auth'];

function showHide(id) {
    let el = document.getElementById(id)
    if (el.classList.contains('hide')) {
        el.classList.remove('hide')
    } else {
        el.classList.add('hide')
    }
}

function hide(id) {
    let el = document.getElementById(id);
    if (!el.classList.contains('hide')) {
        el.classList.add('hide');
    };
}

function show(id) {
    let el = document.getElementById(id)
    if (el.classList.contains('hide')) {
        el.classList.remove('hide')
    }
}


function auth() {
    console.log('auth');
    const email = document.querySelector('*[name="email"]').value;
    const password = document.querySelector('*[name="password"]').value;
    const formData = new URLSearchParams();
    formData.append('email', email)
    formData.append('password', password)
    fetch(root + '/auth', { method: 'POST', body: formData })
        .then(response => {
            jwt = response.headers.get('authorization');
            console.log(jwt);
            return response.json()
        })
        .then((data) => {
            console.log('data');
            console.log(data);
            if (data._id) {
                user = JSON.parse(JSON.stringify(data));
                list();
            } else {
                document.getElementById('wrong_password').innerText = data.message;
                show('wrong_password');
                document.querySelector('*[name="password"]').value = '';
            }
        })
        .catch((err) => {
            console.log('err');
            console.log(err)
        })
};

function list() {
    selectors.forEach(id => {
        hide(id)
    });
    document.getElementById('tasks_list').innerHTML = '';
    fetch(root + '/tasks', { headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById('fname').innerText = user.firstName;
            document.getElementById('lname').innerText = user.lastName;
            const ul = document.getElementById('tasks_list')
            data.forEach((row) => {
                if (row.done) {
                    htmlRow = `
                    <input type="checkbox" name="done" checked value="${row._id}"
                        onchange="javascript:taskOpen('${row._id}')" />
                    <a href="#" onclick="" class="done" title="Выполнено ${row.closeDate}">${row.name}</a>
                    <a href="javascript:taskDel('${row._id}')" title="Удалить"><img alt="Удалить"
                            src="https://img.icons8.com/material-outlined/24/000000/delete-trash.png" /></a>
                    <pre id="${row._id}_p" class="desc hide">${row.desc}</pre>
                `
                } else {
                    htmlRow = `
                        <input type='hidden' value='${row._id}' name='undone' />
                        <input type="checkbox" name="done" value="${row._id}"
                            onchange="javascript:taskClose('${row._id}')" />
                        <a href="#" onclick="showHide('${row._id}_p')" title="Раскрыть описание">${row.name}</a>
                        <a href="javascript:taskDel('${row._id}')" title="Удалить"><img alt="Удалить"
                                src="https://img.icons8.com/material-outlined/24/000000/delete-trash.png" /></a>
                        <pre id="${row._id}_p" class="desc hide">${row.desc}</pre>
                   `
                };
                const li = document.createElement('li');
                li.innerHTML = htmlRow;
                ul.appendChild(li);
            })
            show('list');
            show('add');
        })
        .catch((err) => { console.log(err) })
};

function taskClose(_id) {
    const formData = new URLSearchParams();
    formData.append('done', _id);
    formData.append('undone', _id);
    fetch(root + '/tasks', { method: 'PATCH', body: formData, headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            list();
        })
};


function taskOpen(_id) {
    const formData = new URLSearchParams();
    formData.append('undone', _id);
    fetch(root + '/tasks', { method: 'PATCH', body: formData, headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            list();
        })
};

function taskDel(_id) {
    fetch(root + '/tasks/' + _id, { method: 'DELETE', headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            list();
        })
}

function taskAdd() {
    const name = document.querySelector('#add_name').value;
    const desc = document.querySelector('#add_desc').value;
    const formData = new URLSearchParams();
    formData.append('name', name)
    formData.append('desc', desc)
    fetch(root + '/tasks', { method: 'POST', body: formData, headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.querySelector('#add_name').value = '';
            document.querySelector('#add_desc').value = '';
            list();
        })


};

function registerUser() {
    let email = document.querySelector('#register *[name="email"]').value;
    let password = document.querySelector('#register *[name="password"]').value;
    let firstName = document.querySelector('#register *[name="firstName"]').value;
    let lastName = document.querySelector('#register *[name="lastName"]').value;
    let repassword = document.querySelector('#register *[name="repassword"]').value;
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('repassword', repassword);
    fetch(root + '/register', { method: 'POST', body: formData, headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.querySelector('#register *[name="email"]').value = '';
            document.querySelector('#register *[name="password"]').value = '';
            document.querySelector('#register *[name="firstName"]').value = '';
            document.querySelector('#register *[name="lastName"]').value = '';
            document.querySelector('#register *[name="repassword"]').value = '';
            authForm();
        })
};

function newUserForm() {
    selectors.forEach(id => {
        hide(id)
    });
    hide('wrong_password');
    show('register');
};

function logoutUser() {
    fetch(root + '/logout', { headers: new Headers({ 'Authorization': jwt }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            selectors.forEach(id => {
                hide(id)
            });
            hide('wrong_password');
            document.getElementById('fname').innerText = '';
            document.getElementById('lname').innerText = '';
            document.querySelector('*[name="email"]').value = '';
            document.querySelector('*[name="password"]').value = '';
            jwt = '';

            show('auth');
        })

};

function authForm() {
    selectors.forEach(id => {
        hide(id)
    });
    hide('wrong_password');
    show('auth');
};

authForm();