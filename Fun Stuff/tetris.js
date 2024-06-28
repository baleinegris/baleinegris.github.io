const gridWidth = 10;
const gridHeight = 20;

let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill('  '));;
console.log(grid[0]);

class Bag{
    constructor(){
        this.bag = [];
        this.fillBag();
    }
    fillBag(){
        let availablePieces = [0, 1, 2, 3, 4, 5, 6];
        for (let i = 0; i < 7; i++){
            let randomIndex = Math.floor(Math.random() * availablePieces.length);
            this.bag.push(new Piece(availablePieces[randomIndex]));
            availablePieces.splice(randomIndex, 1);
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
        this.middlePosition = [0, Math.floor(gridWidth / 2)];
        this.type = type;
        this.orientation = 0;
        this.hitbox = this.getHitbox()
    }
    getHitbox(){
        if (this.type == 0){
            if (this.orientation == 0 || this.orientation == 2){
                return [[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0], this.middlePosition[1] + 2]]
            } else if (this.orientation == 1 || this.orientation == 3){
                return [[this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]], [this.middlePosition[0] + 2, this.middlePosition[1]]]
            }
        }
    }

    moveDown(){
        let spotFree = true;
        let block = this;
        this.hitbox.forEach(function(pos){
            let spotToTest = [pos[0] + 1, pos[1]];
            if (spotToTest[0] >= gridHeight){
                spotFree = false;
                // TODO: implement piece hitting ground
            } else if (!(block.inHitbox(spotToTest)) && grid[spotToTest[0]][spotToTest[1]] != '  '){
                spotFree = false;
            }
        })
        if (spotFree){
            this.erase();
            this.middlePosition[0] += 1;
            this.hitbox = this.getHitbox();
            this.update()
        } else {
            return; // TODO
        }
    }

    rotate(direction){
        let oldHitbox = this.hitbox;
        let oldOrientation = this.orientation;
        this.orientation = (this.orientation + direction) % 4;
        this.erase();
        this.hitbox = this.getHitbox();
        if (!(this.isValidMove())){
            this.hitbox = oldHitbox;
            this.orientation = oldOrientation;
        }
        this.update();
    }

    move(direction){
        let spotFree = true;
        let currentHitbox = this.hitbox;
        let block = this;
        currentHitbox.forEach(function(pos){
            let spotToTest = [pos[0], pos[1] + direction];
            let alreadyInHitbox = block.inHitbox(spotToTest);
            console.log(spotToTest, alreadyInHitbox);
            if (spotToTest[1] >= gridWidth || spotToTest[1] < 0 || (!(alreadyInHitbox) && grid[spotToTest[0]][spotToTest[1]] != '  ')){
                spotFree = false;
                }
            })
        if (spotFree){
            this.erase();
            this.middlePosition[1] += direction;
            this.hitbox = this.getHitbox();
            this.update();
        }
    }

    isValidMove(){
        this.hitbox.forEach(function(pos){
            if (pos[0] >= gridHeight || pos[1] >= gridWidth || pos[1] < 0 || grid[pos[0]][pos[1]] != '  '){
                return false;
            }
        })
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
    

    erase(){
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = '  ';
        });
    }

    update(){
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = '[]';
        });
    }
}    
    


function getNewPiece(){
    return new Piece(0);
}

function renderBoard() {
    let board = document.getElementById('tetrisDisplay');
    let html = '';
    html += '<div id= \'tetris-title\'>TETRIS</div>'
    for (let i = 0; i < gridHeight; i++) {
        html += '<div>';
        for (let j = 0; j < gridWidth; j++) {
            html += grid[i][j];
        }
        html += '</div>';
    }
    board.innerHTML = html;
}

function handleTurn(){
    return;
}

let currentBag = new Bag();
var currentPiece = new Piece(0);

function gameLoop() {
    renderBoard();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', manageInput);

function manageInput(event){
    if (event.keyCode == '37'){
        currentPiece.move(-1);
    } else if (event.keyCode == '39'){
        currentPiece.move(1);
    } else if (event.keyCode == '38'){
        currentPiece.rotate(1);
    } else if (event.keyCode == '40'){
        currentPiece.moveDown();
    }
    
}

setInterval(function(){
    currentPiece.moveDown();
    renderBoard();
}, 500);

gameLoop();