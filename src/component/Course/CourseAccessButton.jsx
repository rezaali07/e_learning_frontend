import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CourseAccessButton = ({ course }) => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [isPurchased, setIsPurchased] = useState(false);

  const userId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!token || !userId || !course?._id) return;

      try {
        const { data } = await axios.get("/api/v2/courses/purchased", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const hasCourse = data.courses.some((c) => c._id === course._id);
        setIsPurchased(hasCourse);
      } catch (error) {
        console.error("Error checking purchase:", error);
      }
    };

    checkPurchaseStatus();
  }, [course, token, userId]);

  const handleAccess = () => {
    if (!token) {
      alert("Please login to continue.");
      return;
    }

    const isFree = course.type === "Free" || course.price === 0;

    if (isFree || isPurchased) {
      history.push(`/course/${course._id}/learn`);
    } else {
      // Redirect to custom Stripe Payment Page
      history.push(`/payment/${course._id}`);
    }
  };

  if (!course) return null;

  const isFree = course.type === "Free" || course.price === 0;

  return (
    <button className="start-learning-btn" onClick={handleAccess}>
      {isFree || isPurchased ? "Start Learning" : "Buy to Access"}
    </button>
  );
};

export default CourseAccessButton;
