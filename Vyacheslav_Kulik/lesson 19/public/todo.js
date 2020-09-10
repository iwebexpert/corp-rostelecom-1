TOKEN = localStorage.getItem('token') ? localStorage.getItem('token') : ''
const AUTH_FOR_HEADER = `Bearer ${TOKEN}`
const USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''

function createOneToDoItem(toDoItem, toDoList) {
    const addedEl = document.createElement('div')
    const checkedCriteria = toDoItem.done ? 'checked' : ''
    const checkedStyle = toDoItem.done ? 'disabledSpan' : ''
    addedEl.innerHTML = "<div class=\"list-group-item list-group-item-action\">\n" +
        "                    <div class=\"d-flex justify-content-around\">\n" +
        "<input type=\"checkbox\" class=\"align-self-center\" value=\"" + toDoItem._id + "\" id=\"doneItem\"" + checkedCriteria + ">\n" +
        "                        <span class=\"col-10 align-self-center textData " + checkedStyle + "\">" + toDoItem.text + "</span>\n" +
        "                        <input type=\"text\" class=\"col-10 align-self-center d-none inputDataForEdit\"\n" +
        "                               value=\"" + toDoItem.text + "\" name=\"inputDataForEdit\">\n" +
        "                        <a class=\"btn btn-light editButton\" id=\"" + toDoItem.text + "\">Edit</a>\n" +
        "                        <button class=\"btn btn-light d-none okButton\" name=\"edit\" value=\"" + toDoItem._id + "\">\n" +
        "                            Ok\n" +
        "                        </button>\n" +
        "                        <button class=\"btn btn-light deleteButton\" name=\"delete\" value=\"" + toDoItem._id + "\">Delete</button>\n" +
        "                    </div>\n" +
        "                </div>"
    toDoList.appendChild(addedEl)
}

function addEventListenerForEditButton(element) {
    element.addEventListener('click', function (event) {
        const buttonOk = event.target.parentNode.childNodes[9]
        const inputData = event.target.parentNode.childNodes[5]
        const textData = event.target.parentNode.childNodes[3]
        buttonOk.classList.remove('d-none')
        inputData.classList.remove('d-none')
        textData.classList.add('d-none')
        event.target.classList.add('d-none')
    })
}

function addEventListenerForTextData(element) {
    element.addEventListener('click', function (event) {
        //console.log(event.target.parentNode.childNodes)
        const buttonOk = event.target.parentNode.childNodes[9]
        const buttonEdit = event.target.parentNode.childNodes[7]
        const inputData = event.target.parentNode.childNodes[5]
        buttonOk.classList.remove('d-none')
        inputData.classList.remove('d-none')
        event.target.classList.add('d-none')
        buttonEdit.classList.add('d-none')
    })
}


function addEventListenerForCheckbox(el) {
    el.addEventListener('click', async function (event) {
        socket.emit('doneToDo', {
            user: USER._id,
            toDoId: el.parentNode.children[5].value
        })
        event.preventDefault()
    })

}

function addEventListenerForDelete(el) {
    el.addEventListener('click', function (event) {
        event.preventDefault()
        socket.emit('delete', {
            user: USER._id,
            toDoId: el.value
        })
    })
}

function addEventListenerForEdit(el) {
    el.addEventListener('click', function (event) {
        event.preventDefault()

        socket.emit('update', {
            user: USER._id,
            toDoId: el.value,
            value: event.target.previousElementSibling.previousElementSibling.value
        })

        const buttonOk = event.target.parentNode.childNodes[9]
        const inputData = event.target.parentNode.childNodes[5]
        const buttonEdit = event.target.parentNode.childNodes[7]
        const textData = event.target.parentNode.childNodes[3]
        buttonOk.classList.add('d-none')
        inputData.classList.add('d-none')
        textData.classList.remove('d-none')
        buttonEdit.classList.remove('d-none')
    })
}

function forEachCallback(elForEach, callback) {
    elForEach.forEach(el => {
        callback(el)
    })
}

// создаем экземпляр вебсокета для клиента, параметры можно передать после ? для get запроса, они будут находится в socket.handshake.query (в данном случае socket.handshake.query.token)
const socket = io.connect(`http://localhost:4000?token=${TOKEN}`)

socket.on(`updateDone:${USER._id}`, (data) => {
    const checkBox = document.querySelector(`input[type="checkbox"][value="${data._id}"]`)
    const textData = checkBox.nextElementSibling
    if (!checkBox.checked) {
        textData.classList.add('disabledSpan')
        checkBox.checked = !checkBox.checked
    } else {
        textData.classList.remove('disabledSpan')
        checkBox.checked = !checkBox.checked
    }
})

socket.on(`deleted:${USER._id}`, (data) => {
    document.querySelector(`.deleteButton[value="${data._id}"]`).parentNode.parentNode.remove()
})

socket.on(`updatedToDoItem:${USER._id}`, (data) => {
    const divBlock = document.querySelector(`.okButton[value="${data._id}"]`).parentNode.childNodes

    divBlock[5].value = data.text
    divBlock[3].textContent = data.text

})

//подписываемся на события со стороны сервера, если оно сработает - отрисовываем данные, которые получи от сервера (data)
socket.on(`created:${USER._id}`, (data) => {

    //Добавляем данные в конец списка на страницу и активируем для него обработчики
    document.querySelector('input[name="add"]').value = ''
    createOneToDoItem(data, document.querySelector('.addDataToDo'))

    const editButton = document.querySelectorAll('.editButton')
    addEventListenerForEditButton(editButton.item(editButton.length - 1))

    const textDataSpan = document.querySelectorAll('.textData');
    addEventListenerForTextData(textDataSpan.item(textDataSpan.length - 1))

    const checkboxButton = document.querySelectorAll('input[type="checkbox"]')
    addEventListenerForCheckbox(checkboxButton.item(checkboxButton.length - 1))

    const deleteButton = document.querySelectorAll('.deleteButton')
    addEventListenerForDelete(deleteButton.item(deleteButton.length - 1))

    const editButtonSubmit = document.querySelectorAll('.okButton')
    addEventListenerForEdit(editButtonSubmit.item(editButtonSubmit.length - 1))

});


const getDataToDoList = fetch(`http://localhost:4000/todo/all?user=${USER._id}`, {
    method: 'GET',
    headers: {
        Authorization: AUTH_FOR_HEADER
    }
})

getDataToDoList
    .then(result => {
        if (result.ok) {
            const data = result.json()
            data.then(data => {
                //устанавливаем login на странице
                document.querySelector('.emailData').textContent = data.user.email

                //Обработчик для кнопки "Add" для списка ToDoList
                const addButton = document.querySelector('.addButton')
                addButton.addEventListener('click', async function (event) {
                    event.preventDefault()
                    //формируем данные для отправки на сервер в рамках websocket
                    const dataAdding = {
                        user: USER._id,
                        text: document.querySelector('input[name="add"]').value
                    }
                    //отправка данных на сервер
                    socket.emit('create', dataAdding)

                })

                //добавляем список To Do на страницу
                const toDoList = document.querySelector('.addDataToDo')
                data.toDoAll.forEach((el) => {
                    createOneToDoItem(el, toDoList)
                })
                //навешиваем обработчики на все кнопки
                forEachCallback(document.querySelectorAll('.editButton'), addEventListenerForEditButton)
                forEachCallback(document.querySelectorAll('.textData'), addEventListenerForTextData)
                forEachCallback(document.querySelectorAll('input[type="checkbox"]'), addEventListenerForCheckbox)
                forEachCallback(document.querySelectorAll('.deleteButton'), addEventListenerForDelete)
                forEachCallback(document.querySelectorAll('.okButton'), addEventListenerForEdit)

            })

        } else {
            document.querySelector('.navbar-brand').click()
        }
    })





