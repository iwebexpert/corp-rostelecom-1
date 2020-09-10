function closeTask(task_id) {
    const taskElement = document.querySelector(`[data-id="${task_id}"]`);
    if (taskElement) {
        taskElement.querySelector('input[name="done"]').checked = true;
        taskElement.querySelector('a[name="taskname"]').classList.add('done');
    }
}
function openTask(task_id) {
    const taskElement = document.querySelector(`[data-id="${task_id}"]`);
    if (taskElement) {
        taskElement.querySelector('input[name="done"]').checked = false;
        taskElement.querySelector('a[name="taskname"]').classList.remove('done');
    }
}

function deleteTask(task_id) {
    const taskElement = document.querySelector(`[data-id="${task_id}"]`);
    if (taskElement) {
        taskElement.remove();
    }
}

function createTask(row) {
    const ul = document.getElementById('tasks_list');
    let doneStr = '';
    let showDesc = '';
    if (row.done) {
        doneStr = 'checked';
        showDesc = `onclick="" class="done" title="Выполнено ${row.closeDate}"`;
    } else {
        showDesc = `onclick="javascript:showHide('${row._id}_p')" title="Раскрыть описание"`;
    };
    htmlRow = `
    <input type="checkbox" name="done" ${doneStr} value="${row._id}"
        onclick="javascript:taskSwitchS('${row._id}')" />
    <a href="#"  name="taskname" ${showDesc}>${row.name}</a>
    <a href="javascript:taskDelS('${row._id}')" title="Удалить"><img alt="Удалить"
            src="https://img.icons8.com/material-outlined/24/000000/delete-trash.png" /></a>
    <pre id="${row._id}_p" class="desc hide">${row.desc}</pre>
`;

    const li = document.createElement('li');
    li.dataset.id = row._id;
    li.innerHTML = htmlRow;
    ul.appendChild(li);
    document.querySelector('#add_name').value = '';
    document.querySelector('#add_desc').value = '';

};


function viewTasks(tasks) {
    selectors.forEach(id => {
        hide(id)
    });

    document.getElementById('tasks_list').innerHTML = '';
    document.getElementById('fname').innerText = user.firstName;
    document.getElementById('lname').innerText = user.lastName;
    const ul = document.getElementById('tasks_list');

    tasks.forEach((row) => {
        let doneStr = '';
        let showDesc = '';
        if (row.done) {
            doneStr = 'checked';
            showDesc = `onclick="" class="done" title="Выполнено ${row.closeDate}"`;
        } else {
            showDesc = `onclick="javascript:showHide('${row._id}_p')" title="Раскрыть описание"`;
        };
        htmlRow = `
        <input type="checkbox" name="done" ${doneStr} value="${row._id}"
            onclick="javascript:taskSwitchS('${row._id}')" />
        <a href="#"  name="taskname" ${showDesc}>${row.name}</a>
        <a href="javascript:taskDelS('${row._id}')" title="Удалить"><img alt="Удалить"
                src="https://img.icons8.com/material-outlined/24/000000/delete-trash.png" /></a>
        <pre id="${row._id}_p" class="desc hide">${row.desc}</pre>
    `;
        const li = document.createElement('li');
        li.dataset.id = row._id;
        li.innerHTML = htmlRow;
        ul.appendChild(li);
    })
    show('list');
    show('add');
};

