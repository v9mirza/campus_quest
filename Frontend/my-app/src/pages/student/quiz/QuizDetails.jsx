import {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import "./quizDetails.css";
import {useLazyGetQuizByIdQuery} from "../../../redux/services/quizApi";

const QuizDetails = () => {
  const { quizId } = useParams();
 const [quiz,setQuiz] = useState(null);
  const [useGetQuizById, { data: quizData, isLoading, isError }] = [];


 const [getQuizById] = useLazyGetQuizByIdQuery();

   const fetchQuizDetails = async () => {
    try {
      const response = await getQuizById(quizId).unwrap();
      setQuiz(response);
    } catch (error) {
      console.error("Failed to fetch quiz details:", error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, [quizId]);

  return (
    <div className="quiz-details">
      <div className="quiz-details-card">
        <h1>Quiz Details</h1>

        <p className="quiz-meta">
          <strong>Quiz ID:</strong> {quizId}
        </p>

        <p className="quiz-meta">
          <strong>Subject:</strong> java Programming
        </p>

        <p className="quiz-description">
          This quiz covers basic Java Programming concepts.
        </p>

        <button className="quiz-register-btn">
          Register
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
