// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

// import MetaData from "../../more/MetaData";
// import Header from "../Home/Header";
// import Footer from "../../more/Footer";
// import BottomTab from "../../more/BottomTab";
// import ChatSupport from "../../component/Home/chat_support";
// import LikeButton from "../../more/LikeButton";
// import CourseAccessButton from "../../component/Course/CourseAccessButton";

// import "./CourseDetailPage.css";

// const CourseDetailPage = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [images, setImages] = useState([]);
//   const [priceInfo, setPriceInfo] = useState(null);
//   const [recommended, setRecommended] = useState([]);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const { data } = await axios.get(`/api/v2/courses/${id}`);
//         setCourse(data);

//         if (data.images && data.images.length > 0) {
//           const urls = data.images.map((img) =>
//             img.startsWith("http") ? img : `http://localhost:4000${img}`
//           );
//           setImages(urls);
//         } else {
//           setImages(["https://via.placeholder.com/300x200?text=No+Image"]);
//         }

//         const priceRes = await axios.post("/api/checkout/price", {
//           courseId: id,
//         });

//         setPriceInfo(priceRes.data);
//       } catch (err) {
//         console.error("Error loading course:", err);
//       }
//     };

//     const fetchRecommendations = async () => {
//       try {
//         const res = await axios.get(`/api/v2/courses/${id}/recommendations`);
//         setRecommended(res.data.recommended || []);
//       } catch (err) {
//         console.error("Failed to load recommended courses:", err);
//       }
//     };

//     fetchCourse();
//     fetchRecommendations();
//   }, [id]);

//   if (!course || !priceInfo) return <p>Loading...</p>;

//   return (
//     <>
//       <MetaData title={course.title || "Course Details"} />
//       <Header />

//       <div className="course-detail-container">
//         <div className="course-left">
//           <div className="image-hover-wrapper">
//             {images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Course ${index}`}
//                 className="course-image"
//                 style={{
//                   animationDelay: `${index * 3}s`,
//                   zIndex: images.length - index,
//                 }}
//               />
//             ))}
//           </div>

//           <h3 className="course-title">{course.title}</h3>
//           <p className="course-author">{course.author} | Author</p>

//           <div className="course-rating">
//             {[...Array(4)].map((_, i) => (
//               <FontAwesomeIcon icon={faSolidStar} key={i} />
//             ))}
//             <FontAwesomeIcon icon={faRegularStar} />
//           </div>

//           <div className="course-icons">
//             <LikeButton courseId={course._id} />
//           </div>

//           <div className="course-category">
//             <strong>Category:</strong> {course.category?.name || "N/A"}
//           </div>

//           <div className="course-price">
//             <strong>Price:</strong>{" "}
//             {course.type === "Free" ? (
//               "Free"
//             ) : (
//               <>
//                 {priceInfo.offerPrice && priceInfo.offerPrice !== priceInfo.originalPrice ? (
//                   <>
//                     <span style={{ textDecoration: "line-through", color: "gray" }}>
//                       ₹{priceInfo.originalPrice.toFixed(2)}
//                     </span>{" "}
//                     <span style={{ color: "green", fontWeight: "bold" }}>
//                       ₹{priceInfo.finalPrice.toFixed(2)}
//                     </span>
//                   </>
//                 ) : (
//                   <span style={{ fontWeight: "bold" }}>
//                     ₹{priceInfo.finalPrice.toFixed(2)}
//                   </span>
//                 )}
//               </>
//             )}
//           </div>

//           <div className="course-created">
//             <strong>Instructor:</strong> {course.createdBy?.name} ({course.createdBy?.email})
//           </div>
//         </div>

//         <div className="course-right">
//           <p className="breadcrumb">
//             HOME &gt; COURSE &gt; {course.category?.name || "Category"}
//           </p>

//           <div className="course-info-box">
//             <h2>What you'll learn:</h2>
//             <p>{course.description}</p>

//             <h3>Lessons</h3>
//             <ul className="lesson-list">
//               {course.lessons && course.lessons.length > 0 ? (
//                 course.lessons.map((lesson) => (
//                   <li key={lesson._id} className="lesson-item">
//                     <strong>{lesson.title}</strong>
//                   </li>
//                 ))
//               ) : (
//                 <li>No lessons available.</li>
//               )}
//             </ul>

//             <CourseAccessButton course={course} />
//           </div>

//           {/* ❤️ Personalized Course Recommendations */}
//           {recommended.length > 0 && (
//             <div className="recommendation-section">
//               <h3>❤️ You might also like</h3>
//               <div className="recommended-grid">
//                 {recommended.map((rec) => (
//                   <div className="recommended-card" key={rec._id}>
//                     <img
//                       src={
//                         rec.image?.startsWith("http")
//                           ? rec.image
//                           : `http://localhost:4000${rec.image}`
//                       }
//                       alt={rec.name}
//                     />
//                     <h4>{rec.name}</h4>
//                     <p>Rs. {rec.price}</p>
//                     <a href={`/course/${rec._id}`} className="view-btn">
//                       View
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//       <BottomTab />
//       <ChatSupport />
//     </>
//   );
// };

// export default CourseDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import ChatSupport from "../../component/Home/chat_support";
import LikeButton from "../../more/LikeButton";
import CourseAccessButton from "../../component/Course/CourseAccessButton";

import "./CourseDetailPage.css";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [images, setImages] = useState([]);
  const [priceInfo, setPriceInfo] = useState(null);
  const [recommended, setRecommended] = useState([]);

  // Helper to resolve image path
  const getCourseImage = (rec) => {
    if (rec.images && rec.images.length > 0) {
      return rec.images[0].startsWith("http")
        ? rec.images[0]
        : `http://localhost:4000${rec.images[0]}`;
    } else if (rec.image) {
      return rec.image.startsWith("http")
        ? rec.image
        : `http://localhost:4000${rec.image}`;
    } else {
      return "https://via.placeholder.com/300x200?text=No+Image";
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}`);
        setCourse(data);

        setImages(
          data.images?.length > 0
            ? data.images.map((img) =>
                img.startsWith("http") ? img : `http://localhost:4000${img}`
              )
            : ["https://via.placeholder.com/300x200?text=No+Image"]
        );

        const priceRes = await axios.post("/api/checkout/price", {
          courseId: id,
        });

        setPriceInfo(priceRes.data);
      } catch (err) {
        console.error("Error loading course:", err);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`/api/v2/courses/${id}/recommendations`);
        console.log("🧠 Recommended courses received:", res.data.recommended);
        setRecommended(res.data.recommended || []);
      } catch (err) {
        console.error("Failed to load recommended courses:", err);
      }
    };

    fetchCourse();
    fetchRecommendations();
  }, [id]);

  if (!course || !priceInfo) return <p>Loading...</p>;

  return (
    <>
      <MetaData title={course.title || "Course Details"} />
      <Header />

      <div className="course-detail-container">
        <div className="course-left">
          <div className="image-hover-wrapper">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Course ${index}`}
                className="course-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
            ))}
          </div>

          <h3 className="course-title">{course.title}</h3>
          <p className="course-author">{course.author} | Author</p>

          <div className="course-rating">
            {[...Array(4)].map((_, i) => (
              <FontAwesomeIcon icon={faSolidStar} key={i} />
            ))}
            <FontAwesomeIcon icon={faRegularStar} />
          </div>

          <div className="course-icons">
            <LikeButton courseId={course._id} />
          </div>

          <div className="course-category">
            <strong>Category:</strong> {course.category?.name || "N/A"}
          </div>

          <div className="course-price">
            <strong>Price:</strong>{" "}
            {course.type === "Free" ? (
              "Free"
            ) : priceInfo.offerPrice &&
              priceInfo.offerPrice !== priceInfo.originalPrice ? (
              <>
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  ₹{priceInfo.originalPrice.toFixed(2)}
                </span>{" "}
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ₹{priceInfo.finalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: "bold" }}>
                ₹{priceInfo.finalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="course-created">
            <strong>Instructor:</strong> {course.createdBy?.name} (
            {course.createdBy?.email})
          </div>
        </div>

        <div className="course-right">
          <p className="breadcrumb">
            HOME &gt; COURSE &gt; {course.category?.name || "Category"}
          </p>

          <div className="course-info-box">
            <h2>What you'll learn:</h2>
            <p>{course.description}</p>

            <h3>Lessons</h3>
            <ul className="lesson-list">
              {course.lessons?.length > 0 ? (
                course.lessons.map((lesson) => (
                  <li key={lesson._id} className="lesson-item">
                    <strong>{lesson.title}</strong>
                  </li>
                ))
              ) : (
                <li>No lessons available.</li>
              )}
            </ul>

            <CourseAccessButton course={course} />
          </div>

          {/* ❤️ Recommended Section */}
          {recommended.length > 0 && (
            <div className="recommendation-section">
              <h3>❤️ You might also like</h3>
              <div className="recommended-grid">
                {recommended.map((rec) => (
                  <div className="recommended-card" key={rec._id}>
                    <img
                      src={getCourseImage(rec)}
                      alt={rec.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                      className="recommended-image"
                    />
                    <h4>{rec.title}</h4>
                    <p>Rs. {rec.price}</p>
                    <a href={`/course/${rec._id}`} className="view-btn">
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <BottomTab />
      <ChatSupport />
    </>
  );
};

export default CourseDetailPage;
