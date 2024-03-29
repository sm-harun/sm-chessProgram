    function chessPiecesEventListner(chessPiece, board) {
        
        // This removes all the move squares first if there are any. 
        const movesClass = document.getElementsByClassName('moves-class'); 
        const movesArray = Array.from(movesClass); 
        movesArray.forEach(element => element.remove()); 
            
        let chessTile;
        
        // This will return an array with all the legal moves set to one.      
        let legalMoves = legalMovesOfPieces(board, chessPiece.parentNode.id, false);
        let clickedPiece = board[chessPiece.parentNode.id]; 
        
        let isAPawn = Math.abs(board[chessPiece.parentNode.id]) == 1;
        let pieceIsBlack = board[chessPiece.parentNode.id] < 0;
        let onStartSquare = pieceIsBlack ? chessPiece.parentNode.id < 16: chessPiece.parentNode.id > 47;
        
        let isAKing = Math.abs(board[chessPiece.parentNode.id]) == 6;
        
        unPassantBoard = new Array(64).fill(false);
        
        for(i=0; i<64; i++) { 
            
            // Filters out moves with the wrong turn.
            if (turn == true && pieceIsBlack == true) { continue; }
            if (turn == false && pieceIsBlack == false) { continue; }
                
            // Filters out illegal moves. 
            if (legalMoves[i] == 0) { continue; } 
                
            // We create moves if they are legal. 
            const moves = document.createElement('div'); 
            moves.classList.add('moves-class'); 
            moves.id = -i; 
            
            // We recall the chess tiles to append a child on them. 
            chessTile = document.getElementById(i.toString());     
            chessTile.appendChild(moves);
                           
            moves.addEventListener('click', function () { 
                
                if (isAKing) {
                    if(pieceIsBlack && -moves.id == 2) { castle(0); }
                    if(pieceIsBlack && -moves.id == 6) { castle(7); }
                    if(!pieceIsBlack && -moves.id == 58) { castle(56); }
                    if(!pieceIsBlack && -moves.id == 62) { castle(63); }
                }
                
                if(isAPawn && onStartSquare) {
                    if (-moves.id > 23 && -moves.id < 32 && pieceIsBlack) {
                        //unPassantBoard[-moves.id] = true;
                    }
                    if (-moves.id > 31 && -moves.id < 40 && !pieceIsBlack) {
                        //unPassantBoard[-moves.id] = true;
                    }
                }
                
                // Here if it is a promoting pawn it will excute a function or else it uses the normal move function.
                if (isAPawn && (pieceIsBlack && -moves.id > 55)) {
                    promotion(chessPiece, "black", moves, board);
                } else if (isAPawn && (!pieceIsBlack && -moves.id < 8)) {
                    promotion(chessPiece, "white", moves, board);
                } else {
                    movesEventListner(chessPiece, board, moves, clickedPiece);
                }
            });  
        }
    }
    