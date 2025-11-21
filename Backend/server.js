// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Import Routes
// const superAdminRoutes = require("./routes/superAdminRoutes");

// const facultyRoutes = require("./routes/facultyRoutes");
// app.use("/api/faculty", facultyRoutes);
// // ENV Variables
// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

// // Connect to MongoDB
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/api/superadmin", superAdminRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import Routes
const superAdminRoutes = require("./routes/superAdminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

// ===== Mount Routes =====
app.use("/api/superadmin", superAdminRoutes);  // Super Admin + HOD faculty management
app.use("/api/faculty", facultyRoutes);        // Faculty login + password update

// ENV Variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
