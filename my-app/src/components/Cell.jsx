
//* Props:
//* isCellWhite: whether light square or dark square
//* cellCoordinates: text representing the coordinates on the chessboard
//* piece: piece object of the current cell
export default function Cell(props){
    const cellColor = props.isCellWhite? " bg-light-square": " bg-dark-square";
    const cellCoordinateColor = !props.isCellWhite? " text-light-square":" text-dark-square";

    const pieceColor = props.piece && props.piece.isWhite? " text-white-piece": " text-black-piece";
    const cellContent = props.piece? props.piece.type : "";

    return <div class={" aspect-square" + cellColor}>
    <div class={"text-xs" + cellCoordinateColor}>
        {props.cellCoordinates}
    </div>
    <div class={" text-4xl text-center"+ pieceColor}>
        {cellContent}
    </div>
    </div>;
}