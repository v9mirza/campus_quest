const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
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
    designation:{
        type: String,
        required: true,
    },
    createdQuizzes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
        }
    ],
    facutlyId: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    mobileNumber:{
        type: Number,   
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;