/**
 * @param props.isCellWhite (boolean): True if the cell is a white square, false otherwise
 * @param props.displayFile (char): Letter from 'a'-'h' representing the file coordinate that is displayed 
 * @param props.displayRank (int): Integer from 1-8 representing the rank coordinate that is displayed 
 * @param props.piece (JsonObj): Chess piece occupying the current cell
 *      
 * @returns Jsx of a single cell on the chess board
 */
export default function Cell(props:any){
    const cellColor = props.isCellWhite? " bg-light-square": " bg-dark-square";
    const cellCoordinateColor = !props.isCellWhite? " text-light-square":" text-dark-square";

    const pieceColor = props.piece && props.piece.isWhite? " text-white-piece": " text-black-piece";
    const cellContent = props.piece? props.piece.type : "";

    return <div
            class={" aspect-square" + cellColor + " flex"}
            onClick={props.handleClick}
            // onMouseDown={props.handleClick}
            // onMouseUp={props.handleRelease}
        >
            <div class={"text-xs" + cellCoordinateColor + " absolute"}>
                {props.displayFile + props.displayRank}
            </div>
            <div class={" text-4xl text-center"+ pieceColor + " self-center w-full"}>
                {cellContent}
            </div>
        </div>;
}