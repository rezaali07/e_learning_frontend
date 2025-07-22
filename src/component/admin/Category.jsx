// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import "./Category.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");

//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get("/api/v2/categories");
//       setCategories(data.categories || []);
//     } catch (error) {
//       toast.error("Failed to fetch categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Handlers
//   const handleCreate = async () => {
//     if (!name.trim()) return toast.error("Category name required");

//     try {
//       await axios.post("/api/v2/categories", { name }, { withCredentials: true });
//       toast.success("Category created");
//       setName("");
//       fetchCategories();
//     } catch (err) {
//       toast.error("Create failed");
//     }
//   };

//   const handleEdit = (category) => {
//     setEditingId(category._id);
//     setEditName(category.name);
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`/api/v2/categories/${id}`, { name: editName }, { withCredentials: true });
//       toast.success("Category updated");
//       setEditingId(null);
//       setEditName("");
//       fetchCategories();
//     } catch (err) {
//       toast.error("Update failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await axios.delete(`/api/v2/categories/${id}`, { withCredentials: true });
//       toast.success("Category deleted");
//       fetchCategories();
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="dashboard-content">
//         <div className="card-container">

//           {/* Add Category Card */}
//           <div className="card category-card">
//             <h3>Add Category</h3>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter category name"
//             />
//             <button onClick={handleCreate}>Add</button>
//           </div>

//           {/* All Categories Card */}
//           <div className="card category-card">
//             <h3>All Categories</h3>
//             {categories.length === 0 ? (
//               <p>No categories found.</p>
//             ) : (
//               categories.map((cat) => (
//                 <div className="category-row" key={cat._id}>
//                   {editingId === cat._id ? (
//                     <>
//                       <input
//                         type="text"
//                         value={editName}
//                         onChange={(e) => setEditName(e.target.value)}
//                       />
//                       <button onClick={() => handleUpdate(cat._id)}>Save</button>
//                       <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <span>{cat.name}</span>
//                       <div className="row-actions">
//                         <button onClick={() => handleEdit(cat)}>Edit</button>
//                         <button className="delete-btn" onClick={() => handleDelete(cat._id)}>Delete</button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>

//         </div>
//       </div>
//       <ToastContainer position="bottom-center" />
//     </div>
//   );
// };

// export default Category;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Category.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const [showAddCard, setShowAddCard] = useState(true);
  const [showAllCard, setShowAllCard] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v2/categories");
      setCategories(data.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Category name required");
    try {
      await axios.post("/api/v2/categories", { name }, { withCredentials: true });
      toast.success("Category created");
      setName("");
      fetchCategories();
    } catch (err) {
      toast.error("Create failed");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`/api/v2/categories/${id}`, { name: editName }, { withCredentials: true });
      toast.success("Category updated");
      setEditingId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/v2/categories/${id}`, { withCredentials: true });
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="card-container">

          {/* Add Category Card */}
          <div className="card category-card">
            <h3 onClick={() => setShowAddCard(!showAddCard)} className="clickable-title">
              ➕ Add Category
            </h3>
            {showAddCard && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                />
                <button onClick={handleCreate}>Add</button>
              </>
            )}
          </div>

          {/* All Categories Card */}
          <div className="card category-card">
            <h3 onClick={() => setShowAllCard(!showAllCard)} className="clickable-title">
              📁 All Categories
            </h3>
            {showAllCard && (
              <>
                {categories.length === 0 ? (
                  <p>No categories found.</p>
                ) : (
                  categories.map((cat) => (
                    <div className="category-row" key={cat._id}>
                      {editingId === cat._id ? (
                        <>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <button onClick={() => handleUpdate(cat._id)}>Save</button>
                          <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <span>{cat.name}</span>
                          <div className="row-actions">
                            <button onClick={() => handleEdit(cat)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(cat._id)}>Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Category;
