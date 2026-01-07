const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
<<<<<<< HEAD

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: String,
        },
        selectedOption: {
          type: String,
        },
      },
    ],

    correctCount: {
      type: Number,
      default: 0,
    },

    wrongCount: {
      type: Number,
      default: 0,
    },

    scoredMarks: {
      type: Number,
      default: 0,
    },

    timeTaken: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["in_progress", "submitted", "left"],
      default: "in_progress",
    },

    attemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 🔥 VERY IMPORTANT (no duplicate attempts)
quizAttemptSchema.index(
  { quizId: 1, student: 1 },
  { unique: true }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
=======

 

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    answers: [
        {
            questionId: String,
            selectedOption: String
        }
    ],
    correctCount: {
        type: Number,
        default: 0
    },
    wrongCount: {
        type: Number,
        default: 0
    },
    scoredMarks: {
        type: Number,
        default: 0
    },
    timeTaken:{
        type: Number,
        required: true
    },
    attemptedAt: {
        type: Date,
        default: Date.now
    }



});


const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
module.exports = QuizAttempt;
>>>>>>> origin/faizan_branch
