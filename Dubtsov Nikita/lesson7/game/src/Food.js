class Food {
    constructor (){
        this.x = null;
        this.y = null;
    }

    init(settings, snake, board){
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    //Метод размещает еду на игровом поле
    setNewFood(){
        const food = this.randomCoords();
        this.board.renderFood(food);
    }

    randomCoords(){
        while(true){
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCell(this.x, this.y);

            if(cell.classList.contains('snake')){
                continue;
            }
            return this;
        }
    }

    //Метод размещает еду на игровом поле
    setFood(){
        this.board.renderFood(this);
    }
}