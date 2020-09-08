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
            const blockToDo = event.target.parentNode.parentNode
            let deleteMethod = fetch(`/todo/${el.value}`, {
                method: 'DELETE'
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

const editButtonSubmit =document.querySelectorAll('.okButton')

if(editButtonSubmit) {
    editButtonSubmit.forEach(el => {
        el.addEventListener('click', function (event) {
            event.preventDefault()
            //console.log(event.target.previousElementSibling.previousElementSibling.value)
            let putMethod = fetch(`/todo/${el.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
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