// src/component/Admin/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/courses">Courses</Link></li>
        <li><Link to="/admin/categories">Manage Category</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/addCourse">Add Course</Link></li>
        <li><Link to="/admin/lessonManagement">Lesson Management</Link></li>
        <li><Link to="/admin/quizManagement">Quiz Management</Link></li>
        <li><Link to="/admin/earnings">Earnings Management</Link></li>
        <li><Link to="/admin/notifications">Notification Management</Link></li>
        <li><Link to="/admin/offerSettings">Offer Management</Link></li>
        <li><Link to="/admin/CollegeManagement">College Management</Link></li>
        <li><Link to="/admin/adminExamManagement">Exam Routine Management</Link></li>
      </ul>
    </div>  
  );
};

export default Sidebar;
