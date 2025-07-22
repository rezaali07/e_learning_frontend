import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import "./CourseLessonView.css";

const CourseLessonView = () => {
  const { id } = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);


  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  // TTS states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState("en-US");

  // Quiz dropdown toggle
  const [showQuizOptions, setShowQuizOptions] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course lessons", err);
      }
    };

    const fetchLessonProgress = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}/lesson-progress`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompletedLessons(data.lessonsCompleted || []);
      } catch (err) {
        console.error("Failed to fetch lesson progress", err);
      }
    };

    fetchCourse();
    fetchLessonProgress();

    // Load voices for TTS
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, [id, token]);

  if (!course) return <p>Loading course data...</p>;
  if (!course.lessons.length) return <p>No lessons found.</p>;

  const currentLesson = course.lessons[currentLessonIndex];
  const isCompleted = completedLessons.includes(currentLesson._id);

  const toggleLessonCompletion = async () => {
    try {
      if (isCompleted) {
        await axios.delete(
          `/api/v2/courses/${id}/lessons/${currentLesson._id}/complete`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompletedLessons((prev) => prev.filter((lid) => lid !== currentLesson._id));
      } else {
        await axios.post(
          `/api/v2/courses/${id}/lessons/${currentLesson._id}/complete`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompletedLessons((prev) => [...prev, currentLesson._id]);
      }
    } catch (err) {
      console.error("Failed to update lesson progress", err);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
      setSummary("");
      setQuestion("");
      setAiAnswer("");
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((i) => i - 1);
      setSummary("");
      setQuestion("");
      setAiAnswer("");
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary("");

    try {
      const res = await axios.post(
        "/api/ai/summarize",
        { lessonContent: currentLesson.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummary(res.data.summary);
    } catch (err) {
      console.error("❌ Failed to summarize lesson:", err);
      setSummary("Error summarizing lesson.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setIsAsking(true);
    setAiAnswer("");

    try {
      const res = await axios.post(
        "/api/ai/ask",
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAiAnswer(res.data.answer);
    } catch (err) {
      console.error("AI Ask Error:", err);
      setAiAnswer("Error getting answer.");
    } finally {
      setIsAsking(false);
    }
  };

  const speakLesson = () => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support Text-to-Speech.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentLesson.content);
    utterance.lang = language;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang === language);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const renderVideo = () => {
    const { videoUrl } = currentLesson;
    if (/youtu/.test(videoUrl)) {
      let videoId = videoUrl.includes("youtu.be")
        ? videoUrl.split("youtu.be/")[1].split("?")[0]
        : new URLSearchParams(new URL(videoUrl).search).get("v");
      return (
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Video"
          className="lesson-video"
        />
      );
    }
    return <video controls width="100%" src={videoUrl} className="lesson-video" />;
  };

  // NEW: Generate AI Quiz API call and redirect
  

const handleGenerateAiQuiz = async () => {
  setShowQuizOptions(false);

  if (!currentLesson?.content) {
    alert("Lesson content is empty, cannot generate quiz.");
    return;
  }

  if (isGeneratingQuiz) return; // prevent double click
  setIsGeneratingQuiz(true);

  try {
    const res = await axios.post(
      "/api/ai-quiz/generate",
      {
        lessonId: currentLesson._id,
        lessonText: currentLesson.content,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const quizId = res.data.quiz._id;
    history.push(`/ai-quiz/${currentLesson._id}`);
  } catch (err) {
    console.error("Failed to generate AI quiz", err.response?.data || err.message);
    alert("Failed to generate AI quiz. Please try again.");
  } finally {
    setIsGeneratingQuiz(false);
  }
};



  return (
    <>
      <Header />
      <div className="lesson-view-container">
        <aside className="lesson-sidebar">
          <h3>{course.title}</h3>
          <ul>
            {course.lessons.map((lesson, idx) => (
              <li
                key={lesson._id}
                className={`${idx === currentLessonIndex ? "active-lesson" : ""} ${completedLessons.includes(lesson._id) ? "completed-lesson" : ""
                  }`}
                onClick={() => {
                  setCurrentLessonIndex(idx);
                  setSummary("");
                  setQuestion("");
                  setAiAnswer("");
                }}
              >
                {lesson.title}
                {completedLessons.includes(lesson._id) && <span className="completed-check">✔</span>}
              </li>
            ))}
          </ul>
        </aside>

        <main className="lesson-main">
          <div className="lesson-header">
            <h2>{currentLesson.title}</h2>

            <div className="quiz-button-wrapper" style={{ position: "relative", display: "inline-block" }}>
              <button className="quiz-button" onClick={() => setShowQuizOptions((prev) => !prev)}>
                Quiz ▾
              </button>

              {showQuizOptions && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    zIndex: 10,
                  }}
                >
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 12px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    onClick={handleGenerateAiQuiz}
                  >
                    AI Quiz
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 12px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowQuizOptions(false);
                      history.push(`/course/${id}/quiz`);
                    }}
                  >
                    Course Quiz
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-content-box">
            {renderVideo()}
            <div className="lesson-description">
              <p>{currentLesson.content}</p>
            </div>

            {/* Language and TTS Buttons */}
            <div style={{ marginTop: "1rem" }}>
              <label>🗣️ Select Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ marginLeft: "8px", padding: "5px" }}
              >
                <option value="en-US">English</option>
                <option value="ne-NP">Nepali</option>
              </select>

              <button style={{ marginLeft: "10px" }} onClick={isSpeaking ? stopSpeaking : speakLesson}>
                {isSpeaking ? "🔇 Stop Listening" : "🔊 Listen to Lesson"}
              </button>
            </div>

            {/* Summarize Button */}
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handleSummarize} disabled={isSummarizing}>
                {isSummarizing ? "Summarizing..." : "🧠 Summarize Lesson"}
              </button>

              {summary && (
                <div
                  className="lesson-summary"
                  style={{
                    marginTop: "1rem",
                    background: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <h4>AI Summary:</h4>
                  <p>{summary}</p>
                </div>
              )}
            </div>

            {/* AI Chat Tutor */}
            <div className="lesson-chatbox" style={{ marginTop: "2rem" }}>
              <h3>🧑‍🏫 Ask Your AI Tutor</h3>
              <textarea
                rows={3}
                placeholder="Ask a question about this lesson..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <button onClick={handleAskQuestion} disabled={isAsking}>
                {isAsking ? "Asking..." : "Ask AI"}
              </button>

              {aiAnswer && (
                <div
                  style={{
                    marginTop: "1rem",
                    background: "#eef",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <strong>AI Answer:</strong>
                  <p>{aiAnswer}</p>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
              &lt; Previous
            </button>

            <button className={`mark-read-btn ${isCompleted ? "completed" : ""}`} onClick={toggleLessonCompletion}>
              {isCompleted ? "✅ Marked as Read" : "📘 Mark as Read"}
            </button>

            <button onClick={handleNext} disabled={currentLessonIndex === course.lessons.length - 1}>
              Next &gt;
            </button>
          </div>
        </main>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default CourseLessonView;
