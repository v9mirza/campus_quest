// socket.js
import { io } from "socket.io-client";


const Socket = io("http://localhost:5000", {
	transports: ["websocket"], 
	path: "/socket.io",
	withCredentials: true,
	secure: true,
	reconnectionAttempts: 5,
});

Socket.on("connect_error", (err) => {
	console.error("Socket connect_error:", err.message || err);
});

export default Socket;