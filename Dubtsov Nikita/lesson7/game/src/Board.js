class Board {
    constructor (){
        this.boardElement = document.getElementById('game');
    }

    init(settings, snake){
        this.settings = settings;
        this.snake = snake;
    }

    renderBoard()
    {
        this.boardElement.innerHTML='';
        for(let row = 0; row < this.settings.rowsCount; row++){
            let tr = document.createElement('tr');
            this.boardElement.appendChild(tr);

            for(let col = 0; col < this.settings.colsCount; col++){
                let td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    }

    renderSnake()
    {
        let snakeElements = this.getSnakeBodyElements(this.snake.body);
        const headElement = this.getSnakeHeadElement(this.snake.body);
        if(snakeElements){  
            snakeElements.forEach(function(td){
                td.classList.toggle('snake');
            });
            headElement.classList.toggle('head');
        }
    }

    //Получение 1 ячейки таблицы
    getCell(x, y){
        return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

    //Получение текущих блоков, где находится змейка
    getSnakeBodyElements(bodyCoords){
        let bodyElements = [];
        if(bodyCoords.length > 0){
            for(let value of bodyCoords){
                let element = this.getCell(value.x, value.y);
                bodyElements.push(element);
            }
            return bodyElements;
        }
        return null;
    }
    getSnakeHeadElement(bodyCoords){
        let headElement;
        if(bodyCoords.length > 0) {
            headElement = this.getCell(bodyCoords[0].x, bodyCoords[0].y);
            return headElement;
        }
        return null;
    }

    //Упрется ли змейка в стену
    isNextStepWall(nextSnakeCoors){
        let nextCell = this.getCell(nextSnakeCoors.x, nextSnakeCoors.y);
        if (nextCell === null) this.throughWalls();
        
    }

    // Сквозные стены
    throughWalls() {
            if (this.snake.body[0].x > this.settings.colsCount) {
                this.snake.body[0].x = 1;
            }
            if (this.snake.body[0].x == 0) {
                this.snake.body[0].x = this.settings.colsCount;
            }
            if (this.snake.body[0].y > this.settings.rowsCount) {
                this.snake.body[0].y = 1;
            }
            if (this.snake.body[0].y == 0) {
                this.snake.body[0].y = this.settings.rowsCount;
            }
    }

    //Еда на игровом поле
    renderFood(coords){
        let foodCell = this.getCell(coords.x, coords.y);
        foodCell.classList.add('food');
    }

    //Проверка, съела ли змейка еду
    isHeadOnFoodSnake(){
        return this.boardElement.querySelector('.food').classList.contains('head');
    }

    //Проверка, съела ли змейка себя
    isHeadInMyself() {
        if(this.snake.body.length > 2 && !this.boardElement.querySelector('.head').classList.contains('snake')) {
            return true;
        }
        return false;
        
    }

    //Очистка игрового поля
    clear(){
        const tdAll = document.querySelectorAll('td');
        tdAll.forEach(function(td){
            td.className = '';
        });
    }
}