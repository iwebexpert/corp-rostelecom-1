const noMessageContainer = document.querySelector('.error-empty');
const messagesContainer = document.querySelector('.messages');
// const errorInputEl = document.querySelector('.error-input');
const sendBtn = document.getElementsByClassName('send');
const clearBtn = document.querySelector('.clear');
const options = {
    messageClassName: 'message',
};
const count = [0, 0, 0, 0];
const price = [200, 150, 380, 598];

for (var j = 0; j < sendBtn.length; j++) {
    sendBtn_a = sendBtn[j];
    sendBtn_a.addEventListener('click', function () {
        for (var i = 1; i <= count.length; i++) {
            const inputEl = document.getElementById(String(i));
            if (inputEl.value != '' && Number(inputEl.value) > 0 && (Number(inputEl.value) % 1 === 0)) {
                count[i - 1] = Number(inputEl.value);
            } else { count[i - 1] = 0 }
        };
        hideBlockNoText();

        const messagesAll = document.querySelectorAll(`.${options.messageClassName}`);
        messagesAll.forEach(function (message) {
            message.remove();
        });

        const newMessage = getMessageMarkup(count, price, 0);
        messagesContainer.appendChild(newMessage);
    });
}

clearBtn.addEventListener('click', function () {
    showBlockNoText();
    for (var i = 1; i <= count.length; i++) {
        const inputEl = document.getElementById(String(i));
        inputEl.value = '';
        count[i - 1] = 0;
    };
    const messagesAll = document.querySelectorAll(`.${options.messageClassName}`);
    messagesAll.forEach(function (message) {
        message.remove();
    });
});

//Функции
function hideBlockNoText() {
    noMessageContainer.style.display = 'none';
}

function showBlockNoText() {
    noMessageContainer.style.display = 'block';
}

function getMessageMarkup(name, ch, countBasket) {
    tovar = 0;
    for (var i = 0; i < name.length; i++) {
        countBasket += name[i] * ch[i];
        tovar = tovar + name[i];
    }
    const message = document.createElement('div');
    message.classList.add(options.messageClassName);

    const messageCount = document.createElement('div');
    messageCount.textContent = `Стоимость выбранных товаров: ${countBasket} , Единиц товара: ${tovar} `;

    message.appendChild(messageCount);

    return message;
}
