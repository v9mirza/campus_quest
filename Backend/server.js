const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------------------------
// HTTP SERVER + SOCKET.IO
// -------------------------------------
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

// Export io (if required elsewhere)
module.exports = { io };

// Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });
});

// -------------------------------------
// MIDDLEWARES
// -------------------------------------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// -------------------------------------
// ROUTES IMPORT
// -------------------------------------
const studentRoutes = require("./routers/studentRoutes");
const quizRoutes = require("./routers/quizRoutes");
const facultyRoutes = require("./routers/facultyRoutes");
const superAdminRoutes = require("./routers/superAdminRoutes");
const courseRoutes = require("./routers/courseRoutes");

// -------------------------------------
// ROUTES MOUNTING
// -------------------------------------
app.use("/students", studentRoutes);
app.use("/quiz", quizRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/course", courseRoutes); // (Don't delete)

// -------------------------------------
// MONGO DB CONNECTION
// -------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB error:", err));

// -------------------------------------
// START SERVER (via HTTP server)
// -------------------------------------
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
