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

  // White Back Rank
  board[0] = initPiece(true, "R")
  board[1] = initPiece(true, "N")
  board[2] = initPiece(true, "B")
  board[3] = initPiece(true, "K")
  board[4] = initPiece(true, "Q")
  board[5] = initPiece(true, "B")
  board[6] = initPiece(true, "N")
  board[7] = initPiece(true, "R")

  // White Pawns
  for(let i=8; i<16; i++){
    board[i] = initPiece(true, "P")
  }

  // Black Back Rank
  board[56] = initPiece(false, "R")
  board[57] = initPiece(false, "N")
  board[58] = initPiece(false, "B")
  board[59] = initPiece(false, "K")
  board[60] = initPiece(false, "Q")
  board[61] = initPiece(false, "B")
  board[62] = initPiece(false, "N")
  board[63] = initPiece(false, "R")

  // Black Pawns
  for(let i=48; i<56; i++){
    board[i] = initPiece(false, "P")
  }

  return board;
}

// Returns the index within the board datastructure of the field with given file and rank
function cellIndex(file, rank){
  let files = ["a","b","c","d","e","f","g","h"]
  let fileNum = files.indexOf(file) 

  return (rank-1)*8 + fileNum	
}

// Returns the piece at the given field of the chess board
function getPiece(board, file, rank){
  return board[cellIndex(file,rank)];
}

function makeMove(board, fromFile, fromRank, toFile, toRank){
  let fromIndex = cellIndex(fromFile, fromRank)
  let toIndex = cellIndex(toFile, toRank)


}

const [board, setBoard] = createSignal(initBoard(createBoard()));
const [whitePerspective, setWhitePerspective] = createSignal(false);

function isWhite(index){
        let col = index() % 8;
        let row = Math.floor(index()/8);
        let shouldFlip = row % 2;
        let cell = index() % 2;
}
createEffect(()=>{
  whitePerspective();
  console.log("hello");

});

function App() {
  console.log(board());
  // console.log(cellIndex("a", 1))
  // console.log(getPiece(board(), "b", 1))
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
