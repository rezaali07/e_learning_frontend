import React, { useEffect, useState } from "react";
import "./Courses.css";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "../../actions/CourseActions";
import CourseCard from "../../component/Course/CourseCard";
import Header from "./Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import { ToastContainer } from "react-toastify";
import CustomCarousel from "../../component/Home/Carousel";
import ChatSupport from "../../component/Home/chat_support";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil((courses?.length || 0) / coursesPerPage);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MetaData title="E-Learning" />
      <Header />
      <CustomCarousel />

      {loading ? (
        <div>Loading courses...</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : currentCourses?.length > 0 ? (
        <>
          {/* Section Heading */}
          <div className="course-heading-container">
            <h2 className="homeHeading">All Courses</h2>
          </div>

          {/* Course Cards */}
          <div className="course-card-container">
            {currentCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>No courses available</div>
      )}

      <ToastContainer position="bottom-center" autoClose={5000} />
      <Footer />
      <BottomTab />
      <ChatSupport />
    </>
  );
};

export default Courses;
