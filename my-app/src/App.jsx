import { createSignal, from } from "solid-js";
import { createEffect } from "solid-js";
import {initBoard, createBoard, movePiece} from "./ChessLogic";
import ChessBoard from "./components/ChessBoard";
import { createGame } from "./Game";

const [board, setBoard] = createSignal(initBoard(createBoard()));
const [whitePerspective, setWhitePerspective] = createSignal(true);
const [whitesTurn, setWhitesTurn] = createSignal(true);

function App() {
  // const [gameState, setGameState] = createSignal(createGame());

  console.log(board());
  // console.log(gameState());

 return(
  <div>
    <div>{whitesTurn()? "White" :"Black" }'s Turn</div>
    <ChessBoard whitePerspective={whitePerspective()} board={board()} />

    <div>
      <button onClick={() =>{
      setWhitePerspective(!whitePerspective());
      console.log("Flipped Perspective")}}>
          Flip Board
      </button>
    </div>
    <div>
      <button onclick={() =>{
        setBoard(movePiece(board(), "d", 2, "d", 3));
        console.log(board())}}>
      Advance the white D Pawn
      </button>
    </div>
    <div>
      <button onclick={() =>{
      setWhitesTurn(!whitesTurn())
      setWhitePerspective(whitesTurn())
      }}>Change whose turn it is</button>
    </div>
  </div>
 )
}

export default App;
