const gridWidth = 10;
const gridHeight = 20;
let speed = 500;
let colorSet = 1;
let solidBlocks = true;


let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill('   '));;
console.log(grid[0]);

let typeToColor = {
    0: ['white', 'cyan', 'pink'],
    1: ['white','green', 'pink'],
    2: ['white','red', 'pink'],
    3: ['white','blue', 'pink'],
    4: ['white','orange', 'pink'],
    5: ['white','yellow', 'pink'],
    6: ['white','purple', 'pink'],
}

class Bag{
    constructor(){
        this.bag = [];
        this.fillBag();
    }
    fillBag(){
        for (let i = 0; i < 5; i++){
            let availablePieces = [0, 1, 2, 3, 4, 5, 6];
            for (let i = 0; i < 7; i++){
                let randomIndex = Math.floor(Math.random() * availablePieces.length);
                this.bag.push(new Piece(availablePieces[randomIndex]));
                availablePieces.splice(randomIndex, 1);
            }
        }
    }
    getPiece(){
        if (this.bag.length == 0){
            this.fillBag();
        }
        return this.bag.pop();
    }
}

class Piece{
    constructor(type){
        this.middlePosition = [1, Math.floor(gridWidth / 2)];
        this.type = type;
        this.orientation = 0;
        this.hitbox = this.getHitbox(this.middlePosition, this.orientation)
    }
    getHitbox(middlePosition, orientation){
        if (this.type == 0){
            if (orientation == 0 || orientation == 2){
                return [[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0], middlePosition[1] + 2]]
            } else if (orientation == 1 || orientation == 3){
                return [[middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0] + 1, middlePosition[1]], [middlePosition[0] + 2, middlePosition[1]]]
            }
        } else if (this.type == 1){
            if (orientation == 0){
                return[[middlePosition[0] + 1, middlePosition[1] - 1], [middlePosition[0] + 1, middlePosition[1]], middlePosition, [middlePosition[0], middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[middlePosition[0], middlePosition[1] - 1], [middlePosition[0] - 1, middlePosition[1] - 1], middlePosition, [middlePosition[0] + 1, middlePosition[1]]]
            } else if (orientation == 2){
                return[[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0] - 1, middlePosition[1]], [middlePosition[0] - 1, middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0] + 1, middlePosition[1] + 1]]
            }
        } else if (this.type == 2){
            if (orientation == 0){
                return[[middlePosition[0] - 1, middlePosition[1] - 1], [middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0], middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[middlePosition[0] + 1, middlePosition[1] - 1], [middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0] - 1, middlePosition[1]]]
            } else if (orientation == 2){
                return[[middlePosition[0] - 1, middlePosition[1] - 1], [middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0], middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[middlePosition[0] + 1, middlePosition[1]], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0] - 1, middlePosition[1] + 1]]
            }
        } else if (this.type == 3){
            if (orientation == 0){
                return[[middlePosition[0] - 1, middlePosition[1] - 1], [middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[middlePosition[0] - 1, middlePosition[1] + 1], [middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0] + 1, middlePosition[1]]]
            } else if (orientation == 2){
                return[[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0] + 1, middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[middlePosition[0] + 1, middlePosition[1] - 1], [middlePosition[0] + 1, middlePosition[1]], middlePosition, [middlePosition[0] - 1, middlePosition[1]]]
            }
        } else if (this.type == 4){
            if (orientation == 0){
                return[[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0] - 1, middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0] + 1, middlePosition[1]], [middlePosition[0] + 1, middlePosition[1] + 1]]
            } else if (orientation == 2){
                return[[middlePosition[0] + 1, middlePosition[1] - 1], [middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[middlePosition[0] - 1, middlePosition[1] - 1], [middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0] + 1, middlePosition[1]]]
            }
        } else if (this.type == 5){
            return [[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0] + 1, middlePosition[1] - 1], [middlePosition[0] + 1, middlePosition[1]]]
        } else if (this.type == 6){
            if (orientation == 0){
                return[[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0] - 1, middlePosition[1]]]
            } else if (orientation == 1){
                return[[middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0] + 1, middlePosition[1]], [middlePosition[0], middlePosition[1] + 1]]
            } else if (orientation == 2){
                return[[middlePosition[0], middlePosition[1] - 1], middlePosition, [middlePosition[0], middlePosition[1] + 1], [middlePosition[0] + 1, middlePosition[1]]]
            } else if (orientation == 3){
                return[[middlePosition[0] - 1, middlePosition[1]], middlePosition, [middlePosition[0] + 1, middlePosition[1]], [middlePosition[0], middlePosition[1] - 1]]
            }
        }
    }

    moveDown(){
        let spotFree = true;
        let block = this;
        this.hitbox.forEach(function(pos){
            let spotToTest = [pos[0] + 1, pos[1]];
            if (spotToTest[0] >= gridHeight || (!(block.inHitbox(spotToTest)) && !(grid[spotToTest[0]][spotToTest[1]] === '   '))){
                spotFree = false;
                groundHit();
                return;
            }
        })
        if (spotFree){
            this.erase();
            this.middlePosition[0] += 1;
            this.hitbox = this.getHitbox(this.middlePosition, this.orientation);
            this.update()
        } else {
            return; // TODO
        }
    }

    rotate(direction){
        console.log('rotating');
        let oldHitbox = this.hitbox;
        let oldOrientation = this.orientation;
        let newOrientation = (this.orientation + direction) % 4;
        let newHitbox = this.getHitbox(this.middlePosition, newOrientation);
        if (!(this.isValidMove(newHitbox))){
            return; // TODO: Add offsetting
        } else{
            this.erase();
            this.hitbox = newHitbox;
            this.orientation = newOrientation;
            this.update();
        }
    }

    move(direction){
        let spotFree = true;
        let currentHitbox = this.hitbox;
        let block = this;
        currentHitbox.forEach(function(pos){
            let spotToTest = [pos[0], pos[1] + direction];
            let alreadyInHitbox = block.inHitbox(spotToTest);
            if (spotToTest[1] >= gridWidth || spotToTest[1] < 0 || (!(alreadyInHitbox) && grid[spotToTest[0]][spotToTest[1]] != '   ')){
                spotFree = false;
                }
            })
        if (spotFree){
            this.erase();
            this.middlePosition[1] += direction;
            this.hitbox = this.getHitbox(this.middlePosition, this.orientation);
            this.update();
        }
    }

    isValidMove(hitbox){
        for (let i = 0; i < hitbox.length; i++){
            let pos = hitbox[i];
            if (pos[0] >= gridHeight || pos[1] >= gridWidth || pos[1] < 0 || (!this.inHitbox([pos[0], pos[1]]) && !(grid[pos[0]][pos[1]] === '   '))){
                return false;
            }
        }
        return true;
    }

    inHitbox(pos){
        for(let i = 0; i < this.hitbox.length; i++){
            let hitboxPos = this.hitbox[i];
            if (hitboxPos[0] == pos[0] && hitboxPos[1] == pos[1]){
                return true;
            }
        }
        return false;
    }
    
    hardDrop(){
        let newPosition = [...this.middlePosition];
        let newHitbox = this.getHitbox(newPosition, this.orientation);
        while (this.isValidMove(newHitbox)){
            newPosition[0] += 1;
            newHitbox = this.getHitbox(newPosition, this.orientation);
        }
        newPosition[0] -= 1;
        newHitbox = this.getHitbox(newPosition, this.orientation);
        this.erase();
        this.hitbox = newHitbox;
        this.middlePosition = newPosition;
        this.update();
        this.moveDown();
    }

    erase(){
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = '   ';
        });
    }

    update(){
        let block = this;
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = block.type;
        });
    }
}    

 const groundHitCooldown = 100;
 let lastGroundHitTime = 0;

function groundHit(){
    const now = Date.now();
    if (now - lastGroundHitTime > groundHitCooldown) {
        let rowsCleared = []
        let newPiece = currentBag.getPiece();
        currentPiece = newPiece;
        for (let i = 0; i < gridHeight; i++){
            let rowFull = true;
            for (let j = 0; j < gridWidth; j++){
                if (grid[i][j] === '   '){
                    rowFull = false;
                    break;
                }
            }
            if (rowFull){
                rowsCleared.push(i);
            }
        }
        for (let i = 0; i < rowsCleared.length; i++){
            grid[rowsCleared[i]] = Array(gridWidth).fill('   ');
            for (let j = rowsCleared[i]; j > 0; j--){
                grid[j] = grid[j - 1];
            }
            grid[0] = Array(gridWidth).fill('   ');
        }
        updateUpcomingPieces();
        lastGroundHitTime = now;
        holdReady = true;
    }
}

function getNewPiece(){
    return new Piece(0);
}

function renderBoard() {
    let board = document.getElementById('tetrisGrid');
    let html = '';
    html += '<div id= \'tetris-title\'>TETRIS</div>'
    for (let i = 0; i < gridHeight; i++) {
        html += '<div>';
        for (let j = 0; j < gridWidth; j++) {
            if (grid[i][j] === '   '){
                html += `<block>${grid[i][j]}</block>`;
            } else{
                let color = typeToColor[grid[i][j]][colorSet]
                if (solidBlocks){
                    html += `<block style='background-color: ${color}; color: ${color};'>[ ]</block>`;
                } else{
                    html += `<block style='color: ${color};'>[ ]</block>`;
                }
            }
        }
        html += '</div>';
    }
    board.innerHTML = html;
}

function handleTurn(){
    return;
}

function gameLoop() {
    renderBoard();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', manageInput);
document.addEventListener('submit', function(event){
    event.preventDefault();
    if (document.getElementById('colour').checked){
        colorSet = 1;
    } else if (document.getElementById('memo').checked){
        colorSet = 2;
    } else{
        colorSet = 0;
    }
    if (document.getElementById('solidOn').checked){
        solidBlocks = true;
    } else{
        solidBlocks = false;
    }
    renderBoard();
    updateUpcomingPieces();
});
function manageInput(event){
    if (event.keyCode == '37'){
        currentPiece.move(-1);
    } else if (event.keyCode == '39'){
        currentPiece.move(1);
    } else if (event.keyCode == '38'){
        currentPiece.rotate(1);
    } else if (event.keyCode == '40'){
        currentPiece.moveDown();
    } else if (event.code == 'Space'){
        currentPiece.hardDrop();
    } else if (event.code == 'KeyC'){
        if (holdReady){
            hold()
            updateUpcomingPieces();
        }
    }
    
}

function hold(){
    holdReady = false;
    let middlePosition = currentPiece.middlePosition;
    currentPiece.erase();
    if (heldPiece == null){
        heldPiece = currentPiece;
        currentPiece = currentBag.getPiece();
    } else{
        let temp = heldPiece;
        heldPiece = currentPiece;
        currentPiece = temp;
    }
    currentPiece.middlePosition = middlePosition;
    currentPiece.hitbox = currentPiece.getHitbox(currentPiece.middlePosition, currentPiece.orientation);
    currentPiece.update();
}
setInterval(function(){
    currentPiece.moveDown();
    renderBoard();
}, 500);

let holdReady = true;
let heldPiece = null;
let currentBag = new Bag();
var currentPiece = currentBag.getPiece();
upcomingPieceGrid = Array.from({ length: 4 }, () => Array(4).fill('   '));
updateUpcomingPieces();

function updateUpcomingPieces(){
    let nextPiece = document.getElementById('piece1');
    let upcomingPieceGrid = Array.from({ length: 2 }, () => Array(4).fill('   '));
    let upcomingPiece = currentBag.bag[currentBag.bag.length - 1];
    let color = typeToColor[upcomingPiece.type][colorSet]
    switch (upcomingPiece.type){
        case 0:
            upcomingPieceGrid[0][0] = color;
            upcomingPieceGrid[0][1] = color;
            upcomingPieceGrid[0][2] = color;
            upcomingPieceGrid[0][3] = color;
            break;
        case 1:
            upcomingPieceGrid[0][1] = color;
            upcomingPieceGrid[0][2] = color;
            upcomingPieceGrid[1][1] = color;
            upcomingPieceGrid[1][0] = color;
            break;
        case 2:
            upcomingPieceGrid[0][0] = color;
            upcomingPieceGrid[0][1] = color;
            upcomingPieceGrid[1][1] = color;
            upcomingPieceGrid[1][2] = color;
            break;
        case 3:
            upcomingPieceGrid[0][0] = color;
            upcomingPieceGrid[1][0] = color;
            upcomingPieceGrid[1][1] = color;
            upcomingPieceGrid[1][2] = color;
            break;
        case 4:
            upcomingPieceGrid[1][0] = color;
            upcomingPieceGrid[1][1] = color;
            upcomingPieceGrid[1][2] = color;
            upcomingPieceGrid[0][2] = color;
            break;
        case 5:
            upcomingPieceGrid[0][0] = color;
            upcomingPieceGrid[1][0] = color;
            upcomingPieceGrid[0][1] = color;
            upcomingPieceGrid[1][1] = color;
            break;
        case 6:
            upcomingPieceGrid[0][1] = color;
            upcomingPieceGrid[1][1] = color;
            upcomingPieceGrid[1][2] = color;
            upcomingPieceGrid[1][0] = color;
            break;
    }
    let html = '';
    for (let i = 0; i < upcomingPieceGrid.length; i++){
        html += '<pre style=\'background-color: black; color: white; font-family: pixel-font; font-weight: bold;\'>'
        for (let j = 0; j < upcomingPieceGrid[0].length; j++){
            if (upcomingPieceGrid[i][j] === '   '){
                html += `<block>${upcomingPieceGrid[i][j]}</block>`;
            } else{
                if (solidBlocks){
                    html += `<block style='background-color: ${upcomingPieceGrid[i][j]}; color: ${upcomingPieceGrid[i][j]};'>[ ]</block>`;
                } else{
                    html += `<block style='color: ${upcomingPieceGrid[i][j]};'>[ ]</block>`;
                }
            }
        }
        html += '</pre>';
    }
    nextPiece.innerHTML = html;
}

gameLoop();