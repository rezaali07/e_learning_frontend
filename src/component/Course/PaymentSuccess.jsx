import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";

const BACKEND_URL = "http://localhost:4000"; // Change this in production

const PaymentSuccess = () => {
  const { transactionId } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState(null);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search);
      const data = query.get("data");

      if (!data) {
        toast.error("Invalid payment response.");
        setLoading(false);
        return;
      }

      try {
        const parsed = JSON.parse(atob(data));
        const courseIdFromStorage = localStorage.getItem("courseIdForPayment");

        if (!parsed.status || parsed.status !== "COMPLETE" || !courseIdFromStorage) {
          toast.error("Invalid payment or course info.");
          setLoading(false);
          return;
        }

        const { transaction_uuid } = parsed;
        setCourseId(courseIdFromStorage);

        // Step 1: Unlock course
        try {
          await axios.post(`/api/v2/courses/${courseIdFromStorage}/purchase`, {
            transactionId: transaction_uuid,
          });
          toast.success("✅ Course unlocked!");
        } catch (err) {
          toast.error("⚠️ Course unlock failed, but payment succeeded.");
        }

        // Step 2: Get course detail
        let course;
        try {
          const courseRes = await axios.get(`/api/v2/courses/${courseIdFromStorage}`);
          course = courseRes.data;
        } catch (err) {
          console.error("Fetch course failed", err);
          toast.error("⚠️ Failed to fetch course detail.");
          setLoading(false);
          return;
        }

        // Step 3: Fetch similar courses
        try {
          if (course?.category?._id) {
            const similarRes = await axios.get(`/api/v2/courses/category/${course.category._id}`);
            const filtered = similarRes.data.filter((c) => c._id !== course._id);
            setSimilarCourses(filtered);
          }
        } catch (err) {
          console.error("Fetch similar failed", err);
          toast.warn("Could not load similar courses.");
        }

      } catch (err) {
        console.error("Parsing failed", err);
        toast.error("Something went wrong during payment handling.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const goToCourse = () => {
    if (courseId) {
      history.push(`/course/${courseId}/learn`); 
    }
  };

  // Fix image urls (support multiple images or single image fallback)
  const fixImageUrls = (course) => {
    if (course.images && course.images.length > 0) {
      return course.images.map((img) =>
        img.startsWith("http") ? img : `${BACKEND_URL}${img.startsWith("/") ? "" : "/"}${img}`
      );
    } else if (course.courseImage) {
      return [
        course.courseImage.startsWith("http")
          ? course.courseImage
          : `${BACKEND_URL}${course.courseImage.startsWith("/") ? "" : "/"}${course.courseImage}`,
      ];
    }
    return ["https://via.placeholder.com/300x200?text=No+Image"];
  };

  if (loading) return <Loading />;

  if (!showSuccess) {
    return (
      <>
        <MetaData title="Payment Success" />
        <Header />
        <Footer />
        <ToastContainer position="bottom-center" autoClose={4000} />
      </>
    );
  }

  return (
    <>
      <MetaData title="Payment Success" />
      <Header />
      <div className="paymentContainer">
        <div className="paymentForm">
          <button
            className="closeBtn"
            aria-label="Close payment success"
            onClick={() => setShowSuccess(false)}
          >
            &times;
          </button>

          <h2>✅ Payment Successful</h2>
          <p>Your payment was completed successfully.</p>
          <button onClick={goToCourse} className="paymentFormBtn">
            Start Learning
          </button>
        </div>

        {similarCourses.length > 0 && (
          <div className="similarCourses">
            <h3>📚 📚 Recommended for You</h3>
            <div className="similarCoursesGrid">
              {similarCourses.map((course) => {
                const images = fixImageUrls(course);

                return (
                  <div className="courseCard" key={course._id}>
                    <div
                      className="image-hover-wrapper"
                      onClick={() => history.push(`/course/${course._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={course.title}
                          className="course-image"
                          style={{ animationDelay: `${i * 1}s`, zIndex: images.length - i }}
                        />
                      ))}
                    </div>

                    <h4
                      className="course-title"
                      onClick={() => history.push(`/course/${course._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {course.title}
                    </h4>

                    <p className="course-author">{course.author?.trim() || "Unknown"} | Author</p>

                    <p className="course-price-section">
                      {course.type === "Paid" ? (
                        <span className="course-price">₹{course.price}</span>
                      ) : (
                        <span className="free-badge">FREE</span>
                      )}
                    </p>

                    <button
                      className="viewBtn"
                      onClick={() => history.push(`/course/${course._id}`)}
                    >
                      View Course
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer position="bottom-center" autoClose={4000} />
    </>
  );
};

export default PaymentSuccess;
