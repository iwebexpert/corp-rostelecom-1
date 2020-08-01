class Menu {
    constructor(){
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
    }

    addButtonsClickListeners(startBtn, pauseBtn){
        this.startBtn.addEventListener('click', startBtn);
        this.pauseBtn.addEventListener('click', pauseBtn);
    }
}