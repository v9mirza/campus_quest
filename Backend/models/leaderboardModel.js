const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    rank: { 
        type: Number,
        required: true,
    },
   timeTaken:{
        type: Number, // in minutes
        required: true,
   }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;





// const mongoose = require('mongoose');

// const leaderboardSchema = new mongoose.Schema({
//     quizId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Quiz',
//         required: true
//     },
//     studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Student',
//         required: true
//     },
//     score: {
//         type: Number,
//         required: true
//     },
//     timeTaken: {
//         type: Number, // in seconds (more accurate)
//         required: true
//     }
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model("Leaderboard", leaderboardSchema);































