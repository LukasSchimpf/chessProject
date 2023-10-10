import { isServer } from "solid-js/web";

let socket: any;
export function getSocket() {
    if (isServer) {

    } else {
        if (!socket) {
            socket = new WebSocket((import.meta.env.PROD ? "wss://" : "ws://") + import.meta.env.VITE_HOST_NAME + "/ws");
            socket.addEventListener("open", (e: Event) => {
                console.log("the websocket was opened on the client");
                socket.addEventListener("message", (e: MessageEvent) => {
                    e.data;
                    console.log("a new message: " + e.data);

                });

            });
        }
    }
    return socket;
}

