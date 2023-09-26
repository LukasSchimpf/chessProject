import { createSignal } from "solid-js";
import { createEffect } from "solid-js";
import ChessBoard from "./components/ChessBoard";

function initPiece(isWhite = true, type = ""){
  return {isWhite, type}
}

// Triggers function to run whenever value in thing updates
/*
function createRank(startWithWhite  = true){
  let file  = [];
  let lastSquareisWhite = startWithWhite;

  for (let i = 0; i < 8; i++) {
    if(i%2 == 0){
      file.push({isWhite: startWithWhite, chessPiece:initChessPiece(true, "")});
    }else{
      file.push({isWhite: !startWithWhite, chessPiece:initChessPiece(false, "")});
    }
  }
  return file;
}
*/


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

/*
function initPawns(board){
  let file1 = board[1];
  let file2 = board[6];

  for (let i = 0; i < 8; i++) {
    file1[i].chessPiece = initChessPiece(true, "P");
    file2[i].chessPiece = initChessPiece(false, "P");
  }  

  return board;
}
*/

/*
function initChessBoard(){
  let board = createBoard();
  board = initPawns(board);
  return board;
}
*/
const [board, setBoard] = createSignal(initBoard(createBoard()));

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
    <For each={board().toReversed()}>{
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
