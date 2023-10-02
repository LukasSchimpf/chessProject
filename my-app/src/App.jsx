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
const [isHoldingPiece, setIsHoldingPiece] = createSignal(false);

function pickUpPiece(file, rank){
  let move = currentMove();
  move.fromFile = file;
  move.fromRank = rank;

  console.log("Picked up piece at " + file+rank);

  setCurrentMove(move);
  setIsHoldingPiece(true);
}

function putDownPiece(file, rank){

  let move = currentMove();
  move.toFile = file;
  move.toRank = rank;

  console.log("Placed Piece at " + file+rank);
  setIsHoldingPiece(false);
  setCurrentMove(move);

  makeCurrentMove();
}

function makeCurrentMove(){
  const move = currentMove();
  console.log(move);

  setBoard(makeMove(board(), move.fromFile, move.fromRank, move.toFile, move.toRank));

  setCurrentMove(initMove());
}

function App() {

  console.log(board());

 return(
  <div>
    <div>{whitesTurn()? "White" :"Black" }'s Turn</div>

    <ChessBoard 
      whitePerspective={whitePerspective()}
      board={board()}
      piecePickUpHandler={pickUpPiece}
      piecePutDownHandler={putDownPiece}
      isHoldingPiece={isHoldingPiece}
    />

    <div>
      <button onClick={() =>{
      setWhitePerspective(!whitePerspective());
      console.log("Flipped Perspective")}}>
          Flip Board
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
