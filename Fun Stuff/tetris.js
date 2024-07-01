const gridWidth = 10;
const gridHeight = 20;
let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill('   '));;
const typeToColor = {
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
        let newPiece = this.bag.pop();
        newPiece.highlight = newPiece.getHighlight();
        return newPiece;
    }
}

class Piece{
    constructor(type){
        this.middlePosition = [1, Math.floor(gridWidth / 2)];
        this.type = type;
        this.orientation = 0;
        this.hitbox = this.getHitbox(this.middlePosition, this.orientation)
        this.highlight = this.getHighlight();
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
        this.highlight = this.getHighlight();
        let spotFree = true;
        let block = this;
        this.hitbox.forEach(function(pos){
            let spotToTest = [pos[0] + 1, pos[1]];
            if (spotToTest[0] >= gridHeight || (!(block.inHitbox(spotToTest)) && !((grid[spotToTest[0]][spotToTest[1]] === '   ') || grid[spotToTest[0]][spotToTest[1]].toString().includes('H')))){
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
        let oldHitbox = this.hitbox;
        let oldOrientation = this.orientation;
        let rotateSound = new Audio("rotateSound.wav");
        rotateSound.play();
        let newOrientation = (Math.abs(this.orientation + direction)) % 4;
        let newHitbox = this.getHitbox(this.middlePosition, newOrientation);
        if (!(this.isValidMove(newHitbox))){
            return; // TODO: Add offsetting
        } else{
            this.erase();
            this.hitbox = newHitbox;
            this.orientation = newOrientation;
            this.highlight = this.getHighlight();
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
            if (spotToTest[1] >= gridWidth || spotToTest[1] < 0 || (!(alreadyInHitbox) && (grid[spotToTest[0]][spotToTest[1]] != '   ' || grid[spotToTest[0]][spotToTest[1]].toString().includes('H')))){
                spotFree = false;
                }
            })
        if (spotFree){
            this.erase();
            this.middlePosition[1] += direction;
            this.hitbox = this.getHitbox(this.middlePosition, this.orientation);
            this.highlight = this.getHighlight();
            this.update();
        }
    }

    isValidMove(hitbox){
        for (let i = 0; i < hitbox.length; i++){
            let pos = hitbox[i];
            if (pos[0] >= gridHeight || pos[1] >= gridWidth || pos[1] < 0 || (!this.inHitbox([pos[0], pos[1]]) && !(grid[pos[0]][pos[1]] === '   ' || grid[pos[0]][pos[1]].toString().includes('H')))){
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

    getHighlight(){
        let minDist = 20;
        let block = this
        this.hitbox.forEach(function(pos){
            let dist = 0;
            let spotToTest = [pos[0] + dist, pos[1]];
            while (spotToTest[0] < gridHeight && (block.inHitbox(spotToTest) || (grid[spotToTest[0]][spotToTest[1]] === '   ') || grid[spotToTest[0]][spotToTest[1]].toString().includes('H'))){
                dist += 1;
                spotToTest = [pos[0] + dist, pos[1]];
            }
            if (dist < minDist){
                minDist = dist;
            }
        });
        let highlight = [];
        this.hitbox.forEach(function(pos){
            highlight.push([pos[0] + minDist - 1, pos[1]]);
        });
        return highlight;
    }

    erase(){
        this.hitbox.forEach(function(pos){
            grid[pos[0]][pos[1]] = '   ';
        });
        this.highlight.forEach(function(pos){
            grid[pos[0]][pos[1]] = '   ';
        });
    }

    update(){
        let block = this;
        this.highlight.forEach(function(pos){
            grid[pos[0]][pos[1]] = block.type + 'H';
        });
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
        currentPiece.hitbox.forEach(function(pos){
            if (pos[0] == 0){
                restart();
            }
        });
        let rowsCleared = []
        let newPiece = currentBag.getPiece();
        currentPiece = newPiece;
        currentPiece.highlight = currentPiece.getHighlight();
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
        let rowClearedSound = new Audio("rowCleared.wav"); 
        let groundHitSound = new Audio("groundHit.wav");

        if (rowsCleared.length > 0){
            rowClearedSound.play();
        } else{
            groundHitSound.play();
        };
        for (let i = 0; i < rowsCleared.length; i++){            
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
                html += `<block style=\'border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse;\'>${grid[i][j]}</block>`;
            } else if (grid[i][j].toString().includes('H')){
                let color = typeToColor[grid[i][j].toString()[0]][colorSet];
                if (solidBlocks){
                    html += `<block style=\'border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; color: ${color}; background-color: ${color}; opacity: 0.5; \'>[ ]</block>`;
                } else{
                    html += `<block style=\'border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; color: ${color}; opacity: 0.5; \'>[ ]</block>`;
                }
            } 
            else{
                let color = typeToColor[grid[i][j]][colorSet]
                if (solidBlocks){
                    html += `<block style='background-color: ${color}; border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; color: ${color};'>[ ]</block>`;
                } else{
                    html += `<block style='color: ${color}; border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse;'>[ ]</block>`;
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

var leftPressed = false;
var rightPressed = false;
var leftPressedTime = 0;
var rightPressedTime = 0;
var dasTimer = null;
var arrTimer = null;

function manageInput(event){
    if (event.keyCode == '37' && !leftPressed){
        leftPressed = true;
        currentPiece.move(-1);
        clearTimeout(dasTimer);
        clearTimeout(arrTimer);
        dasTimer = setTimeout(() => {
            arrTimer = setInterval(() => currentPiece.move(-1), ARR)
        }, DAS);
    } else if (event.keyCode === 39 && !rightPressed) { // Right arrow key
        rightPressed = true;
        currentPiece.move(1);
        clearTimeout(dasTimer);
        clearInterval(arrTimer);
        dasTimer = setTimeout(() => {
            arrTimer = setInterval(() => currentPiece.move(1), ARR);
        }, DAS);
    } else if (event.keyCode == '38'){
        currentPiece.rotate(1);
    } else if (event.keyCode == '40'){
        currentPiece.rotate(-1);
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
    currentPiece.middlePosition = [1, middlePosition[1]];
    currentPiece.orientation = 0;
    currentPiece.hitbox = currentPiece.getHitbox(currentPiece.middlePosition, currentPiece.orientation);
    currentPiece.highlight = currentPiece.getHighlight(); //TODO: Fix pieces getting deleted, something to do with highlight. Also fix offsetting on edges when swapped
    currentPiece.update();
    updateHeldPiece();
}

function updateHeldPiece(){
    let heldPieceElt = document.getElementById('held-piece');
    let heldPieceGrid = Array.from({ length: 2 }, () => Array(4).fill('   '));
    color = typeToColor[heldPiece.type][colorSet];
    if (heldPiece == null){
        return;
    } else{
        switch (heldPiece.type){
            case 0:
                heldPieceGrid[0][0] = color;
                heldPieceGrid[0][1] = color;
                heldPieceGrid[0][2] = color;
                heldPieceGrid[0][3] = color;
                break;
            case 1:
                heldPieceGrid[0][1] = color;
                heldPieceGrid[0][2] = color;
                heldPieceGrid[1][1] = color;
                heldPieceGrid[1][0] = color;
                break;
            case 2:
                heldPieceGrid[0][0] = color;
                heldPieceGrid[0][1] = color;
                heldPieceGrid[1][1] = color;
                heldPieceGrid[1][2] = color;
                break;
            case 3:
                heldPieceGrid[0][0] = color;
                heldPieceGrid[1][0] = color;
                heldPieceGrid[1][1] = color;
                heldPieceGrid[1][2] = color;
                break;
            case 4:
                heldPieceGrid[1][0] = color;
                heldPieceGrid[1][1] = color;
                heldPieceGrid[1][2] = color;
                heldPieceGrid[0][2] = color;
                break;
            case 5:
                heldPieceGrid[0][0] = color;
                heldPieceGrid[1][0] = color;
                heldPieceGrid[0][1] = color;
                heldPieceGrid[1][1] = color;
                break;
            case 6:
                heldPieceGrid[0][1] = color;
                heldPieceGrid[1][1] = color;
                heldPieceGrid[1][2] = color;
                heldPieceGrid[1][0] = color;
                break;
        }
        let html = '';
        for (let i = 0; i < heldPieceGrid.length; i++){
            html += '<pre style=\'background-color: black; color: white; font-family: pixel-font; font-weight: bold;\'>'
            for (let j = 0; j < heldPieceGrid[0].length; j++){
                if (heldPieceGrid[i][j] === '   '){
                    html += `<block style=\'border: solid 1px black; border-collapse: collapse\'>${heldPieceGrid[i][j]}</block>`;
                } else{
                    if (solidBlocks){
                        html += `<block style='border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; background-color: ${heldPieceGrid[i][j]}; color: ${heldPieceGrid[i][j]};'>[ ]</block>`;
                    } else{
                        html += `<block style='border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; color: ${heldPieceGrid[i][j]};'>[ ]</block>`;
                    }
                }
            }
            html += '</pre>';
        }
        heldPieceElt.innerHTML = html;
    }
}

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
                html += `<block style=\'border: 1px solid black; border-collapse: collapse\'>${upcomingPieceGrid[i][j]}</block>`;
            } else{
                if (solidBlocks){
                    html += `<block style='border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; background-color: ${upcomingPieceGrid[i][j]}; color: ${upcomingPieceGrid[i][j]};'>[ ]</block>`;
                } else{
                    html += `<block style='border: solid 1px rgba(255, 255, 255, .3); border-collapse: collapse; color: ${upcomingPieceGrid[i][j]};'>[ ]</block>`;
                }
            }
        }
        html += '</pre>';
    }
    nextPiece.innerHTML = html;
}

var currentBag = new Bag();
var colorSet = 1;
var solidBlocks = true;
var speed = 500;
var holdReady = true;
var heldPiece = null;
var currentPiece = currentBag.getPiece();
tracks = ['Tetris.mp3', 'ArcadeMusic.mp3', 'NeonArcade.mp3']
var rotateSound = new Audio("rotateSound.wav");
var rowClearedSound = new Audio("rowCleared.wav"); 

var DAS = 133;
var ARR = 10;

function startGame(){
    gameLoop();
    upcomingPieceGrid = Array.from({ length: 4 }, () => Array(4).fill('   '));
    updateUpcomingPieces();
    
    document.addEventListener('keydown', manageInput);
    document.addEventListener('keyup', function(event){
        if (event.keyCode == '37'){
            leftPressed = false;
            if (!(rightPressed)){
                clearInterval(arrTimer);
                clearTimeout(dasTimer);
            }
        } else if (event.keyCode == '39'){
            rightPressed = false;
            if (!(leftPressed)){
                clearInterval(arrTimer);
                clearTimeout(dasTimer);
            }
        }
        // clearInterval(arrTimer);
    });
    document.addEventListener('submit', function(event){
        event.preventDefault();
        if (document.getElementById('colour').checked){
            colorSet = 1;
        } else if (document.getElementById('melody').checked){
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
    setInterval(function(){
        currentPiece.moveDown();
        renderBoard();
    }, 500);
    const tracks = ['ArcadeMusic.mp3', 'NeonArcade.mp3', 'RelaxingArcade.mp3', 'GroovyArcade.mp3', 'FastArcade.mp3'];
    let songIndex = Math.floor(Math.random() * tracks.length);
    soundButton = document.getElementById('sound');
    let sound = document.getElementById('tetris-theme');
    sound.loop = false;
    soundButton.addEventListener('click', function(){
        soundButton.blur();
        if (sound.muted == true){
            sound.src = 'Music/'+tracks[songIndex];
            sound.play();
            sound.muted = false;
            console.log('sound should start?');
            soundButton.innerHTML = "Now Playing: " + tracks[songIndex].split('.')[0];
        } else{
            nextSong();
            soundButton.innerHTML = "Now Playing: " + tracks[songIndex].split('.')[0];
        }
    });
    function nextSong(){
        songIndex = (songIndex + 1) % 5;
        console.log(songIndex + ' ' + 'Music/'+tracks[songIndex]);
        sound.src = 'Music/'+tracks[songIndex];
        sound.play();
    }
    sound.onended = nextSong;
}

restartButton = document.getElementById('restart')

restartButton.addEventListener('click', function(){
    restart();
});

startGame();

function restart(){
    restartButton.hidden = true;
    restartButton.hidden = false;
    grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill('   '));
    currentBag = new Bag();
    heldPiece = null;
    currentPiece = currentBag.getPiece();
    holdReady = true;
    updateUpcomingPieces();
    renderBoard();
    lastGroundHitTime = 0;
}