import Cell from "./Cell";

const files = ["a","b","c","d","e","f","g","h"];

function isCellWhite(index){
  const isRowOdd = ((Math.floor(index/8)) %2 == 1);
  const isCellOdd = (index % 2 == 1);

  if(isRowOdd){
    return isCellOdd;
  }else{
    return !isCellOdd;
  }
}

// Converts index to order in which chess board cells are to be rendered
function convertToBoardIndex(index){

  const file = index % 8;
  const rank = 7 - Math.floor(index/8)

  return rank*8 + file;
}

function cellCoordinates(index){

  const rank = Math.floor(index/8) + 1;
  const file = files[index % 8];

  return [file, rank];
}

export default function ChessBoard(props){
    return(
      <div class=" grid grid-cols-8">
      <For each={props.whitePerspective? props.board : props.board.toReversed()}>{
        (item, index)=>{

          // Get index in order of rendering cells
          const boardIndex = convertToBoardIndex(index());

          return <Cell isCellWhite={isCellWhite(boardIndex)}
            cellCoordinates={cellCoordinates(boardIndex)}
            piece={props.board[boardIndex]}/>

        }
        }
      </For>
      </div>
    )
}