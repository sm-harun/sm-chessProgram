let startPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let testPosition = '8/2P2P2/8/8/8/8/p2p4/8 w KQkq - 0 1';
let turn = true;
var clickedPiece;

let board = new Array(64).fill(0);

document.addEventListener("DOMContentLoaded", function() {
  
    createChessBoard();
    deployPieces(testPosition);
    let test = document.getElementById('test');
    test.textContent = ("").toString();
    
});
    
    function showAttackedTiles(board) {
         
         let promotionChoice = document.getElementById("promotionChoice");
         promotionChoice.style.visibility = "visible";
        
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
                chessTile.classList.add('chess-tile');
                chessTile.id = index;
                //chessTile.textContent = index;
                index++;
                
                if (k % 2 == 1) {
                    chessTile.style.backgroundColor = "#c18720";
                } else {
                    chessTile.style.backgroundColor = "#e2d997";
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
                    chessPiece.src = 'Pawn_white.png';
                    break;
                case 2:
                    chessPiece.src = 'Knight_white.png';
                    break;        
                case 3:
                    chessPiece.src = 'Bishop_white.png';
                    break;        
                case 4:
                    chessPiece.src = 'Rock_white.png';
                    break;        
                case 5:
                    chessPiece.src = 'Queen_white.png';
                    break;        
                case 6:
                    chessPiece.src = 'King_white.png';
                    break;        
                case -1:
                    chessPiece.src = 'Pawn_black.png';
                    break;        
                case -2:
                    chessPiece.src = 'Knight_black.png';
                    break;        
                case -3:
                    chessPiece.src = 'Bishop_black.png';
                    break;        
                case -4:
                    chessPiece.src = 'Rock_black.png';
                    break;        
                case -5:
                    chessPiece.src = 'Queen_black.png';
                    break;        
                case -6:
                    chessPiece.src = 'King_black.png';
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
        let legalMoves = legalMovesOfPieces(board, chessPiece.parentNode.id); 
        clickedPiece = board[chessPiece.parentNode.id]; 
        
        let isItAPawn = board[chessPiece.parentNode.id] == 1 || board[chessPiece.parentNode.id] == -1;
        let pieceIsBlack = board[chessPiece.parentNode.id] < 0;
                
        for(i=0; i<64; i++) { 
            
            // Filters out moves with the wrong turn.
            //if (turn == true && pieceIsBlack == true) { continue; }
            //if (turn == false && pieceIsBlack == false) { continue; }
                
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
                
                // Here it promotes a pawn(Just to a queen for the moment) if it hit the last rank.
                if (isItAPawn) {
                    if (pieceIsBlack && -moves.id > 55) {
                        promotion(chessPiece, "black");
                    } else if (pieceIsBlack == false && -moves.id < 8) {
                        promotion(chessPiece, "white");
                    }
                }
                
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
                if (turn == true) { 
                    turn = false 
                } else if (turn == false) { 
                    turn = true 
                }
                    
            });  
        }
    }
    
    function promotion(chessPiece, pieceColor) {
        
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
    		if(pieceColor = "white") {
    		    queenImage.src = "Queen_white.png";
    		    rookImage.src = "Rock_white.png";
    		    bishopImage.src = "Bishop_white.png";
    		    knightImage.src = "Knight_white.png";
    		} else {
    		    queenImage.src = "Queen_black.png";
    		    rookImage.src = "Rock_black.png";
    		    bishopImage.src = "Bishop_black.png";
    		    knightImage.src = "Knight_black.png";
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
    		        chessPiece.src = "Queen_white.png";
    		        clickedPiece = 5;
    		    } else {
    		        chessPiece.src = "Queen_black.png";
    		        clickedPiece = -5;
    		    }
    		    // It removes the popUp after player has chosen.
    		    promotionChoice.style.visibility = "hidden";
    		    queenChoice.remove();
    		    rookChoice.remove();
    		    bishopChoice.remove();
    		    knightChoice.remove();
    		});
    		
    		rookChoice.addEventListener('click', function () {
    		    if (pieceColor == "white") {
    		        chessPiece.src = "Rock_white.png";
    		        clickedPiece = 4;
    		    } else {
    		        chessPiece.src = "Rock_black.png";
    		        clickedPiece = -4;
    		    }
    		    
    		    promotionChoice.style.visibility = "hidden";
    		    queenChoice.remove();
    		    rookChoice.remove();
    		    bishopChoice.remove();
    		    knightChoice.remove();
    		});
    		
    		bishopChoice.addEventListener('click', function () {
    		    if (pieceColor == "white") {
    		        chessPiece.src = "Bishop_white.png";
    		        clickedPiece = 3;
    		    } else {
    		        chessPiece.src = "Bishop_black.png";
    		        clickedPiece = -3;
    		    }
    		    
    		    promotionChoice.style.visibility = "hidden";
    		    queenChoice.remove();
    		    rookChoice.remove();
    		    bishopChoice.remove();
    		    knightChoice.remove();
    		});
    		
    		knightChoice.addEventListener('click', function () {
    		    if (pieceColor == "white") {
    		        chessPiece.src = "Knight_white.png";
    		        clickedPiece = 2;
    		    } else {
    		        chessPiece.src = "Knight_black.png";
    		        clickedPiece = -2;
    		    }
    		    
    		    promotionChoice.style.visibility = "hidden";
    		    queenChoice.remove();
    		    rookChoice.remove();
    		    bishopChoice.remove();
    		    knightChoice.remove();
    		});
    }
