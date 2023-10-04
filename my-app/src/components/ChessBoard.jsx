import Cell from "./Cell";
import { createSignal } from "solid-js";
import { makeMove,createGame } from "../Game";
import { getPiece } from "../Board";

const files = ["a","b","c","d","e","f","g","h"];
const [moveFromCell, setMoveFromCell] = createSignal([]);
const [gameState, setGameState] = createSignal(createGame());

function isCellWhite(index){
  const isRowOdd = ((Math.floor(index/8)) %2 == 1);
  const isCellOdd = (index % 2 == 1);

  if(isRowOdd){
    return isCellOdd;
  }else{
    return !isCellOdd;
  }
}

// Converts index to order in which chess board cells are to be rendered
function convertToBoardIndex(index){

  const file = index % 8;
  const rank = 7 - Math.floor(index/8)

  return rank*8 + file;
}

function cellCoordinates(index){

  const rank = Math.floor(index/8) + 1;
  const file = files[index % 8];

  return [file, rank];
}

function handleClickCell(file, rank){
  console.log("Clicked Cell "+file+rank);
  if(moveFromCell() != []){
      putDownPiece(file, rank);

  }else if(getPiece(gameState().board, file, rank) != {}){
      pickUpPiece(file, rank);
  }else{
      console.log("Empty Cell")
  }
}

function pickUpPiece(file, rank){
  console.log("Picked up piece at " + file+rank);

  setMoveFromCell([file, rank]);
}

function putDownPiece(file, rank){
  const [success, newGameState] = makeMove(gameState(), moveFromCell().file, moveFromCell.rank, file, rank);
  
  console.log("Placed Piece at " + file+rank);

  if(success){
    console.log("Successfully Moved Piece")
  }else{
    console.log("Illegal move")
  }

  setMoveFromCell([]);

  setGameState(newGameState);

  console.log(gameState())
}

export default function ChessBoard(props){
  console.log(gameState());

    return(
      <div class=" grid grid-cols-8">
      <For each={props.whitePerspective()? gameState().board : gameState().board.toReversed()}>{
        (item, index)=>{

          // Get index in order of rendering cells
          const boardIndex = convertToBoardIndex(index());
          const [file, rank] = cellCoordinates(boardIndex);

          return <Cell 
              isCellWhite={isCellWhite(boardIndex)}
              file={file}
              rank={rank}
              piece={gameState().board[boardIndex]}
              // handleClickCell={handleClickCell}
            />
        }
      }
      </For>
      </div>
    )
}