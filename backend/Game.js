//import { createBoard, getPiece, initBoard, movePiece, hasPiece, isOutOfBounds} from "./Board";

export function createGame(){
    return {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteHasCastled: false,
        blackHasCastled: false
    };
}

export function makeMove(game, pos1, pos2){

    // If move is in possible moves
    if(!possibleMoves(game, pos1).some(move =>(move[0] == pos2[0] && move[1] == pos2[1]))){
        return [false, game];
    }

    let newGame = structuredClone(game);
    newGame.board = movePiece(game.board, pos1, pos2);
    newGame.whitesTurn = !game.whitesTurn;

    return [true, newGame];
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

  //Todo: Implement

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
            const advance1 = [pos[0] + direction, pos[1]];
            const advance2 = [pos[0] + 2*direction, pos[1]];
            const frontRight = [pos[0] + direction, pos[1] - 1];
            const frontLeft = [pos[0] + direction, pos[1] + 1];

            if(!hasPiece(game.board, advance1)){
                moves.push(advance1);
            }

            if(!piece.hasMoved && !hasPiece(game.board, advance2)){
                moves.push(advance2);
            }

            if(hasPiece(game.board, frontLeft)
            && getPiece(game.board, frontLeft).isWhite != piece.isWhite){
                moves.push(frontLeft);
            }

            if(hasPiece(game.board, frontRight)
            && getPiece(game.board, frontRight).isWhite != piece.isWhite){
                moves.push(frontRight);
            }

            break;
        
        case "R":
            moves = moves.concat(lineMoves(game, pos, [1,0]))
            moves = moves.concat(lineMoves(game, pos, [-1,0]))
            moves = moves.concat(lineMoves(game, pos, [0,1]))
            moves = moves.concat(lineMoves(game, pos, [0,-1]))

            break;

        case "N":
            moves.push([pos[0] + 2, pos[1] - 1]);
            moves.push([pos[0] + 2, pos[1] + 1]);
            moves.push([pos[0] + 1, pos[1] - 2]);
            moves.push([pos[0] + 1, pos[1] + 2]);
            moves.push([pos[0] - 1, pos[1] - 2]);
            moves.push([pos[0] - 1, pos[1] + 2]);
            moves.push([pos[0] - 2, pos[1] - 1]);
            moves.push([pos[0] - 2, pos[1] + 1]);

            break;

        case "B":
            moves = moves.concat(lineMoves(game, pos, [1,1]))
            moves = moves.concat(lineMoves(game, pos, [1,-1]))
            moves = moves.concat(lineMoves(game, pos, [-1,1]))
            moves = moves.concat(lineMoves(game, pos, [-1,-1]))

            break;

        case "Q":
            // Straights
            moves = moves.concat(lineMoves(game, pos, [1,0]))
            moves = moves.concat(lineMoves(game, pos, [-1,0]))
            moves = moves.concat(lineMoves(game, pos, [0,1]))
            moves = moves.concat(lineMoves(game, pos, [0,-1]))

            // Diagonals
            moves = moves.concat(lineMoves(game, pos, [1,1]))
            moves = moves.concat(lineMoves(game, pos, [1,-1]))
            moves = moves.concat(lineMoves(game, pos, [-1,1]))
            moves = moves.concat(lineMoves(game, pos, [-1,-1]))

            break;

        case "K":
            moves.push([pos[0]-1, pos[1]-1]);
            moves.push([pos[0]-1, pos[1]]);
            moves.push([pos[0]-1, pos[1]+1]);

            moves.push([pos[0], pos[1]-1]);
            moves.push([pos[0], pos[1]+1]);

            moves.push([pos[0]+1, pos[1]-1]);
            moves.push([pos[0]+1, pos[1]]);
            moves.push([pos[0]+1, pos[1]+1]);

            // TODO Implement Castling
            
            break;
    }

    // Filter out moves that are out of bounds
    moves = moves.filter(move => !isOutOfBounds(move))

    // Filter out moves that would collide with a piece of the same color
    moves = moves.filter(move => !(hasPiece(game.board, move) && getPiece(game.board, move).isWhite == piece.isWhite));

    // TODO REMOVE MOVES THAT WOULD LEAD TO SELF CHECK

    return moves;
}

function lineMoves(game, pos, direction){
    let moves = [];
    let i = 0;

    while(true){
        i++;
        const move = [pos[0] + i*direction[0], pos[1]+ i*direction[1]];

        if(isOutOfBounds(move)){
            break;

        }else if(!hasPiece(game.board, move)){
            moves.push(move);

        }else if(getPiece(game.board, move).isWhite != getPiece(game.board, pos).isWhite){
            moves.push(move);
            break;

        }else if(getPiece(game.board, pos).isWhite == getPiece(game.board,move). isWhite){
            break;

        }else{
            console.log("Error");
        }
    }

    return moves;
}

export function boardHasPiece(game, pos){
    return hasPiece(game.board, pos);
}

export function boardGetPiece(game, pos){
    return getPiece(game.board, pos);
}
