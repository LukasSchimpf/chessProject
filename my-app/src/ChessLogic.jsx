const files = ['a','b','c','d','e','f','g','h'];

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

// Populate board with pieces in starting layout
export function initBoard(board){
  let newBoard = structuredClone(board);

  // White Back Rank
  newBoard[0] = initPiece(true, "R");
  newBoard[1] = initPiece(true, "N");
  newBoard[2] = initPiece(true, "B");
  newBoard[3] = initPiece(true, "Q");
  newBoard[4] = initPiece(true, "K");
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
  newBoard[59] = initPiece(false, "Q");
  newBoard[60] = initPiece(false, "K");
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
  const fileNum = files.indexOf(file);

  return (rank-1)*8 + fileNum;
}

// Returns the piece at the given field of the chess board
export function getPiece(board, file, rank){
  return board[cellIndex(file,rank)];
}

export function setPiece(board, file, rank, piece){
  let newBoard = structuredClone(board);

  newBoard[cellIndex(file, rank)] = piece;
  return newBoard;
}

export function movePiece(board, fromFile, fromRank, toFile, toRank){
  let newBoard = structuredClone(board);

  const fromIndex = cellIndex(fromFile, fromRank);
  const toIndex = cellIndex(toFile, toRank);

  const piece = newBoard[fromIndex];
  newBoard[toIndex] = piece;
  newBoard[fromIndex] = {};

  return newBoard;
}

// Performs the desired move if legal
export function makeMove(board, fromFile, fromRank, toFile, toRank){

  // TODO: CHECK IF MOVE IS LEGAL

  return movePiece(board, fromFile, fromRank, toFile, toRank)
}
