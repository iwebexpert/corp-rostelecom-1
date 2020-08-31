
function checkedItem(el) {
    if (el) {
        //console.log(el)
        //console.log(el.id)
        //console.log(el.classList.contains("checked"))

        el.classList.toggle('checked')

        let body = "updateID=" + el.id + "&status=" + el.classList.contains("checked")
        let request = new XMLHttpRequest()
        request.open("POST", "/", true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(body)
    }
}

function deleteItem(el) {
    if (el) {
        let div = el.parentElement
        if (div) {
            div.style.display = "none"

            let body = "deleteID=" + div.id
            let request = new XMLHttpRequest()
            request.open("POST", "/", true)
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            request.send(body)
        }
    }
}

function addItem() {
    let inputValue = document.getElementById("myInput").value
    if (inputValue === '') {
        alert("Название в поле 'Список дел' не должно быть пустым!")
        return
    }

    //отправляем данные на сервер
    let body = "addName=" + inputValue
    let request = new XMLHttpRequest()
    request.open("POST", "/", true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.send(body)

    inputValue = ""

    // перегружаем страницу
    location.reload("/")
}
