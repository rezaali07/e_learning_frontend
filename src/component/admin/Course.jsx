// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Course.css";
// import Sidebar from "./Sidebar";

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const [editingCourseId, setEditingCourseId] = useState(null);
//   const [editData, setEditData] = useState({
//     title: "",
//     price: "",
//     description: "",
//   });

//   const token = localStorage.getItem("token");

//   const headers = useMemo(() => {
//     return token ? { Authorization: `Bearer ${token}` } : {};
//   }, [token]);

//   useEffect(() => {
//     fetchCourses();
//   }, [headers]);

//   const fetchCourses = async () => {
//     try {
//       const { data } = await axios.get("/api/v2/courses", {
//         headers,
//         withCredentials: true,
//       });

//       if (Array.isArray(data)) {
//         setCourses(data);
//       } else if (Array.isArray(data.courses)) {
//         setCourses(data.courses);
//       } else {
//         setCourses([]);
//         toast.warn("No courses found.");
//       }
//     } catch (error) {
//       toast.error("Failed to load courses.");
//       setCourses([]);
//       console.error("Error fetching courses:", error.response || error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this course?")) return;
//     try {
//       await axios.delete(`/api/v2/courses/${id}`, {
//         headers,
//         withCredentials: true,
//       });
//       toast.success("Course deleted");
//       setCourses((prev) => prev.filter((course) => course._id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || "Failed to delete course.");
//     }
//   };

//   const handleEdit = (course) => {
//     setEditingCourseId(course._id);
//     setEditData({
//       title: course.title || "",
//       price: course.price || "",
//       description: course.description || "",
//     });
//   };

//   const updateCourse = async (id) => {
//     try {
//       await axios.put(`/api/v2/courses/${id}`, editData, {
//         headers,
//         withCredentials: true,
//       });
//       toast.success("Course updated");
//       setEditingCourseId(null);
//       fetchCourses();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   return (
//     <div className="course-admin">
//       <Sidebar />
//       <div className="course-content">
//         <h2>All Courses</h2>
//         <table className="course-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center" }}>
//                   No courses available.
//                 </td>
//               </tr>
//             ) : (
//               courses.map((course) => (
//                 <tr key={course._id}>
//                   <td>
//                     <img
//                       src={
//                         course.images?.[0] ||
//                         "https://via.placeholder.com/100x60?text=No+Image"
//                       }
//                       alt="Course"
//                       style={{ width: "100px" }}
//                     />
//                   </td>
//                   <td>
//                     {editingCourseId === course._id ? (
//                       <input
//                         type="text"
//                         value={editData.title}
//                         onChange={(e) =>
//                           setEditData({ ...editData, title: e.target.value })
//                         }
//                       />
//                     ) : (
//                       course.title
//                     )}
//                   </td>
//                   <td>
//                     {editingCourseId === course._id ? (
//                       <input
//                         type="number"
//                         value={editData.price}
//                         onChange={(e) =>
//                           setEditData({ ...editData, price: e.target.value })
//                         }
//                       />
//                     ) : (
//                       `Rs. ${course.price}`
//                     )}
//                   </td>
//                   <td>
//                     {editingCourseId === course._id ? (
//                       <textarea
//                         value={editData.description}
//                         onChange={(e) =>
//                           setEditData({
//                             ...editData,
//                             description: e.target.value,
//                           })
//                         }
//                       />
//                     ) : (
//                       course.description?.slice(0, 100) + "..."
//                     )}
//                   </td>
//                   <td>
//                     {editingCourseId === course._id ? (
//                       <>
//                         <button onClick={() => updateCourse(course._id)}>
//                           Save
//                         </button>
//                         <button
//                           className="cancel-btn"
//                           onClick={() => setEditingCourseId(null)}
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={() => handleEdit(course)}>Edit</button>
//                         <button onClick={() => handleDelete(course._id)}>
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <ToastContainer position="bottom-center" />
//     </div>
//   );
// };

// export default Course;



import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Course.css";
import Sidebar from "./Sidebar";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [headers]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("/api/v2/courses", {
        headers,
        withCredentials: true,
      });

      if (Array.isArray(data)) {
        setCourses(data);
      } else if (Array.isArray(data.courses)) {
        setCourses(data.courses);
      } else {
        setCourses([]);
        toast.warn("No courses found.");
      }
    } catch (error) {
      toast.error("Failed to load courses.");
      setCourses([]);
      console.error("Error fetching courses:", error.response || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`/api/v2/courses/${id}`, {
        headers,
        withCredentials: true,
      });
      toast.success("Course deleted");
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete course.");
    }
  };

  const handleEdit = (course) => {
    setEditingCourseId(course._id);
    setEditData({
      title: course.title || "",
      price: course.price || "",
      description: course.description || "",
    });
  };

  const updateCourse = async (id) => {
    try {
      await axios.put(`/api/v2/courses/${id}`, editData, {
        headers,
        withCredentials: true,
      });
      toast.success("Course updated");
      setEditingCourseId(null);
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <div className="course-admin">
      <Sidebar />
      <div className="course-content">
        <h2>All Courses</h2>
        <table className="course-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No courses available.
                </td>
              </tr>
            ) : (
              currentCourses.map((course) => (
                <tr key={course._id}>
                  <td>
                    <img
                      src={
                        course.images?.[0] ||
                        "https://via.placeholder.com/100x60?text=No+Image"
                      }
                      alt="Course"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    {editingCourseId === course._id ? (
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                      />
                    ) : (
                      course.title
                    )}
                  </td>
                  <td>
                    {editingCourseId === course._id ? (
                      <input
                        type="number"
                        value={editData.price}
                        onChange={(e) =>
                          setEditData({ ...editData, price: e.target.value })
                        }
                      />
                    ) : (
                      `Rs. ${course.price}`
                    )}
                  </td>
                  <td>
                    {editingCourseId === course._id ? (
                      <textarea
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      course.description?.slice(0, 100) + "..."
                    )}
                  </td>
                  <td>
                    {editingCourseId === course._id ? (
                      <>
                        <button onClick={() => updateCourse(course._id)}>
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setEditingCourseId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(course)}>Edit</button>
                        <button onClick={() => handleDelete(course._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Course;
