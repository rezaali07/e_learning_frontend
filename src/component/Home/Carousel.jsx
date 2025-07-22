import React from "react";
import Carousel from "react-material-ui-carousel";
import "./Carousel.css";
import image1 from "../../Assets/carousel/image1.png";
import image2 from "../../Assets/carousel/image2.png";
import image3 from "../../Assets/carousel/image3.png";
import image4 from "../../Assets/carousel/image4.png";

const items = [
  {
    image: image1,
    alt: "Family",
  },
  {
    image: image2,
    alt: "Shopping background 1",
  },
  {
    image: image3,
    alt: "Shopping background 2",
  },
  {
    image: image4,
    alt: "Shopping background 3",
  },
];

const CustomCarousel = () => {
  return (
    <div className="carousel-container">
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
            borderRadius: 0,
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

export default CustomCarousel;