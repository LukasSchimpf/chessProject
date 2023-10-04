import { createSignal } from "solid-js";
import ChessBoard from "./components/ChessBoard";

const [whitePerspective, setWhitePerspective] = createSignal(true);

function App() {

 return(
  <div>
    {/* <div>{gameState().whitesTurn? "White" :"Black" }'s Turn</div> */}

    <ChessBoard 
      whitePerspective={whitePerspective}
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
