import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CollegeDetail.css";
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

const CollegeDetail = () => {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v2/colleges/${slug}`);
        setCollege(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load college details.");
        setCollege(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [slug]);

  if (loading) return <p>Loading college details...</p>;
  if (error) return <p>{error}</p>;
  if (!college) return <p>No college found.</p>;

  const highlights = [
    { icon: "fa-calendar-alt", label: "Established", value: college.established },
    { icon: "fa-university", label: "Type", value: college.type },
    { icon: "fa-link", label: "Affiliation", value: college.affiliation },
    { icon: "fa-envelope", label: "Email", value: college.email },
    { icon: "fa-phone", label: "Phone", value: college.phone },
    { icon: "fa-map-marker-alt", label: "Address", value: `${college.address || ""}, ${college.city}, ${college.district}, ${college.province}` },
    { icon: "fa-bed", label: "Hostel", value: college.hostelAvailable ? "Yes" : "No" },
    { icon: "fa-book", label: "Library", value: college.library ? "Yes" : "No" },
    { icon: "fa-wifi", label: "Wi-Fi", value: college.wifiAvailable ? "Yes" : "No" },
    { icon: "fa-bus", label: "Transportation", value: college.transportation ? "Yes" : "No" },
    { icon: "fa-futbol", label: "Sports", value: college.sportsFacilities ? "Yes" : "No" },
    { icon: "fa-calendar-check", label: "Intakes", value: college.intakes?.join(", ") || "N/A" },
  ];

  return (
    <>
      <MetaData title={college.name} />
      <Header />
      <div className="college-detail-wrapper">
        <div
          className="college-banner"
          style={{
            backgroundImage: `url(${fixImageUrl(college.coverImage)})`,
          }}
        >
          <div className="college-header">
            <img
              src={fixImageUrl(college.logo) || "https://via.placeholder.com/100x100?text=Logo"}
              alt="logo"
              className="college-logo"
            />
            <div className="college-main-info">
              <h1>{college.name}</h1>
              <p>
                {college.city}, {college.province} | Estd: {college.established || "N/A"} | {college.type || "Type Unknown"}
              </p>
              <div className="college-actions">
                <a href="#gallery" className="btn-view-gallery">
                  <i className="fas fa-image"></i> View Gallery
                </a>
                {college.website && (
                  <a
                    className="btn-visit-website"
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe"></i> Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="college-detail-container">
          <div className="college-section1">
            <h2>About {college.name}</h2>
            <p>{college.description || "No description available."}</p>
          </div>

          <div className="college-section highlights">
            <h2>College Highlights</h2>
            <div className="highlight-grid">
              {highlights.map((item, idx) => (
                <div key={idx} className="highlight-card">
                  <i className={`fas ${item.icon}`}></i>
                  <strong>{item.label}</strong>
                  <span>{item.value || "N/A"}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="college-section">
            <h2>Programs Offered</h2>
            {college.collegePrograms?.length > 0 ? (
              <ul className="program-list">
                {college.collegePrograms.map((prog) => (
                  <li key={prog._id || prog}>{typeof prog === "object" ? prog.name : prog}</li>
                ))}
              </ul>
            ) : (
              <p>No programs listed.</p>
            )}
          </div>

          <div className="college-section" id="gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {college.gallery?.length > 0 ? (
                college.gallery.map((img, idx) => (
                  <a key={idx} href={fixImageUrl(img)} target="_blank" rel="noopener noreferrer">
                    <img src={fixImageUrl(img)} alt={`Gallery ${idx}`} className="gallery-image" />
                  </a>
                ))
              ) : (
                <p>No gallery images available.</p>
              )}
            </div>
          </div>

          <div className="back-link-wrapper">
            <Link to="/colleges" className="btn-back">&larr; Back to Colleges</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollegeDetail;