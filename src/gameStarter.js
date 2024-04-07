let startPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
let testPosition = '2rR2rR/8/8/8/8/8/8/k3K3 w KQkq - 0 1';
let turn = true;

let board = new Array(64).fill(0);

// We use these varibles instead of rewriting all the paths.
let whitePawn = 'pieces/Pawn_white.png';
let whiteKnight = 'pieces/Knight_white.png';
let whiteBishop = 'pieces/Bishop_white.png';
let whiteRook = 'pieces/Rook_white.png';
let whiteQueen = 'pieces/Queen_white.png';
let whiteKing = 'pieces/King_white.png'

let blackPawn = 'pieces/Pawn_black.png';
let blackKnight = 'pieces/Knight_black.png';
let blackBishop = 'pieces/Bishop_black.png';
let blackRook = 'pieces/Rook_black.png';
let blackQueen = 'pieces/Queen_black.png';
let blackKing = 'pieces/King_black.png';

let playingColor = true;
let onePlayer = false;

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
    
    function deployPieces(fenPosition) {
        
        for (let i = 0; i < 64; i++) {
            
            // Here it removes pieces from every tile.
            let tile = document.getElementById(i.toString());
            if (tile.hasChildNodes()) {
                tile.removeChild(tile.firstChild);
            }
        }
    
        let board = fenStringConverter(fenPosition);
        
        for(let j=0; j<64; j++) {
            
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
                generateMoves(chessPiece, board);
            });
        }
    }
    
    function startGame() {
        createChessBoard();
        deployPieces(startPosition);
    }
    
    function exitConfirmation() {
        let result = confirm("Do you want to exit this game?");
        if (result == true) { window.open("index.html"); }
    }
    
    function confirmNewGame() {
        let result = confirm("Do you want to start new game? It will reset this one.");
        if (result == true) {
            deployPieces(startPosition);
            turn = true;
        }
    }
    
    function showPopup(id) {
        let popup = document.getElementById(id);
        popup.style.visibility = "visible";
        return popup;
    }
    
    function changeTheme() {

        let promotionChoice = showPopup("promotion-choice");
        
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
    
    function showAttackedTiles(board) {
        
        let attackedTiles = attackedSquares(board, true, "board");
        
        for (let i = 0; i < 64; i++) {
            
            if(attackedTiles[i] == 1) {
                
                const moves = document.createElement('div'); 
                moves.classList.add('moves-class'); 
            
                // We recall the chess tiles to append a child on them. 
                chessTile = document.getElementById(i.toString());     
                chessTile.appendChild(moves);
            }
        }
    }