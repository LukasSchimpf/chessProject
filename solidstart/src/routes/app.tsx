import { createSignal, For, Show, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { RouteDataArgs, useRouteData } from "solid-start";
import server$ from "solid-start/server";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { prisma } from "~/../prisma/prisma";
import ChessBoard from "~/components/ChessBoard";
import { createGame } from "~/Game";



export default function App() {
    return <div class="w-[700px] h-[700px]">
        <ChessBoard
            gameState={createGame()}
            whitePerspective={true}
        ></ChessBoard> 
        </div>
}
