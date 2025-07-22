// src/component/Home/CourseSlider.jsx
import React from "react";
import Slider from "react-slick";
import CourseCard from "../Course/CourseCard";
import "./CourseSlider.css";

const CourseSlider = ({ title, courses }) => {
  const settings = {
    dots: false, 
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,         // No arrows as you requested
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="course-section">
      <h2 className="homeHeading">{title}</h2>
      <Slider {...settings} className="course-slider">
        {courses.map((course) => (
          <div key={course._id} className="course-slide-wrapper">
            <CourseCard course={course} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseSlider;
