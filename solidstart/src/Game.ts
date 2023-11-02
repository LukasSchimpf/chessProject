import { createBoard, getPiece, initBoard, movePiece, hasPiece, isOutOfBounds} from "./Board";

export type pos_t = number[];
export type piece_t = {
  isWhite: boolean,
  type: string,
  hasMoved: boolean
};
export function createGame():any{
    let newGame = {
        board: initBoard(createBoard()),
        whitesTurn: true,
        whiteHasCastled: false,
        blackHasCastled: false
    };

    return newGame;
}

export function makeMove(game: any, pos1: pos_t, pos2: pos_t):[boolean, any]{

    // If move is in possible moves
    if(!possibleMoves(game, pos1).some((move:pos_t) =>(move[0] == pos2[0] && move[1] == pos2[1]))){
        return [false, game];
    }

    let newGame: any = {...game};
    newGame.board = movePiece(game.board, pos1, pos2);
    newGame.whitesTurn = !game.whitesTurn;

    return [true, newGame];
}

function isInCheck(game: any, whiteNotBlack: boolean): boolean{
  let kingPos = [];

  for(let i=0; i<8; i++){
    for(let j=0; j<8; i++){
        const pos = [i,j];
        if(hasPiece(game.board, pos) 
        && (getPiece(game.board, pos)as piece_t).type == "K"
        && (getPiece(game.board, pos) as piece_t).isWhite == whiteNotBlack){
            kingPos = pos;
            break;
        }
    }
  }

  //Todo Implement

  return false;
}

export function possibleMoves(game: any, pos:pos_t): pos_t[]{
    let moves: pos_t[] = [];

    if(!hasPiece(game.board, pos)){
        return moves;
    }

    const piece:piece_t = getPiece(game.board, pos) as piece_t;

    switch(piece.type){
        case "P":
            // Direction in which pawn advances
            const direction = (piece as piece_t).isWhite? 1: -1;
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
            && (getPiece(game.board, frontLeft) as piece_t).isWhite != piece.isWhite){
                moves.push(frontLeft);
            }

            if(hasPiece(game.board, frontRight)
            && (getPiece(game.board, frontRight) as piece_t).isWhite != piece.isWhite){
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
    moves = moves.filter((move:any) => !isOutOfBounds(move))

    // Filter out moves that would collide with a piece of the same color
    moves = moves.filter((move: any) => !(hasPiece(game.board, move) && (getPiece(game.board, move) as piece_t).isWhite == piece.isWhite));

    // TODO REMOVE MOVES THAT WOULD LEAD TO SELF CHECK

    return moves;
}

function lineMoves(game: any, pos: pos_t, direction: number[]):pos_t[]{
    let moves:pos_t[] = [];
    let i:number = 0;

    while(true){
        i++;
        const move = [pos[0] + i*direction[0], pos[1]+ i*direction[1]];

        if(isOutOfBounds(move)){
            break;

        }else if(!hasPiece(game.board, move)){
            moves.push(move);

        }else if((getPiece(game.board, move) as piece_t).isWhite != (getPiece(game.board, pos) as piece_t).isWhite){
            moves.push(move);
            break;

        }else if((getPiece(game.board, pos) as piece_t).isWhite == (getPiece(game.board,move) as piece_t).isWhite){
            break;

        }else{
            console.log("Error");
        }
    }

    return moves;
}

export function boardHasPiece(game:any, pos:pos_t):boolean{
    return hasPiece(game.board, pos);
}

export function boardGetPiece(game:any, pos:pos_t):piece_t | {}{
    return getPiece(game.board, pos);
}