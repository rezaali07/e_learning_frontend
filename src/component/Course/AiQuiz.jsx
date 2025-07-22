// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./AiQuiz.css";

// const AiQuiz = () => {
//   const { lessonId } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [lessonText, setLessonText] = useState("");
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLessonAndQuiz = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const token = localStorage.getItem("token");

//         // Fetch lesson content
//         const lessonRes = await axios.get(`/api/v2/courses/lessons/${lessonId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const content = lessonRes.data.content;
//         setLessonText(content);

//         // Generate quiz using lessonId + lessonText
//         const quizRes = await axios.post(
//           "/api/ai-quiz/generate",
//           { lessonId, lessonText: content },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setQuiz(quizRes.data.quiz);
//         setAnswers({});
//         setScore(null);
//       } catch (err) {
//         console.error("❌ Failed to load AI quiz:", err.response?.data || err.message);
//         setError("Failed to load AI quiz. Please try again.");
//         setQuiz(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLessonAndQuiz();
//   }, [lessonId]);

//   const handleOptionChange = (qIndex, option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [qIndex]: option,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!quiz) return;
//     let calculatedScore = 0;
//     quiz.questions.forEach((q, idx) => {
//       if (answers[idx] === q.answer) {
//         calculatedScore += 1;
//       }
//     });
//     setScore(calculatedScore);
//   };

//   if (loading) return <div className="aiquiz-container">⏳ Loading quiz...</div>;

//   if (error) return <div className="aiquiz-container error">{error}</div>;

//   if (!quiz)
//     return (
//       <div className="aiquiz-container">
//         ❗ No quiz available for this lesson.
//       </div>
//     );

//   return (
//     <div className="aiquiz-container">
//       <h2>🤖 AI Generated Quiz</h2>
//       {quiz.questions.map((q, idx) => (
//         <div key={q._id || idx} className="question-block">
//           <p>
//             <strong>Q{idx + 1}:</strong> {q.question}
//           </p>
//           <div className="options">
//             {Object.entries(q.options).map(([key, val]) => (
//               <label key={key}>
//                 <input
//                   type="radio"
//                   name={`question-${idx}`}
//                   value={key}
//                   checked={answers[idx] === key}
//                   onChange={() => handleOptionChange(idx, key)}
//                   aria-label={`Option ${key}: ${val}`}
//                 />
//                 {key}: {val}
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       <button onClick={handleSubmit} disabled={score !== null}>
//         ✅ Submit Answers
//       </button>

//       {score !== null && (
//         <div className="score">
//           🎯 Your score: {score} / {quiz.questions.length}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AiQuiz;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import "./AiQuiz.css";

const AiQuiz = () => {
  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [lessonText, setLessonText] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Optional: ensures user starts from top of page

    const fetchLessonAndQuiz = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        // Fetch lesson content
        const lessonRes = await axios.get(`/api/v2/courses/lessons/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const content = lessonRes.data.content;
        setLessonText(content);

        // Generate or fetch quiz
        const quizRes = await axios.post(
          "/api/ai-quiz/generate",
          { lessonId, lessonText: content },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setQuiz(quizRes.data.quiz);
        setAnswers({});
        setScore(null);
      } catch (err) {
        console.error("❌ Failed to load AI quiz:", err.response?.data || err.message);
        setError("Failed to load AI quiz. Please try again.");
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonAndQuiz();
  }, [lessonId]);

  const handleOptionChange = (qIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let calculatedScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
  };

  return (
    <>
      <MetaData title="AI Quiz | Course Lesson" />
      <Header />

      {loading ? (
        <div className="aiquiz-container loading">
          <div className="loader"></div>
          <p>
            🤖 Generating your quiz... This may take up to 1 minute.
            <br />
            Please be patient while our AI prepares your questions!
          </p>
        </div>
      ) : error ? (
        <div className="aiquiz-container error">{error}</div>
      ) : !quiz ? (
        <div className="aiquiz-container">
          ❗ No quiz available for this lesson.
        </div>
      ) : (
        <div className="aiquiz-container">
          <h2>🤖 AI Generated Quiz</h2>
          {quiz.questions.map((q, idx) => (
            <div key={q._id || idx} className="question-block">
              <p>
                <strong>Q{idx + 1}:</strong> {q.question}
              </p>
              <div className="options">
                {Object.entries(q.options).map(([key, val]) => (
                  <label key={key}>
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={key}
                      checked={answers[idx] === key}
                      onChange={() => handleOptionChange(idx, key)}
                      aria-label={`Option ${key}: ${val}`}
                    />
                    {key}: {val}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} disabled={score !== null}>
            ✅ Submit Answers
          </button>

          {score !== null && (
            <div className="score">
              🎯 Your score: {score} / {quiz.questions.length}
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default AiQuiz;
