import { createSignal, from } from "solid-js";
import { createEffect } from "solid-js";
import {initBoard, createBoard, movePiece, makeMove} from "./ChessLogic";
import ChessBoard from "./components/ChessBoard";
import { createGame } from "./Game";

function initMove(){
  return({
    fromFile: "",
    fromRank: -1,
    toFile: "",
    toRank: -1,
  })
}

const [board, setBoard] = createSignal(initBoard(createBoard()));
const [whitePerspective, setWhitePerspective] = createSignal(true);
const [whitesTurn, setWhitesTurn] = createSignal(true);
// const [gameState, setGameState] = createSignal(createGame());
const [currentMove, setCurrentMove] = createSignal(initMove());


function App() {

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
    {/* <div>
      <button onclick={() =>{
        setBoard(movePiece(board(), "d", 2, "d", 3));
        console.log(board())}}>
      Advance the white D Pawn
      </button>
    </div> */}
    <div>
      <button onclick={() =>{
      setWhitesTurn(!whitesTurn())
      setWhitePerspective(whitesTurn())
      }}>Change whose turn it is</button>
    </div>
    <div>
      Make Move:
      <div>
        From:
        <input
          onInput={(e) => {
            if(e.currentTarget.value.length != 2){
              return;
            }

            let move = currentMove();
            move.fromFile = e.currentTarget.value.charAt(0);
            move.fromRank = Number(e.currentTarget.value.charAt(1));
            setCurrentMove(move);
          }}
        />
      </div>
      <div>
        To:
        <input
          onInput={(e) => {
            if(e.currentTarget.value.length != 2){
              return;
            }

            let move = currentMove();
            move.toFile = e.currentTarget.value.charAt(0);
            move.toRank = Number(e.currentTarget.value.charAt(1));
            setCurrentMove(move);
          }}
        />
      </div>
      <button onClick={(e) => {
        let move = currentMove();
        console.log(move);

        setBoard(makeMove(board(), move.fromFile, move.fromRank, move.toFile, move.toRank));

        setCurrentMove(initMove());
      }}>Make Move</button>
    </div>
  </div>
 )
}

export default App;
