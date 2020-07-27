
console.log('Домашняя работа к уроку 5');
console.log('Задание 1');

function makeBox(tagName, className, className2, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (className2) {
        element.classList.add(className2);
    };
    if (text) {
        element.textContent = text;
    };
    return element;
};

function makeRow(i) {
    let chess = document.querySelector('.chess-box');
    let newrow = makeBox('div', 'row');
    chess.appendChild(newrow);

    newrow.appendChild(makeBox('div', 'label', 'box', i));
    if (i % 2 != 0) {
        for (let j = 1; j < 9; j++) {
            if (j % 2 == 0) {
                newrow.appendChild(makeBox('div', 'box', 'white'));
            } else {
                newrow.appendChild(makeBox('div', 'box', 'black'));
            };
        };
    } else {
        for (let j = 1; j < 9; j++) {
            if (j % 2 == 0) {
                newrow.appendChild(makeBox('div', 'box', 'black'));
            } else {
                newrow.appendChild(makeBox('div', 'box', 'white'));
            };
        };

    };
};

function makeRowLabel() {
    let chess = document.querySelector('.chess-box');
    let newrow = makeBox('div', 'row');
    chess.appendChild(newrow);
    const labelrow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let k = 0; k < 9; k++) {
        if (k > 0) {
            newrow.appendChild(makeBox('div', 'label', 'box', labelrow[k - 1]));
        } else {
            newrow.appendChild(makeBox('div', 'label', 'box'));
        }
    };
};

for (let i = 8; i > 0; i--) {
    makeRow(i)
};
makeRowLabel();

