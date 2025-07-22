import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const FavoriteButton = ({ courseId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get("/api/v2/courses/favorited", {
          headers,
        });
        const isFav = data.courses.some((course) => course._id === courseId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [courseId, token]);

  const toggleFavorite = async () => {
    if (!token) return alert("Please log in to manage favorites.");
    setLoading(true);
    try {
      if (isFavorite) {
        await axios.post(`/api/v2/courses/${courseId}/unfavorite`, {}, { headers });
      } else {
        await axios.post(`/api/v2/courses/${courseId}/favorite`, {}, { headers });
      }
      setIsFavorite((prev) => !prev);

      // Dispatch custom event so Header can update favorite count immediately
      window.dispatchEvent(new Event("favoriteUpdated"));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FontAwesomeIcon
      icon={isFavorite ? solidHeart : regularHeart}
      onClick={toggleFavorite}
      title={isFavorite ? "Unfavorite Course" : "Add to Favorites"}
      className={`icon ${isFavorite ? "favorited" : ""}`}
      style={{
        cursor: loading ? "not-allowed" : "pointer",
        color: isFavorite ? "red" : undefined,
        opacity: loading ? 0.6 : 1,
      }}
      disabled={loading}
    />
  );
};

export default FavoriteButton;
