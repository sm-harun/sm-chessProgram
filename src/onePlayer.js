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
    }
}

function makeRandomMove(board, color) {
    
    let allPieces = [];
    let pieceIndexes = [];
    let k = 0;
    
    for (let i = 0; i < 63; i++) {
        if (board[i] < 0 && color == false) {
            allPieces[k] = board[i];
            pieceIndexes[k] = i;
            k++;
        }
        if (board[i] > 0 && color == true) {
            allPieces[k] = board[i];
            pieceIndexes[k] = i;
            k++;
        }
    }
    
    let randomPiece = allPieces[Math.floor(Math.random()*allPieces.length)];
    let randomTile = board[Math.floor(Math.random()*board.length)];
    
    board[pieceIndexes[allPieces.randomPiece.findIndex()]] = 0;
    board[randomTile] = randomPiece;
    
    return board;
}