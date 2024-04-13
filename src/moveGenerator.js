function generateMoves(chessPiece, board) {
    
    // This removes all the move squares first if there are any. 
    const movesClass = document.getElementsByClassName('moves-class'); 
    const movesArray = Array.from(movesClass); 
    movesArray.forEach(element => element.remove()); 
    
    // This will return an array with all the legal moves set to one.      
    let legalMoves = legalMovesOfPieces(board, chessPiece.parentNode.id, false);
    
    let clickedPiece = board[chessPiece.parentNode.id]; 
    
    let chessTile;
    
    // These check various properties of the piece.
    let pieceIsBlack = board[chessPiece.parentNode.id] < 0;
    
    let isAPawn = Math.abs(board[chessPiece.parentNode.id]) == 1;
    let isAKing = Math.abs(board[chessPiece.parentNode.id]) == 6;
    
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
            
            // Castles the king and rook.
            if (isAKing) {
                if(pieceIsBlack && -moves.id == 2) { castle(0); }
                if(pieceIsBlack && -moves.id == 6) { castle(7); }
                if(!pieceIsBlack && -moves.id == 58) { castle(56); }
                if(!pieceIsBlack && -moves.id == 62) { castle(63); }
            
            // Promotes the piece. 
            } else if (isAPawn) {
                if (pieceIsBlack && -moves.id > 55) {
                    promotion(chessPiece, "black", moves, board);
                }
                if (!pieceIsBlack && -moves.id < 8) {
                    promotion(chessPiece, "white", moves, board);
                } 
            }
            
            movePiece(chessPiece, moves, clickedPiece);
        });  
    }
}

function movePiece(chessPiece, moves, clickedPiece) {

    // Update the board array of the current position. 
    board[chessPiece.parentNode.id] = 0; 
    board[-moves.id] = clickedPiece; 
    
    // Here it removes pieces from a tile first and then puts the new one. 
    const movedTile = document.getElementById(-moves.id); 
    movedTile.removeChild(movedTile.firstChild); 
    document.getElementById(-moves.id).appendChild(chessPiece); 
                                
     // This removes all the move squares. 
     const movesClass = document.getElementsByClassName('moves-class');
     const movesArray = Array.from(movesClass); 
     movesArray.forEach(element => element.remove()); 
     
     let allImages = document.querySelectorAll('img');
     let boardContainer = document.getElementsByClassName('chess-board-container')[0];
     
     // Rotates the board if it's two players playing.
     if (!onePlayer) {
         if (turn == true) {
             allImages.forEach(image => image.style.transform = "rotate(180deg)");
             boardContainer.style.transform = "rotate(180deg)";
         } else {
             allImages.forEach(image => image.style.transform = "rotate(0)");
             boardContainer.style.transform = "rotate(0)";
         }
     }
        
     // Switches the turns for a different colour.
     if (turn == true) {
         turn = false; 
     } else if (turn == false) {
         turn = true;
     }
     
     // Checks if we have the right to castle in every move.
    checkCastleRights(board);
    
    // Detects a check. 
    let checkStatus = checkForChecks(board, turn);
    
    // This removes the check indicator if it exists.
    if (document.getElementsByClassName('check-tile')[0]) {
        document.getElementsByClassName('check-tile')[0].remove();
    }
    
    // Assigns check indicator to the kings tile.
    if (checkStatus[0] == true) {
        const checkTile = document.createElement('div'); 
        checkTile.classList.add('check-tile'); 
        
        document.getElementById(checkStatus[1]).appendChild(checkTile);
    }
     
    if (onePlayer == true) {
        makeRandomMove(board, !playingColor);
    }
}

function castle(index) {
    
    let movedTile;
    
    let rookTile = document.getElementById(index);
    let movedRook = rookTile.firstChild;
    rookTile.removeChild(movedRook);
    
    board[index] = 0;   
    
    if (index == 0) { 
        movedTile = document.getElementById(3);
        movedTile.appendChild(movedRook);
        board[3] = -4;
    }
    if (index == 7) { 
        movedTile = document.getElementById(5);
        movedTile.appendChild(movedRook);
        board[5] = -4;
    }
    if (index == 56) { 
        movedTile = document.getElementById(59);
        movedTile.appendChild(movedRook);
        board[59] = 4;
    }
    if (index == 63) { 
        movedTile = document.getElementById(61);
        movedTile.appendChild(movedRook);
        board[61] = 4; 
    }
}

function promotion(chessPiece, pieceColor, moves, board) {
    
    let promotionChoice = document.getElementById("promotion-choice");
    promotionChoice.style.visibility = "visible";
     
	// Here we create the buttons to choose.
	let queenChoice = document.createElement("button");
	queenChoice.classList.add('choiceButtons');
	promotionChoice.appendChild(queenChoice);
	queenChoice.id = "queenChoice";
	
	let rookChoice = document.createElement("button");
	rookChoice.classList.add("choiceButtons");
	promotionChoice.appendChild(rookChoice);
	rookChoice.id = "rookChoice";
	
	let bishopChoice = document.createElement("button");
	bishopChoice.classList.add("choiceButtons");
	promotionChoice.appendChild(bishopChoice);
	bishopChoice.id = "bishopChoice";
	
	let knightChoice = document.createElement("button");
	knightChoice.classList.add("choiceButtons");
	promotionChoice.appendChild(knightChoice);
	knightChoice.id = "knightChoice";
	
	// Here it adds clarification for the buttons by adding images.
	let queenImage = document.createElement("img");
	let rookImage = document.createElement("img");
	let bishopImage = document.createElement("img");
	let knightImage = document.createElement("img");
	
	// Changes the colors of the piece image depending on who is promoting.
	if(pieceColor == "white") {
	    queenImage.src = whiteQueen;
	    rookImage.src = whiteRook;
	    bishopImage.src = whiteBishop;
	    knightImage.src = whiteKnight;
	} else {
	    queenImage.src = blackQueen;
	    rookImage.src = blackRook;
	    bishopImage.src = blackBishop;
	    knightImage.src = blackKnight;
	}
	
	queenImage.classList.add("chess-Pieces");
	rookImage.classList.add("chess-Pieces");
	bishopImage.classList.add("chess-Pieces");
	knightImage.classList.add("chess-Pieces");
	
	queenChoice.appendChild(queenImage);
	rookChoice.appendChild(rookImage);
	bishopChoice.appendChild(bishopImage);
	knightChoice.appendChild(knightImage);
	
	queenChoice.addEventListener('click', function () {
	    if (pieceColor == "white") {
	        chessPiece.src = whiteQueen;
	        clickedPiece = 5;
	    } else {
	        chessPiece.src = blackQueen;
	        clickedPiece = -5;
	    }
	    // Here it applys the moves listner after a piece has been chosen.
	    movePiece(chessPiece, moves, clickedPiece);
	    removePromotionPopup();
	});
	
	rookChoice.addEventListener('click', function () {
	    if (pieceColor == "white") {
	        chessPiece.src = whiteRook;
	        clickedPiece = 4;
	    } else {
	        chessPiece.src = blackRook;
	        clickedPiece = -4;
	    }
	    movePiece(chessPiece, moves, clickedPiece);
	    removePromotionPopup();
	});
	
	bishopChoice.addEventListener('click', function () {
	    if (pieceColor == "white") {
	        chessPiece.src = whiteBishop;
	        clickedPiece = 3;
	    } else {
	        chessPiece.src = blackBishop;
	        clickedPiece = -3;
	    }
	    movePiece(chessPiece, moves, clickedPiece);
	    removePromotionPopup();
	});
	
	knightChoice.addEventListener('click', function () {
        if (pieceColor == "white") {
	        chessPiece.src = whiteKnight;
	        clickedPiece = 2;
	    } else {
	        chessPiece.src = blackKnight;
	        clickedPiece = -2;
	    }
	    movePiece(chessPiece, moves, clickedPiece);
	    removePromotionPopup();
	});
}

function promotion2(chessPiece, pieceColor, moves, board) {
    
    let choicePopup = showPopup("promotion-choice");
    let choices = new Array(4);
    let choiceImg = new Array(4);
    
    for(i = 0; i < 4; i++) {
        choices[i] = document.createElement("button");
        choices[i].classList.add("choiceButtons");
		choicePopup.appendChild(choices[i]);
    }
    
    for (i = 0; i < 4; i ++) {
        choiceImg[i] = document.createElement("img");
        choiceImg[i].classList.add("chess-piece");
        
        switch (i) {
            case 0:
                choiceImg[i].src = "pieces/Knight_" + pieceColor + ".png";
                break;
            case 1:
                choiceImg[i].src = "pieces/Bishop_" + pieceColor + ".png";
                break;
            case 2:
                choiceImg[i].src = "pieces/Rook_" + pieceColor + ".png";
                break;
            case 3:
                choiceImg[i].src = "pieces/Queen_" + pieceColor + ".png";
                break;
        }
        choiceImg[i].appendChild(choices[i]);
    }
    
    choices.forEach((choice) => {
        choice.addEventListener("click", function () {
            
            let clickedPiece = choices.findIndex(choice) + 2;
            
            if (pieceColor == "black") {
                clickedPiece = -clickedPiece;
            }
            
            switch (choices.findIndex(choice)) {
                case 0:
                    chessPiece.src = "pieces/Knight_" + pieceColor + ".png";
                    break;
                case 1:
                    chessPiece.src = "pieces/Bishop_" + pieceColor + ".png";
                    break;
                case 2:
                    chessPiece.src = "pieces/Rook_" + pieceColor + ".png";
                    break;
                case 3:
                    chessPiece.src = "pieces/Queen_" + pieceColor + ".png";
                    break;
            }
            
            movePiece(chessPiece, moves, clickedPiece);
            removePromotionPopup();
        });
    });
}

function removePromotionPopup() {

    let promotionChoice = document.getElementById("promotion-choice");
    let queenChoice = document.getElementById("queenChoice");
    let rookChoice = document.getElementById("rookChoice");
    let bishopChoice = document.getElementById("bishopChoice");
    let knightChoice = document.getElementById("knightChoice");
    
    promotionChoice.style.visibility = "hidden";
	queenChoice.remove();
	rookChoice.remove();
	bishopChoice.remove();
	knightChoice.remove();
}