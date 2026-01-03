import React, { useEffect, useState } from "react";

const QuizTimer = ({
  countdownStartTime, // Date.now() from backend
  countdownDuration,  // seconds (eg: 600)
  onQuizStart
}) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!countdownStartTime || !countdownDuration) return;

    const interval = setInterval(() => {
      const now = Date.now();

      const elapsedSeconds = Math.floor(
        (now - countdownStartTime) / 1000
      );

      const remainingSeconds =
        countdownDuration - elapsedSeconds;

      if (remainingSeconds <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        onQuizStart(); // 🚀 quiz start
      } else {
        setTimeLeft(remainingSeconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownStartTime, countdownDuration, onQuizStart]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ fontSize: "22px", fontWeight: "bold", color: "black", }}>
      ⏳ Quiz starts in{" "}
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default QuizTimer;
