// // src/component/Common/LikeButton.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// const LikeButton = ({ courseId }) => {
//   const [liked, setLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);

//   const token = localStorage.getItem("token");
//   const currentUserId = token ? jwtDecode(token).id : null;

//   const fetchCourseLikes = async () => {
//     try {
//       const { data } = await axios.get(`/api/v2/courses/${courseId}`);
//       setLikesCount(data.likes || 0);
//       setLiked(data.likedBy?.includes(currentUserId));
//     } catch (err) {
//       console.error("Error fetching course like state:", err);
//     }
//   };

//   useEffect(() => {
//     if (courseId && currentUserId) {
//       fetchCourseLikes();
//     }
//   }, [courseId, currentUserId]);

//   const handleToggleLike = async () => {
//     if (!token) {
//       alert("Please login to like a course");
//       return;
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       if (liked) {
//         await axios.post(`/api/v2/courses/${courseId}/unlike`, {}, config);
//         setLiked(false);
//         setLikesCount((prev) => Math.max(prev - 1, 0));
//       } else {
//         await axios.post(`/api/v2/courses/${courseId}/like`, {}, config);
//         setLiked(true);
//         setLikesCount((prev) => prev + 1);
//       }
//     } catch (err) {
//       console.error("Error toggling like:", err);
//     }
//   };

//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
//       <FontAwesomeIcon
//         icon={faThumbsUp}
//         className={`icon ${liked ? "liked" : ""}`}
//         onClick={handleToggleLike}
//         title={liked ? "Unlike" : "Like"}
//         style={{ cursor: "pointer" }}
//       />
//       <span>{likesCount}</span>
//     </span>
//   );
// };

// export default LikeButton;


// src/component/Common/LikeButton.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ courseId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  const fetchCourseLikes = async () => {
    try {
      // ✅ Always fetch public like count
      const { data } = await axios.get(`/api/v2/courses/${courseId}/likes`);
      setLikesCount(data.likes || 0);

      // ✅ If logged in, check if user has liked it
      if (currentUserId) {
        const detailRes = await axios.get(`/api/v2/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLiked(detailRes.data.likedBy?.includes(currentUserId));
      }
    } catch (err) {
      console.error("Error fetching course like state:", err);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseLikes();
    }
  }, [courseId]);

  const handleToggleLike = async () => {
    if (!token) {
      alert("Please login to like a course");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (liked) {
        await axios.post(`/api/v2/courses/${courseId}/unlike`, {}, config);
        setLiked(false);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      } else {
        await axios.post(`/api/v2/courses/${courseId}/like`, {}, config);
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
      <FontAwesomeIcon
        icon={faThumbsUp}
        className={`icon ${liked ? "liked" : ""}`}
        onClick={handleToggleLike}
        title={token ? (liked ? "Unlike" : "Like") : "Login to like"}
        style={{
          cursor: token ? "pointer" : "not-allowed",
          opacity: token ? 1 : 0.5,
        }}
      />
      <span>{likesCount}</span>
    </span>
  );
};

export default LikeButton;
