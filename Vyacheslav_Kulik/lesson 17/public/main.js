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
console.log(textDataSpan)

textDataSpan.forEach( element => {
    element.addEventListener('click', function (event) {
        console.log(event.target.parentNode.childNodes)
        const buttonOk = event.target.parentNode.childNodes[7]
        const buttonEdit = event.target.parentNode.childNodes[5]
        const inputData = event.target.parentNode.childNodes[3]
        buttonOk.classList.remove('d-none')
        inputData.classList.remove('d-none')
        event.target.classList.add('d-none')
        buttonEdit.classList.add('d-none')

    })
})