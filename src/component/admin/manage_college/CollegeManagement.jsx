// src/component/admin/CollegeManagement.jsx
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./CollegeManagement.css";

const CollegeManagement = () => {
  const history = useHistory();

  return (
    <div className="college-management-container">
      <Sidebar />
      <main className="college-management-main">
        <h1>College Management</h1>
        <div className="college-management-buttons">
          <button onClick={() => history.push("/admin/addCollege")}>Add College</button>
          <button onClick={() => history.push("/admin/editCollege")}>Edit College</button>
          <button onClick={() => history.push("/admin/collegeCategoriesPrograms")}>Categories</button>
          <button onClick={() => history.push("/admin/collegeCategoriesPrograms")}>Programs</button>
        </div>
      </main>
    </div>
  );
};

export default CollegeManagement;
