const getDataToDoList = fetch('http://localhost:4000/todo', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

getDataToDoList
    .then(result => {
        if (result.ok) {
            const data = result.json()
            data.then(data => {
                //console.log(data)
                document.querySelector('.emailData').textContent = data.user.email

                const toDoList = document.querySelector('.addDataToDo')
                data.toDoAll.forEach((el, ind) => {
                    console.log(el)
                    const addedEl = document.createElement('div')
                    const checkedCriteria = el.done ? 'checked' : ''
                    const checkedStyle = el.done ? 'disabledSpan' : ''
                    addedEl.innerHTML = "<div class=\"list-group-item list-group-item-action\">\n" +
                        "                    <div class=\"d-flex justify-content-around\">\n" +
                        "<input type=\"checkbox\" class=\"align-self-center\" id=\"doneItem\"" + checkedCriteria + ">\n" +
                        "                        <span class=\"col-10 align-self-center textData " + checkedStyle + "\">" + el.text + "</span>\n" +
                        "                        <input type=\"text\" class=\"col-10 align-self-center d-none inputDataForEdit\"\n" +
                        "                               value=\"" + el.text + "\" name=\"inputDataForEdit\">\n" +
                        "                        <a class=\"btn btn-light editButton\" id=\"" + el.text + "\">Edit</a>\n" +
                        "                        <button class=\"btn btn-light d-none okButton\" name=\"edit\" value=\"" + el._id + "\">\n" +
                        "                            Ok\n" +
                        "                        </button>\n" +
                        "                        <button class=\"btn btn-light deleteButton\" name=\"delete\" value=\"" + el._id + "\">Delete</button>\n" +
                        "                    </div>\n" +
                        "                </div>"
                    toDoList.appendChild(addedEl)
                })

                const editButton = document.querySelectorAll('.editButton');
                //console.log(editButton.item(editButton.length-1))
                editButton.forEach(element => {
                    element.addEventListener('click', function (event) {
                        const buttonOk = event.target.parentNode.childNodes[9]
                        const inputData = event.target.parentNode.childNodes[5]
                        const textData = event.target.parentNode.childNodes[3]
                        buttonOk.classList.remove('d-none')
                        inputData.classList.remove('d-none')
                        textData.classList.add('d-none')
                        event.target.classList.add('d-none')

                    })
                })

                const textDataSpan = document.querySelectorAll('.textData');

                textDataSpan.forEach(element => {
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
                })

                const checkboxButton = document.querySelectorAll('input[type="checkbox"]')
                if (checkboxButton) {
                    checkboxButton.forEach(el => {
                        el.addEventListener('click', async function (event) {
                            //event.preventDefault()
                            //console.log(event.target.checked)
                            const textData = event.target.nextElementSibling
                            if (event.target.checked) {
                                textData.classList.add('disabledSpan')
                            } else {
                                textData.classList.remove('disabledSpan')
                            }
                            const patchMethod = await fetch(`http://localhost:4000/todo/${el.parentNode.children[5].value}`, {
                                method: 'PATCH',
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })

                        })
                    })
                }

                const deleteButton = document.querySelectorAll('.deleteButton')
                if (deleteButton) {
                    deleteButton.forEach(el => {
                        el.addEventListener('click', function (event) {
                            event.preventDefault()
                            const blockToDo = event.target.parentNode.parentNode
                            let deleteMethod = fetch(`http://localhost:4000/todo/${el.value}`, {
                                method: 'DELETE',
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            deleteMethod
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data) {
                                        blockToDo.remove()
                                    }
                                })

                        })
                    })
                }

                const editButtonSubmit = document.querySelectorAll('.okButton')

                if (editButtonSubmit) {
                    editButtonSubmit.forEach(el => {
                        el.addEventListener('click', function (event) {
                            //console.log(event)
                            event.preventDefault()
                            //console.log(event.target.previousElementSibling.previousElementSibling.value)
                            let putMethod = fetch(`http://localhost:4000/todo/${el.value}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                },
                                body: JSON.stringify({value: event.target.previousElementSibling.previousElementSibling.value})
                            })
                            putMethod
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data) {
                                        const buttonOk = event.target.parentNode.childNodes[9]
                                        const inputData = event.target.parentNode.childNodes[5]
                                        const buttonEdit = event.target.parentNode.childNodes[7]
                                        inputData.value = data.text
                                        const textData = event.target.parentNode.childNodes[3]
                                        textData.textContent = data.text
                                        buttonOk.classList.add('d-none')
                                        inputData.classList.add('d-none')
                                        textData.classList.remove('d-none')
                                        buttonEdit.classList.remove('d-none')

                                    }
                                })

                        })
                    })

                }


            })

        } else {
            console.log(document.querySelector('.navbar-brand'))
            document.querySelector('.navbar-brand').click()
        }
    })


const addButton = document.querySelector('.addButton')

addButton.addEventListener('click', async function (event) {
    event.preventDefault()
    const bodyData = new URLSearchParams()
    bodyData.append('add', document.querySelector('input[name="add"]').value)

    const postAddData = await fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: bodyData
    })

    if (postAddData.ok) {
        //location.reload()
        const data = await postAddData.json()
        console.log(data, 'data')
        const toDoList = document.querySelector('.addDataToDo')
        const addedEl = document.createElement('div')
        const checkedCriteria = data.done ? 'checked' : ''
        const checkedStyle = data.done ? 'disabledSpan' : ''
        addedEl.innerHTML = "<div class=\"list-group-item list-group-item-action\">\n" +
            "                    <div class=\"d-flex justify-content-around\">\n" +
            "<input type=\"checkbox\" class=\"align-self-center\" id=\"doneItem\"" + checkedCriteria + ">\n" +
            "                        <span class=\"col-10 align-self-center textData " + checkedStyle + "\">" + data.text + "</span>\n" +
            "                        <input type=\"text\" class=\"col-10 align-self-center d-none inputDataForEdit\"\n" +
            "                               value=\"" + data.text + "\" name=\"inputDataForEdit\">\n" +
            "                        <a class=\"btn btn-light editButton\" id=\"" + data.text + "\">Edit</a>\n" +
            "                        <button class=\"btn btn-light d-none okButton\" name=\"edit\" value=\"" + data._id + "\">\n" +
            "                            Ok\n" +
            "                        </button>\n" +
            "                        <button class=\"btn btn-light deleteButton\" name=\"delete\" value=\"" + data._id + "\">Delete</button>\n" +
            "                    </div>\n" +
            "                </div>"
        toDoList.appendChild(addedEl)

        const inputDataAdd  = document.querySelector('input[name="add"]')
        inputDataAdd.value = ''

        const editButton = document.querySelectorAll('.editButton');
        //console.log(editButton.item(editButton.length-1))

        editButton.item(editButton.length - 1).addEventListener('click', function (event) {
            const buttonOk = event.target.parentNode.childNodes[9]
            const inputData = event.target.parentNode.childNodes[5]
            const textData = event.target.parentNode.childNodes[3]
            buttonOk.classList.remove('d-none')
            inputData.classList.remove('d-none')
            textData.classList.add('d-none')
            event.target.classList.add('d-none')

        })

        const textDataSpan = document.querySelectorAll('.textData');

        textDataSpan.item(textDataSpan.length - 1).addEventListener('click', function (event) {
            //console.log(event.target.parentNode.childNodes)
            const buttonOk = event.target.parentNode.childNodes[9]
            const buttonEdit = event.target.parentNode.childNodes[7]
            const inputData = event.target.parentNode.childNodes[5]
            buttonOk.classList.remove('d-none')
            inputData.classList.remove('d-none')
            event.target.classList.add('d-none')
            buttonEdit.classList.add('d-none')

        })


        const checkboxButton = document.querySelectorAll('input[type="checkbox"]')


        checkboxButton.item(checkboxButton.length - 1).addEventListener('click', async function (event) {
            //event.preventDefault()
            //console.log(event.target.checked)
            const textData = event.target.nextElementSibling
            if (event.target.checked) {
                textData.classList.add('disabledSpan')
            } else {
                textData.classList.remove('disabledSpan')
            }
            const patchMethod = await fetch(`http://localhost:4000/todo/${checkboxButton.item(checkboxButton.length - 1).parentNode.children[5].value}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

        })


        const deleteButton = document.querySelectorAll('.deleteButton')


        deleteButton.item(deleteButton.length - 1).addEventListener('click', function (event) {
            event.preventDefault()
            const blockToDo = event.target.parentNode.parentNode
            let deleteMethod = fetch(`http://localhost:4000/todo/${deleteButton.item(deleteButton.length - 1).value}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            deleteMethod
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        blockToDo.remove()
                    }
                })

        })


        const editButtonSubmit = document.querySelectorAll('.okButton')


        editButtonSubmit.item(editButtonSubmit.length - 1).addEventListener('click', function (event) {
            //console.log(event)
            event.preventDefault()
            //console.log(event.target.previousElementSibling.previousElementSibling.value)
            let putMethod = fetch(`http://localhost:4000/todo/${editButtonSubmit.item(editButtonSubmit.length - 1).value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({value: event.target.previousElementSibling.previousElementSibling.value})
            })
            putMethod
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        const buttonOk = event.target.parentNode.childNodes[9]
                        const inputData = event.target.parentNode.childNodes[5]
                        const buttonEdit = event.target.parentNode.childNodes[7]
                        inputData.value = data.text
                        const textData = event.target.parentNode.childNodes[3]
                        textData.textContent = data.text
                        buttonOk.classList.add('d-none')
                        inputData.classList.add('d-none')
                        textData.classList.remove('d-none')
                        buttonEdit.classList.remove('d-none')

                    }
                })

        })


    } else {

    }


})
