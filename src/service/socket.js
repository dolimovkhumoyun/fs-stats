import io from "socket.io-client";

var socket = io("192.168.1.31:8878/api");

// export function () {}

export default socket;
