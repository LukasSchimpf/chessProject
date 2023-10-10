import { Server } from "http";
import { WebSocketServer } from "ws";

let httpserver = new Server();
let wss = new WebSocketServer({ server: httpserver });
httpserver.listen(3001);

export function getSocket() {
    console.log("initializing websocket");
    if (!httpserver) {
        httpserver = new Server();
    }
    if (!wss) {
        wss = new WebSocketServer({ server: httpserver });
    }
    if (!httpserver.listening) {
        httpserver.listen(3001);
    }
    return wss;
}

