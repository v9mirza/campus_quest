const Leaderboard = require('../models/leaderboardModel');
const { io } = require('../server');

const leaderboardController = { 
    getLeaderboardByQuiz: async (req, res) => {
        try {
            const { quizId } = req.params;
            const leaderboardEntries = await Leaderboard.find({ quizId })
                .populate('userId', 'name enrollmentNumber') 
                .sort({ score: -1, timeTaken: 1 });
io.to(quizId).emit('leaderboardData', leaderboardEntries);
            res.status(200).json(leaderboardEntries);

        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
        }   
    }
};
module.exports = leaderboardController;