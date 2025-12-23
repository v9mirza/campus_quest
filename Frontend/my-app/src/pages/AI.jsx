import React, { useState, useEffect } from "react";
import { useGenerateQuestionsMutation } from "../redux/services/chatApi";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/AI.css"
import { initializeQuestionsFromAI } from "../redux/features/quizSlice";

const AI = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [ques, setQues] = useState([]);

  const { totalQuestions } = useSelector((state) => state.quiz);

  const [
    generateQuestions,
    { isLoading, isSuccess, isError, error },
  ] = useGenerateQuestionsMutation();

  const generateQues = async () => {
    if (!prompt.trim()) return alert("Please enter prompt");

    try {
      const res = await generateQuestions({
        totalQuestions,
        prompt,
      }).unwrap();

      setQues(res.data || []);
    } catch (err) {
      console.error(err);
    }

  };
  const acceptQuestions = () => {
  if (!ques.length) {
    alert("No questions to accept");
    return;
  }

  dispatch(initializeQuestionsFromAI(ques));
  navigate("/questions");
};

  return (
    <div className="ai-container">
      <h2 className="ai-title">Generate Questions with AI</h2>

      <label className="ai-label">Enter Prompt</label>
      <textarea
        className="ai-textarea"
        placeholder="Example: Generate MCQs on JavaScript closures"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className="generate-btn" onClick={generateQues} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate"}
      </button>

      {isError && <p className="error-text">Something went wrong!</p>}

      {/* QUESTIONS */}
      <div className="questions-wrapper">
        {ques.map((q, i) => (
          <div key={i} className="question-card">
            <h4 className="question-title">
              Q{i + 1}. {q.questionText}
            </h4>

            <ul className="options-list">
  {q.options.map((opt, idx) => {
    const isCorrect = opt === q.correctAnswer;

    return (
      <li
        key={idx}
        className={isCorrect ? "option correct-option" : "option"}
      >
        <span className="option-index">{idx + 1}.</span>
        {opt}
        {isCorrect && <span className="correct-badge">✔ Correct</span>}
      </li>
    );
  })}
</ul>
          </div>
        ))}
      </div>
      {/* NAV BUTTONS */}
      <div className="btn-div">
        <button className="btn prev-btn" onClick={() => navigate("/questions")}>
          Prev
        </button>
        <button
  className="btn next-btn"
  onClick={acceptQuestions}
>
  Accept & Create Quiz
</button>
      </div>
    </div>
  );
};

export default AI;
