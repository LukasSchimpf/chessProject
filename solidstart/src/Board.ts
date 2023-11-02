import {pos_t,piece_t} from "./Game";

/**
 * @param isWhite true if white piece, false if black
 * @param type    string representing piece type
 * @returns       Chess piece object
 */
function initPiece(isWhite:boolean = true, type:string = ""):any{
  return {isWhite, type, hasMoved:false}
}

/**
 * @returns 2D array representing chessboard, outer index represents rank, inner represents file
 */
export function createBoard():any[][]{
  let board:any[][] = [];

  for(let i=0; i<8; i++){
    board.push([]);

    for(let j=0; j<8; j++){
      board[i].push({})
    }
  }

  return board;
}

// Returns the piece at the given field of the chess board
/**
 * @param board board to query
 * @param pos   coordinates of the position to query
 * @returns     piece if cell contains a piece, empty JsonObject otherwise
 */
export function getPiece(board:any, pos:pos_t){
  if(isOutOfBounds(pos)){
    return {};
  }

  return board[pos[0]][pos[1]];
}

// Populate board with pieces in starting layout
export function initBoard(board:any):any[][]{
  let newBoard:any[][] = {...board};

  // White Back Rank
  newBoard[0][0] = initPiece(true, "R");
  newBoard[0][1] = initPiece(true, "N");
  newBoard[0][2] = initPiece(true, "B");
  newBoard[0][3] = initPiece(true, "Q");
  newBoard[0][4] = initPiece(true, "K");
  newBoard[0][5] = initPiece(true, "B");
  newBoard[0][6] = initPiece(true, "N");
  newBoard[0][7] = initPiece(true, "R");

  // White Pawns
  for(let i=0; i<8; i++){
    newBoard[1][i] = initPiece(true, "P");
  }

  // Black Back Rank
  newBoard[7][0] = initPiece(false, "R");
  newBoard[7][1] = initPiece(false, "N");
  newBoard[7][2] = initPiece(false, "B");
  newBoard[7][3] = initPiece(false, "Q");
  newBoard[7][4] = initPiece(false, "K");
  newBoard[7][5] = initPiece(false, "B");
  newBoard[7][6] = initPiece(false, "N");
  newBoard[7][7] = initPiece(false, "R");

  // White Pawns
  for(let i=0; i<8; i++){
    newBoard[6][i] = initPiece(false, "P");
  }

  return newBoard;
}

export function hasPiece(board:any, pos:pos_t):boolean{
  if(isOutOfBounds(pos)){
    return false;
  }
  
  const piece:piece_t = board[pos[0]][pos[1]]

  if(Object.keys(piece).length == 0)
    return false;

  return true;
}

export function movePiece(board:any, pos1:number[], pos2:number[]):any{
  let newBoard = {...board};

  let piece:any = newBoard[pos1[0]][pos1[1]];
  if(!piece.hasMoved)
    piece.hasMoved = true;
  newBoard[pos2[0]][pos2[1]] = piece;
  newBoard[pos1[0]][pos1[1]] = {} as piece_t;

  return newBoard;
}

export function isOutOfBounds(pos:pos_t):boolean{
  if(pos[0] < 0 || pos[0] > 7 || pos[1] < 0 ||pos[1] > 7){
    return true;
  }
  return false;
}
