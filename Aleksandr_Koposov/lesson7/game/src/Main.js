window.addEventListener('DOMContentLoaded', function(){
    const settings = new Settings();
    const status = new Status();
    const board = new Board();
    const snake = new Snake();
    const menu = new Menu();
    const food = new Food();
    const game = new Game();

    settings.init({speed: 4, winLenght: 5});
    board.init(settings, snake);
    food.init(settings, snake, board);
    game.init(settings, status, board, snake, menu, food);

    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
});