// src/component/Admin/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

// Import icons
import { FaBook, FaUsers, FaPlusCircle, FaChalkboardTeacher, FaQuestionCircle } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="adminDashboard">
      <Sidebar />
      <div className="dashboardContent">
        <h1>Admin Dashboard</h1>

        <div className="dashboardCards">
          <Link to="/admin/courses" className="card">
            <FaBook className="card-icon" />
            <h2>Courses</h2>
            <p>Manage all courses</p>
          </Link>

          <Link to="/admin/users" className="card">
            <FaUsers className="card-icon" />
            <h2>Users</h2>
            <p>View and manage users</p>
          </Link>

          <Link to="/admin/addCourse" className="card">
            <FaPlusCircle className="card-icon" />
            <h2>Add Course</h2>
            <p>Create a new course</p>
          </Link>

          <Link to="/admin/lessonManagement" className="card">
            <FaChalkboardTeacher className="card-icon" />
            <h2>Add Lesson</h2>
            <p>Add or edit lessons</p>
          </Link>

          <Link to="/admin/quizManagement" className="card">
            <FaQuestionCircle className="card-icon" />
            <h2>Add Quiz</h2>
            <p>Add or edit quizzes</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
