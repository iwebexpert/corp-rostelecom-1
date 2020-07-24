// Task 5-1
// 	Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги.
//  Доска должна быть верно разлинована на черные и белые ячейки. Строки должны нумероваться числами от 1 до 8,
//  столбцы — латинскими буквами A, B, C, D, E, F, G, H.

const container = document.getElementById('container');

function createBoard() {
    const col = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
    const whiteFigure = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖', '♙'];
    const blackFigure = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟'];
    figure = {
        0: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
        1: ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖', '♙'],
        2: ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',],
        7: ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',],
        8: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟'],
    }

    let flag = false;

    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j < 10; j++) {
            j === 0 ? flag = !flag : null;

            const tile = document.createElement('div');

            tile.classList.add('tile');

            if (i === 0 || i === 9) {
                tile.innerHTML = `${figure[0][j]}`;
                i === 9 ? tile.style.transform = 'rotateX(180deg)' : null;
            } else if (j === 0 || j === 9) {
                tile.textContent = `${i}`;
                j === 9 ? tile.style.transform = 'rotateX(180deg)' : null;
            } else {
                tile.textContent = `${col[j]}${i}`;
                flag ? tile.classList.add('tile-white') : tile.classList.add('tile-black');
                figure[i] ? tile.innerHTML = `${figure[i][j - 1]}` : null;
            }

            // if (i === 0 || i === 9) {
            //     tile.classList.add('tile');
            //     tile.textContent = `${col[j]}`;
            //     i === 9 ? tile.style.transform = 'rotateX(180deg)' : null;
            // } else if (j === 0 || j === 9) {
            //     tile.classList.add('tile');
            //     tile.textContent = `${i}`;
            //     j === 9 ? tile.style.transform = 'rotateX(180deg)' : null;
            // } else {
            //     tile.classList.add('tile');
            //     flag ? tile.classList.add('tile-white') : tile.classList.add('tile-black');
            //     tile.textContent = `${col[j]}${i}`;
            //     i === 1 ? tile.innerHTML = `${whiteFigure[j - 1]}` : null;
            //     i === 8 ? tile.innerHTML = `${blackFigure[j - 1]}` : null;
            //     i === 2 ? tile.innerHTML = `${whiteFigure[8]}` : null;
            //     i === 7 ? tile.innerHTML = `${blackFigure[8]}` : null;
            // }

            container.appendChild(tile);
            flag = !flag;
        }
    }
}

createBoard();
