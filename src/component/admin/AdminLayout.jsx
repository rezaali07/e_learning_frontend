import React from "react";
import { Link } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          {/* You can add more admin menu items here */}
        </ul>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
