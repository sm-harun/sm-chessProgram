let borderIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 
                     8, 15, 16, 23, 24, 31, 32, 39, 40, 
                     47, 48, 55, 56, 57, 58, 59, 60,
                     61, 62, 63];
                 
let upBorderIndexes = [0, 1, 2, 3, 4, 5, 6, 7];
let downBorderIndexes = [56, 57, 58, 59, 60, 61, 62, 63];
let rightBorderIndexes = [7, 15, 23, 31, 39, 47, 55, 63];
let leftBorderIndexes = [0, 8, 16, 24, 32, 40, 48, 56];

let castleRight = [true, true];
let castleLeft = [true, true];

let unPassantBoard = new Array(64).fill(false);

// The last argument is needed to check for the squares the king won't be able to go to.   
function legalMovesOfPieces(board, index, onlyAttackedTiles) {
    
    let movesArray = [];

    switch (board[index]) {
        case 1:
          movesArray = legalPawnMoves(board, index, false, onlyAttackedTiles);
          break;
        case 2:
          movesArray = legalKnightMoves(board, index, false, onlyAttackedTiles);
          break;
        case 3:
          movesArray = legalBishopMoves(board, index, false, onlyAttackedTiles);
          break;
        case 4:
          movesArray = legalRookMoves(board, index, false, onlyAttackedTiles);
          break;
        case 5:
          movesArray = legalQueenMoves(board, index, false, onlyAttackedTiles);
          break;
        case 6:
          movesArray = legalKingMoves(board, index, false, onlyAttackedTiles);
          break;
        case -1:
          movesArray = legalPawnMoves(board, index, true, onlyAttackedTiles);
          break;
        case -2:
          movesArray = legalKnightMoves(board, index, true, onlyAttackedTiles);
          break;
        case -3:
          movesArray = legalBishopMoves(board, index, true, onlyAttackedTiles);
          break;
        case -4:
          movesArray = legalRookMoves(board, index, true, onlyAttackedTiles);
          break;
        case -5:
          movesArray = legalQueenMoves(board, index, true, onlyAttackedTiles);
          break;
        case -6:
          movesArray = legalKingMoves(board, index, true, onlyAttackedTiles);
          break;
    }
    
    if (!onlyAttackedTiles) {
        filteredMoves = checkFilter(movesArray, board, index);
        return filteredMoves;
    } else {
        return movesArray;
    }
}


// I added the forth parameter cause we need for the attackedSquares function.
function legalPawnMoves(board, index, PieceIsBlack, onlyAttackedTiles) {
    
    if (PieceIsBlack) {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    } else {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
        
        returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    }
    
    let legalPawnMove = new Array(64).fill(0);
    
    if (!onlyAttackedTiles) {
        // Always moves 1 square up.
        if (board[index-8] == 0) {
            legalPawnMove[index-8] = 1;
        }
        // Moves 2 squares up for the first move.
        if (board[index-8] == 0 && board[index-16] == 0 && index > 47) {
            legalPawnMove[index-16] = 1;
        }
        
        // Captures side ways for the pawn.
        if (board[index-9] < 0 && !leftBorderIndexes.includes(index)) {
            legalPawnMove[index-9] = 1;
        }
        if (board[index-7] < 0 && !rightBorderIndexes.includes(index)) {
            legalPawnMove[index-7] = 1;
        }
        
    } else {
        
        // These will always be legal because they attack the square.
        if (!leftBorderIndexes.includes(index)) {
            legalPawnMove[index-9] = 1;
        }
        if (!rightBorderIndexes.includes(index)) {
            legalPawnMove[index-7] = 1;
        }
    }
    
    if (PieceIsBlack) {
        returnOfFunction = reverseBoard(legalPawnMove, index);
        return returnOfFunction[0];
    } else {
        return legalPawnMove;
    }
}

function legalKnightMoves(board, index, PieceIsBlack, onlyAttackedTiles) {

    // For some reason the reverseBoard function fixes an issue where pieces can't move backwards.
    // So I just did it twice for the white pieces and it works. I will try fixing the core problem later. 
    if (PieceIsBlack) {
        // Reverse the board before calculating legal moves.    
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    } else {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
        
        returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    }

    // Calculate the legal moves for the knight.
    let legalMoves = new Array(64).fill(0);

    // Calculate the rank and file of the knight.
    let rankOfIndex = Math.floor(index / 8);
    let fileOfIndex = index % 8;

    // Checks for legal moves from the 8 possible tiles.
    if (rankOfIndex > 1 && fileOfIndex > 0) { legalMoves[index - 17] = 1; }
    if (rankOfIndex > 1 && fileOfIndex < 7) { legalMoves[index - 15] = 1; }
    if (rankOfIndex > 0 && fileOfIndex > 1) { legalMoves[index - 10] = 1; }
    if (rankOfIndex > 0 && fileOfIndex < 6) { legalMoves[index - 6] = 1; }
    if (rankOfIndex < 7 && fileOfIndex > 1) { legalMoves[index + 6] = 1; }
    if (rankOfIndex < 7 && fileOfIndex < 6) { legalMoves[index + 10] = 1; }
    if (rankOfIndex < 6 && fileOfIndex > 0) { legalMoves[index + 15] = 1; }
    if (rankOfIndex < 6 && fileOfIndex < 7) { legalMoves[index + 17] = 1; }
    
    // Filters out move that attack its own pieces.
    // But they won't be filtered if the king is trying to attack it.
    for (i = 0; i < 64; i++) {
        if (board[i] > 0 && !onlyAttackedTiles) {
            legalMoves[i] = 0;
        }
    }
    
    if (PieceIsBlack) {
        returnOfFunction = reverseBoard(legalMoves, index);
        return returnOfFunction[0];
    } else { return legalMoves; }
}

function legalBishopMoves(board, index, PieceIsBlack, onlyAttackedTiles) {
    
    if (PieceIsBlack) {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    } else {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
        
        returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    }
    
    let legalMoves = new Array(64).fill(0);
    
    let i;
    let diagonalIndex;
    
    let rankOfIndex;
    let fileOfIndex;
   
    // We loop four times for each direction. 
    for (directions = 0; directions < 4; directions++) {
        
        // This prevents the code from looping in a direction if the pieces is on the edge of the board.
        if (upBorderIndexes.includes(index) && (directions == 0 || directions == 1)) { continue; }
        if (downBorderIndexes.includes(index) && (directions == 2 || directions == 3)) { continue; }
        if (rightBorderIndexes.includes(index) && (directions == 1 || directions == 3)) { continue; }
        if (leftBorderIndexes.includes(index) && (directions == 0 || directions == 2)) { continue; }
        
        i = 1;
        
        while (true) {
            
            // Decides which direction we are going now.
            switch(directions) {
                case 0:
                    diagonalIndex = index - 8*i - i; // North West.
                    break;
                case 1:
                    diagonalIndex = index - 8*i + i; // North East.
                    break;
                case 2:
                    diagonalIndex = index + 8*i - i; // South West.
                    break;
                case 3:
                    diagonalIndex = index + 8*i + i; // South East.
                    break;
            }
            
            // Stop if we found a friendly piece.
            if (board[diagonalIndex] > 0) { 
                if (onlyAttackedTiles) {
                    legalMoves[diagonalIndex] = 1;
                }
                break;
            }                                
            
            legalMoves[diagonalIndex] = 1;
            
            // Stop after we target an enemy piece or hit the border.
            if (borderIndexes.includes(diagonalIndex)) { break; }
            if (board[diagonalIndex] == -6 && onlyAttackedTiles) {
                i++;
                continue;
            }
            if (board[diagonalIndex] < 0) { break; }
            
            i++;
        }
    }
            
    if (PieceIsBlack) {
        returnOfFunction = reverseBoard(legalMoves, index);
        return returnOfFunction[0];
    } else { return legalMoves; }
}

function legalRookMoves(board, index, PieceIsBlack, onlyAttackedTiles) {

    if (PieceIsBlack) {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
   } else {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
        
        returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    }
    
    let legalMoves = new Array(64).fill(0);
    
    // Calculates the distance to the edge of the board.
    let distanceUp = Math.floor(index / 8);
    let distanceLeft = index % 8;
    let distanceDown = 7 - Math.floor(index / 8);
    let distanceRight = 7 - index % 8;
    
    // Each loop decides legal moves for every direction.
    for (i = 1; i <= distanceUp; i++) {
        if (board[index - 8*i] > 0) { 
            if (onlyAttackedTiles) { legalMoves[index - 8*i] = 1; }
            break; 
        }
        if (board[index - 8*i] < 0) {
            legalMoves[index - 8*i] = 1;
            if (onlyAttackedTiles && board[index - 8*i] == -6) {
                continue;
            } else { break; }
        }
        legalMoves[index - 8*i] = 1;
    }
    
    for (i = 1; i <= distanceDown; i++) {
        if (board[index + 8*i] > 0) { 
            if (onlyAttackedTiles) { legalMoves[index + 8*i] = 1; }
            break;
        }
        if (board[index + 8*i] < 0) {
            legalMoves[index + 8*i] = 1;
            if (onlyAttackedTiles && board[index + 8*i] == -6) {
                continue;
            } else { break; }                    
        }
        legalMoves[index + 8*i] = 1;
    }
    
    for (i = 1; i <= distanceLeft; i++) {
        if (board[index - 1*i] > 0) {
            if (onlyAttackedTiles) { legalMoves[index - 1*i] = 1; }
            break;
        }
        if (board[index - 1*i] < 0) {
            legalMoves[index - 1*i] = 1;
            if (onlyAttackedTiles && board[index - 1*i] == -6) {
                continue;
            } else { break; }                    
        }
        legalMoves[index - 1*i] = 1;
    }
    
    for (i = 1; i <= distanceRight; i++) {
        if (board[index + 1*i] > 0) {
            if (onlyAttackedTiles) { legalMoves[index + 1*i] = 1; }
            break;
        }
        if (board[index + 1*i] < 0) {
            legalMoves[index + 1*i] = 1;
            if (onlyAttackedTiles && board[index + 1*i] == -6) {
                continue;
            } else { break; }                    
        }
        legalMoves[index + 1*i] = 1;
    }
    
    if (PieceIsBlack) {
        returnOfFunction = reverseBoard(legalMoves, index);
        return returnOfFunction[0];
    } else { return legalMoves; }        
}    

// Combines the moves of the rook and bishop.
function legalQueenMoves(board, index, PieceIsBlack, onlyAttackedTiles) {
    
    if (PieceIsBlack) {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    } else {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
        
        returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    }
    
    let legalMoves = new Array(64).fill(0);
    
    let legalRMoves = legalRookMoves(board, index, false, onlyAttackedTiles);
    let legalBMoves = legalBishopMoves(board, index, false, onlyAttackedTiles);
    
    for (i = 0; i < 64; i++) {
        if(legalRMoves[i] == 1 || legalBMoves[i] == 1) {
            legalMoves[i] = 1;
        }
    }
    
    if (PieceIsBlack) {
        returnOfFunction = reverseBoard(legalMoves, index);
        return returnOfFunction[0];
    } else { return legalMoves; }
}

function legalKingMoves(board, index, PieceIsBlack, onlyAttackedTiles) {

    // Check if the piece is black.
    if (PieceIsBlack) {
        // Reverse the board before calculating legal moves.    
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    } else {
        let returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
        
        returnOfFunction = reverseBoard(board, index);
        board = returnOfFunction[0];
        index = returnOfFunction[1];
    }
    
    let legalMoves = new Array(64).fill(0);
    let colorIndex;
    
    // This decides which color we are checking the castling rights for.
    if (PieceIsBlack) { colorIndex = 1 }
    else { colorIndex = 0 }
    
    // This are used to check if we can castle on a side.
    let rightSideSpace = board[61] == 0 && board[62] == 0;
    let leftSideSpace = board[57] == 0 && board[58] == 0 && board[59] == 0;
    
    // Here it first assign's all 8 moves as legal.
    if (board[index - 8] <= 0) { legalMoves[index - 8] = 1; }
    if (board[index - 9] <= 0) { legalMoves[index - 9] = 1; }
    if (board[index - 7] <= 0) { legalMoves[index - 7] = 1; }
    if (board[index + 8] <= 0) { legalMoves[index + 8] = 1; }
    if (board[index + 9] <= 0) { legalMoves[index + 9] = 1; }
    if (board[index + 7] <= 0) { legalMoves[index + 7] = 1; }
    if (board[index + 1] <= 0) { legalMoves[index + 1] = 1; }
    if (board[index - 1] <= 0) { legalMoves[index - 1] = 1; }
    
    // If we still have the rights, Castling will be legal.
    if (rightSideSpace && castleRight[colorIndex]) { legalMoves[62] = 1; }
    if (leftSideSpace && castleLeft[colorIndex]) { legalMoves[58] = 1; }
    
    // Here it filters out moves that go over the border.
    if(upBorderIndexes.includes(index)) {
        legalMoves[index - 9] = 0;
        legalMoves[index - 8] = 0;
        legalMoves[index - 7] = 0;
    }
    if(downBorderIndexes.includes(index)) {
        legalMoves[index + 9] = 0;
        legalMoves[index + 8] = 0;
        legalMoves[index + 7] = 0;
    }
    if(rightBorderIndexes.includes(index)) {
        legalMoves[index - 7] = 0;
        legalMoves[index + 1] = 0;
        legalMoves[index + 9] = 0;
    }
    if(leftBorderIndexes.includes(index)) {
        legalMoves[index - 9] = 0;
        legalMoves[index - 1] = 0;
        legalMoves[index + 7] = 0;
    }
    
    if (!onlyAttackedTiles) {
        
        // This will be used to filter out attacked squares.
        let attackedTiles = attackedSquares(board, false, "board");
        
        for (let i = 0; i < 64; i++) {
            if (attackedTiles[i] == 1) { legalMoves[i] = 0; }
        }
    }
    
    if (PieceIsBlack) {
        returnOfFunction = reverseBoard(legalMoves, index);
        return returnOfFunction[0];
    } else { return legalMoves; }
}


function attackedSquares(board, color, status) {
    
    let allAttackedSquares = new Array(64).fill(0);
    let allIndexes = new Array(64);
    let currentMoves;
    // This is needed to add values to the allIndexes array.
    let k = 0;
    
    for (let i = 0; i < 64; i++) {
        
        if (color == false && board[i] < 0) { 
            
            currentMoves = legalMovesOfPieces(board, i, true);
            
            for (let j = 0; j < 64; j++) {
                if (currentMoves[j] == -1) {
                    allAttackedSquares[j] = 1;
                    allIndexes[k] = j;
                    k++;
                }
            }
        }
        if (color == true && board[i] > 0) { 
            
            currentMoves = legalMovesOfPieces(board, i, true);
            
            for (let j = 0; j < 64; j++) {
                if (currentMoves[j] == 1) {
                    allAttackedSquares[j] = 1;
                    allIndexes[k] = j;
                    k++;
                }
            }
        }
    }
    
    if (status == "Indexes") {
        return allIndexes;
    } else { return allAttackedSquares; }
}

function checkFilter(unfilteredMoves, board, index) {
    
    let filteredMoves = [...unfilteredMoves];
    
    let kingsIndex;
    let kingsValue = board[index] > 0 ? 6: -6;
    
    for (let move = 0; move < 64; move++) {
        
        if(Math.abs(unfilteredMoves[move]) == 1) {
            
            let updatedBoard = [...board];
            updatedBoard[index] = 0;
            updatedBoard[move] = board[index];
            
            attackedIndexes = attackedSquares(updatedBoard, !(board[index] > 0), "Indexes");
            
            for (let m = 0; m < 64; m++) {
                if (updatedBoard[m] == kingsValue) { kingsIndex = m; break; }
            }
            
            if (attackedIndexes.includes(kingsIndex)) {
                filteredMoves[move] = 0;
            }
        }
    }
    
    return filteredMoves;
}

function checkForChecks(board, turn) {
             
    inCheck = false;
     
    // All these below are needed to detect a check.
    let kingsIndex;
    let rightBoard;
    
    let finalIndex;
    
    if (turn == true) {
        rightBoard = board;
         
        for (let i = 0; i < 64; i++) {
             if (board[i] == 6) { kingsIndex = i; finalIndex = i; break;}
        }
        
    } else if (turn == false) {
        
        for (let i = 0; i < 64; i++) {
             if (board[i] == -6) { kingsIndex = i; finalIndex = i; break;}
        }
        
        let reversedBoard = reverseBoard(board, kingsIndex);
        rightBoard = reversedBoard[0];
        kingsIndex = reversedBoard[1];
    }
     
    let attackedIndexes = attackedSquares(rightBoard, false, "Indexes");
     
    if (attackedIndexes.includes(kingsIndex)) {
        return [true, finalIndex];
    } else {
        return [false, null];
    }
}

function checkCastleRights(board) {
    
    if (board[60] == 0) {
        castleRight[0] = false;
        castleLeft[0] = false;
    }
    if (board[4] == 0) {
        castleRight[1] = false;
        castleLeft[1] = false;
    }
    
    if (board[0] == 0) { castleLeft[1] = false; }
    if (board[7] == 0) { castleRight[1] = false; }
    if (board[56] == 0) { castleLeft[0] = false; }
    if (board[63] == 0) { castleRight[0] = false; }
}
 
// We need this to reverse the board for black pieces as to give them the same logic as white pieces and reverse the board again.
// It also inverses the pieces so white pieces become black and vise versa.
function reverseBoard(board, index) {

    let newBoard = new Array(64);

    let rankOfIndex = Math.floor(index / 8);
    let fileOfIndex = index % 8;

    let newIndex = 8 * (7 - rankOfIndex) + fileOfIndex;

    for (rank = 0; rank < 8; rank++) {
        for (file = 0; file < 8; file++) {
            newBoard[8 * rank + file] = -board[8 * (7 - rank) + file];
        }
    }

    return [newBoard, newIndex];
}