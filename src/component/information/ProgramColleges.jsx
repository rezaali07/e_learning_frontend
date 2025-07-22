// ProgramColleges.jsx
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

const ProgramColleges = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progRes = await axios.get(`/api/v2/college-programs/${slug}`);
        setProgram({ ...progRes.data, image: fixImageUrl(progRes.data.image) });

        const collegeRes = await axios.get("/api/v2/colleges");
        const filtered = collegeRes.data.filter((col) =>
          col.collegePrograms?.some(
            (p) => p === progRes.data._id || p._id === progRes.data._id
          )
        );
        setColleges(filtered);
      } catch (err) {
        console.error("Failed to load program page:", err);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <>
      <MetaData title={program?.name || "Program Colleges"} />
      <Header />
      <div className="colleges-page">
        <header className="colleges-header">
          <h1>Program: {program?.name}</h1>
          {program?.image && (
            <img
              src={program.image}
              alt={program.name}
              style={{ height: 150, borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <p>{program?.description || "Browse all colleges offering this program."}</p>
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
          {colleges.length === 0 && <p>No colleges found for this program.</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProgramColleges;