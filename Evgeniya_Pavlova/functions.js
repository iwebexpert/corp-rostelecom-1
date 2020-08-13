// Задание 1
function chess() {

    const chessTable = document.querySelector(".chess-table");
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'i'];
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];

    for (let i = 0; i < 9; i++) {

        const cell = document.createElement('div');

        for (let j = 0; j < 9; j++) {
            const line = document.createElement('div');
            cell.appendChild(line);
            if (i == 0) {
                line.textContent = (j != 0) ? nums[j - 1] : " ";
                line.className = "chess-board_let";
                continue;
            }
            if (j == 0) {
                line.textContent = (i != 0) ? chars[i - 1] : " ";
                line.className = "chess-board_let";
                continue;
            }
            if (i % 2 == j % 2) {
                line.className = "chess-board__white";
            }
            else {
                line.className = "chess-board__black";
            };
        };
        chessTable.appendChild(cell);
    };
}
chess();

// Задание 2

const noMessageConatiner = document.querySelector('.error-empty');
const messagesConatiner = document.querySelector('.messages');
const inputEl = document.querySelector('input');
const errorInputEl = document.querySelector('.error-input');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');

const options = {
    messageClassName: 'message',
};

sendBtn.addEventListener('click', function () {

    if (inputEl.value === '') {
        errorInputEl.textContent = 'Дак сколько же все-таки?';
        // errorInputEl.style.display = 'block';
        errorInputEl.style.visibility = 'visible';
        return;
    } else {
        errorInputEl.textContent = '';
    }

    hideBlockNoText();

    const newMessage = getBasketPrice(inputEl.value);
    messagesConatiner.appendChild(newMessage);
});

clearBtn.addEventListener('click', function () {
    showBlockNoText();
    inputEl.value = '';
    const messagesAll = document.querySelectorAll(`.${options.messageClassName}`);
    messagesAll.forEach(function (message) {
        message.remove();
    });
});

//Функции
function hideBlockNoText() {
    // noMessageConatiner.style.display = 'none';
    noMessageConatiner.style.visibility = 'hidden';
    errorInputEl.style.visibility = 'hidden';
}

function showBlockNoText() {
    // noMessageConatiner.style.display = 'block';
    noMessageConatiner.style.visibility = 'visible';
}

function getBasketPrice(howMuch) {

    const priceOfGoods = 100;
    const BasketPrice = howMuch * priceOfGoods;

    const message = document.createElement('div');
    message.classList.add(options.messageClassName);

    const messagePrice = document.createElement('div');
    messagePrice.textContent = `Стоимость корзины:${BasketPrice}`;

    message.appendChild(messagePrice);
    return message;
}

