import { createSignal, from } from "solid-js";
import { createEffect } from "solid-js";
import {initBoard, createBoard, movePiece} from "./ChessLogic";
import ChessBoard from "./components/ChessBoard";

function App() {
  const [board, setBoard] = createSignal(initBoard(createBoard()));
  const [whitePerspective, setWhitePerspective] = createSignal(true);

  console.log(board());

  const indexes = Array.from(Array(64).keys());

 return(
  <div>
    <ChessBoard whitePerspective={whitePerspective()} board={board()} />

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
 )
}

export default App;
