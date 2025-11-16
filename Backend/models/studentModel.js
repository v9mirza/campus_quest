const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^[0-9]{10}$/, "Invalid mobile number"]
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    semester: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
