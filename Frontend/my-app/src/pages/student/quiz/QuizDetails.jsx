import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./QuizDetails.css";
import { useRegisterStudentForQuizMutation } from "../../../redux/services/quizApi";
import Socket from "../../../Socket";
import { useGetQuizTimerQuery } from "../../../redux/services/quizApi";
import QuizTimer from "./QuizTimer";

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { quizData, registered } = location.state || {};

  const [errorMsg, setErrorMsg] = useState("");
  const [registerStudentForQuiz] = useRegisterStudentForQuizMutation();
 const {
  data: timerData,
  isLoading,
  isError,
  refetch
} = useGetQuizTimerQuery(quizId, {
  skip: !quizData?.isStarted,
});

console.log("Timer Data:", timerData);

  if(isLoading) return <p style={{color: '#fff'}}>Loading timer...</p>;
  if(isError) return <p style={{color: '#fff'}}>Error loading timer</p>;



  const handleRegister = async (id) => {
    try {
     const res =  await registerStudentForQuiz({ quizId: id }).unwrap();
console.log("Registration successful:", res);
if(res.message){
alert("Successfully registered for the quiz!");
}
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err?.data?.message || "Something went wrong");
    }
  };

  const formatDateTime = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

const handleJoin = () => {
  if(!quizData?.isStarted){
    alert("Quiz has not started yet!");
    return;
  }
   Socket.emit(`join-timer-room`, { quizId: quizData?._id });
   refetch();

   navigate(`/student/quiz/waiting/${quizData?._id}`, {
    state: {
      quizData,
       startTime: new Date(timerData.startTime).getTime(), 
      duration: Number(timerData.duration) 
    }
  });
}


  return (
    <div className="quiz-details">
      <div className="quiz-details-card">
        <h1>Quiz Details</h1>

        <p className="quiz-meta">
          <strong>Quiz Title:</strong> {quizData?.title}
        </p>

        <p className="quiz-meta">
          <strong>Subject:</strong> {quizData?.subject}
        </p>

        <p className="quiz-description">
          <strong>Description:</strong> {quizData?.description}
        </p>

        <p className="quiz-startTime">
          <strong>Start Time:</strong>{" "}
          {formatDateTime(quizData?.startTime)}
        </p>

        <p className="quiz-Time">
          <strong>End Time:</strong>{" "}
          {formatDateTime(quizData?.endTime)}
        </p>

        <p className="quiz-min">
          <strong>Duration:</strong> {quizData?.durationMinutes} Minutes
        </p>

        <p className="quiz-marks">
          <strong>Total Marks:</strong> {quizData?.totalMarks}
        </p>

        <p className="quiz-marks">
          <strong>Passing Marks:</strong> {quizData?.passingMarks}
        </p>

        {errorMsg && <p className="quiz-error">{errorMsg}</p>}

        {quizData?.isStarted || registered ? (
          <button className="quiz-start-btn" onClick={handleJoin}>
            Join
          </button>
        ) : (
          <button
            className="quiz-start-btn"
            onClick={() => handleRegister(quizData?._id)}
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizDetails;
