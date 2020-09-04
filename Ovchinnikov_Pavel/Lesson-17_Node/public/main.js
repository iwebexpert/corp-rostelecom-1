var request = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showNotification(className, html, top = 0, right = 0) {
    let notification = document.createElement('div');
    notification.className = "notification";
    if (className) {
        notification.classList.add(className);
    }

    notification.style.top = top + 'px';
    notification.style.right = right + 'px';

    notification.innerHTML = html;
    document.body.append(notification);

    await sleep(1000)
    notification.remove()
}


async function readystatechange() {
    if (!request)
        return

    if (request.readyState == 4 && request.status == 200)
        await showNotification("success", "Успешно")
    /*else   
         await showNotification("Error", "Ошибка")
     */
}

function addItem() {

    let inputValue = document.getElementById("myInput").value
    if (inputValue === '') {
        alert("Название в поле 'Список дел' не должно быть пустым!")
        return
    }

    //отправляем данные на сервер
    let body = "addItemByName=" + inputValue
    request = new XMLHttpRequest()
    request.open("POST", "/add", true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    request.onreadystatechange = readystatechange
    request.send(body)

    inputValue = ""

    // перегружаем страницу
    location.reload("/")
}

function updateItem(el) {
    if (el) {
        el.classList.toggle('checked')

        let body = "updateItemByID=" + el.id + "&status=" + el.classList.contains("checked")
        request = new XMLHttpRequest()
        request.open("POST", "/update", true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = readystatechange
        request.send(body)
    }
}

function removeItem(el) {
    if (el) {
        let div = el.parentElement
        if (div) {
            div.style.display = "none"

            let body = "deleteItemByID=" + div.id
            request = new XMLHttpRequest()
            request.open("POST", "/remove", true)
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            request.onreadystatechange = readystatechange
            request.send(body)
        }
    }
}

