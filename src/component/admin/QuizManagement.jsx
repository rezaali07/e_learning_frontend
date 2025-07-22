import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./QuizManagement.css";
import { toast } from "react-toastify";

const QuizManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeCard, setActiveCard] = useState(null); // 'add' or 'edit'

  // Quiz fields
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const [quizzes, setQuizzes] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/v2/courses");
      setCourses(data);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  // When course selected, load quizzes for it
  const handleCourseSelect = async (courseId, cardType) => {
    setSelectedCourse(courseId);
    setActiveCard(cardType);

    try {
      const { data } = await axios.get(`/api/v2/courses/${courseId}/quizzes`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setQuizzes(data.quizzes || []);
    } catch (err) {
      toast.error("Failed to load quizzes");
    }
  };

  // Reset quiz form
  const resetQuizForm = () => {
    setQuizTitle("");
    setQuizDescription("");
    setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  // Add new question input
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  // Update question text, option or correct answer
  const updateQuestion = (index, field, value, optionIndex = null) => {
    const updatedQuestions = [...questions];
    if (field === "questionText" || field === "correctAnswer") {
      updatedQuestions[index][field] = value;
    } else if (field === "option") {
      updatedQuestions[index].options[optionIndex] = value;
    }
    setQuestions(updatedQuestions);
  };

  // Add quiz POST
  const handleAddQuiz = async () => {
    if (!quizTitle.trim() || !selectedCourse) {
      return toast.warn("Please fill quiz title and select course");
    }

    for (const q of questions) {
      if (!q.questionText.trim() || !q.correctAnswer.trim()) {
        return toast.warn("Please fill all questions and correct answers");
      }
      if (q.options.some((opt) => !opt.trim())) {
        return toast.warn("Please fill all options for each question");
      }
    }

    try {
      await axios.post(
        `/api/v2/courses/${selectedCourse}/quizzes`,
        {
          title: quizTitle,
          description: quizDescription,
          questions: questions.map((q) => ({
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Quiz added");
      resetQuizForm();
      // Reload quizzes list
      handleCourseSelect(selectedCourse, "add");
    } catch (err) {
      toast.error("Failed to add quiz");
    }
  };

  // For editing, store which quiz is being edited
  const [editingQuizId, setEditingQuizId] = useState(null);

  // Start editing a quiz
  const startEditQuiz = (quiz) => {
    setActiveCard("edit");
    setSelectedCourse(quiz.courseId || selectedCourse);
    setEditingQuizId(quiz._id);
    setQuizTitle(quiz.title);
    setQuizDescription(quiz.description || "");
    setQuestions(
      quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }))
    );
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingQuizId(null);
    resetQuizForm();
  };

  // Submit quiz update (PUT)
  const handleUpdateQuiz = async () => {
    if (!quizTitle.trim()) return toast.warn("Quiz title cannot be empty");

    for (const q of questions) {
      if (!q.questionText.trim() || !q.correctAnswer.trim()) {
        return toast.warn("Please fill all questions and correct answers");
      }
      if (q.options.some((opt) => !opt.trim())) {
        return toast.warn("Please fill all options for each question");
      }
    }

    try {
      await axios.put(
        `/api/v2/courses/${selectedCourse}/quizzes/${editingQuizId}`,
        {
          title: quizTitle,
          description: quizDescription,
          questions: questions.map((q) => ({
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Quiz updated");
      setEditingQuizId(null);
      resetQuizForm();
      handleCourseSelect(selectedCourse, "edit");
    } catch (err) {
      toast.error("Failed to update quiz");
    }
  };

  // Delete quiz
  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await axios.delete(
        `/api/v2/courses/${selectedCourse}/quizzes/${quizId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Quiz deleted");
      handleCourseSelect(selectedCourse, "edit");
    } catch (err) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className="quiz-management-container">
      <Sidebar />
      <div className="quiz-content">
        <h2>Quiz Management</h2>

        <div className="quiz-cards-container">
          <div
            className={`quiz-card-selector ${activeCard === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("add");
              resetQuizForm();
              setSelectedCourse(null);
              setEditingQuizId(null);
              setQuizzes([]);
            }}
          >
            <h3>Add Quiz</h3>
            <p>Select a course and add new quizzes.</p>
          </div>

          <div
            className={`quiz-card-selector ${activeCard === "edit" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("edit");
              resetQuizForm();
              setSelectedCourse(null);
              setEditingQuizId(null);
              setQuizzes([]);
            }}
          >
            <h3>Edit Quiz</h3>
            <p>Select a course and edit or delete quizzes.</p>
          </div>
        </div>

        {activeCard && (
          <>
            <h4>Select a Course</h4>
            <table className="course-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.author}</td>
                    <td>{course.type}</td>
                    <td>
                      <button
                        onClick={() => handleCourseSelect(course._id, activeCard)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ADD QUIZ FORM */}
        {activeCard === "add" && selectedCourse && !editingQuizId && (
          <div className="quiz-card active">
            <h3>Add Quiz to Selected Course</h3>
            <input
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
            <textarea
              placeholder="Quiz Description (optional)"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />

            {questions.map((q, i) => (
              <div key={i} className="quiz-question">
                <input
                  type="text"
                  placeholder={`Question ${i + 1}`}
                  value={q.questionText}
                  onChange={(e) =>
                    updateQuestion(i, "questionText", e.target.value)
                  }
                />
                <div className="options-container">
                  {q.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) =>
                        updateQuestion(i, "option", e.target.value, idx)
                      }
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(i, "correctAnswer", e.target.value)
                  }
                />
              </div>
            ))}

            <button onClick={addQuestion}>Add Another Question</button>
            <button onClick={handleAddQuiz}>Create Quiz</button>
          </div>
        )}

        {/* EDIT QUIZ LIST */}
        {activeCard === "edit" && selectedCourse && !editingQuizId && (
          <div className="quiz-card active">
            <h3>Quizzes in Selected Course</h3>
            {quizzes.length === 0 ? (
              <p>No quizzes found.</p>
            ) : (
              <ul className="quiz-list">
                {quizzes.map((quiz) => (
                  <li key={quiz._id}>
                    <strong>{quiz.title}</strong>
                    <div className="quiz-actions">
                      <button onClick={() => startEditQuiz(quiz)}>Edit</button>
                      <button onClick={() => handleDeleteQuiz(quiz._id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* EDIT QUIZ FORM */}
        {activeCard === "edit" && selectedCourse && editingQuizId && (
          <div className="quiz-card active quiz-edit-form">
            <h3>Edit Quiz</h3>
            <input
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
            <textarea
              placeholder="Quiz Description (optional)"
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />

            {questions.map((q, i) => (
              <div key={i} className="quiz-question">
                <input
                  type="text"
                  placeholder={`Question ${i + 1}`}
                  value={q.questionText}
                  onChange={(e) =>
                    updateQuestion(i, "questionText", e.target.value)
                  }
                />
                <div className="options-container">
                  {q.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) =>
                        updateQuestion(i, "option", e.target.value, idx)
                      }
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(i, "correctAnswer", e.target.value)
                  }
                />
              </div>
            ))}

            <button onClick={handleUpdateQuiz}>Update Quiz</button>
            <button className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizManagement;
