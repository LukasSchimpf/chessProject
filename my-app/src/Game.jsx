import { createBoard, getPiece, initBoard, movePiece, hasPiece} from "./Board";

export function createGame(){
    return {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteHasCastled: false,
        blackHasCastled: false
    };
}

export function makeMove(game, pos1, pos2){

    if(!isLegalMove(game, pos1, pos2)){
        return [false, {}];
    }

    let newGame = structuredClone(game);
    newGame.board = movePiece(game.board, pos1, pos2);
    newGame.whitesTurn = !game.whitesTurn;

    return [true, newGame];
}

// Checking generic legality of a move, regardless of piece
function isLegalMove(game, pos1, pos2){
    // Trying to move an empty square
    if(!hasPiece(game.board, pos1)){
        console.log("No Piece at from position")
        return false;
    }

    // Trying to move other color's piece
    if(game.whitesTurn != getPiece(game.board,pos1).isWhite){
        console.log("Not your colored piece")
        return false;
    }

    // Trying to take one's own piece
    if(getPiece(game.board,pos1).isWhite == getPiece(game.board,pos2).isWhite)
        return false;

    // const potentailBoard = movePiece(game.board, fromFile, toFile, fromRank, toRank);
    // if(isInCheck(potentailBoard, game.whitesTurn))
    //   return false;

    return true;
}

function isInCheck(game, whiteNotBlack){
  let kingPos = [];

  for(let i=0; i<8; i++){
    for(let j=0; j<8; i++){
        const pos = [i,j];
        if(hasPiece(game.board, pos) 
        && getPiece(game.board, pos).type == "K"
        && getPiece(game.board, pos).isWhite == whiteNotBlack){
            kingPos = pos;
            break;
        }
    }
  }



  return false;
}

export function possibleMoves(game, pos){
    let moves = [];

    if(!hasPiece(game.board, pos)){
        return moves;
    }

    const piece = getPiece(game.board, pos);

    switch(piece.type){
        case "P":
            // Direction in which pawn advances
            const direction = piece.isWhite? 1: -1;

            if(!hasPiece(game.board, [pos[0] + direction, pos[1]])){
                moves.push([pos[0] + direction, pos[1]]);
            }

            if(!piece.hasMoved && !hasPiece(game.board, [pos[0] + 2*direction, pos[1]])){
                moves.push([pos[0] + 2*direction, pos[1]]);
            }

            break;
    }

    // TODO: REMOVE MOVES THAT ARE OUT OF BOUNDS

    // TODO: REMOVE MOVES THAT WOULD LEAD TO OWN CHECK

    return moves;
}