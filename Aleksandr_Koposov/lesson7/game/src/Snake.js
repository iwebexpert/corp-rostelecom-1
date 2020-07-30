class Snake {
    constructor() {
        this.possibleDirections = ['down', 'up', 'left', 'right'];

        this.body = [{
            x: 1,
            y: 1,
        }];

        this.direction = 'down';
    }

    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано неправильное направление движения. ' + newDirection);
        }

        if (this.isOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
        this.setDirectionIcon(newDirection);
    }

    setDirectionIcon(directionCode) {
        const el = document.getElementById('direction-icon');
        el.className = `icon--${directionCode}`;
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

    performStep(settings) {
        let currentHeadCoords = this.body[0];
        let newHeadCoords = {
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };

        switch (this.direction) {
            case 'down':
                newHeadCoords.y = (newHeadCoords.y >= settings.rowsCount) ? 1 : newHeadCoords.y + 1;
                break;
            case 'up':
                newHeadCoords.y = (newHeadCoords.y <= 1) ? settings.rowsCount : newHeadCoords.y - 1;
                break;
            case 'left':
                newHeadCoords.x = (newHeadCoords.x <= 1) ? settings.colsCount : newHeadCoords.x - 1;
                break;
            case 'right':
                newHeadCoords.x = (newHeadCoords.x >= settings.colsCount) ? 1 : newHeadCoords.x + 1;
                break;
        }
        this.body.unshift(newHeadCoords);
        this.body.pop();
    }

    increaseBody(food) {
        this.body.push({
            x: food.x,
            y: food.y,
        });
    }
}