class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.body = [{
            x: 1,
            y: 1,
        }];

        this.direction = 'down';
    }
    init(settings) {
        this.settings = settings;
    }

    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано неправильное направление движения. ' + newDirection);
        }

        if (this.isOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    isOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }

        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }

        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }

        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }

        return false;
    }

    performStep() {
        let currentHeadCoords = this.body[0];
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };

        switch (this.direction) {
            case 'down':
                //newHeadCoords.y++;                
                if (this.settings.isRing && currentHeadCoords.y === (this.settings.rowsCount)) {
                    newHeadCoords.y = 0;
                }
                else newHeadCoords.y++;
                break;
            case 'up':
                //newHeadCoords.y--;
                if (this.settings.isRing && currentHeadCoords.y === 0) {
                    newHeadCoords.y = this.settings.rowsCount;
                }
                else newHeadCoords.y--;
                break;
            case 'left':
                //newHeadCoords.x--;
                if (this.settings.isRing && currentHeadCoords.x === 0) {
                    newHeadCoords.x = this.settings.colsCount;
                }
                else newHeadCoords.x--;
                break;
            case 'right':
                //newHeadCoords.x++;
                if (this.settings.isRing && currentHeadCoords.x === (this.settings.colsCount)) {
                    newHeadCoords.x = 0;
                }
                else newHeadCoords.x++;
                break;
        }
        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    increaseBody() {
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {
            x: bodyLastCell.x,
            y: bodyLastCell.y,
        };

        this.body.push(newBodyLastCell);
    }
}