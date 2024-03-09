let startPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let testPosition = '2rR2rR/8/8/8/8/8/8/k3K3 w KQkq - 0 1';
let turn = true;

let board = new Array(64).fill(0);

// We use these varibles instead of rewriting all the paths.
let whitePawn = 'Pawn_white.png';
let whiteKnight = 'Knight_white.png';
let whiteBishop = 'Bishop_white.png';
let whiteRook = 'Rook_white.png';
let whiteQueen = 'Queen_white.png';
let whiteKing = 'King_white.png'

let blackPawn = 'Pawn_black.png';
let blackKnight = 'Knight_black.png';
let blackBishop = 'Bishop_black.png';
let blackRook = 'Rook_black.png';
let blackQueen = 'Queen_black.png';
let blackKing = 'King_black.png';

document.addEventListener("DOMContentLoaded", function() {
  
    createChessBoard();
    deployPieces(startPosition);
    
});
    
    function showAttackedTiles(board) {
        
        let attackedTiles = attackedSquares(board, false, "board");
        
        for (let i = 0; i < 64; i++) {
            
            if(attackedTiles[i] == 1) {
                
                const moves = document.createElement('div'); 
                moves.classList.add('moves-class'); 
                moves.id = -i; 
            
                // We recall the chess tiles to append a child on them. 
                chessTile = document.getElementById(i.toString());     
                chessTile.appendChild(moves);
            }
        }
    }

    function changeTheme() {

        let promotionChoice = document.getElementById("promotionChoice");
        promotionChoice.style.visibility = "visible";
        
        let fuzzyBrown = document.createElement("button");
    	fuzzyBrown.classList.add('choiceButtons');
        promotionChoice.appendChild(fuzzyBrown);
        fuzzyBrown.textContent = "Fuzzy Brown";
        fuzzyBrown.style.backgroundColor = "#774914";
        
        let darkRed = document.createElement("button");
    	darkRed.classList.add('choiceButtons');
        promotionChoice.appendChild(darkRed);
        darkRed.textContent = "Dark Red";
        darkRed.style.backgroundColor = "#660000";
        
        let background = document.getElementById("background");
        let firstClassTiles = document.getElementsByClassName("firstClassTiles");
        let secondClassTiles = document.getElementsByClassName("secondClassTiles");

        darkRed.addEventListener('click', function () {
            
            for (let i = 0; i < 32; i++) {
                firstClassTiles[i].style.backgroundColor = "#660000";
                secondClassTiles[i].style.backgroundColor = "red";
            }
            background.style.backgroundColor = "black";
            
            darkRed.remove();
            fuzzyBrown.remove();
            promotionChoice.style.visibility = "hidden";
        });
        
        fuzzyBrown.addEventListener('click', function () {
            
            for (let i = 0; i < 32; i++) {
                firstClassTiles[i].style.backgroundColor = "#c18720";
                secondClassTiles[i].style.backgroundColor = "#e2d997";
            }
            background.style.backgroundColor = "#774914";

            darkRed.remove();
            fuzzyBrown.remove();
            promotionChoice.style.visibility = "hidden";
        });
    }

    function rearrangeBoard(position) {
            
        let tile;
        
        for (i = 0; i < 64; i++) {
            // Here it removes pieces from every tile.
            tile = document.getElementById(i.toString());
            if (tile.hasChildNodes()) {
                tile.removeChild(tile.firstChild);
            }
        }
        
        deployPieces(position);
    }
    
    function createChessBoard() {
        
        const gameBackground = document.getElementById("background");
        gameBackground.style.backgroundColor = "#774914";

        // Get the chess board container 
        const chessBoard = document.getElementById('chessBoard'); 

        // Used for coloring
        let k = 0;
        // Assignes index for every tile
        let index = 0;
        
        
        // Loop to create 8 rows 
        for (let i = 0; i < 8; i++) { 
        
            // Loop to create 8 columns 
            for (let j = 0; j < 8; j++) { 
                
                // Creates a new chess tile 
                const chessTile = document.createElement('div');
                chessTile.id = index;
                //chessTile.textContent = index;
                index++;
                
                if (k % 2 == 1) {
                    chessTile.classList.add("firstClassTiles");
                } else {
                    chessTile.classList.add("secondClassTiles");
                }
                
                // Append the tile to the chess board 
                chessBoard.appendChild(chessTile);
                k++; 
            } 
            k++;
        }
    }
    
    function fenStringConverter(fen) {
      
      // This array will hold the positions of the pieces with a piece representing a number.
      board = new Array(64).fill(0);  
      let sections = fen.split(" ");
      let rank = sections[0].split("/");
      
      // This variable is used to move throught the board array and place pieces where we want.
      let position = 0;
      
      for(i=0; i<8; i++) {
          for(j=0; j<rank[i].length; j++) {
          
              if(!isNaN(rank[i].charAt(j))) {
                  position = position + +rank[i].charAt(j)
              } else {
              
                  switch(rank[i].charAt(j).toLowerCase()) {
                      case "p":
                          board[position] = 1;
                          position++;
                          break;
                      case "n":
                          board[position] = 2;
                          position++;
                          break;
                      case "b":
                          board[position] = 3;
                          position++;
                          break;
                      case "r":
                          board[position] = 4;
                          position++;
                          break;
                      case "q":
                          board[position] = 5;
                          position++;
                          break;
                      case "k":
                          board[position] = 6;
                          position++;
                          break;
                  }
                  
                  // This turns the numbers representing the black pieces into negetive numbers. 
                  if(rank[i].charAt(j) == rank[i].charAt(j).toLowerCase()) {
                      board[position-1] = -board[position-1]
                  }
              }
          }
      }
      return board;
    }
    
    function deployPieces(fenPosition) {
    
        let board = fenStringConverter(fenPosition);
        
        for(j=0; j<64; j++) {
            
            // Continues if there are no pieces on the tile.
            if(board[j] == 0) { continue; }
            
            const chessPiece = document.createElement('img'); 
            chessPiece.classList.add('chess-piece');
            
            switch(board[j]) {
                case 1:
                    chessPiece.src = whitePawn;
                    break;
                case 2:
                    chessPiece.src = whiteKnight;
                    break;        
                case 3:
                    chessPiece.src = whiteBishop;
                    break;        
                case 4:
                    chessPiece.src = whiteRook;
                    break;        
                case 5:
                    chessPiece.src = whiteQueen;
                    break;        
                case 6:
                    chessPiece.src = whiteKing;
                    break;        
                case -1:
                    chessPiece.src = blackPawn;
                    break;        
                case -2:
                    chessPiece.src = blackKnight;
                    break;        
                case -3:
                    chessPiece.src = blackBishop;
                    break;        
                case -4:
                    chessPiece.src = blackRook;
                    break;        
                case -5:
                    chessPiece.src = blackQueen;
                    break;        
                case -6:
                    chessPiece.src = blackKing;
                    break;        
            }
            
            const chessTile = document.getElementById(j.toString());
            chessTile.appendChild(chessPiece);
            
            chessPiece.addEventListener('click', function () { 
                chessPiecesEventListner(chessPiece, board);
            });
        }
    }

    function chessPiecesEventListner(chessPiece, board) {
        
        // This removes all the move squares first if there are any. 
        const movesClass = document.getElementsByClassName('moves-class'); 
        const movesArray = Array.from(movesClass); 
        movesArray.forEach(element => element.remove()); 
            
        let chessTile;
        
        // This will return an array with all the legal moves set to one.      
        let legalMoves = legalMovesOfPieces(board, chessPiece.parentNode.id, false);
        let clickedPiece = board[chessPiece.parentNode.id]; 
        
        let isItAPawn = board[chessPiece.parentNode.id] == 1 || board[chessPiece.parentNode.id] == -1;
        let pieceIsBlack = board[chessPiece.parentNode.id] < 0;
                
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
                
                // Here if it is a promoting pawn it will excute a function or else it uses the normal move function.
                if (isItAPawn && (pieceIsBlack && -moves.id > 55)) {
                    promotion(chessPiece, "black", moves, board);
                } else if (isItAPawn && (pieceIsBlack == false && -moves.id < 8)) {
                    promotion(chessPiece, "white", moves, board);
                } else {
                    movesEventListner(chessPiece, board, moves, clickedPiece);
                }
            });  
        }
    }
    
    
    function movesEventListner(chessPiece, board, moves, clickedPiece) {
    
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
               
         // Switches the turns for a different colour.
         if (turn == true) { turn = false } 
         else if (turn == false) { turn = true }
         
         toggleCheckState(false);
         
         // All these below are needed to detect a check.
         let kingsIndex;
         let rightBoard;
         
         if (turn == true) {
            rightBoard = board;
             
            for (let i = 0; i < 64; i++) {
                 if (board[i] == 6) { kingsIndex = i; break;}
             }
         } else if (turn == false) {
            
            for (let i = 0; i < 64; i++) {
                 if (board[i] == -6) { kingsIndex = i; break;}
            }
            
            let reversedBoard = reverseBoard(board, kingsIndex);
            rightBoard = reversedBoard[0];
            kingsIndex = reversedBoard[1]
         }
         
         let attackedIndexes = attackedSquares(rightBoard, false, "Indexes");
         
         if (attackedIndexes.includes(kingsIndex)) {
            toggleCheckState(true);
         }
    }
    
    function promotion(chessPiece, pieceColor, moves, board) {
        
         let promotionChoice = document.getElementById("promotionChoice");
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
    		    movesEventListner(chessPiece, board, moves, clickedPiece);
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
    		    movesEventListner(chessPiece, board, moves, clickedPiece);
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
    		    movesEventListner(chessPiece, board, moves, clickedPiece);
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
    		    movesEventListner(chessPiece, board, moves, clickedPiece);
    		    removePromotionPopup();
    		});
    }
    
    function removePromotionPopup() {
    
        let promotionChoice = document.getElementById("promotionChoice");
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
