//Глобальные переменные
var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300; //мс
var snake = []; //Змейка
var direction = 'y+'; //Направление движения змейки
var gameIsRunning = false; //Запущена ли игра
var snakeTimer; //Таймер
var blockTimer;
var score = 0; //Результат

function init() {
    //Генерация поля
    prepareGameField();

    //Адаптивность поля
    var wrap = document.getElementsByClassName('wrap')[0];
    if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '300px';
    } else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }

    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    //Отслеживание нажатия клавиш
    addEventListener('keydown', changeDirection);
}

//Функция начала игры
function startGame() {
    gameIsRunning = true;
    respawn(); //Появление змейки

    snakeTimer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 5000);
    blockTimer = setInterval(createBlock, 10000);
}

function respawn() {
    var startCoordX = Math.floor(FIELD_SIZE_X / 2);
    var startCoordY = Math.floor(FIELD_SIZE_Y / 2);

    //Голова
    var snakeHead = document.getElementsByClassName(
        'cell-' + startCoordY + '-' + startCoordX
    )[0];
    snakeHead.setAttribute('class', snakeHead.getAttribute('class') + ' snake-unit');

    //Тело
    var snakeBody = document.getElementsByClassName(
        'cell-' + (startCoordY - 1) + '-' + startCoordX
    )[0];
    snakeBody.setAttribute('class', snakeBody.getAttribute('class') + ' snake-unit');

    snake.push(snakeHead);
    snake.push(snakeBody);
}

function move() {

    var snakeHeadClasses = snake[snake.length - 1].getAttribute('class').split(' ');

    //Сдвиг головы
    var newUnit;
    var snakeCoords = snakeHeadClasses[1].split('-');
    var coordY = parseInt(snakeCoords[1]);
    var coordX = parseInt(snakeCoords[2]);

    //Определение новой точки
    switch (direction) {
        case 'x-':
            newUnit = document.getElementsByClassName(
                'cell-' + (coordY) + '-' + (coordX - 1)
            )[0];
            break;
        case 'x+':
            newUnit = document.getElementsByClassName(
                'cell-' + (coordY) + '-' + (coordX + 1)
            )[0];
            break;
        case 'y+':
            newUnit = document.getElementsByClassName(
                'cell-' + (coordY - 1) + '-' + (coordX)
            )[0];
            break;
        case 'y-':
            newUnit = document.getElementsByClassName(
                'cell-' + (coordY + 1) + '-' + (coordX)
            )[0];
            break;
    }
    //console.log(newUnit);
    //Проверки
    // 1. newUnit - не часть змейки
    // 2. Змейка ушла за границу поля
    if (!isSnakeUnit(newUnit) && newUnit !== undefined && !isBlockUnit(newUnit)) {
        newUnit.setAttribute('class', newUnit.getAttribute('class') + ' snake-unit');
        snake.push(newUnit);

        if (!haveFood(newUnit)) {
            //Находим хвост
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');
            //Удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    } else {
        finishTheGame();
    }
}

//Проверка на змейку
function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit)) {
        check = true;
    }

    return check;
}

//Проверка на блок
function isBlockUnit(unit) {
    var check = false;

    if (unit.classList.contains('block-unit')) {
        check = true;
    }

    return check;
}


//Еда
function haveFood(unit) {
    var check = false;

    var unitClasses = unit.getAttribute('class').split(' ');

    //Если еда
    if (unitClasses.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        document.getElementsByClassName('score')[0].innerHTML = 'Счёт: ' + score;
    }

    return check;
}

function createBlock() {
    var blockCreated = false;

    // стираем старый если есть
    if (document.getElementsByClassName('block-unit')[0] != undefined) {
        var tmp1 = document.getElementsByClassName('block-unit')[0].getAttribute('class');
        var tmp2 = document.getElementsByClassName('block-unit')[0];
        tmp1 = tmp1.replace('block-unit', '');
        tmp2.setAttribute('class', tmp1);
    }

    //создаём новый блок
    while (!blockCreated) {
        var blockX = Math.floor(Math.random() * FIELD_SIZE_X);
        var blockY = Math.floor(Math.random() * FIELD_SIZE_Y);

        var blockCell = document.getElementsByClassName('cell-' + blockY + '-' + blockX)[0];
        var blockCellClasses = blockCell.getAttribute('class').split(' ');

        if (!blockCellClasses.includes('snake-unit')) {
            var classes = '';
            for (var i = 0; i < blockCellClasses.length; i++) {
                classes += blockCellClasses[i] + ' ';
            }

            blockCell.setAttribute('class', classes + 'block-unit');


            blockCreated = true;

        }
    }
}


function createFood() {
    var foodCreated = false;

    while (!foodCreated) {
        var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

        var foodCell = document.getElementsByClassName('cell-' + foodY + '-' + foodX)[0];
        var foodCellClasses = foodCell.getAttribute('class').split(' ');

        if (!foodCellClasses.includes('snake-unit')) {
            var classes = '';
            for (var i = 0; i < foodCellClasses.length; i++) {
                classes += foodCellClasses[i] + ' ';
            }

            foodCell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}

//Функция очистки игрового поля
function refreshGame() {
    location.reload();
}

//Функция отслеживания нажатия клавиш
function changeDirection(event) {
    switch (event.keyCode) {
        case 37: //Клавиша влево
            if (direction != 'x+') {
                direction = 'x-';
            }
            break;
        case 38: //Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+';
            }
            break;
        case 39: //Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+';
            }
            break;
        case 40: //Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-';
            }
            break;
    }
}

function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snakeTimer);
    clearInterval(blockTimer);
    alert('Игра окончена! Ваш результат: ' + score.toString());
}

//Генерация игрового поля
function prepareGameField() {
    var gameTable = document.createElement('table');
    gameTable.classList.add('game-table');

    //Генерация ячеек доски
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        var row = document.createElement('tr');
        row.classList.add('game-table-row');
        row.classList.add('row-' + i);

        for (var j = 0; j < FIELD_SIZE_X; j++) {
            var cell = document.createElement('td');
            cell.classList.add('game-table-cell');
            cell.classList.add('cell-' + i + '-' + j);
            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
    document.getElementById('snake-field').appendChild(gameTable);
}

init();