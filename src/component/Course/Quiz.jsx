import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import "./Quiz.css";

const Quiz = () => {
  const { id: courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${courseId}/quizzes`);
        const allQuestions = data.quizzes.flatMap((quiz) => quiz.questions);
        setQuizzes(allQuestions);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuiz();
  }, [courseId]);

  const currentQuestion = quizzes[currentQuestionIndex];
  const totalQuestions = quizzes.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = selectedOption;
        return updated;
      });
      setSelectedOption(answers[currentQuestionIndex + 1] || "");
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setAnswers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = selectedOption;
        return updated;
      });
      setSelectedOption(answers[currentQuestionIndex - 1] || "");
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
    setSubmitted(true);

    const quizResult = quizzes.map((q, i) => ({
      questionId: q._id,
      questionText: q.questionText,
      selectedOption: updatedAnswers[i],
      correctAnswer: q.correctAnswer,
      isCorrect: updatedAnswers[i] === q.correctAnswer,
    }));

    const score = quizResult.filter((res) => res.isCorrect).length;

    try {
      await axios.post("/api/v2/courses/quiz/progress", {
        courseId,
        score,
        answers: quizResult,
      });
      console.log("✅ Quiz progress saved");
    } catch (err) {
      console.error("❌ Failed to save quiz progress:", err);
    }
  };

  const correctCount = quizzes.reduce((acc, question, index) => {
    return answers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  if (!currentQuestion) return <p>Loading quiz...</p>;

  return (
    <>
      <Header />
      <div className="quiz-container">
        <h2 className="quiz-title">📘 Quiz</h2>

        {/* Progress Bar */}
        <div className="quiz-progress">
          <div
            className="quiz-progress-bar"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
        <p className="question-progress">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>

        {/* Question */}
        {!submitted && (
          <div className="question-box">
            <h3>{currentQuestion.questionText}</h3>
            <ul className="option-list">
              {currentQuestion.options.map((option, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        {!submitted && (
          <div className="quiz-buttons">
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              ⬅ Previous
            </button>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <button onClick={handleSubmit} disabled={!selectedOption}>
                ✅ Submit
              </button>
            ) : (
              <button onClick={handleNext} disabled={!selectedOption}>
                Next ➡
              </button>
            )}
          </div>
        )}

        {/* Final Result */}
        {submitted && (
          <div className="quiz-result">
            <h3>🎉 You got {correctCount} out of {totalQuestions} correct!</h3>

            <div className="quiz-overview">
              <h4>📋 Answer Review</h4>
              <ol>
                {quizzes.map((q, index) => (
                  <li key={index} className="review-question">
                    <strong>Q{index + 1}: {q.questionText}</strong>
                    <p>
                      Your Answer:{" "}
                      <span
                        style={{
                          color:
                            answers[index] === q.correctAnswer
                              ? "green"
                              : "red",
                        }}
                      >
                        {answers[index] || "Not answered"}
                      </span>
                    </p>
                    <p>Correct Answer: ✅ {q.correctAnswer}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Quiz;
