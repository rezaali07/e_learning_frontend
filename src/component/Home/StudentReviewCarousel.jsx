import React from "react";
import Carousel from "react-material-ui-carousel";
import "./StudentReviewCarousel.css"; // ✅ New CSS file
import image1 from "../../Assets/student_review/image1.png";
import image2 from "../../Assets/student_review/image2.png";
import image3 from "../../Assets/student_review/image3.png";
import image4 from "../../Assets/student_review/image4.png";

const items = [
  {
    image: image1,
    alt: "Student 1",
  },
  {
    image: image2,
    alt: "Student 2",
  },
  {
    image: image3,
    alt: "Student 3",
  },
  {
    image: image4,
    alt: "Student 4",
  },
];

const StudentReviewCarousel = () => {
  return (
    <div className="student-carousel-section">
      <h2 className="homeHeading">🌟 What Our Students Say</h2>
      <Carousel
        className="carousel"
        autoPlay={true}
        interval={3000}
        animationDuration={500}
        indicators={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
            color: "#333",
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: "10px",
            textAlign: "center",
          },
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <img src={item.image} alt={item.alt} className="carousel-image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default StudentReviewCarousel;
