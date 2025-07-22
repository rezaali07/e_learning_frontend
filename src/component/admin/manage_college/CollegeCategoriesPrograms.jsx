import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./CollegeManagement.css";

const BACKEND_URL = "http://localhost:4000"; // Adjust as needed

const CollegeCategoriesPrograms = () => {
  const [tab, setTab] = useState("categories");

  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [categoryForm, setCategoryForm] = useState({ name: "", image: null });
  const [programForm, setProgramForm] = useState({ name: "", image: null });

  const [editingCategorySlug, setEditingCategorySlug] = useState(null);
  const [editingProgramSlug, setEditingProgramSlug] = useState(null);

  const fetchData = async () => {
    try {
      const [catRes, progRes] = await Promise.all([
        axios.get("/api/v2/college-categories"), 
        axios.get("/api/v2/college-programs"), 
      ]);
      // Fix image URLs before setting state
      const fixedCategories = catRes.data.map((cat) => ({
        ...cat,
        image: fixImageUrl(cat.image),
      }));
      const fixedPrograms = progRes.data.map((prog) => ({
        ...prog,
        image: fixImageUrl(prog.image),
      }));
      setCategories(fixedCategories);
      setPrograms(fixedPrograms);
    } catch (err) {
      alert("Error loading categories or programs: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fix image URL by removing drive letters and full paths, keeping only /uploads/ path
  const fixImageUrl = (img) => {
    if (!img) return null;

    // Already a full URL
    if (img.startsWith("http") || img.startsWith("https")) return img;

    // Replace backslashes with forward slashes
    let cleanPath = img.replace(/\\/g, "/");

    // Remove drive letter like L:/ or C:/ if present
    const driveLetterRegex = /^[a-zA-Z]:\//;
    if (driveLetterRegex.test(cleanPath)) {
      const idx = cleanPath.indexOf("/uploads");
      if (idx !== -1) cleanPath = cleanPath.substring(idx);
      else cleanPath = ""; // fallback
    }

    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

    return BACKEND_URL + cleanPath;
  };

  const handleCategoryChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCategoryForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setCategoryForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProgramChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProgramForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProgramForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", categoryForm.name);
      if (categoryForm.image) formData.append("categoryImage", categoryForm.image);

      if (editingCategorySlug) {
        await axios.put(`/api/v2/college-categories/${editingCategorySlug}`, formData);
        alert("Category updated");
      } else {
        await axios.post("/api/v2/college-categories", formData);
        alert("Category added");
      }

      setCategoryForm({ name: "", image: null });
      setEditingCategorySlug(null);
      fetchData();
    } catch (err) {
      alert("Error saving category: " + (err.response?.data?.error || err.message));
    }
  };

  const submitProgram = async () => {
    try {
      const formData = new FormData();
      formData.append("name", programForm.name);
      if (programForm.image) formData.append("programImage", programForm.image);

      if (editingProgramSlug) {
        await axios.put(`/api/v2/college-programs/${editingProgramSlug}`, formData);
        alert("Program updated");
      } else {
        await axios.post("/api/v2/college-programs", formData);
        alert("Program added");
      }

      setProgramForm({ name: "", image: null });
      setEditingProgramSlug(null);
      fetchData();
    } catch (err) {
      alert("Error saving program: " + (err.response?.data?.error || err.message));
    }
  };

  const editCategory = (cat) => {
    setCategoryForm({ name: cat.name, image: null }); // Reset image input on edit
    setEditingCategorySlug(cat.slug);
  };

  const editProgram = (prog) => {
    setProgramForm({ name: prog.name, image: null });
    setEditingProgramSlug(prog.slug);
  };

  const deleteCategory = async (slug) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`/api/v2/college-categories/${slug}`);
      fetchData();
    } catch (err) {
      alert("Error deleting category: " + (err.response?.data?.error || err.message));
    }
  };

  const deleteProgram = async (slug) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await axios.delete(`/api/v2/college-programs/${slug}`);
      fetchData();
    } catch (err) {
      alert("Error deleting program: " + (err.response?.data?.error || err.message));
    }
  };

  // Optional: render image preview in form or in list
  const renderImagePreview = (img) => {
    if (!img) return null;
    return (
      <img
        src={img}
        alt="Preview"
        style={{ height: 60, marginLeft: 10, borderRadius: 4, border: "1px solid #ccc" }}
      />
    );
  };

  return (
    <div className="college-management-container">
      <Sidebar />
      <main className="college-management-main">
        <h1>College Categories & Programs</h1>

        <div className="tabs">
          {["categories", "programs"].map((t) => (
            <button
              key={t}
              className={`tab-button ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "categories" && (
          <section>
            <h2>Categories</h2>
            <div className="form-group">
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Category Name"
                value={categoryForm.name}
                onChange={handleCategoryChange}
              />
              <input type="file" name="image" onChange={handleCategoryChange} />
              {editingCategorySlug && renderImagePreview(categories.find(c => c.slug === editingCategorySlug)?.image)}
              <button className="btn btn-add" onClick={submitCategory}>
                {editingCategorySlug ? "Update Category" : "Add Category"}
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          height={40}
                          style={{ borderRadius: 4, border: "1px solid #ccc" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button className="btn btn-delete" onClick={() => deleteCategory(cat.slug)}>
                        Delete
                      </button>
                      <button
                        className="btn btn-add"
                        style={{ backgroundColor: "#007bff" }}
                        onClick={() => editCategory(cat)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {tab === "programs" && (
          <section>
            <h2>Programs</h2>
            <div className="form-group">
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Program Name"
                value={programForm.name}
                onChange={handleProgramChange}
              />
              <input type="file" name="image" onChange={handleProgramChange} />
              {editingProgramSlug && renderImagePreview(programs.find(p => p.slug === editingProgramSlug)?.image)}
              <button className="btn btn-add" onClick={submitProgram}>
                {editingProgramSlug ? "Update Program" : "Add Program"}
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((prog) => (
                  <tr key={prog._id}>
                    <td>{prog.name}</td>
                    <td>
                      {prog.image ? (
                        <img
                          src={prog.image}
                          alt={prog.name}
                          height={40}
                          style={{ borderRadius: 4, border: "1px solid #ccc" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button className="btn btn-delete" onClick={() => deleteProgram(prog.slug)}>
                        Delete
                      </button>
                      <button
                        className="btn btn-add"
                        style={{ backgroundColor: "#007bff" }}
                        onClick={() => editProgram(prog)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
};

export default CollegeCategoriesPrograms;
