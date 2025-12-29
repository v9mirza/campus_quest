import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizAttempt.css";

const QUESTIONS = [
  {
    id: 1,
    question: "What does JVM stand for?",
    options: [
      "Java Virtual Machine",
      "Java Visual Model",
      "Joint Virtual Memory",
      "None of the above"
    ]
  },
  {
    id: 2,
    question: "Which company currently owns Java?",
    options: ["Microsoft", "Oracle", "Google", "IBM"]
  },
  {
    id: 3,
    question: "Which keyword is used to inherit a class in Java?",
    options: ["this", "super", "extends", "implements"]
  }
];

const QUIZ_TIME = 5 * 60; // seconds

const QuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* =========================
     START QUIZ (fullscreen)
  ========================= */
  const startQuiz = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setHasStarted(true);
    } catch {
      alert("Fullscreen permission is required to start the quiz.");
    }
  };

  /* =========================
     TIMER
  ========================= */
  useEffect(() => {
    if (!hasStarted || isSubmitted) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasStarted, isSubmitted]);

  /* =========================
     HANDLERS
  ========================= */
  const currentQuestion = QUESTIONS[currentIndex];
  const isAnswered = answers[currentIndex] !== undefined;

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    navigate(`/student/quiz/${quizId}/feedback`, {
      state: {
        totalQuestions: QUESTIONS.length,
        answers
      }
    });
  };

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  /* =========================
     START SCREEN
  ========================= */
  if (!hasStarted) {
    return (
      <div className="quiz-attempt">
        <div className="quiz-attempt-card">
          <h2>Ready to start the quiz?</h2>
          <p>
            The quiz will run in fullscreen mode.<br />
            Timer will start immediately.
          </p>

          <button className="primary" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     QUIZ UI
  ========================= */
  return (
    <div className="quiz-attempt">
      <div className="quiz-attempt-card">
        <div className="quiz-header">
          <h1>Quiz #{quizId}</h1>
          <span className="quiz-timer">
            ⏱ {min}:{sec.toString().padStart(2, "0")}
          </span>
        </div>

        <p className="quiz-progress">
          Question {currentIndex + 1} of {QUESTIONS.length}
        </p>

        <h2>{currentQuestion.question}</h2>

        <ul className="quiz-options">
          {currentQuestion.options.map((opt, i) => (
            <li
              key={i}
              className={answers[currentIndex] === opt ? "selected" : ""}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>

        <div className="quiz-nav">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            Previous
          </button>

          <button
            disabled={!isAnswered}
            onClick={() =>
              currentIndex === QUESTIONS.length - 1
                ? handleSubmit()
                : setCurrentIndex((i) => i + 1)
            }
          >
            {currentIndex === QUESTIONS.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
