// CategoryColleges.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Colleges.css";
import Header from "../Home/Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";

const BACKEND_URL = "http://localhost:4000";

const fixImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  let cleanPath = img.replace(/\\/g, "/");
  const idx = cleanPath.indexOf("/uploads");
  if (idx !== -1) cleanPath = cleanPath.substring(idx);
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
  return BACKEND_URL + cleanPath;
};

const CategoryColleges = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(`/api/v2/college-categories/${slug}`);
        setCategory({ ...catRes.data, image: fixImageUrl(catRes.data.image) });

        const collegeRes = await axios.get("/api/v2/colleges");
        const filtered = collegeRes.data.filter((col) =>
          col.collegeCategories?.some(
            (c) => c === catRes.data._id || c._id === catRes.data._id
          )
        );
        setColleges(filtered);
      } catch (err) {
        console.error("Failed to load category page:", err);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <>
      <MetaData title={category?.name || "Category Colleges"} />
      <Header />
      <div className="colleges-page">
        <header className="colleges-header">
          <h1>Category: {category?.name}</h1>
          {category?.image && (
            <img
              src={category.image}
              alt={category.name}
              style={{ height: 150, borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <p>{category?.description || "Browse all colleges in this category."}</p>
        </header>

        <div className="colleges-list">
          {colleges.map((college) => (
            <div className="college-card" key={college._id}>
              <img
                src={fixImageUrl(college.coverImage)}
                alt={college.name}
              />
              <div className="card-content">
                <h2>{college.name}</h2>
                <p>
                  {college.city}, {college.province}
                </p>
                <p className="card-tags">
                  Programs: {college.collegePrograms?.length || 0} | Hostel: {college.hostelAvailable ? "Yes" : "No"} | Library: {college.library ? "Yes" : "No"}
                </p>
                <Link to={`/college/${college.slug}`} className="btn-view">
                  View College
                </Link>
              </div>
            </div>
          ))}
          {colleges.length === 0 && <p>No colleges found in this category.</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryColleges;