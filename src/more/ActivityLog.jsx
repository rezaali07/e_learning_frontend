import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Home/Header";
import Footer from "../more/Footer";
import "./ActivityLog.css";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    try {
      const res = await axios.get("/api/v2/courses/activity/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const logs = res.data?.activityLog || [];
      const reversed = logs.reverse();
      setActivities(reversed);
      setFilteredActivities(reversed);
    } catch (err) {
      console.error("Error fetching activity log:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === "all") {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((item) => item.action === value);
      setFilteredActivities(filtered);
    }
  };

  const renderDetails = (log) => {
    if (log.action === "quiz_attempt") {
      // Expecting format like "7/10"
      if (log.details?.includes("/")) {
        const [score, total] = log.details.split("/").map(Number);
        if (!isNaN(score) && !isNaN(total)) {
          return `Score: ${score} of ${total}`;
        }
      }
    }
    return log.details || "-";
  };

  return (
    <>
      <Header />
      <div className="activity-container">
        <h2>📜 My Activity History</h2>

        <div className="filter-container">
          <label>Filter by Action: </label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="liked">Liked</option>
            <option value="favorited">Favorited</option>
            <option value="quiz_attempt">Quiz Attempt</option>
            <option value="course_started">Course Started</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredActivities.length === 0 ? (
          <p>No activity found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Action</th>
                  <th>Course</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((log, index) => (
                  <tr key={log._id}>
                    <td>{index + 1}</td>
                    <td>{log.action}</td>
                    <td>{log.course?.title || "Unknown"}</td>
                    <td>{renderDetails(log)}</td>
                    <td>{new Date(log.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ActivityLog;
