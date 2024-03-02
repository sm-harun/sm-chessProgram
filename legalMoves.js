	 let borderIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 
                         8, 15, 16, 23, 24, 31, 32, 39, 40, 
                         47, 48, 55, 56, 57, 58, 59, 60,
                         61, 62, 63];
                     
    let upBorderIndexes = [0, 1, 2, 3, 4, 5, 6, 7];
    let downBorderIndexes = [56, 57, 58, 59, 60, 61, 62, 63];
    let rightBorderIndexes = [7, 15, 23, 31, 39, 47, 55, 63];
    let leftBorderIndexes = [0, 8, 16, 24, 32, 40, 48, 56];
        
    function legalMovesOfPieces(board, index) {
    
        switch(board[index]) {
            case 1:
                return legalPawnMoves(board, index, false);
                break;
            case 2:
                return legalKnightMoves(board, index, false);
                break;
            case 3:
                return legalBishopMoves(board, index, false);
                break;
            case 4:
                return legalRookMoves(board, index, false);
                break;
            case 5:
                return legalQueenMoves(board, index, false);
                break;
            case 6:
                return legalKingMoves(board, index, false);
                break;
            case -1:
                return legalPawnMoves(board, index, true);
                break;
            case -2:
                return legalKnightMoves(board, index, true);
                break;
            case -3:
                return legalBishopMoves(board, index, true);
                break;
            case -4:
                return legalRookMoves(board, index, true);
                break;
            case -5:
                return legalQueenMoves(board, index, true);
                break;
            case -6:
                return legalKingMoves(board, index, true);
                break;
        }
    }
    
    function legalPawnMoves(board, index, PieceIsBlack) {
        
        if (PieceIsBlack) {
            let returnOfFunction = reverseBoard(board, index);
            board = returnOfFunction[0];
            index = returnOfFunction[1];
        }
        
        let legalPawnMove = new Array(64).fill(0);
        
        // Always moves 1 square up.
        if (board[index-8] == 0) {
            legalPawnMove[index-8] = 1;
        }
        // Moves 2 squares up for the first move.
        if (board[index-8] == 0 && board[index-16] == 0 && index > 47) {
            legalPawnMove[index-16] = 1;
        }
        
        // Captures side ways for the pawn.
        if (board[index-9] < 0) {
            legalPawnMove[index-9] = 1;
        }
        if (board[index-7] < 0) {
            legalPawnMove[index-7] = 1;
        }
        
        if (PieceIsBlack) {
            returnOfFunction = reverseBoard(legalPawnMove, index);
            return returnOfFunction[0];
        } else {
            return legalPawnMove;
        }
    }
    
    function legalKnightMoves(board, index, PieceIsBlack) {

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

        // Calculate the legal moves for the knight.
        let legalMoves = new Array(64).fill(0);

        // Calculate the rank and file of the knight.
        let rankOfIndex = Math.floor(index / 8);
        let fileOfIndex = index % 8;

        // Checks for legal moves from the 8 possible tiles.
        if (rankOfIndex > 1 && fileOfIndex > 0 && board[index - 17] <= 0) {
            legalMoves[index - 17] = 1;
        }
        if (rankOfIndex > 1 && fileOfIndex < 7 && board[index - 15] <= 0) {
            legalMoves[index - 15] = 1;
        }
        if (rankOfIndex > 0 && fileOfIndex > 1 && board[index - 10] <= 0) {
            legalMoves[index - 10] = 1;
        }
        if (rankOfIndex > 0 && fileOfIndex < 6 && board[index - 6] <= 0) {
            legalMoves[index - 6] = 1;
        }
        if (rankOfIndex < 7 && fileOfIndex > 1 && board[index + 6] <= 0) {
            legalMoves[index + 6] = 1;
        }
        if (rankOfIndex < 7 && fileOfIndex < 6 && board[index + 10] <= 0) {
            legalMoves[index + 10] = 1;
        }
        if (rankOfIndex < 6 && fileOfIndex > 0 && board[index + 15] <= 0) {
            legalMoves[index + 15] = 1;
        }
        if (rankOfIndex < 6 && fileOfIndex < 7 && board[index + 17] <= 0) {
            legalMoves[index + 17] = 1;
        }


        if (PieceIsBlack) {
            returnOfFunction = reverseBoard(legalMoves, index);
            return returnOfFunction[0];
        } else { return legalMoves; }
    }
 
    function legalBishopMoves(board, index, PieceIsBlack) {
        
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
                if (board[diagonalIndex] > 0) { break; }                                
                
                legalMoves[diagonalIndex] = 1;
                
                // Stop after we target an enemy piece or hit the border.
                if (borderIndexes.includes(diagonalIndex)) { break; }
                if (board[diagonalIndex] < 0) { break; }
                                
                i++;
            }
        }
                
        if (PieceIsBlack) {
            returnOfFunction = reverseBoard(legalMoves, index);
            return returnOfFunction[0];
        } else { return legalMoves; }
    }
    
    function legalRookMoves(board, index, PieceIsBlack) {
    
        if (PieceIsBlack) {
            let returnOfFunction = reverseBoard(board, index);
            board = returnOfFunction[0];
            index = returnOfFunction[1];
       // For some reason the reverseBoard function fixes an issue where pieces can't move backwards.
       // So I just did it twice for the white pieces and it works. I will try fixing the core problem later.     
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
            if (board[index - 8*i] > 0) { break; }
            if (board[index - 8*i] < 0) {
                legalMoves[index - 8*i] = 1;
                break;                    
            }
            legalMoves[index - 8*i] = 1;
        }
        
        for (i = 1; i <= distanceDown; i++) {
            if (board[index + 8*i] > 0) { break; }
            if (board[index + 8*i] < 0) {
                legalMoves[index + 8*i] = 1;
                break;                    
            }
            legalMoves[index + 8*i] = 1;
        }
        
        for (i = 1; i <= distanceLeft; i++) {
            if (board[index - 1*i] > 0) { break; }
            if (board[index - 1*i] < 0) {
                legalMoves[index - 1*i] = 1;
                break;                    
            }
            legalMoves[index - 1*i] = 1;
        }
        
        for (i = 1; i <= distanceRight; i++) {
            if (board[index + 1*i] > 0) { break; }
            if (board[index + 1*i] < 0) {
                legalMoves[index + 1*i] = 1;
                break;                    
            }
            legalMoves[index + 1*i] = 1;
        }
        
        if (PieceIsBlack) {
            returnOfFunction = reverseBoard(legalMoves, index);
            return returnOfFunction[0];
        } else { return legalMoves; }        
    }    
    
    // Combines the moves of the rook and bishop.
    function legalQueenMoves(board, index, PieceIsBlack) {
        
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
        
        let legalRMoves = legalRookMoves(board, index, false);
        let legalBMoves = legalBishopMoves(board, index, false);
        
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
    
    function legalKingMoves(board, index, PieceIsBlack) {
    
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
        
        let attackedTiles = attackedSquares(board);
        
        // All the legal moves without counting checks and checkmates.
        if (board[index + 1] <= 0 && attackedTiles[index + 1] == 0) { legalMoves[index + 1] = 1 }
        if (board[index - 1] <= 0 && attackedTiles[index - 1] == 0) { legalMoves[index - 1] = 1 }
        if (board[index + 8] <= 0 && attackedTiles[index + 8] == 0) { legalMoves[index + 8] = 1 }
        if (board[index - 8] <= 0 && attackedTiles[index - 8] == 0) { legalMoves[index - 8] = 1 }
        if (board[index + 9] <= 0 && attackedTiles[index + 9] == 0) { legalMoves[index + 9] = 1 }
        if (board[index - 9] <= 0 && attackedTiles[index - 9] == 0) { legalMoves[index - 9] = 1 }
        if (board[index + 7] <= 0 && attackedTiles[index + 7] == 0) { legalMoves[index + 7] = 1 }
        if (board[index - 7] <= 0 && attackedTiles[index - 7] == 0) { legalMoves[index - 7] = 1 }
        
        if (PieceIsBlack) {
            returnOfFunction = reverseBoard(legalMoves, index);
            return returnOfFunction[0];
        } else { return legalMoves; }
    }
    
    
    function attackedSquares(board) {
        
        let movesOfBlack;
        let attackedTiles = new Array(64).fill(0);
        
        for(let k = 0; k <= 63; k++)  {
            
            if(board[k] < 0) {
            
                movesOfBlack = legalMovesOfPieces(board, i);
                
                for (let j = 0; j <= 63; j++) {
                    if (movesOfBlack[j] == 1) {
                        attackedTiles[j] = 1;
                    }
                }
            }
        }
        
        return attackedTiles;
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
    
