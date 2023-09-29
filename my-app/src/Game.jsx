import { from } from "solid-js";
import { createBoard, getPiece, initBoard, movePiece, setPiece } from "./ChessLogic";

export function createGame(){
    return {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteInCheck: false,
        blackInCheck: false
    };
}

function makeMove(game, fromFile, fromRank, toFile, toRank){
    const piece = getPiece(game.board, fromFile, fromRank);
    setPiece(game.board, fromFile, fromRank, {});
    setPiece(game.board, toFile, toRank, piece);

    return true;
}