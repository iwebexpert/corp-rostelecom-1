const getDataToDoList = fetch('http://localhost:4000/todo', {
    method: 'GET',
    headers:  {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

getDataToDoList
    .then(result =>  {
        if (result.ok) {
            const data = result.json()
            data.then(data => {
                //console.log(data)
                document.querySelector('.emailData').textContent = data.user.email

                const toDoList = document.querySelector('.addDataToDo')
                data.toDoAll.forEach((el, ind) => {
                    //console.log(el)
                    const addedEl = document.createElement('div')
                    addedEl.innerHTML = "<div class=\"list-group-item list-group-item-action\">\n" +
                        "                    <div class=\"d-flex justify-content-around\">\n" +
                        "                        <span class=\"col-10 align-self-center textData\">"+ el +"</span>\n" +
                        "                        <input type=\"text\" class=\"col-10 align-self-center d-none inputDataForEdit\"\n" +
                        "                               value=\""+ el +"\" name=\"inputDataForEdit\">\n" +
                        "                        <a class=\"btn btn-light editButton\" id=\""+ el +"\">Edit</a>\n" +
                        "                        <button class=\"btn btn-light d-none okButton\" name=\"edit\" value=\""+ ind +"\">\n" +
                        "                            Ok\n" +
                        "                        </button>\n" +
                        "                        <button class=\"btn btn-light deleteButton\" name=\"delete\" value=\""+ ind +"\">Delete</button>\n" +
                        "                    </div>\n" +
                        "                </div>"
                    toDoList.appendChild(addedEl)
                })

                const editButton = document.querySelectorAll('.editButton');

                editButton.forEach( element => {
                    element.addEventListener('click', function (event) {
                        const buttonOk = event.target.parentNode.childNodes[7]
                        const inputData = event.target.parentNode.childNodes[3]
                        const textData = event.target.parentNode.childNodes[1]
                        buttonOk.classList.remove('d-none')
                        inputData.classList.remove('d-none')
                        textData.classList.add('d-none')
                        event.target.classList.add('d-none')

                    })
                })

                const textDataSpan = document.querySelectorAll('.textData');
//console.log(textDataSpan)

                textDataSpan.forEach( element => {
                    element.addEventListener('click', function (event) {
                        //console.log(event.target.parentNode.childNodes)
                        const buttonOk = event.target.parentNode.childNodes[7]
                        const buttonEdit = event.target.parentNode.childNodes[5]
                        const inputData = event.target.parentNode.childNodes[3]
                        buttonOk.classList.remove('d-none')
                        inputData.classList.remove('d-none')
                        event.target.classList.add('d-none')
                        buttonEdit.classList.add('d-none')

                    })
                })

                const deleteButton = document.querySelectorAll('.deleteButton')
                if(deleteButton) {
                    deleteButton.forEach(el => {
                        el.addEventListener('click', function (event) {
                            event.preventDefault()
                            //console.log(`${el.value}`)
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
                                    if(data){
                                        blockToDo.remove()
                                    }
                                })

                        })
                    })
                }

                const editButtonSubmit = document.querySelectorAll('.okButton')

                if(editButtonSubmit) {
                    editButtonSubmit.forEach(el => {
                        el.addEventListener('click', function (event) {
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
                                    if(data){
                                        //onsole.log(data)
                                        location.reload()
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

addButton.addEventListener('click',async function (event) {
    event.preventDefault()
    const bodyData =  new URLSearchParams()
    bodyData.append('add',document.querySelector('input[name="add"]').value)

    const postAddData = await fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers:  {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: bodyData
    })

    if(postAddData.ok) {
        location.reload()
    } else {

    }


})
