import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./EarningsDashboard.css";

const EarningsDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const { data } = await axios.get("/api/v2/courses/admin/earnings-summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(data);
    } catch (err) {
      console.error("Error fetching earnings summary:", err);
    }
  };

  const fetchPurchasedUsers = async (courseId, courseTitle) => {
    try {
      const { data } = await axios.get(`/api/v2/courses/${courseId}/purchased-users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedUsers(data.purchasedUsers); // make sure key is 'purchasedUsers'
      setSelectedCourseTitle(courseTitle);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching purchased users:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUsers([]);
  };

  if (!summary) return <p>Loading earnings summary...</p>;

  return (
    <div className="earnings-dashboard">
      <Sidebar />
      <div className="earnings-content">
        <h2>📊 Earnings Dashboard</h2>

        <div className="stats-summary">
          <div className="stat-box">
            <h3>Total Revenue</h3>
            <p>Rs. {summary.totalRevenue}</p>
          </div>
          <div className="stat-box">
            <h3>Total Course Sales</h3>
            <p>{summary.totalSales}</p>
          </div>
        </div>

        <h3>📈 Top-Selling Courses</h3>
        <div className="top-selling">
          {summary.topSelling.map((course) => (
            <div key={course.courseId} className="top-course-card">
              <h4>{course.title}</h4>
              <p>Sales: {course.purchaseCount}</p>
              <p>Revenue: Rs. {course.revenue}</p>
            </div>
          ))}
        </div>

        <h3>📦 Revenue Breakdown Per Course</h3>
        <table className="earnings-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Purchases</th>
              <th>Revenue (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {summary.courseStats
              .filter(course => course.purchaseCount > 0)
              .map((course) => (
                <tr
                  key={course.courseId}
                  onClick={() => fetchPurchasedUsers(course.courseId, course.title)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{course.title}</td>
                  <td>{course.purchaseCount}</td>
                  <td>{course.revenue}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Users who purchased: {selectedCourseTitle}</h3>
              <button onClick={closeModal} className="close-button">✖</button>
              {selectedUsers.length > 0 ? (
                <ul>
                  {selectedUsers.map((user) => (
                    <li key={user._id}>
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users have purchased this course.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsDashboard;
