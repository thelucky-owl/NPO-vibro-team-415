import {io, Socket} from "socket.io-client"
export const socket = io("https://npovibro.webpubsub.azure.com", {
        path: "/clients/socketio/hubs/Hub",
      });