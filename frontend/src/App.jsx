import { createSignal } from "solid-js";
import ChessBoard from "./components/ChessBoard";

async function fetchGame(){
    const response = await fetch('http://localhost:4000/getPlaceHolderGame');
    return await response.json();
}

function App() {
  const [whitePerspective, setWhitePerspective] = createSignal(true);

 return(
  <div>
     <div>{console.log("Fetched from Backend: ", fetchGame())}</div>
    {/* <div>{gameState().whitesTurn? "White" :"Black" }'s Turn</div> */}

    <ChessBoard 
      whitePerspective={whitePerspective}
    />

    <div>
      <button 
        onClick={() =>{
          setWhitePerspective(!whitePerspective());
          console.log("Flipped Perspective");}
        }
      >
          Flip Board
      </button>
    </div>
  </div>
 )
}

export default App;
