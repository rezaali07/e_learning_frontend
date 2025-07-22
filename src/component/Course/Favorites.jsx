import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import "./Favorites.css";
import { jwtDecode } from "jwt-decode";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/v2/courses/favorited", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resolvedCourses = (response.data.courses || []).map((course) => {
        const resolvedImages = course.images?.map((img) => {
          const imageUrl = typeof img === "string" ? img : img?.url;
          return imageUrl?.startsWith("http")
            ? imageUrl
            : `http://localhost:4000${imageUrl}`;
        }) || ["https://via.placeholder.com/300x200?text=No+Image"];

        return { ...course, resolvedImages };
      });

      setFavorites(resolvedCourses);
    } catch (error) {
      console.error("Error fetching favorite courses:", error);
    }
  };

  const handleRemove = async (courseId) => {
    try {
      await axios.post(
        `/api/v2/courses/${courseId}/unfavorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites((prev) => prev.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  const handleBuy = async (course) => {
    if (!token) {
      alert("Please login to continue.");
      return;
    }

    const isFree = course.type === "Free" || course.price === 0;

    try {
      const { data } = await axios.get("/api/v2/courses/purchased", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const isPurchased = data.courses.some((c) => c._id === course._id);

      if (isFree || isPurchased) {
        // If free or already purchased, go to learning page
        history.push(`/course/${course._id}/learn`);
      } else {
        // Paid course and not purchased, go to payment
        history.push(`/payment/${course._id}`);
      }

      // Also remove from favorites (after attempting to access)
      await axios.post(`/api/v2/courses/${course._id}/unfavorite`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((c) => c._id !== course._id));
    } catch (error) {
      console.error("Error handling course buy/access:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <Header />
      <div className="favorites-container">
        <h2>Your Favorite Courses</h2>
        {favorites.length === 0 ? (
          <p className="empty-text">No favorite courses found.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((course) => (
              <div className="favourite-card" key={course._id}>
                <img
                  src={course.resolvedImages?.[0]}
                  alt={course.title}
                  className="favourite-image"
                />
                <h3>{course.title}</h3>
                <p className="price">₹{course.price}</p>
                <div className="button-group">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(course._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="buy-btn"
                    onClick={() => handleBuy(course)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
