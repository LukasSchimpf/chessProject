import { createSignal, from } from "solid-js";
import { createEffect } from "solid-js";
import {initBoard, createBoard, movePiece} from "./ChessLogic";


function App() {
  const [board, setBoard] = createSignal(initBoard(createBoard()));
  const [whitePerspective, setWhitePerspective] = createSignal(true);

  console.log(board());
  return (
    <div>
      <div class=" grid grid-cols-8">
      <For each={whitePerspective()? board() : board().toReversed()}>{
        (square, index)=>{
          let rowOdd = ((Math.floor(index()/8)) %2 == 1);
          let cellOdd = (index() % 2 == 1);
          let isCellWhite = true;
          let pieceColor = "";
          let cellContent = "";

          if(rowOdd){
            isCellWhite = cellOdd;
          }else{
            isCellWhite = !cellOdd;
          }

          let cellColor = isCellWhite? " bg-light-square": " bg-dark-square";
          let cellCoordinateColor = !isCellWhite? " text-light-square":" text-dark-square"

          if(square){
            cellContent = square.type;
            pieceColor = square.isWhite? " text-black-piece": " text-white-piece";
          }

          return <div class={" aspect-square" + cellColor}>
            <div class={"text-xs" + cellCoordinateColor}>
              a1
            </div>
            <div class={" text-4xl text-center"+ pieceColor}>
              {cellContent}
            </div>
          </div>;

        }
        }
      </For>

      </div>
      <div>
        <button onClick={() =>{setWhitePerspective(!whitePerspective());
        console.log("Flipped Perspective")}}>Flip Board</button>
      </div>
      <div>
        <button onclick={() =>{setBoard(movePiece(board(), "a", 2, "a", 3));
        console.log("Moved Piece");
        console.log(board())
        }}>Advance the white A Pawn</button>
      </div>
    </div>
  );
}

export default App;
