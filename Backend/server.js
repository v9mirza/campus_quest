const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const studentRoutes = require('./routers/studentRoutes');
const quizRoutes = require('./routers/quizRoutes');
const http = require("http");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// Export io
module.exports = { io };

// Socket events
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log("Joined Room:", roomId);
    });
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST","PUT", "DELETE"],
  credentials: true     
}));

// Routes
app.use('/students', studentRoutes);
app.use('/quiz', quizRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// Start server (NOT app.listen)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
