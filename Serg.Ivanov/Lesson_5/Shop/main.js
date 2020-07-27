const noMessageContainer = document.querySelector('.error-empty');
const messagesContainer = document.querySelector('.messages');
const errorInputEl = document.querySelector('.error-input');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');

const options = {
    messageClassName: 'message',
};
const count = [0, 0, 0, 0];
const price = [200, 150, 380, 598];

sendBtn.addEventListener('click', function () {

    for (var i = 1; i <= 4; i++) {
        const inputEl = document.getElementById(String(i));
        if (inputEl.value != '') {
            count[i - 1] = Number(inputEl.value);
        }
    };

    hideBlockNoText();
    console.log(count);
    const newMessage = getMessageMarkup(count, price, 0);
    messagesContainer.appendChild(newMessage);
});

clearBtn.addEventListener('click', function () {
    showBlockNoText();
    for (var i = 1; i <= 4; i++) {
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
    //countBasket = 0;
    for (var i = 0; i < 4; i++) {
        countBasket += name[i] * ch[i];
    }
    const message = document.createElement('div');
    message.classList.add(options.messageClassName);

    const messageCount = document.createElement('div');
    messageCount.textContent = `Стоимость выбранных товаров: ${countBasket}`;

    message.appendChild(messageCount);

    return message;
}
