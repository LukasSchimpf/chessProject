import { createSignal } from "solid-js";
import { createEffect } from "solid-js";
import ChessBoard from "./components/ChessBoard";

function initPiece(isWhite = true, type = ""){
  return {isWhite, type}
}

function createBoard(){
  let board = [];
  for(let i=0; i<64;i++){
    board[i] = {};
  }
  return board;
}

function initBoard(board){
  for(let i=8; i<16; i++){
    board[i] = initPiece(true, "P")
  }

  return board;
}

function accessSquare(board, rank, file){
  //returns the correct square

}

const [board, setBoard] = createSignal(initBoard(createBoard()));
const [whitePerspective, setWhitePerspective] = createSignal(false);

function isWhite(index){
        let col = index() % 8;
        let row = Math.floor(index()/8);
        let shouldFlip = row % 2;
        let cell = index() % 2;
}

function App() {
  console.log(board());
  return (
    <div class=" grid grid-cols-8">
    <For each={whitePerspective()? board().toReversed() : board()}>{
      (square, index)=>{

        let rowOdd = ((Math.floor(index()/8)) %2 == 1);
        let cellOdd = (index() % 2 == 1);
        let isCellWhite = true

        if(rowOdd){
          isCellWhite = cellOdd
        }else{
          isCellWhite = !cellOdd
        }

        const cellContent = square ? square.type: "";
        const cellColor = isCellWhite? " bg-white text-black": " bg-black text-white "

        return <div class={" aspect-square" + cellColor}>{cellContent}</div>;

        }
            
        }
    </For>

    </div>
  );
}

export default App;
