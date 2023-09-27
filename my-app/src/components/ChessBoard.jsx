
function isCellWhite(index){
  const isRowOdd = ((Math.floor(index/8)) %2 == 1);
  const isCellOdd = (index % 2 == 1);

  if(isRowOdd){
    return isCellOdd;
  }else{
    return !isCellOdd;
  }
}

export default function ChessBoard(props){
    return(
      <div class=" grid grid-cols-8">
      <For each={props.whitePerspective? props.board : props.board.toReversed()}>{
        (square, index)=>{

          const cellColor = isCellWhite(index())? " bg-light-square": " bg-dark-square";
          const cellCoordinateColor = !isCellWhite(index())? " text-light-square":" text-dark-square"

          const pieceColor = square && square.isWhite? " text-black-piece": " text-white-piece";
          const cellContent = square? square.type : "";

          return <div class={" aspect-square" + cellColor}>
            <div class={"text-xs" + cellCoordinateColor}>
              a1
            </div>
            <div class={" text-4xl text-center"+ pieceColor}>
              {cellContent}
            </div>
          </div>;

        }
        }
      </For>
      </div>
    )
}