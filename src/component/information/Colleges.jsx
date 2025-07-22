import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Colleges.css";
import Header from "../Home/Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";

const BACKEND_URL = "http://localhost:4000";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");

  const fixImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http") || img.startsWith("https")) return img;

    let cleanPath = img.replace(/\\/g, "/");
    const driveLetterRegex = /^[a-zA-Z]:\//;
    if (driveLetterRegex.test(cleanPath)) {
      const idx = cleanPath.indexOf("/uploads");
      cleanPath = idx !== -1 ? cleanPath.substring(idx) : "";
    }

    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
    return BACKEND_URL + cleanPath;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, categoriesRes, programsRes] = await Promise.all([
          axios.get("/api/v2/colleges"),
          axios.get("/api/v2/college-categories"),
          axios.get("/api/v2/college-programs"),
        ]);

        setColleges(collegesRes.data);

        setCategories(
          categoriesRes.data.map((cat) => ({
            ...cat,
            image: fixImageUrl(cat.image),
          }))
        );

        setPrograms(
          programsRes.data.map((prog) => ({
            ...prog,
            image: fixImageUrl(prog.image),
          }))
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredColleges = colleges.filter((college) => {
    return (
      college.name.toLowerCase().includes(search.toLowerCase()) ||
      (college.city && college.city.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <>
      <MetaData title="Colleges in Nepal" />
      <Header />
      <div className="colleges-page">
        <header className="colleges-header">
          <h1>Explore Colleges in Nepal</h1>

          {/* Search Box */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search colleges by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <div className="search-results">
                {filteredColleges.slice(0, 5).map((college) => (
                  <Link key={college._id} to={`/college/${college.slug}`}>
                    {college.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Category Cards */}
          <section className="categories-section">
            <h2>Categories</h2>
            <div className="categories-cards">
              {categories.map((cat) => (
                <Link
                  to={`/college-category/${cat.slug}`}
                  key={cat._id}
                  className="category-card"
                  title={cat.name}
                >
                  <img
                    src={cat.image || "https://via.placeholder.com/300x150?text=No+Image"}
                    alt={cat.name}
                    className="category-image"
                  />
                  <div className="category-name">{cat.name}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Program Cards */}
          <section className="programs-section">
            <h2>Programs</h2>
            <div className="programs-cards">
              {programs.map((prog) => (
                <Link
                  to={`/college-program/${prog.slug}`}
                  key={prog._id}
                  className="program-card"
                  title={prog.name}
                >
                  <img
                    src={prog.image || "https://via.placeholder.com/300x150?text=No+Image"}
                    alt={prog.name}
                    className="program-image"
                  />
                  <div className="program-name">{prog.name}</div>
                </Link>
              ))}
            </div>
          </section>
        </header>

        {/* Colleges List */}
        <div className="colleges-list">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <div className="college-card" key={college._id}>
                <img
                  src={
                    fixImageUrl(college.coverImage) ||
                    "https://via.placeholder.com/300x150?text=No+Image"
                  }
                  alt={college.name}
                />
                <div className="card-content">
                  <h2>{college.name}</h2>
                  <p>
                    {college.city}, {college.province}
                  </p>
                  <p className="card-tags">
                    Programs: {college.collegePrograms?.length || 0} | Hostel:{" "}
                    {college.hostelAvailable ? "Yes" : "No"} | Library:{" "}
                    {college.library ? "Yes" : "No"}
                  </p>
                  <a href={`/college/${college.slug}`} className="btn-view">
                    View College
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No colleges found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Colleges;
