import React, { useState } from "react";
import axios from "axios";
import "./CourseSearch.css";
import { useHistory } from "react-router-dom";

import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";

const CourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const history = useHistory();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v2/courses/search?search=${searchTerm}`
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCardClick = (id) => {
    history.push(`/course/${id}`);
  };

  return (
    <>
      <Header />

      <div className="search-container">
        <h2 className="search-title">Search Courses</h2>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div
              className="course-card"
              key={course._id}
              onClick={() => handleCardClick(course._id)}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Category:</strong> {course.category?.name}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Type:</strong> {course.type}</p>
              <p><strong>Author:</strong> {course.author}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <BottomTab />
    </>
  );
};

export default CourseSearch;
