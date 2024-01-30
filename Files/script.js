var curUserRed = true;
var boardStatus = [6, 6, 6, 6, 6, 6, 6];
var board = [];

function generateRow(rowNumber){
    let section = document.createElement('section');
    section.className = "row" + rowNumber;
    for(let i = 0; i < 7; i++){
        let button = document.createElement('button');
        button.id = rowNumber + "-" + i;
        button.setAttribute('onclick', 'setColor(this.id)');
        section.appendChild(button); 
    }
    
    let game = document.getElementById("game");
    game.appendChild(section);
}

function generateBoard(){
    let boardSize = 7;
    for(let i = 0; i < boardSize; i++){
        generateRow(i);
        let row = [0, 0, 0, 0, 0, 0, 0]
        board.push(row);
    }
    document.getElementById("curUser").style.backgroundColor = "red";
}

function checkBoard(){
    const directions = [[1,0], [1,-1], [1,1], [0,1]];
    for (const d of directions) {
        const dx = d[0];
        const dy = d[1];
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 7; y++) {
                const lastx = x + 3*dx;
                const lasty = y + 3*dy;
                if (0 <= lastx && lastx < 7 && 0 <= lasty && lasty < 7) {
                    const w = board[x][y];
                    if (w !== 0 && w === board[x+dx][y+dy] && w === board[x+2*dx][y+2*dy] && w === board[lastx][lasty]) {
                        return true;
                    }
                }
            }
        }
    }
    return false; 
}

function checkWinner(){
    // console.log(board);
    if(checkBoard()){
        document.getElementById("winnerAlert").innerText = (curUserRed? "Blue" : "Red") + " won!";
        document.getElementById("winnerAlert").style.color = curUserRed ? "blue" : "red";
    }
}

function setColor(id){
    var position = id.split("-");
    var curRow = boardStatus[parseInt(position[1])];
    var curPosition = curRow + "-" + position[1];
    board[curRow][parseInt(position[1])] = curUserRed ? "r": "b";
    boardStatus[parseInt(position[1])] -= 1;
    document.getElementById(curPosition).className = "boardButton";
    document.getElementById(curPosition).style.backgroundColor = curUserRed ? "red" : "blue";
    document.getElementById("curUser").style.backgroundColor = curUserRed ? "blue" : "red";
    curUserRed = !curUserRed;
    checkWinner();
}

function resetBoard(){
    location.reload();
}