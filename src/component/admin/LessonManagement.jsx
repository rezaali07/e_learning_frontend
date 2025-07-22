// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import "./LessonManagement.css";
// import { toast } from "react-toastify";

// const LessonManagement = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [lessonTitle, setLessonTitle] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [content, setContent] = useState("");
//   const [lessons, setLessons] = useState([]);
//   const [activeCard, setActiveCard] = useState(null); // 'add' or 'edit'

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const { data } = await axios.get("/api/v2/courses");
//       setCourses(data);
//     } catch (err) {
//       toast.error("Failed to load courses");
//     }
//   };

//   const handleCourseSelect = async (courseId, cardType) => {
//     setSelectedCourse(courseId);
//     setActiveCard(cardType);

//     try {
//       const { data } = await axios.get(`/api/v2/courses/${courseId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setLessons(data.lessons || []);
//     } catch (err) {
//       toast.error("Failed to load lessons");
//     }
//   };

//   const handleAddLesson = async () => {
//     if (!lessonTitle || !selectedCourse) return toast.warn("Fill in all fields");
//     try {
//       await axios.post(
//         `/api/v2/courses/${selectedCourse}/lessons`,
//         { title: lessonTitle, videoUrl, content },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       toast.success("Lesson added");
//       setLessonTitle("");
//       setVideoUrl("");
//       setContent("");
//       handleCourseSelect(selectedCourse, "add");
//     } catch (err) {
//       toast.error("Failed to add lesson");
//     }
//   };

//   const handleDeleteLesson = async (lessonId) => {
//     if (!window.confirm("Are you sure you want to delete this lesson?")) return;
//     try {
//       await axios.delete(`/api/v2/courses/${selectedCourse}/lessons/${lessonId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       toast.success("Lesson deleted");
//       handleCourseSelect(selectedCourse, "edit");
//     } catch (err) {
//       toast.error("Failed to delete lesson");
//     }
//   };

//   return (
//     <div className="lesson-management-container">
//       <Sidebar />
//       <div className="lesson-content">
//         <h2>Lesson Management</h2>

//         <div className="lesson-cards-container">
//           <div
//             className={`lesson-card-selector ${activeCard === "add" ? "active" : ""}`}
//             onClick={() => setActiveCard("add")}
//           >
//             <h3>Add Lesson</h3>
//             <p>Click to select a course and add lessons.</p>
//           </div>

//           <div
//             className={`lesson-card-selector ${activeCard === "edit" ? "active" : ""}`}
//             onClick={() => setActiveCard("edit")}
//           >
//             <h3>Edit Lesson</h3>
//             <p>Click to select a course and edit/delete lessons.</p>
//           </div>
//         </div>

//         {activeCard && (
//           <>
//             <h4>Select a Course</h4>
//             <table className="course-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Author</th>
//                   <th>Type</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courses.map((course) => (
//                   <tr key={course._id}>
//                     <td>{course.title}</td>
//                     <td>{course.author}</td>
//                     <td>{course.type}</td>
//                     <td>
//                       <button onClick={() => handleCourseSelect(course._id, activeCard)}>
//                         Select
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}

//         {activeCard === "add" && selectedCourse && (
//           <div className="lesson-card active">
//             <h3>Add Lesson to Selected Course</h3>
//             <input
//               type="text"
//               placeholder="Lesson Title"
//               value={lessonTitle}
//               onChange={(e) => setLessonTitle(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Video URL"
//               value={videoUrl}
//               onChange={(e) => setVideoUrl(e.target.value)}
//             />
//             <textarea
//               placeholder="Lesson Content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             />
//             <button onClick={handleAddLesson}>Add Lesson</button>
//           </div>
//         )}

//         {activeCard === "edit" && selectedCourse && (
//           <div className="lesson-card active">
//             <h3>Lessons in Selected Course</h3>
//             {lessons.length === 0 ? (
//               <p>No lessons found.</p>
//             ) : (
//               <ul className="lesson-list">
//                 {lessons.map((lesson) => (
//                   <li key={lesson._id}>
//                     <strong>{lesson.title}</strong>
//                     <div className="lesson-actions">
//                       <button onClick={() => {
//                         setLessonTitle(lesson.title);
//                         setVideoUrl(lesson.videoUrl);
//                         setContent(lesson.content);
//                       }}>Edit</button>
//                       <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LessonManagement;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./LessonManagement.css";
import { toast } from "react-toastify";

const LessonManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [lessons, setLessons] = useState([]);
  const [activeCard, setActiveCard] = useState(null); // 'add' or 'edit'
  const [editingLessonId, setEditingLessonId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/v2/courses");
      setCourses(data);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  const handleCourseSelect = async (courseId, cardType) => {
    setSelectedCourse(courseId);
    setActiveCard(cardType);
    setEditingLessonId(null);

    try {
      const { data } = await axios.get(`/api/v2/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setLessons(data.lessons || []);
    } catch (err) {
      toast.error("Failed to load lessons");
    }
  };

  const handleAddLesson = async () => {
    if (!lessonTitle || !selectedCourse) return toast.warn("Fill in all fields");
    try {
      await axios.post(
        `/api/v2/courses/${selectedCourse}/lessons`,
        { title: lessonTitle, videoUrl, content },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Lesson added");
      resetForm();
      handleCourseSelect(selectedCourse, "add");
    } catch (err) {
      toast.error("Failed to add lesson");
    }
  };

  const handleUpdateLesson = async () => {
    if (!lessonTitle || !videoUrl || !content) {
      return toast.warn("All fields are required");
    }
    try {
      await axios.put(
        `/api/v2/courses/${selectedCourse}/lessons/${editingLessonId}`,
        { title: lessonTitle, videoUrl, content },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Lesson updated");
      resetForm();
      handleCourseSelect(selectedCourse, "edit");
    } catch (err) {
      toast.error("Failed to update lesson");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await axios.delete(`/api/v2/courses/${selectedCourse}/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("Lesson deleted");
      handleCourseSelect(selectedCourse, "edit");
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  const resetForm = () => {
    setLessonTitle("");
    setVideoUrl("");
    setContent("");
    setEditingLessonId(null);
  };

  return (
    <div className="lesson-management-container">
      <Sidebar />
      <div className="lesson-content">
        <h2>Lesson Management</h2>

        <div className="lesson-cards-container">
          <div
            className={`lesson-card-selector ${activeCard === "add" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("add");
              setSelectedCourse(null);
              resetForm();
            }}
          >
            <h3>Add Lesson</h3>
            <p>Click to select a course and add lessons.</p>
          </div>

          <div
            className={`lesson-card-selector ${activeCard === "edit" ? "active" : ""}`}
            onClick={() => {
              setActiveCard("edit");
              setSelectedCourse(null);
              resetForm();
            }}
          >
            <h3>Edit Lesson</h3>
            <p>Click to select a course and edit/delete lessons.</p>
          </div>
        </div>

        {activeCard && (
          <>
            <h4>Select a Course</h4>
            <table className="course-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.author}</td>
                    <td>{course.type}</td>
                    <td>
                      <button onClick={() => handleCourseSelect(course._id, activeCard)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeCard === "add" && selectedCourse && (
          <div className="lesson-card active">
            <h3>Add Lesson to Selected Course</h3>
            <input
              type="text"
              placeholder="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <textarea
              placeholder="Lesson Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleAddLesson}>Add Lesson</button>
          </div>
        )}

        {activeCard === "edit" && selectedCourse && (
          <div className="lesson-card active">
            <h3>Lessons in Selected Course</h3>
            {lessons.length === 0 ? (
              <p>No lessons found.</p>
            ) : (
              <ul className="lesson-list">
                {lessons.map((lesson) => (
                  <li key={lesson._id}>
                    <strong>{lesson.title}</strong>
                    <div className="lesson-actions">
                      <button
                        onClick={() => {
                          setLessonTitle(lesson.title);
                          setVideoUrl(lesson.videoUrl);
                          setContent(lesson.content);
                          setEditingLessonId(lesson._id);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {editingLessonId && (
              <div className="lesson-edit-form">
                <h4>Edit Lesson</h4>
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <textarea
                  placeholder="Lesson Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleUpdateLesson}>Update Lesson</button>
                <button onClick={resetForm} className="cancel-btn">Cancel</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonManagement;
