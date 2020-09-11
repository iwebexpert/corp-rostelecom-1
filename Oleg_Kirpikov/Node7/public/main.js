const root = 'http://localhost:4000';
const rootSocket = 'http://localhost:5000';
var jwt = '';
var jwtType = '';
var user;
var selectors = ['add', 'list', 'register', 'auth'];

var socket;

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

function authSocket() {

    socket = io.connect(rootSocket, { query: `token=${jwt}` });

    socket.on(`tasks_list:${user._id}`, (tasks) => {
        viewTasks(tasks)
    });
    socket.on(`task_closed:${user._id}`, (task_id) => {
        closeTask(task_id)
    });
    socket.on(`task_opened:${user._id}`, (task_id) => {
        openTask(task_id)
    });
    socket.on(`task_deleted:${user._id}`, (task_id) => {
        deleteTask(task_id)
    });
    socket.on(`task_created:${user._id}`, (task) => {
        createTask(task)
    });

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
            if (response.headers.get('authorization')) {
                [jwtType, jwt] = response.headers.get('authorization').split(' ');
            };
            console.log(jwt);
            return response.json()
        })
        .then((data) => {
            console.log('data');
            console.log(data);
            if (data._id) {
                user = JSON.parse(JSON.stringify(data));
                authSocket();
                socket.emit(`get_tasks:${user._id}`, user);
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

function taskSwitchS(task_id) {
    const taskStatusElement = document.querySelector(`[data-id="${task_id}"] > input[name="done"]`);
    if (taskStatusElement.checked == true) {
        socket.emit(`switch_task:${user._id}`, { id: task_id, done: true })
    } else {
        socket.emit(`switch_task:${user._id}`, { id: task_id, done: false })
    }
};

function taskDelS(_id) {
    socket.emit(`delete_task:${user._id}`, _id)
};

function taskCreateS() {
    const name = document.querySelector('#add_name').value;
    const desc = document.querySelector('#add_desc').value;

    socket.emit(`create_task:${user._id}`, { name: name, desc: desc })
};


function registerUser() {
    let email = document.querySelector('#register *[name="email"]').value;
    let password = document.querySelector('#register *[name="password"]').value;
    let firstName = document.querySelector('#register *[name="firstName"]').value;
    let lastName = document.querySelector('#register *[name="lastName"]').value;
    let repassword = document.querySelector('#register *[name="repassword"]').value;
    document.getElementById('error').innerText = '';

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('repassword', repassword);
    fetch(root + '/register', { method: 'POST', body: formData, headers: new Headers({ 'Authorization': `${jwtType} ${jwt}` }) })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.querySelector('#register *[name="email"]').value = '';
            document.querySelector('#register *[name="password"]').value = '';
            document.querySelector('#register *[name="firstName"]').value = '';
            document.querySelector('#register *[name="lastName"]').value = '';
            document.querySelector('#register *[name="repassword"]').value = '';
            if (data.message) {
                document.getElementById('error').innerText = data.message;
                show('error');
            } else {
                authForm();
            }

        })
        .catch((err) => { console.log(err) })
};

function newUserForm() {
    selectors.forEach(id => {
        hide(id)
    });
    hide('wrong_password');
    document.getElementById('error').innerText = '';
    hide('error');

    show('register');
};

function logoutUser() {
    fetch(root + '/logout', { headers: new Headers({ 'Authorization': `${jwtType} ${jwt}` }) })
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
            socket.disconnect(true);
            jwt = '';

            show('auth');
        })
        .catch((err) => { console.log(err) })

};

function authForm() {
    selectors.forEach(id => {
        hide(id)
    });
    hide('wrong_password');
    show('auth');
};

authForm();