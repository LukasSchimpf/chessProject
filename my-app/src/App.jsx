import { createSignal, from } from "solid-js";
import ChessBoard from "./components/ChessBoard";
import { createGame, makeMove} from "./Game";

function initMove(){
  return({
    fromFile: "",
    fromRank: -1,
    toFile: "",
    toRank: -1,
  })
}

const [whitePerspective, setWhitePerspective] = createSignal(true);
const [gameState, setGameState] = createSignal(createGame());
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

  const [success, newGameState] = makeMove(gameState(), move.fromFile, move.fromRank, move.toFile, move.toRank);

  if(success){
    console.log("Successfully Moved Piece")
  }else{
    console.log("Illegal move")
  }
  setGameState(newGameState);
  console.log(gameState())

  setCurrentMove(initMove());
}

function App() {

  console.log(gameState());

 return(
  <div>
    <div>{gameState().whitesTurn? "White" :"Black" }'s Turn</div>

    <ChessBoard 
      whitePerspective={whitePerspective}
      gameState={gameState}
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
  </div>
 )
}

export default App;
