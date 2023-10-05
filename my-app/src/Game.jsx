import { createBoard, getPiece, initBoard, isInCheck, movePiece, hasPiece} from "./Board";

export function createGame(){
    return {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteHasCastled: false,
        blackHasCastled: false
    };
}

export function makeMove(game, pos1, pos2){
    const [fromFile, fromRank] = pos1;
    const [toFile, toRank] = pos2;

    if(!isLegalMove(game, pos1, pos2)){
        return [false, {}];
    }

    let newGame = structuredClone(game);
    newGame.board = movePiece(game.board, pos1, pos2);
    newGame.whitesTurn = !game.whitesTurn;

    return [true, newGame];
}

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