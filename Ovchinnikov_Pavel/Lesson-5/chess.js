const countCell = 8;

function getChar(i) {
    let char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    return char[i];
}

function getChessBoard(count) {
    const chessBoard = document.createElement('div');
    chessBoard.className = "chess-board";

    for (let i = 0; i <= count; i++) {
        const chessRow = document.createElement('div');
        chessRow.className = "chess-row";

        for (let j = 0; j <= count; j++) {
            const cell = document.createElement('div');
            cell.className = "chess-cell";

            if (i == 0 & j == 0) {
                cell.classList.add("chess-cell-none");
            }

            if (i == 0 & j != 0) {
                cell.classList.add("chess-cell-row");
                cell.innerHTML = '<div class = "caption1">' + getChar(j - 1) + '</div>';
            }

            if (j == 0 & i != 0) {
                cell.classList.add("chess-cell-col");
                cell.innerHTML = '<div class = "caption">' + (countCell - i + 1) + '</div>';
            }

            if (j != 0 & i != 0) {
                if ((i + j) % 2 == 0)
                    cell.classList.add("chess-cell-white");
                else
                    cell.classList.add("chess-cell-black");
            }



            chessRow.appendChild(cell);
        }
        chessBoard.appendChild(chessRow);
    }
    return chessBoard;
}


function ShowChessBoard() {
    const nameChessBoard = document.createElement('div');
    nameChessBoard.innerHTML = '<h1 align = "center"> Шахматная доска </h1>';
    document.querySelector('#chess').appendChild(nameChessBoard);

    document.querySelector('#chess').appendChild(getChessBoard(countCell));

}