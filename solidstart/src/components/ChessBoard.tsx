import Cell from "./Cell";
import { createSignal, For } from "solid-js";
import { makeMove,createGame, possibleMoves, boardGetPiece, boardHasPiece, pos_t, piece_t} from "../Game";

const files = ['a','b','c','d','e','f','g','h'];
const [moveFromCell, setMoveFromCell] = createSignal([] as pos_t);
const [gameState, setGameState] = createSignal(createGame());

/**
 * @param file Index of the current cell's file (0 indexed).
 * @param rank Index of the current cell's rank (0 indexed).
 * @returns True if the cell is a white square, false otherwise.
 */
function isCellWhite(file:number, rank:number):boolean{
  const isRowOdd = (file %2 == 1);
  const isCellOdd = (rank % 2 == 1);

  if(isRowOdd){
    return isCellOdd;
  }else{
    return !isCellOdd;
  }
}

function handleClickCell(pos:pos_t){

  if(moveFromCell().length != 0){
      putDownPiece(pos);

  }else if(boardHasPiece(gameState(), pos)){
      pickUpPiece(pos);
  }else{
      console.log("Empty Cell")
  }
}

function pickUpPiece(pos:pos_t){
  console.log("Picked up "+ boardGetPiece(gameState(), pos) + " at " + pos );
  console.log("Possible Moves:", possibleMoves(gameState(),pos));

  setMoveFromCell(pos);
}

function putDownPiece(pos:pos_t){
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

/**
 * 
 * @param props.gameState (any): state of the game to be represented
 * @param props.whitePerspective (boolean): whether white or black perspective
 * @returns Chess board component
 */
export default function ChessBoard(props: any){

  return(
    <div class=" grid grid-cols-8">
      <For each={Array(8)}>{
        (col:any, columnIndex:any)=>{
          return(
            <div>
              <For each={Array(8)}>{
                  (row: any, rowIndex: any)=>{
                    // console.log(props.whitePerspective?"White's Perspective":"Black's Perspective");
                    let file = props.whitePerspective? columnIndex() : 7 - columnIndex();
                    let rank = props.whitePerspective? 7-rowIndex() : rowIndex();

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