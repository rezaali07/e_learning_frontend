// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../Sidebar";
// import "./CollegeManagement.css";

// const EditCollege = () => {
//   const initialFormState = () => ({
//     name: "",
//     description: "",
//     established: "",
//     province: "",
//     district: "",
//     city: "",
//     address: "",
//     latitude: "",
//     longitude: "",
//     website: "",
//     email: "",
//     phone: "",
//     affiliation: "",
//     type: "",
//     collegePrograms: [],
//     collegeCategories: [],
//     intakes: "",
//     hostelAvailable: false,
//     library: false,
//     sportsFacilities: false,
//     wifiAvailable: false,
//     transportation: false,
//     logo: null,
//     coverImage: null,
//     gallery: [],
//     existingLogo: null,
//     existingCoverImage: null,
//     existingGallery: [],
//   });

//   const [colleges, setColleges] = useState([]);
//   const [editingCollegeSlug, setEditingCollegeSlug] = useState(null);
//   const [collegeForm, setCollegeForm] = useState(initialFormState());

//   const [categories, setCategories] = useState([]);
//   const [programs, setPrograms] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [cRes, catRes, pRes] = await Promise.all([
//         axios.get("/api/v2/colleges"),
//         axios.get("/api/v2/college-categories"),
//         axios.get("/api/v2/college-programs"),
//       ]);
//       setColleges(cRes.data);
//       setCategories(catRes.data);
//       setPrograms(pRes.data);
//     } catch (err) {
//       alert("Error loading data: " + err.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox") {
//       setCollegeForm((prev) => ({ ...prev, [name]: checked }));
//     } else if (type === "file") {
//       if (name === "gallery") {
//         setCollegeForm((prev) => ({ ...prev, gallery: Array.from(files) }));
//       } else {
//         setCollegeForm((prev) => ({ ...prev, [name]: files[0] }));
//       }
//     } else {
//       setCollegeForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleMultiSelect = (e) => {
//     const { name, options } = e.target;
//     const values = Array.from(options)
//       .filter((opt) => opt.selected)
//       .map((opt) => opt.value);
//     setCollegeForm((prev) => ({ ...prev, [name]: values }));
//   };

//   const editCollege = (college) => {
//     setCollegeForm({
//       ...initialFormState(),
//       ...college,
//       collegePrograms: college.collegePrograms?.map((p) => p._id || p) || [],
//       collegeCategories: college.collegeCategories?.map((c) => c._id || c) || [],
//       existingLogo: college.logo,
//       existingCoverImage: college.coverImage,
//       existingGallery: college.gallery || [],
//     });
//     setEditingCollegeSlug(college.slug);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const submitCollegeForm = async () => {
//     try {
//       if (!editingCollegeSlug) return alert("Select a college to edit first.");

//       const formData = new FormData();
//       for (const key in collegeForm) {
//         if (["logo", "coverImage", "gallery", "collegePrograms", "collegeCategories", "existingLogo", "existingCoverImage", "existingGallery"].includes(key)) continue;
//         formData.append(key, collegeForm[key]);
//       }

//       collegeForm.collegePrograms.forEach((id) => formData.append("collegePrograms", id));
//       collegeForm.collegeCategories.forEach((id) => formData.append("collegeCategories", id));

//       if (collegeForm.logo instanceof File) formData.append("logo", collegeForm.logo);
//       if (collegeForm.coverImage instanceof File) formData.append("coverImage", collegeForm.coverImage);
//       collegeForm.gallery.forEach((file) => {
//         if (file instanceof File) {
//           formData.append("gallery", file);
//         }
//       });

//       await axios.put(`/api/v2/colleges/${editingCollegeSlug}`, formData);
//       alert("College updated successfully");
//       setEditingCollegeSlug(null);
//       setCollegeForm(initialFormState());
//       fetchData();
//     } catch (err) {
//       alert("Error updating college: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const deleteCollege = async (slug) => {
//     if (!window.confirm("Delete this college?")) return;
//     try {
//       await axios.delete(`/api/v2/colleges/${slug}`);
//       fetchData();
//     } catch (err) {
//       alert("Error deleting college: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const renderImagePreview = (path) => {
//     if (!path) return null;
//     const src = `http://localhost:4000/${path.replaceAll("\\", "/")}`;
//     return <img src={src} alt="preview" style={{ width: "100px", marginTop: "5px" }} />;
//   };

//   return (
//     <div className="college-management-container">
//       <Sidebar />
//       <main className="college-management-main">
//         <h1>Edit Colleges</h1>

//         {editingCollegeSlug && (
//           <div className="form-group multi-column">
//             <div>
//               {["name", "description", "established", "province", "district", "city", "address", "latitude", "longitude", "website", "email", "phone", "affiliation", "type", "intakes"].map((field) => (
//                 <input
//                   key={field}
//                   type={["established", "latitude", "longitude"].includes(field) ? "number" : field === "email" ? "email" : "text"}
//                   name={field}
//                   placeholder={field.replace(/([A-Z])/g, " $1")}
//                   value={collegeForm[field] ?? ""}
//                   onChange={handleInputChange}
//                 />
//               ))}

//               {["hostelAvailable", "library", "sportsFacilities", "wifiAvailable", "transportation"].map((name) => (
//                 <label key={name} className={collegeForm[name] ? "feature-checkbox checked" : "feature-checkbox"}>
//                   <input type="checkbox" name={name} checked={collegeForm[name]} onChange={handleInputChange} />
//                   {name.replace(/([A-Z])/g, " $1")}
//                 </label>
//               ))}

//               <label>
//                 Logo: <input type="file" name="logo" onChange={handleInputChange} />
//                 {renderImagePreview(collegeForm.existingLogo)}
//               </label>

//               <label>
//                 Cover Image: <input type="file" name="coverImage" onChange={handleInputChange} />
//                 {renderImagePreview(collegeForm.existingCoverImage)}
//               </label>

//               <label>
//                 Gallery: <input type="file" name="gallery" multiple onChange={handleInputChange} />
//                 <div className="gallery-preview">
//                   {collegeForm.existingGallery.map((img, i) => (
//                     <span key={i}>{renderImagePreview(img)}</span>
//                   ))}
//                 </div>
//               </label>
//             </div>

//             <div>
//               <label>
//                 Programs:
//                 <select name="collegePrograms" multiple value={collegeForm.collegePrograms} onChange={handleMultiSelect} size={Math.min(5, programs.length)}>
//                   {programs.map((prog) => (
//                     <option key={prog._id} value={prog._id}>
//                       {prog.name}
//                     </option>
//                   ))}
//                 </select>
//               </label>

//               <label>
//                 Categories:
//                 <select name="collegeCategories" multiple value={collegeForm.collegeCategories} onChange={handleMultiSelect} size={Math.min(5, categories.length)}>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>
//           </div>
//         )}

//         {editingCollegeSlug && (
//           <button className="btn btn-add" onClick={submitCollegeForm}>
//             Update College
//           </button>
//         )}

//         <h2>Colleges List</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>City</th>
//               <th>Province</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Programs</th>
//               <th>Categories</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {colleges.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.name}</td>
//                 <td>{c.city}</td>
//                 <td>{c.province}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phone}</td>
//                 <td>{(c.collegePrograms || []).map((p) => p.name || p).join(", ")}</td>
//                 <td>{(c.collegeCategories || []).map((ca) => ca.name || ca).join(", ")}</td>
//                 <td>
//                   <button className="btn btn-delete" onClick={() => deleteCollege(c.slug)}>
//                     Delete
//                   </button>
//                   <button className="btn btn-add" style={{ backgroundColor: "#007bff" }} onClick={() => editCollege(c)}>
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// };

// export default EditCollege;


// // src/component/admin/EditCollege.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../Sidebar";
// import "./CollegeManagement.css";

// const BACKEND_URL = "http://localhost:4000"; // Adjust as needed

// const EditCollege = () => {
//   const [colleges, setColleges] = useState([]);
//   const [editingCollegeSlug, setEditingCollegeSlug] = useState(null);
//   const [collegeForm, setCollegeForm] = useState({
//     name: "",
//     description: "",
//     established: "",
//     province: "",
//     district: "",
//     city: "",
//     address: "",
//     latitude: "",
//     longitude: "",
//     website: "",
//     email: "",
//     phone: "",
//     affiliation: "",
//     type: "",
//     collegePrograms: [],
//     collegeCategories: [],
//     intakes: "",
//     hostelAvailable: false,
//     library: false,
//     sportsFacilities: false,
//     wifiAvailable: false,
//     transportation: false,
//     logo: null,
//     coverImage: null,
//     gallery: [],
//   });

//   const [categories, setCategories] = useState([]);
//   const [programs, setPrograms] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [cRes, catRes, pRes] = await Promise.all([
//         axios.get("/api/v2/colleges"),
//         axios.get("/api/v2/college-categories"),
//         axios.get("/api/v2/college-programs"),
//       ]);
//       setColleges(cRes.data);
//       setCategories(catRes.data);
//       setPrograms(pRes.data);
//     } catch (err) {
//       alert("Error loading data: " + err.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "checkbox") {
//       setCollegeForm((prev) => ({ ...prev, [name]: checked }));
//     } else if (type === "file") {
//       if (name === "gallery") {
//         setCollegeForm((prev) => ({ ...prev, gallery: Array.from(files) }));
//       } else {
//         setCollegeForm((prev) => ({ ...prev, [name]: files[0] }));
//       }
//     } else {
//       setCollegeForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleMultiSelect = (e) => {
//     const { name, options } = e.target;
//     const values = Array.from(options)
//       .filter((opt) => opt.selected)
//       .map((opt) => opt.value);
//     setCollegeForm((prev) => ({ ...prev, [name]: values }));
//   };

//   const editCollege = (college) => {
//     setCollegeForm({
//       ...college,
//       collegePrograms: college.collegePrograms?.map((p) => p._id || p) || [],
//       collegeCategories: college.collegeCategories?.map((c) => c._id || c) || [],
//       logo: college.logo || null,
//       coverImage: college.coverImage || null,
//       gallery: college.gallery || [],
//     });
//     setEditingCollegeSlug(college.slug);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const submitCollegeForm = async () => {
//     try {
//       if (!editingCollegeSlug) return alert("Select a college to edit first.");

//       const formData = new FormData();
//       for (const key in collegeForm) {
//         if (
//           key !== "logo" &&
//           key !== "coverImage" &&
//           key !== "gallery" &&
//           key !== "collegePrograms" &&
//           key !== "collegeCategories"
//         ) {
//           formData.append(key, collegeForm[key]);
//         }
//       }
//       collegeForm.collegePrograms.forEach((id) => formData.append("collegePrograms", id));
//       collegeForm.collegeCategories.forEach((id) => formData.append("collegeCategories", id));
//       if (collegeForm.logo instanceof File) formData.append("logo", collegeForm.logo);
//       if (collegeForm.coverImage instanceof File) formData.append("coverImage", collegeForm.coverImage);
//       if (Array.isArray(collegeForm.gallery)) {
//         collegeForm.gallery.forEach((file) => {
//           if (file instanceof File) formData.append("gallery", file);
//         });
//       }

//       await axios.put(`/api/v2/colleges/${editingCollegeSlug}`, formData);
//       alert("College updated successfully");
//       setEditingCollegeSlug(null);
//       setCollegeForm({
//         name: "",
//         description: "",
//         established: "",
//         province: "",
//         district: "",
//         city: "",
//         address: "",
//         latitude: "",
//         longitude: "",
//         website: "",
//         email: "",
//         phone: "",
//         affiliation: "",
//         type: "",
//         collegePrograms: [],
//         collegeCategories: [],
//         intakes: "",
//         hostelAvailable: false,
//         library: false,
//         sportsFacilities: false,
//         wifiAvailable: false,
//         transportation: false,
//         logo: null,
//         coverImage: null,
//         gallery: [],
//       });
//       fetchData();
//     } catch (err) {
//       alert("Error updating college: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const deleteCollege = async (slug) => {
//     if (!window.confirm("Delete this college?")) return;
//     try {
//       await axios.delete(`/api/v2/colleges/${slug}`);
//       fetchData();
//     } catch (err) {
//       alert("Error deleting college: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const renderImagePreview = (field, label) => {
//     const value = collegeForm[field];
//     if (typeof value === "string") {
//       return (
//         <div>
//           <label>{label}:</label>
//           <img src={`${BACKEND_URL}/uploads/${value}`} alt={label} height={100} />
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="college-management-container">
//       <Sidebar />
//       <main className="college-management-main">
//         <h1>Edit Colleges</h1>

//         {editingCollegeSlug && (
//           <div className="form-group multi-column">
//             <div>
//               {["name", "description", "established", "province", "district", "city", "address", "latitude", "longitude", "website", "email", "phone", "affiliation", "type", "intakes"].map((field) => (
//                 <input
//                   key={field}
//                   type={field === "email" ? "email" : ["established", "latitude", "longitude"].includes(field) ? "number" : "text"}
//                   name={field}
//                   placeholder={field.replace(/([A-Z])/g, ' $1')}
//                   value={collegeForm[field]}
//                   onChange={handleInputChange}
//                 />
//               ))}

//               {["hostelAvailable", "library", "sportsFacilities", "wifiAvailable", "transportation"].map((name) => (
//                 <label key={name} className={collegeForm[name] ? "feature-checkbox checked" : "feature-checkbox"}>
//                   <input type="checkbox" name={name} checked={collegeForm[name]} onChange={handleInputChange} />
//                   {name.replace(/([A-Z])/g, ' $1')}
//                 </label>
//               ))}

//               {renderImagePreview("logo", "Logo Preview")}
//               <label>Logo: <input type="file" name="logo" onChange={handleInputChange} /></label>

//               {renderImagePreview("coverImage", "Cover Image Preview")}
//               <label>Cover Image: <input type="file" name="coverImage" onChange={handleInputChange} /></label>

//               {Array.isArray(collegeForm.gallery) && collegeForm.gallery.map((img, idx) => (
//                 typeof img === "string" && <img key={idx} src={`${BACKEND_URL}/uploads/${img}`} alt="Gallery" height={80} style={{ marginRight: 10 }} />
//               ))}
//               <label>Gallery: <input type="file" name="gallery" multiple onChange={handleInputChange} /></label>
//             </div>

//             <div>
//               <label>Programs:
//                 <select name="collegePrograms" multiple value={collegeForm.collegePrograms} onChange={handleMultiSelect} size={Math.min(5, programs.length)}>
//                   {programs.map((prog) => <option key={prog._id} value={prog._id}>{prog.name}</option>)}
//                 </select>
//               </label>

//               <label>Categories:
//                 <select name="collegeCategories" multiple value={collegeForm.collegeCategories} onChange={handleMultiSelect} size={Math.min(5, categories.length)}>
//                   {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//                 </select>
//               </label>
//             </div>
//           </div>
//         )}

//         {editingCollegeSlug && (
//           <button className="btn btn-add" onClick={submitCollegeForm}>Update College</button>
//         )}

//         <h2>Colleges List</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>City</th>
//               <th>Province</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Programs</th>
//               <th>Categories</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {colleges.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.name}</td>
//                 <td>{c.city}</td>
//                 <td>{c.province}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phone}</td>
//                 <td>{(c.collegePrograms || []).map(p => p.name || p).join(", ")}</td>
//                 <td>{(c.collegeCategories || []).map(ca => ca.name || ca).join(", ")}</td>
//                 <td>
//                   <button className="btn btn-delete" onClick={() => deleteCollege(c.slug)}>Delete</button>
//                   <button className="btn btn-add" style={{ backgroundColor: "#007bff" }} onClick={() => editCollege(c)}>Edit</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// };

// export default EditCollege;


// src/component/admin/EditCollege.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import "./CollegeManagement.css";

const BACKEND_URL = "http://localhost:4000"; // Adjust if your backend runs elsewhere

const EditCollege = () => {
  const [colleges, setColleges] = useState([]);
  const [editingCollegeSlug, setEditingCollegeSlug] = useState(null);
  const [collegeForm, setCollegeForm] = useState({
    name: "",
    description: "",
    established: "",
    province: "",
    district: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    website: "",
    email: "",
    phone: "",
    affiliation: "",
    type: "",
    collegePrograms: [],
    collegeCategories: [],
    intakes: "",
    hostelAvailable: false,
    library: false,
    sportsFacilities: false,
    wifiAvailable: false,
    transportation: false,
    logo: null,
    coverImage: null,
    gallery: [],
  });

  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cRes, catRes, pRes] = await Promise.all([
        axios.get("/api/v2/colleges"),
        axios.get("/api/v2/college-categories"),
        axios.get("/api/v2/college-programs"),
      ]);
      setColleges(cRes.data);
      setCategories(catRes.data);
      setPrograms(pRes.data);
    } catch (err) {
      alert("Error loading data: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setCollegeForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      if (name === "gallery") {
        setCollegeForm((prev) => ({ ...prev, gallery: Array.from(files) }));
      } else {
        setCollegeForm((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setCollegeForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const values = Array.from(options)
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);
    setCollegeForm((prev) => ({ ...prev, [name]: values }));
  };

  const editCollege = (college) => {
    setCollegeForm({
      ...college,
      collegePrograms: college.collegePrograms?.map((p) => p._id || p) || [],
      collegeCategories: college.collegeCategories?.map((c) => c._id || c) || [],
      logo: college.logo || null,
      coverImage: college.coverImage || null,
      gallery: college.gallery || [],
    });
    setEditingCollegeSlug(college.slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitCollegeForm = async () => {
    try {
      if (!editingCollegeSlug) return alert("Select a college to edit first.");

      const formData = new FormData();
      for (const key in collegeForm) {
        if (
          key !== "logo" &&
          key !== "coverImage" &&
          key !== "gallery" &&
          key !== "collegePrograms" &&
          key !== "collegeCategories"
        ) {
          formData.append(key, collegeForm[key]);
        }
      }
      collegeForm.collegePrograms.forEach((id) => formData.append("collegePrograms", id));
      collegeForm.collegeCategories.forEach((id) => formData.append("collegeCategories", id));
      if (collegeForm.logo instanceof File) formData.append("logo", collegeForm.logo);
      if (collegeForm.coverImage instanceof File) formData.append("coverImage", collegeForm.coverImage);
      if (Array.isArray(collegeForm.gallery)) {
        collegeForm.gallery.forEach((file) => {
          if (file instanceof File) formData.append("gallery", file);
        });
      }

      await axios.put(`/api/v2/colleges/${editingCollegeSlug}`, formData);
      alert("College updated successfully");
      setEditingCollegeSlug(null);
      setCollegeForm({
        name: "",
        description: "",
        established: "",
        province: "",
        district: "",
        city: "",
        address: "",
        latitude: "",
        longitude: "",
        website: "",
        email: "",
        phone: "",
        affiliation: "",
        type: "",
        collegePrograms: [],
        collegeCategories: [],
        intakes: "",
        hostelAvailable: false,
        library: false,
        sportsFacilities: false,
        wifiAvailable: false,
        transportation: false,
        logo: null,
        coverImage: null,
        gallery: [],
      });
      fetchData();
    } catch (err) {
      alert("Error updating college: " + (err.response?.data?.error || err.message));
    }
  };

  const deleteCollege = async (slug) => {
    if (!window.confirm("Delete this college?")) return;
    try {
      await axios.delete(`/api/v2/colleges/${slug}`);
      fetchData();
    } catch (err) {
      alert("Error deleting college: " + (err.response?.data?.error || err.message));
    }
  };

  // Helper to generate correct image URL from saved path
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150?text=No+Image";

    // If img is full URL already, return as is
    if (img.startsWith("http") || img.startsWith("https")) return img;

    // If img contains Windows drive letter or backslashes, fix it:
    let cleanPath = img.replace(/\\/g, "/"); // replace backslashes
    const driveLetterRegex = /^[a-zA-Z]:\//; // detect drive letters like L:/, C:/ etc
    if (driveLetterRegex.test(cleanPath)) {
      // Remove drive letter and everything before /uploads
      const idx = cleanPath.indexOf("/uploads");
      if (idx !== -1) cleanPath = cleanPath.substring(idx);
    }
    // Make sure path starts with '/'
    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

    return BACKEND_URL + cleanPath;
  };

  // Render clickable image preview that opens in new tab
  const renderImagePreview = (field, label) => {
    const value = collegeForm[field];
    if (typeof value === "string" && value) {
      const imageUrl = getImageUrl(value);
      return (
        <div>
          <label>{label}:</label>{" "}
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt={label}
              height={100}
              style={{ cursor: "pointer", border: "1px solid #ccc", borderRadius: 4 }}
              title="Click to view full image"
            />
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="college-management-container">
      <Sidebar />
      <main className="college-management-main">
        <h1>Edit Colleges</h1>

        {editingCollegeSlug && (
          <div className="form-group multi-column">
            <div>
              {[
                "name",
                "description",
                "established",
                "province",
                "district",
                "city",
                "address",
                "latitude",
                "longitude",
                "website",
                "email",
                "phone",
                "affiliation",
                "type",
                "intakes",
              ].map((field) => (
                <input
                  key={field}
                  type={
                    field === "email"
                      ? "email"
                      : ["established", "latitude", "longitude"].includes(field)
                      ? "number"
                      : "text"
                  }
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={collegeForm[field]}
                  onChange={handleInputChange}
                />
              ))}

              {["hostelAvailable", "library", "sportsFacilities", "wifiAvailable", "transportation"].map(
                (name) => (
                  <label
                    key={name}
                    className={collegeForm[name] ? "feature-checkbox checked" : "feature-checkbox"}
                  >
                    <input type="checkbox" name={name} checked={collegeForm[name]} onChange={handleInputChange} />
                    {name.replace(/([A-Z])/g, " $1")}
                  </label>
                )
              )}

              {renderImagePreview("logo", "Logo Preview")}
              <label>
                Logo: <input type="file" name="logo" onChange={handleInputChange} />
              </label>

              {renderImagePreview("coverImage", "Cover Image Preview")}
              <label>
                Cover Image: <input type="file" name="coverImage" onChange={handleInputChange} />
              </label>

              <div>
                <label>Gallery Preview:</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                  {Array.isArray(collegeForm.gallery) &&
                    collegeForm.gallery.map((img, idx) =>
                      typeof img === "string" ? (
                        <a
                          key={idx}
                          href={getImageUrl(img)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Click to view full image"
                        >
                          <img
                            src={getImageUrl(img)}
                            alt={`Gallery ${idx + 1}`}
                            height={80}
                            style={{ cursor: "pointer", border: "1px solid #ccc", borderRadius: 4 }}
                          />
                        </a>
                      ) : null
                    )}
                </div>
                <label>
                  Gallery: <input type="file" name="gallery" multiple onChange={handleInputChange} />
                </label>
              </div>
            </div>

            <div>
              <label>
                Programs:
                <select
                  name="collegePrograms"
                  multiple
                  value={collegeForm.collegePrograms}
                  onChange={handleMultiSelect}
                  size={Math.min(5, programs.length)}
                >
                  {programs.map((prog) => (
                    <option key={prog._id} value={prog._id}>
                      {prog.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Categories:
                <select
                  name="collegeCategories"
                  multiple
                  value={collegeForm.collegeCategories}
                  onChange={handleMultiSelect}
                  size={Math.min(5, categories.length)}
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

        {editingCollegeSlug && (
          <button className="btn btn-add" onClick={submitCollegeForm}>
            Update College
          </button>
        )}

        <h2>Colleges List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Province</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Programs</th>
              <th>Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.city}</td>
                <td>{c.province}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{(c.collegePrograms || []).map((p) => p.name || p).join(", ")}</td>
                <td>{(c.collegeCategories || []).map((ca) => ca.name || ca).join(", ")}</td>
                <td>
                  <button className="btn btn-delete" onClick={() => deleteCollege(c.slug)}>
                    Delete
                  </button>
                  <button
                    className="btn btn-add"
                    style={{ backgroundColor: "#007bff" }}
                    onClick={() => editCollege(c)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default EditCollege;
