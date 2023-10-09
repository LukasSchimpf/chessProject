import Cell from "./Cell";
import { createSignal } from "solid-js";
import { makeMove,createGame, possibleMoves, boardGetPiece, boardHasPiece } from "../Game";

const files = ['a','b','c','d','e','f','g','h'];
const [moveFromCell, setMoveFromCell] = createSignal([]);
const [gameState, setGameState] = createSignal(createGame());

function isCellWhite(file, rank){
  const isRowOdd = (file %2 == 1);
  const isCellOdd = (rank % 2 == 1);

  if(isRowOdd){
    return isCellOdd;
  }else{
    return !isCellOdd;
  }
}

function handleClickCell(pos){

  if(moveFromCell().length != 0){
      putDownPiece(pos);

  }else if(boardHasPiece(gameState(), pos)){
      pickUpPiece(pos);
  }else{
      console.log("Empty Cell")
  }
}

function pickUpPiece(pos){
  console.log("Picked up "+ boardGetPiece(gameState(), pos).type + " at " + pos );
  console.log("Possible Moves:", possibleMoves(gameState(),pos));

  setMoveFromCell(pos);
}

function putDownPiece(pos){
  console.log("Placed down at " + pos);
  const [success, newGameState] = makeMove(gameState(), moveFromCell(), pos);
  
  // Reset the current picked up piece
  setMoveFromCell([]);

  if(success){
    setGameState(newGameState);
    console.log("Successfully Moved Piece")
  }else{
    console.log("Illegal move")
  }

  console.log(gameState())
}

export default function ChessBoard(props){
  console.log(gameState());

    return(
      <div class=" grid grid-cols-8">
      <For each={gameState().board}>{
        (column, columnIndex)=>{
          return(
            <div>
              <For each={column}>
                {
                  (row, rowIndex)=>{
                    // console.log(props.whitePerspective?"White's Perspective":"Black's Perspective");
                    let file = props.whitePerspective()? columnIndex() : 7 - columnIndex();
                    let rank = props.whitePerspective()? 7-rowIndex() : rowIndex();

                    return(
                      <Cell
                        isCellWhite={isCellWhite(file, rank)}
                        displayFile={files[file]}
                        displayRank={rank+1}
                        piece={gameState().board[rank][file]}
                        handleClick={() => {
                          handleClickCell([rank, file]);
                        }}
                      />
                    )
                  }
                }
              </For>
            </div>
          )
        }
      }
      </For>
      </div>
    )
}