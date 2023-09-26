import { createSignal } from "solid-js";
import { createEffect } from "solid-js";
import ChessBoard from "./components/ChessBoard";


// Triggers function to run whenever value in thing updates
function createFile(startWithWhite  = true){
  let file  = [];
  let lastSquareisWhite = startWithWhite;
  /*
  //This is faster tho
  for (let i = 0; i < 8; i++) {
      file.push({isWhite: !lastSquareisWhite, chessPiece: ""});
      lastSquareisWhite = !lastSquareisWhite;
  }
  */

  for (let i = 0; i < 8; i++) {
    if(i%2 == 0){
      file.push({isWhite: startWithWhite, chessPiece:{}})
    }else{
      file.push({isWhite: !startWithWhite, chessPiece: {}})
    }
  }
  return file;
}

function createBoard(){
  let board = [];
  for (let i = 0; i < 8; i++) {
    if(i%2 == 0){
    board.push(createFile(true));
    }else{
    board.push(createFile(false));
    }
  }
  return board;
}
const [board, setBoard] = createSignal(createBoard());


function App() {
  console.log(board());
  return (
    <div class=" grid grid-cols-8">
    <For each={board()}>{
      (file)=>{
        return <For each={file}>{(square)=>{
          let isWhite = square.isWhite;
          let chessPiece = square.chessPiece;
          if (isWhite) {
            return <div class="bg-white aspect-square">{chessPiece}</div>;
            
          }else{
            return <div class="bg-black aspect-square">{chessPiece}</div>;
          }
          // return(<div class=" aspect-square bg-black text-white ...">A1</div>);

        }}</For>
      }
}
    </For>

    </div>
  );
}

export default App;
