import { createBoard, getPiece, initBoard, isInCheck, movePiece, setPiece } from "./Board";

export function createGame(){
    return {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteHasCastled: false,
        blackHasCastled: false
    };
}

export function makeMove(game, fromFile, fromRank, toFile, toRank){
    if(!isLegalMove(game,fromFile, fromRank, toFile, toRank)){
        return [false, {}];
    }

    let newGame = structuredClone(game);
    newGame.board = movePiece(game.board, fromFile, fromRank, toFile, toRank);
    newGame.whitesTurn = !game.whitesTurn;

    return [true, newGame];
}

function isLegalMove(game, fromFile, fromRank, toFile, toRank){
    const fromPiece = getPiece(game.board, fromFile, fromRank);
    const toPiece = getPiece(game.board, toFile, toRank);

    // Trying to move an empty square
    if(fromPiece == {})
        return false;

    // Trying to move other color's piece
    if(game.whitesTurn != fromPiece.isWhite)
        return false;

    // Trying to take one's own piece
    if(fromPiece.isWhite == toPiece.isWhite)
        return false;

    const potentailBoard = movePiece(game.board, fromFile, toFile, fromRank, toRank);
    if(isInCheck(potentailBoard, game.whitesTurn))
      return false;

    return true;
}