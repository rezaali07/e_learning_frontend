import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddCourse.css";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Free");
  const [price, setPrice] = useState(0);
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/v2/categories");
        setCategoryOptions(data.categories || []);
      } catch (error) {
        console.error("Failed to load categories", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !author) {
      return toast.warn("Please fill in all required fields.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("price", type === "Paid" ? price : 0);
    formData.append("author", author);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await axios.post("/api/v2/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success("Course created successfully");
      setTitle("");
      setDescription("");
      setCategory("");
      setType("Free");
      setPrice(0);
      setAuthor("");
      setImages([]);
    } catch (error) {
      console.error("Course creation failed", error);
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <div className="course-add">
  <Sidebar />
  <div className="course-add-panel">
    <h2>Add New Course</h2>
    <form className="course-add-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <label className="course-add-label">Title *</label>
      <input className="course-add-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label className="course-add-label">Description *</label>
      <textarea className="course-add-textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label className="course-add-label">Category *</label>
      <select className="course-add-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">-- Select Category --</option>
        {categoryOptions.map((cat) => (
          <option key={cat._id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <label className="course-add-label">Type *</label>
      <select className="course-add-select" value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="Free">Free</option>
        <option value="Paid">Paid</option>
      </select>

      {type === "Paid" && (
        <>
          <label className="course-add-label">Price (Rs.) *</label>
          <input className="course-add-input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </>
      )}

      <label className="course-add-label">Author *</label>
      <input className="course-add-input" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />

      <label className="course-add-label">Images</label>
      <input className="course-add-input" type="file" multiple accept="image/*" onChange={handleImageChange} />

      <button className="course-add-button" type="submit">Create Course</button>
    </form>
  </div>
</div>

  );
};

export default AddCourse;
