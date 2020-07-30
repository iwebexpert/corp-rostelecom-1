class Snake {
    constructor(settings) {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.body = [{
            x: 1,
            y: 1,
        }];

        this.direction = 'down';
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
                newHeadCoords.y = (newHeadCoords.y + 1) === (this.settings.rowsCount + 1) ? 1 : (newHeadCoords.y + 1);
                break;
            case 'up':
                newHeadCoords.y = (newHeadCoords.y - 1) === 0 ? this.settings.rowsCount : (newHeadCoords.y - 1);
                break;
            case 'left':
                newHeadCoords.x = ((newHeadCoords.x - 1) === 0 ? this.settings.colsCount : (newHeadCoords.x - 1));
                break;
            case 'right':
                newHeadCoords.x = (newHeadCoords.x + 1) === (this.settings.colsCount + 1) ? 1 : (newHeadCoords.x + 1);
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