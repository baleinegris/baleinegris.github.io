const gridWidth = 10;
const gridHeight = 20;

let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill('   '));;
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
        this.middlePosition = [1, Math.floor(gridWidth / 2)];
        this.type = type;
        this.orientation = 0;
        this.hitbox = this.getHitbox(this.orientation)
    }
    getHitbox(orientation){
        if (this.type == 0){
            if (orientation == 0 || orientation == 2){
                return [[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0], this.middlePosition[1] + 2]]
            } else if (orientation == 1 || orientation == 3){
                return [[this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]], [this.middlePosition[0] + 2, this.middlePosition[1]]]
            }
        } else if (this.type == 1){
            if (orientation == 0){
                return[[this.middlePosition[0] + 1, this.middlePosition[1] - 1], [this.middlePosition[0] + 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[this.middlePosition[0], this.middlePosition[1] - 1], [this.middlePosition[0] - 1, this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]]]
            } else if (orientation == 2){
                return[[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0] - 1, this.middlePosition[1]], [this.middlePosition[0] - 1, this.middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0] + 1, this.middlePosition[1] + 1]]
            }
        } else if (this.type == 2){
            if (orientation == 0){
                return[[this.middlePosition[0] - 1, this.middlePosition[1] - 1], [this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[this.middlePosition[0] + 1, this.middlePosition[1] - 1], [this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0] - 1, this.middlePosition[1]]]
            } else if (orientation == 2){
                return[[this.middlePosition[0] - 1, this.middlePosition[1] - 1], [this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[this.middlePosition[0] + 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0] - 1, this.middlePosition[1] + 1]]
            }
        } else if (this.type == 3){
            if (orientation == 0){
                return[[this.middlePosition[0] - 1, this.middlePosition[1] - 1], [this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[this.middlePosition[0] - 1, this.middlePosition[1] + 1], [this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]]]
            } else if (orientation == 2){
                return[[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0] + 1, this.middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[this.middlePosition[0] + 1, this.middlePosition[1] - 1], [this.middlePosition[0] + 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] - 1, this.middlePosition[1]]]
            }
        } else if (this.type == 4){
            if (orientation == 0){
                return[[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0] - 1, this.middlePosition[1] + 1]]
            } else if (orientation == 1){
                return[[this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]], [this.middlePosition[0] + 1, this.middlePosition[1] + 1]]
            } else if (orientation == 2){
                return[[this.middlePosition[0] + 1, this.middlePosition[1] - 1], [this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1]]
            } else if (orientation == 3){
                return[[this.middlePosition[0] - 1, this.middlePosition[1] - 1], [this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]]]
            }
        } else if (this.type == 5){
            return [[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1] - 1], [this.middlePosition[0] + 1, this.middlePosition[1]]]
        } else if (this.type == 6){
            if (orientation == 0){
                return[[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0] - 1, this.middlePosition[1]]]
            } else if (orientation == 1){
                return[[this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]], [this.middlePosition[0], this.middlePosition[1] + 1]]
            } else if (orientation == 2){
                return[[this.middlePosition[0], this.middlePosition[1] - 1], this.middlePosition, [this.middlePosition[0], this.middlePosition[1] + 1], [this.middlePosition[0] + 1, this.middlePosition[1]]]
            } else if (orientation == 3){
                return[[this.middlePosition[0] - 1, this.middlePosition[1]], this.middlePosition, [this.middlePosition[0] + 1, this.middlePosition[1]], [this.middlePosition[0], this.middlePosition[1] - 1]]
            }
        }
    }

    moveDown(){
        let spotFree = true;
        let block = this;
        this.hitbox.forEach(function(pos){
            let spotToTest = [pos[0] + 1, pos[1]];
            if (spotToTest[0] >= gridHeight || (!(block.inHitbox(spotToTest)) && grid[spotToTest[0]][spotToTest[1]] != '   ')){
                spotFree = false;
                groundHit();
            }
        })
        if (spotFree){
            this.erase();
            this.middlePosition[0] += 1;
            this.hitbox = this.getHitbox(this.orientation);
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
        let newHitbox = this.getHitbox(newOrientation);
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
            this.hitbox = this.getHitbox(this.orientation);
            this.update();
        }
    }

    isValidMove(hitbox){
        for (let i = 0; i < hitbox.length; i++){
            let pos = hitbox[i];
            if (pos[0] >= gridHeight || pos[1] >= gridWidth || pos[1] < 0 || (!this.inHitbox([pos[0], pos[1]]) && grid[pos[0]][pos[1]] != '   ')){
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
    
    offset(hitbox, amount){
        hitbox.forEach(function(pos){
            pos[1] += amount;
        })
        return hitbox;
    }

    erase(){
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = '   ';
        });
    }

    update(){
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = '[ ]';
        });
    }
}    
    

function groundHit(){
    let rowsCleared = []
    currentPiece = currentBag.getPiece();
    for (let i = 0; i < gridHeight; i++){
        let rowFull = true;
        for (let j = 0; j < gridWidth; j++){
            if (grid[i][j] == '   '){
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
var currentPiece = currentBag.getPiece();

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