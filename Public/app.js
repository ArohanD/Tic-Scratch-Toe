
//State -----
let state = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    isCurrentPlayerX: undefined,
    gameOver: false,
    pieceX: "./Huehuehue.gif",
    pieceO: "./Hawk.gif",
    xWinCount: 0,
    oWinCount: 0,
    tieCount: 0
}

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
    let position = state.board[tuple[0]][tuple[1]];
    if(position === null && !state.gameOver){
        flip(element, tuple);
    }
}

//Flip piece on gamestate.board in app
flip = (element, tuple) => {
    if(state.isCurrentPlayerX === undefined) state.isCurrentPlayerX = true;
    let piece = state.isCurrentPlayerX ? 'X' : 'O';
    state.board[tuple[0]][tuple[1]] = piece;
    state.isCurrentPlayerX = !state.isCurrentPlayerX;
    element.innerHTML = placePiece(piece);
    let gameState = document.getElementById('currentMove');
    let nextPiece = state.isCurrentPlayerX ? 'X' : 'O';
    gameState.innerHTML = `It's ${nextPiece}'s turn to play`
    checkWinState();
}

//Place piece on gamestate.board
placePiece = (piece) => {
    if(piece === 'X'){
        return `<img class="piece" src=${state.pieceX}>`;
    } else if (piece === 'O'){
        return `<img class="piece" src=${state.pieceO}>`;
    }
}

//Update state of non-state.board components
checkWinState = () => {
    let gameState = document.getElementById('currentMove');

    let checkTie = true;
    for(let i = 0; i < state.board.length; i++){
        if(state.board[i].includes(null)) checkTie = false;
    }
    
    if(checkTie){
        state.gameOver = true;
        state.tieCount++;
        gameState.innerHTML = `It's a tie - you both lose!`
        document.getElementById('winCount').innerHTML = `X has won ${state.xWinCount} times
        , O has won ${state.oWinCount} times.
        There have been ${state.tieCount} ties.`
    }
    
    let checkRows = state.board.reduce((a, b) => {
        return a || filled(b)
    }, false)

    let checkColumns = false;
    for (let i = 0; i < state.board.length; i++){
        let toCheck = [];
        toCheck.push(state.board[0][i])
        toCheck.push(state.board[1][i])
        toCheck.push(state.board[2][i])
        if(filled(toCheck)){
            checkColumns = true;
        }
    }

    let checkDiagonals = filled([state.board[0][0], state.board[1][1], state.board[2][2]]) 
        || filled([state.board[0][2], state.board[1][1], state.board[2][0]]);

    state.gameOver = (checkRows || checkColumns || checkDiagonals);

    if(state.gameOver){
        let winner = state.isCurrentPlayerX ? 'O' : 'X';
        gameState.innerHTML = `${winner} has won the game!`;
        winner === 'X' ? state.xWinCount++ : state.oWinCount++;
        document.getElementById('winCount').innerHTML = `X has won ${state.xWinCount} times
        , O has won ${state.oWinCount} times.
        here have been ${state.tieCount} ties.`
    }

}

//Check if any row/col/diag is a winner
filled = (arr) => {
    return (arr[0] === arr[1] && arr[1] === arr[2] && arr[1] !== null);
}

let resetBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

//Reset box DOM elements
reloadBoard = () => {
    for (let i = 0; i < state.board.length; i++){
        state.board[i] = resetBoard[i].slice();
    }
    boxes.forEach((el) => el.innerHTML = null);
    state.isCurrentPlayerX = true;
    document.getElementById('currentMove').innerHTML = "X - make the first move!";
    state.gameOver = false;
}