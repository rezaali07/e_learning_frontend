import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

import LikeButton from "../../more/LikeButton";
import FavoriteButton from "../../more/FavoriteButton";
import CourseAccessButton from "../../component/Course/CourseAccessButton";

import "./CourseCard.css";

const CourseCard = ({ course }) => {
  const [fullCourse, setFullCourse] = useState(null);
  const [images, setImages] = useState([]);
  const [offerPrice, setOfferPrice] = useState(null);
  const [settings, setSettings] = useState(null);

  const history = useHistory();
  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    let isMounted = true;

    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${course._id}`);

        if (isMounted) {
          setFullCourse(data);
          setImages(
            data.images?.map((img) =>
              img.startsWith("http") ? img : `http://localhost:4000${img}`
            ) || ["https://via.placeholder.com/300x200?text=No+Image"]
          );

          // Fetch settings after course is loaded
          fetchSettings(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading course:", err);
        }
      }
    };

    const fetchSettings = async (loadedCourse) => {
      try {
        const { data } = await axios.get("/api/global-settings");
        if (data.settings) {
          setSettings(data.settings);

          const now = new Date();
          const { globalOfferPercentage, globalOfferStart, globalOfferEnd } = data.settings;
          const start = new Date(globalOfferStart);
          const end = new Date(globalOfferEnd);

          if (
            loadedCourse &&
            loadedCourse.type === "Paid" &&
            globalOfferPercentage &&
            start <= now &&
            now <= end
          ) {
            const discounted = loadedCourse.price - (loadedCourse.price * globalOfferPercentage) / 100;
            setOfferPrice(discounted.toFixed(2));
          }
        }
      } catch (err) {
        console.error("Error fetching global settings:", err);
      }
    };

    fetchCourse();

    return () => {
      isMounted = false;
    };
  }, [course._id]);

  const goToCourseDetail = () => {
    history.push(`/course/${course._id}`);
  };

  if (!fullCourse) return <p>Loading...</p>;

  return (
    <div className="course-card">
      <div
        className="image-hover-wrapper"
        onClick={goToCourseDetail}
        style={{ cursor: "pointer" }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Course ${index}`}
            className="course-image"
            style={{
              animationDelay: `${index * 1}s`,
              zIndex: images.length - index,
            }}
          />
        ))}
      </div>

      <div className="course-info">
        <h3
          className="course-title"
          onClick={goToCourseDetail}
          style={{ cursor: "pointer" }}
        >
          {fullCourse.title}
        </h3>

        <p className="course-author">
          {fullCourse.author?.trim() || "Unknown"} | Author
        </p>

        <div className="course-price-section">
          {fullCourse.type === "Paid" ? (
            offerPrice ? (
              <>
                <span className="course-price original">₹{fullCourse.price}</span>
                <span className="course-price discounted">₹{offerPrice}</span>
              </>
            ) : (
              <span className="course-price">₹{fullCourse.price}</span>
            )
          ) : (
            <span className="free-badge">FREE</span>
          )}
        </div>

        <div className="course-rating">
          {[...Array(4)].map((_, i) => (
            <FontAwesomeIcon icon={faSolidStar} key={i} />
          ))}
          <FontAwesomeIcon icon={faRegularStar} />
        </div>

        <div className="course-icons">
          <LikeButton courseId={course._id} />
          <FavoriteButton courseId={course._id} />
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="icon"
            onClick={goToCourseDetail}
            style={{ cursor: "pointer" }}
          />
        </div>

        <CourseAccessButton course={fullCourse} />
      </div>
    </div>
  );
};

export default CourseCard;
