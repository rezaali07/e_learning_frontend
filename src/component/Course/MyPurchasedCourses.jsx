import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import "./MyPurchasedCourses.css";

const MyPurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const { data } = await axios.get("/api/v2/courses/purchased");
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Failed to fetch purchased courses", err);
      }
    };

    fetchPurchasedCourses();
  }, []);

  const handleStartLearning = (courseId) => {
    history.push(`/course/${courseId}/learn`);
  };

  return (
    <>
      <MetaData title="My Purchased Courses" />
      <Header />
      <div className="purchased-courses-container">
        <h2>My Purchased Courses</h2>
        {courses.length === 0 ? (
          <p>You haven't purchased any courses yet.</p>
        ) : (
          <div className="purchased-course-grid">
            {courses.map((course) => (
              <div key={course._id} className="purchased-course-card">
                <img
                  src={
                    course.images?.[0]?.startsWith("http")
                      ? course.images[0]
                      : `http://localhost:4000${course.images?.[0] || ""}`
                  }
                  alt={course.title}
                  className="course-img"
                />
                <h3>{course.title}</h3>
                <button
                  className="start-learning-btn"
                  onClick={() => handleStartLearning(course._id)}
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default MyPurchasedCourses;
