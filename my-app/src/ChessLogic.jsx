
// create piece data structure
function initPiece(isWhite = true, type = ""){
  return {isWhite, type}
}

// create board data structure
export function createBoard(){
  let board = [];
  for(let i=0; i<64;i++){
    board[i] = {};
  }
  return board;
}

function copyBoard(board){
    let newBoard = createBoard();

    (board).forEach(cell => {
        newBoard.push(cell);
    });

    return newBoard;
}

// Populate board with pieces in starting layout
export function initBoard(board){

  // White Back Rank
  board[0] = initPiece(true, "R");
  board[1] = initPiece(true, "N");
  board[2] = initPiece(true, "B");
  board[3] = initPiece(true, "K");
  board[4] = initPiece(true, "Q");
  board[5] = initPiece(true, "B");
  board[6] = initPiece(true, "N");
  board[7] = initPiece(true, "R");

  // White Pawns
  for(let i=8; i<16; i++){
    board[i] = initPiece(true, "P");
  }

  // Black Back Rank
  board[56] = initPiece(false, "R");
  board[57] = initPiece(false, "N");
  board[58] = initPiece(false, "B");
  board[59] = initPiece(false, "K");
  board[60] = initPiece(false, "Q");
  board[61] = initPiece(false, "B");
  board[62] = initPiece(false, "N");
  board[63] = initPiece(false, "R");

  // Black Pawns
  for(let i=48; i<56; i++){
    board[i] = initPiece(false, "P");
  }

  return board;
}

// Populate board with pieces in starting layout
export function initBoardNew(board){

    let newBoard = copyBoard(board);

  // White Back Rank
  newBoard[0] = initPiece(true, "R");
  newBoard[1] = initPiece(true, "N");
  newBoard[2] = initPiece(true, "B");
  newBoard[3] = initPiece(true, "K");
  newBoard[4] = initPiece(true, "Q");
  newBoard[5] = initPiece(true, "B");
  newBoard[6] = initPiece(true, "N");
  newBoard[7] = initPiece(true, "R");

  // White Pawns
  for(let i=8; i<16; i++){
    newBoard[i] = initPiece(true, "P");
  }

  // Black Back Rank
  newBoard[56] = initPiece(false, "R");
  newBoard[57] = initPiece(false, "N");
  newBoard[58] = initPiece(false, "B");
  newBoard[59] = initPiece(false, "K");
  newBoard[60] = initPiece(false, "Q");
  newBoard[61] = initPiece(false, "B");
  newBoard[62] = initPiece(false, "N");
  newBoard[63] = initPiece(false, "R");

  // Black Pawns
  for(let i=48; i<56; i++){
    newBoard[i] = initPiece(false, "P");
  }

  return newBoard;
}

// Returns the index within the board datastructure of the field with given file and rank
function cellIndex(file, rank){
  let files = ["a","b","c","d","e","f","g","h"]
  let fileNum = files.indexOf(file.toLowerCase()) 

  return (rank-1)*8 + fileNum	
}

// Returns the piece at the given field of the chess board
export function getPiece(board, file, rank){
  return board[cellIndex(file,rank)]
}

function setPiece(board, file, rank, piece){

  board[cellIndex(file, rank)] = piece
  return board
}

function movePiece(board, fromFile, fromRank, toFile, toRank){
  let piece = getPiece(board, fromFile, fromRank)
  setPiece(board, toFile, toRank, piece)
  setPiece(board, fromFile, fromRank, {})

  return board
}

// Returns whether there is a piece on the current cell
// function isEmptyCell(board, file, rank){
//   return board[cellIndex(file,rank)] == null
// }

// Returns an array of possible cells that a piece may move to
function getPossibleMoves(board, file, rank){

  let piece = getPiece(board, file, rank);

  let moves = [];

  // If there is no piece on the current cell
  if(piece == null){
    return [];
  }

  // 
  switch(piece.type){
    case "P":
      if(piece.isWhite){
        if(rank == 2){
          moves.push([file, rank+2])
        }
        moves.push([file,rank+1])
      }else{
        if(rank == 7){
          moves.push([file, rank-2])
        }
        moves.push([file, rank-1])
      }

      // TODO: IF PAWN CAN CAPTURE

      break;

    case "R":
      // Code Block
      break;

    case "N":
      // Code Block
      break;

    case "B":
      // Code Block
      break;

    case "K":
      // Code Block
      break;

    case "Q":
      // Code Block
      break;
  };

  // TODO: Remove moves that are out of bounds

  // TODO: Remove moves where the path is blocked

  // TODO: Remove moves that would result in check

  return moves;

}

// Performs the desired move if legal
export function makeMove(board, fromFile, fromRank, toFile, toRank){
  // let fromIndex = cellIndex(fromFile, fromRank)
  // let toIndex = cellIndex(toFile, toRank)

  // TODO: CHECK IF MOVE IS LEGAL

  board = movePiece(board, fromFile, fromRank, toFile, toRank)
  return board
}