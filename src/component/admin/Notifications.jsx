import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Notification.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/api/v2/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotifications(data.notifications.reverse());
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  const handleCreate = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(
        "/api/v2/notifications",
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewMessage("");
      fetchNotifications();
    } catch (err) {
      console.error("Failed to create notification", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v2/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const handleEdit = (id, currentMessage) => {
    setEditingId(id);
    setEditMessage(currentMessage);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `/api/v2/notifications/${editingId}`,
        { message: editMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditingId(null);
      setEditMessage("");
      fetchNotifications();
    } catch (err) {
      console.error("Failed to update notification", err);
    }
  };

  return (
    <div className="admin-notification-layout">
      <Sidebar />

      <div className="admin-notification-main">
        <h2>📢 Admin Notifications</h2>

        {/* Create Notification */}
        <div className="create-notification">
          <textarea
            rows="3"
            placeholder="Type notification..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleCreate}>Send Notification</button>
        </div>

        {/* Notifications Table */}
        <div className="notifications-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Sender</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif, index) => (
                <tr key={notif._id}>
                  <td>{index + 1}</td>
                  <td>
                    {editingId === notif._id ? (
                      <input
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                      />
                    ) : (
                      notif.message
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={notif.sender?.avatar?.url}
                        alt="admin"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                      />
                      {notif.sender?.name}
                    </div>
                  </td>
                  <td>{new Date(notif.createdAt).toLocaleString()}</td>
                  <td>
                    {editingId === notif._id ? (
                      <>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            handleEdit(notif._id, notif.message)
                          }
                        >
                          Edit
                        </button>
                        <button className="deleteBtn" onClick={() => handleDelete(notif._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
