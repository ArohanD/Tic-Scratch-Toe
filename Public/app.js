
//State -----
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

let resetBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

let isCurrentPlayerX;
let gameOver = false;
let pieceX = "./Huehuehue.gif";
let pieceO = "./Hawk.gif";


//State Changers -----

//Golbal click listener
logger = (el) => {
    log(el.target);
}
let boxes = Array.from(document.getElementsByClassName('box'));
boxes.forEach((el) => el.addEventListener('click', logger, false));

//Log a click
log = (element) => {
    let tuple = JSON.parse(element.id);
    let position = board[tuple[0]][tuple[1]];
    if(position === null && !gameOver){
        flip(element, tuple);
    }
}

//Flip piece on gameboard in app
flip = (element, tuple) => {
    if(isCurrentPlayerX === undefined) isCurrentPlayerX = true;
    let piece = isCurrentPlayerX ? 'X' : 'O';
    board[tuple[0]][tuple[1]] = piece;
    isCurrentPlayerX = !isCurrentPlayerX;
    element.innerHTML = placePiece(piece);
    let gameState = document.getElementById('currentMove');
    let nextPiece = isCurrentPlayerX ? 'X' : 'O';
    gameState.innerHTML = `It's ${nextPiece}'s turn to play`
    checkWinState();
}

//Place piece on gameboard
placePiece = (piece) => {
    if(piece === 'X'){
        return `<img class="pieceX" src=${pieceX}>`;
    } else if (piece === 'O'){
        return `<img class="pieceX" src=${pieceO}>`;
    }
}

//Update state of non-board components
checkWinState = () => {
    let gameState = document.getElementById('currentMove');

    let checkTie = true;
    for(let i = 0; i < board.length; i++){
        if(board[i].includes(null)) checkTie = false;
    }
    
    if(checkTie){
        gameOver = true;
        gameState.innerHTML = `It's a tie - you both lose!`
    }
    
    let checkRows = board.reduce((a, b) => {
        return a || filled(b)
    }, false)

    let checkColumns = false;
    for (let i = 0; i < board.length; i++){
        let toCheck = [];
        toCheck.push(board[0][i])
        toCheck.push(board[1][i])
        toCheck.push(board[2][i])
        if(filled(toCheck)){
            checkColumns = true;
        }
    }

    let checkDiagonals = filled([board[0][0], board[1][1], board[2][2]]) 
        || filled([board[0][2], board[1][1], board[2][0]]);

    gameOver = (checkRows || checkColumns || checkDiagonals);

    if(gameOver){
        let winner = isCurrentPlayerX ? 'O' : 'X';
        gameState.innerHTML = `${winner} has won the game!`
    }

}

//Check if any row/col/diag is a winner
filled = (arr) => {
    return (arr[0] === arr[1] && arr[1] === arr[2] && arr[1] !== null);
}

//Reset box DOM elements
reloadBoard = () => {
    for (let i = 0; i < board.length; i++){
        board[i] = resetBoard[i].slice();
    }
    boxes.forEach((el) => el.innerHTML = null);
    isCurrentPlayerX = true;
    document.getElementById('currentMove').innerHTML = "X - make the first move!";
    gameOver = false;
}