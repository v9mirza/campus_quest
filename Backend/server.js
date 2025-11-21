const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const studentRoutes = require('./routers/studentRoutes');
const superAdminRoutes = require('./routers/superAdminRoutes');
const quizRoutes = require('./routers/quizRoutes');

require('dotenv').config();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:4000","http://localhost:3000"],
  methods: ["GET", "POST","PUT", "DELETE"],
  credentials: true     
}));


app.use('/students', studentRoutes);
app.use('/superAdmin', superAdminRoutes);
app.use('/quizzes', quizRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("MongoDB connection error: ", err));
  

// For student routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);
