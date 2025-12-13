const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    enrollmentNumber: {
        type: String,
        required: true,
        trim: true
    },

    // Instead of section -> course + group (correct for your system)
    course: {
        type: String,        // Example: "BCA", "BBA", "B.Tech"
        required: true,
    },
    yearOfStudy: {
        type: Number,
        required: true,
    },
    group:{
        type: String,
        required: true,
    },
    mobileNumber:{
        type: Number,
        required: true,     
    },
    password:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

