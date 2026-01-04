import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAttemptedQuizByStudentQuery } from "../../../redux/services/quizApi";
import "./QuizReview.css";

const QuizReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    quizId,
    timeTaken,
    totalQuestions,
    attemptedOn,
    submissionStatus,
  } = location.state || {};

  const { data: prevQuiz, isLoading, isError } =
    useAttemptedQuizByStudentQuery(quizId, { skip: !quizId });

  if (!quizId) {
    return (
      <div className="quiz-attempt">
        <div className="quiz-attempt-card">
          <p>Open this page from Feedback.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <p>Loading review...</p>;
  if (isError || !prevQuiz) return <p>Failed to load review.</p>;

  const correct = prevQuiz.quiz.questions.filter((q) => {
    const ans = prevQuiz.answers.find((a) => a.questionId === q._id);
    return ans?.selectedAnswer === q.correctAnswer;
  }).length;

  const wrong = prevQuiz.answers.length - correct;
  const skipped = totalQuestions - prevQuiz.answers.length;
  const accuracy = Math.round((correct / totalQuestions) * 100);

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="quiz-attempt">
      <div className="quiz-attempt-card wide">
        <div className="review-summary">
          <div>
            <h1>{prevQuiz.quiz.title}</h1>
            <p>Score: {correct} / {totalQuestions}</p>
            <p>Time Taken: {minutes}m {seconds}s</p>
            <p className="meta">
              Accuracy: {accuracy}% | Correct: {correct} | Wrong: {wrong} | Skipped: {skipped}
            </p>
            <p className="meta">
              Attempted on: {attemptedOn} · Status: {submissionStatus}
            </p>
          </div>

          <svg width="110" height="110" className="donut">
            <circle cx="55" cy="55" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="#16a34a"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em">
              {accuracy}%
            </text>
          </svg>
        </div>

        <div className="distribution">
          <div className="dist correct" style={{ flex: correct }} />
          <div className="dist wrong" style={{ flex: wrong }} />
          <div className="dist skipped" style={{ flex: skipped }} />
        </div>
        <p className="dist-legend">
          Correct: {correct} | Wrong: {wrong} | Skipped: {skipped}
        </p>

        {prevQuiz.quiz.questions.map((q, index) => {
          const userAnswer = prevQuiz.answers.find(
            (a) => a.questionId === q._id
          )?.selectedAnswer;

          const isCorrect = userAnswer === q.correctAnswer;
          const isSkipped = !userAnswer;

          return (
            <div
              key={q._id}
              className={`review-question ${
                isCorrect ? "correct" : isSkipped ? "skipped" : "wrong"
              }`}
            >
              <h3>Q{index + 1}. {q.question}</h3>
              <p>
                Your Answer:
                <span className={isCorrect ? "green" : "red"}>
                  {userAnswer || "Not Answered"}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  Correct Answer:
                  <span className="green">{q.correctAnswer}</span>
                </p>
              )}
            </div>
          );
        })}

        <button className="primary" onClick={() => navigate("/student/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuizReview;
