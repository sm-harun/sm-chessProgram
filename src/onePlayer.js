function startOnePlayer(color) {
    
    let chessBoard = document.getElementById('chessBoard');
    let allImages = document.querySelectorAll('img');
    
    document.getElementById('colorChoice').style.visibility = "hidden";
    
    if (color == true) {
        playingColor = true;
    }
    if (color == false) {
        playingColor = false;
        chessBoard.style.transform = "rotate(180deg)";
        allImages.forEach(image => image.style.transform = "rotate(180deg)");
        makeRandomMove(board, !playingColor);
    }
    
    onePlayer = true;
}

function returnRandomMove(board, color) {
    
    let piecesIndex = [];
    let k = 0;
    
    // Gets all the pieces of the selected color.
    for (let i = 0; i < 64; i++) {
        if((board[i] < 0 && !color) || (board[i] > 0 && color)) {
            piecesIndex[k] = i;
            k++;
        }
    }
    
    let hasMoves = false;
    
    let pieceToMove;
    let legalMovesArray;
    let indexesOfLegalMoves = [];
    
    while(true) {
        
        k = 0;
        // Chooses a random piece and gets all it's legal moves.
        pieceToMove = piecesIndex[Math.floor(Math.random()*piecesIndex.length)];
        legalMovesArray = legalMovesOfPieces(board, pieceToMove, false);
        
        // Gets all the legal moves in one array.
        for (let i = 0; i < 64; i++) {
            if (Math.abs(legalMovesArray[i]) == 1) {
                hasMoves = true;
                indexesOfLegalMoves[k] = i;
                k++;
            }
        }
        
        // If this piece does not have any legal moves it chooses another one.
        if (hasMoves = true) {
            hasMoves = false;
            break;
        }
    }
    
    // selects a random move.
    let move = indexesOfLegalMoves[Math.floor(Math.random()*indexesOfLegalMoves.length)];
    
    return [pieceToMove, move];
}

function makeRandomMove(board, color) {
    
    let move = returnRandomMove(board, color);
    let pieceValue = board[move[0]];
    
    // currently for some reason this returns undefined. so for the time being we will just keep the piece in it's original place.
    if (move[1] == undefined) {
        move[1] = move[0];
    }
    
    let selectedTile = document.getElementById(move[0]);
    let targetTile = document.getElementById(move[1]);
    
    let selectedPiece = selectedTile.firstChild;
    selectedTile.removeChild(selectedPiece);
    targetTile.appendChild(selectedPiece);
    
    board[move[0]] = 0;
    board[move[1]] = pieceValue;
    
    if (turn == true) { 
        turn = false; 
    } else {
        turn = true;
    }
}