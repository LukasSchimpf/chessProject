import { from } from "solid-js";
import { createBoard, getPiece, initBoard, movePiece, setPiece } from "./Board";

export function createGame(){
    return {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteInCheck: false,
        blackInCheck: false
    };
}

export function makeMove(game, fromFile, fromRank, toFile, toRank){
    if(!isLegalMove(fromFile, fromRank, toFile, toRank)){
        return [false, game];
    }

    let newGame = structuredClone(game);
    newGame.board = movePiece(game.board, fromFile, fromRank, toFile, toRank);
    newGame.whitesTurn = !game.whitesTurn;

    return [true, newGame];
}

function isLegalMove(game, fromFile, fromRank, toFile, toRank){
    return true;
}