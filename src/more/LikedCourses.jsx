import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../component/Home/Header";
import Footer from "../more/Footer";
import BottomTab from "../more/BottomTab";
import Loading from "../more/Loader";
import MetaData from "../more/MetaData";
import "./LikedCourses.css";

const LikedCourses = () => {
  const [likedCourses, setLikedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedCourses = async () => {
      try {
        const { data } = await axios.get("/api/v2/courses/liked");
        setLikedCourses(data.courses || []);
      } catch (error) {
        console.error("Failed to load liked courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedCourses();
  }, []);

  const handleUnlike = async (courseId) => {
    try {
      await axios.post(`/api/v2/courses/${courseId}/unlike`);
      setLikedCourses((prev) => prev.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Failed to unlike course:", error);
    }
  };

  return (
    <>
      <MetaData title="Liked Courses" />
      <Header />
      <div className="liked-courses-page">
        <h2 className="liked-courses-title">❤️ Courses You Liked</h2>
        {loading ? (
          <Loading />
        ) : likedCourses.length === 0 ? (
          <p style={{ textAlign: "center" }}>You haven't liked any courses yet.</p>
        ) : (
          <div className="likedCoursesGrid">
            {likedCourses.map((course) => (
              <Link
                to={`/course/${course._id}`}
                key={course._id}
                className="likedCourseCard"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  src={course?.images?.[0] || "/default-course-img.png"}
                  alt={course.title}
                  className="likedCourseImage"
                />
                <div className="courseContent">
                  <h3>{course.title}</h3>
                  <p>{course.description?.slice(0, 100)}...</p>
                  <p><strong>Type:</strong> {course.type}</p>
                  <p><strong>Price:</strong> {course.price === 0 ? "Free" : `Rs. ${course.price}`}</p>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      handleUnlike(course._id);
                    }}
                  >
                    Remove from Liked
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default LikedCourses;
