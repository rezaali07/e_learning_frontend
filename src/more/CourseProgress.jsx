// src/component/user/CourseProgress.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Home/Header";
import Footer from "../more/Footer";
import BottomTab from "../more/BottomTab";
import "./CourseProgress.css";

const CourseProgress = () => {
  const [progress, setProgress] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await axios.get("/api/v2/courses/me/course-progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(data.progress || []);
      } catch (err) {
        console.error("Failed to load course progress", err);
      }
    };
    fetchProgress();
  }, [token]);

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString() : "–";

  const calcDays = (start, end) => {
    if (!start || !end) return "–";
    const a = new Date(start);
    const b = new Date(end);
    const ms = b - a;
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return days <= 1 ? "1 day" : `${days} days`;
  };

  return (
    <>
      <Header />
      <div className="course-progress-page">
        <h2>Your Course Progress</h2>
        <table className="progress-table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Course</th>
              <th>Completion %</th>
              <th>Time Spent</th>
            </tr>
          </thead>
          <tbody>
            {progress.length === 0 ? (
              <tr>
                <td colSpan="4">No progress data found.</td>
              </tr>
            ) : (
              progress.map((entry, idx) => {
                const {
                  course = {},
                  startDate,
                  completedDate,
                  lessonsCompleted = [],
                  totalLessons = 0,
                } = entry;

                const completion =
                  totalLessons === 0
                    ? 0
                    : Math.floor(
                        (lessonsCompleted.length / totalLessons) * 100
                      );

                return (
                  <tr key={course._id || idx}>
                    <td>{formatDate(startDate)}</td>
                    <td>{course.title || "Untitled Course"}</td>
                    <td>{completion}%</td>
                    <td>{calcDays(startDate, completedDate)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default CourseProgress;
