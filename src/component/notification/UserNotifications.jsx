import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../component/Home/Header";
import Footer from "../../more/Footer";
import MetaData from "../../more/MetaData";
import "./UserNotifications.css";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedIds, setClickedIds] = useState(new Set());
  const currentUserId = localStorage.getItem("userId");

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/api/v2/notifications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `/api/v2/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setClickedIds((prev) => new Set(prev).add(notificationId));
      fetchNotifications();

      setTimeout(() => {
        setClickedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(notificationId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <MetaData title="My Notifications | E-Learning " />
      <Header />

      <div className="user-notifications-container">
        <h2>🔔 My Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          <div className="notifications-list">
            {notifications.map((notif) => {
              const isRead = notif.readBy?.some(
                (id) => id.toString() === currentUserId
              );
              const isClicked = clickedIds.has(notif._id);

              return (
                <div
                  key={notif._id}
                  className={`notification-card ${isRead ? "read" : "unread"}`}
                >
                  <div className="sender-info">
                    <img
                      src={notif.sender?.avatar?.url}
                      alt="Admin"
                      className="sender-avatar"
                    />
                    <strong>{notif.sender?.name || "Admin"}</strong>
                  </div>
                  <p className="message">{notif.message}</p>
                  <small className="date">
                    {notif.createdAt
                      ? new Date(notif.createdAt).toLocaleString()
                      : "No date"}
                  </small>
                  {!isRead && (
                    <button
                      className={`mark-read-btn ${isClicked ? "clicked" : ""}`}
                      onClick={() => markAsRead(notif._id)}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />

      {/* ✅ Floating Button for Accessibility (like Home.jsx) */}
      <div className="floating-eye-btn">
        👁️
        <select
          onChange={(e) => {
            const mode = e.target.value;
            document.body.classList.remove("visual-aid", "dark-mode");
            if (mode === "visual-aid") document.body.classList.add("visual-aid");
            if (mode === "dark") document.body.classList.add("dark-mode");
          }}
        >
          <option value="default">Default</option>
          <option value="visual-aid">Visual Aid</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>
    </>
  );
};

export default UserNotifications;
