
class Game {
    constructor() {
        this.initGame();
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get field() {
        return this._field.slice();
    }
    set field(fieldValue) {
        this._field = fieldValue;
    }
    get snakeDirection() {
        return this._snakeDirection;
    }
    set snakeDirection(direction) {
        if (['up', 'down', 'left', 'right'].indexOf(direction) !== -1) {
            this._snakeDirection = direction;
        }
    }
    initGame() {
        this.width = 30;
        this.height = 15;

        const vCenter = Math.floor((this.height - 1) / 2);
        const hCenter = Math.floor((this.width - 1) / 2);

        this.snake = [[hCenter - 1,vCenter], [hCenter, vCenter], [hCenter + 1, vCenter]];
        this.snakeDirection = 'right';

        this.eatenFood = [];

        this.initFood();

        this.updateField();

        this.timeStamp = performance.now();
    }
    initFood() {
        this.food = [[
            Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height)
            // Math.floor(Math.random() * this.width),
            // Math.floor(Math.random() * this.hieght)
        ]];
        console.log(Math.floor(Math.random() * this.height));
    }
    initStartEmptyField() {
        const field = [];
        for (let i = 0; i < this.width; i++) {
            field.push(new Array(this.height).fill(0));
        }
        this.field = field;
    }
    next() {
        const currentTime = performance.now();
        if (currentTime > this.timeStamp + 100) {
            this.timeStamp = currentTime;
            this.updateField();
        }
    }
    updateField() {
        this.initStartEmptyField();
        this.updateSnake();
        this.addObjectOnField(this.food);
        this.addObjectOnField(this.snake);
    }
    addObjectOnField(fieldObject) {
        const field = this.field;
        for (let i = 0; i < fieldObject.length; i++) {
            field[fieldObject[i][0]][fieldObject[i][1]] = 1;
        }
        this.field = field;
    }
    updateSnake() {
        const snake = this.snake.slice();
        const newSnakeHead = this.calcNewSnakeHead();

        if (this.isInSnake(newSnakeHead)) {
            this.gameOver();
            return;
        }

        if (this.food.length > 0) {
            const food = this.food[0];
            if (newSnakeHead[0] === food[0] && newSnakeHead[1] === food[1]) {
                this.eatenFood.push(this.food.shift());
                this.initFood();
            }
        }

        let grow = false;
        if (this.eatenFood.length > 0) {
            const eatenFood = this.eatenFood[0];
            grow = eatenFood[0] === snake[0][0] && eatenFood[1] === snake[0][1];
            if (grow) {
                this.eatenFood.shift();
            }
        }

        snake.push(newSnakeHead);
        this.snake = snake.slice(grow ? 0 : 1);
    }
    calcNewSnakeHead() {
        const snakeHead = this.snake[this.snake.length - 1];
        const newSnakeHead = snakeHead.slice();
        if (this.snakeDirection === 'right') {
            newSnakeHead[0] = (snakeHead[0] + 1) % this.width;
        }
        if (this.snakeDirection === 'left') {
            newSnakeHead[0] = (snakeHead[0] - 1 + this.width) % this.width;
        }
        if (this.snakeDirection === 'down') {
            newSnakeHead[1] = (snakeHead[1] + 1) % this.height;
        }
        if (this.snakeDirection === 'up') {
            newSnakeHead[1] = (snakeHead[1] - 1 + this.height) % this.height;
        }
        return newSnakeHead;
    }
    isInSnake(fieldPoint) {
        for (let i = 0; i < this.snake.length; i++) {
            if (this.snake[i][0] === fieldPoint[0] && this.snake[i][1] === fieldPoint[1]) {
                return true;
            }
        }
        return false;
    }
    gameOver() {
        this.initGame();
    }
}

export {
    Game
};