import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Users.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/v2/admin/users", {
          withCredentials: true,
        });

        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          toast.error("Invalid user data format.");
        }
      } catch (error) {
        toast.error("Failed to fetch users.");
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "" });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/api/v2/admin/user/${id}`, formData, {
        withCredentials: true,
      });

      toast.success("User updated");
      setEditingUser(null);

      const { data } = await axios.get("/api/v2/admin/users", {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/v2/admin/user/${id}`, {
        withCredentials: true,
      });

      toast.success("User deleted");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="users-container">
        <h2>All Users</h2>
        <div className="user-cards">
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div className="user-card" key={user._id}>
                {editingUser === user._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick={() => handleUpdate(user._id)}>Save</button>
                    <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                  </div>
                ) : (
                  <>
                    <img
                      src={user.avatar?.url || "/default_avatar.png"}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <p>Role: {user.role}</p>
                    <div className="card-actions">
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
};

export default Users;
