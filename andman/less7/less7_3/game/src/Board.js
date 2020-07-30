class Board {
    constructor() {
        this.boardElement = document.getElementById('game');
    }

    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }

    renderBoard() {
        this.boardElement.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            this.boardElement.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake() {
        const snakeElements = this.getSnakeBodyElements(this.snake.body);
        if (snakeElements) {
            snakeElements.forEach(function (td) {
                if (td) td.classList.add('snake');
            });
        }
    }

    //Получение 1 ячейки таблицы
    getCell(x, y) {
        return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    //Получение текущих блоков, где находится змейка
    getSnakeBodyElements(bodyCoords) {
        let bodyElements = [];
        if (bodyCoords.length > 0) {
            for (let value of bodyCoords) {
                let element = this.getCell(value.x, value.y);
                bodyElements.push(element);
            }
            return bodyElements;
        }
        return null;
    }

    //Упрется ли змейка в стену
    isNextStepWall(nextSnakeCoors) {
        let nextCell = this.getCell(nextSnakeCoors.x, nextSnakeCoors.y);
        return nextCell === null;
    }

    //Еда на игровом поле
    renderFood(coords) {
        let foodCell = this.getCell(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    //Проверка, съела ли змейка еду
    isHeadOnFoodSnake() {
        return this.boardElement.querySelector('.food').classList.contains('snake');
    }

    //Очистка игрового поля
    clear() {
        const tdAll = document.querySelectorAll('td');
        tdAll.forEach(function (td) {
            td.className = '';
        });
    }
}