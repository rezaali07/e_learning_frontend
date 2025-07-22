import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Home/Header";
import Footer from "../more/Footer";
import BottomTab from "../more/BottomTab";

const QuizProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Retrieved token:", token);

        const { data } = await axios.get(
          "/api/v2/courses/me/quiz-progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Quiz progress data:", data.progress);
        setProgressData(data.progress);
      } catch (error) {
        console.error("Error fetching quiz progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <>
      <Header />
      <div className="quiz-progress-container" style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>📊 My Quiz Progress</h2>

        {loading ? (
          <p>Loading quiz progress...</p>
        ) : progressData.length === 0 ? (
          <p>No quiz progress data found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Course</th>
                <th style={thStyle}>Quiz %</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((entry, index) => {
                const total = entry.answers.length || 1;
                const correct = entry.answers.filter(a => a.isCorrect).length;
                const percent = ((correct / total) * 100).toFixed(0);

                console.log(
                  `Entry ${index}: ${entry.course?.title} - ${percent}%`
                ); 

                return (
                  <tr key={index}>
                    <td style={tdStyle}>
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{entry.course?.title || "Untitled"}</td>
                    <td style={tdStyle}>{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

// Inline styles for quick styling
const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default QuizProgress;
