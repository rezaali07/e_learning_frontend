// src/component/admin/AddCollege.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./CollegeManagement.css";

const AddCollege = () => {
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, progRes] = await Promise.all([
          axios.get("/api/v2/college-categories"),
          axios.get("/api/v2/college-programs"),
        ]);
        setCategories(catRes.data);
        setPrograms(progRes.data);
      } catch (err) {
        alert("Error loading categories/programs: " + err.message);
      }
    };
    fetchData();
  }, []);

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

  const submitCollegeForm = async () => {
    const formData = new FormData();

    const booleanFields = ["hostelAvailable", "library", "sportsFacilities", "wifiAvailable", "transportation"];

    for (const key in collegeForm) {
      if (key === "collegePrograms" || key === "collegeCategories") continue;
      if (key === "gallery" || key === "logo" || key === "coverImage") continue;
      if (booleanFields.includes(key)) {
        formData.append(key, collegeForm[key] ? "true" : "false");
      } else {
        formData.append(key, collegeForm[key]);
      }
    }

    collegeForm.collegePrograms.forEach((id) => formData.append("collegePrograms", id));
    collegeForm.collegeCategories.forEach((id) => formData.append("collegeCategories", id));
    if (collegeForm.logo) formData.append("logo", collegeForm.logo);
    if (collegeForm.coverImage) formData.append("coverImage", collegeForm.coverImage);
    if (collegeForm.gallery.length > 0) {
      collegeForm.gallery.forEach((file) => formData.append("gallery", file));
    }

    try {
      await axios.post("/api/v2/colleges", formData);
      alert("College added successfully");
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
    } catch (err) {
      alert("Error saving college: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="college-management-container">
      <Sidebar />
      <main className="college-management-main">
        <h1>Add College</h1>
        <div className="form-group multi-column">
          <div>
            {[
              { name: "name", placeholder: "College Name" },
              { name: "description", placeholder: "Description" },
              { name: "established", placeholder: "Established Year", type: "number" },
              { name: "province", placeholder: "Province" },
              { name: "district", placeholder: "District" },
              { name: "city", placeholder: "City" },
              { name: "address", placeholder: "Address" },
              { name: "latitude", placeholder: "Latitude", type: "number" },
              { name: "longitude", placeholder: "Longitude", type: "number" },
              { name: "website", placeholder: "Website" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "phone", placeholder: "Phone" },
              { name: "affiliation", placeholder: "Affiliation" },
              { name: "type", placeholder: "Type" },
              { name: "intakes", placeholder: "Intakes (comma separated)" },
            ].map(({ name, placeholder, type = "text" }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={collegeForm[name]}
                onChange={handleInputChange}
              />
            ))}

            {[
              { name: "hostelAvailable", label: "Hostel Available" },
              { name: "library", label: "Library" },
  
              { name: "sportsFacilities", label: "Sports Facilities" },
              { name: "wifiAvailable", label: "Wifi Available" },
              { name: "transportation", label: "Transportation" },
            ].map(({ name, label }) => (
            <label
            key={name}
            className={`feature-checkbox ${collegeForm[name] ? "checked" : ""}`}
            >
              <input
              type="checkbox"
              name={name}
              checked={collegeForm[name]}
              onChange={handleInputChange}
              />
              {label}
              </label>
            ))}


            <label>
              Logo: <input type="file" name="logo" onChange={handleInputChange} />
            </label>
            <label>
              Cover Image: <input type="file" name="coverImage" onChange={handleInputChange} />
            </label>
            <label>
              Gallery: <input type="file" name="gallery" multiple onChange={handleInputChange} />
            </label>
          </div>

          <div>
            <label>
              Programs (Select multiple with Ctrl/Cmd):
              <select
                name="collegePrograms"
                multiple
                value={collegeForm.collegePrograms}
                onChange={handleMultiSelect}
                size={programs.length > 5 ? 5 : programs.length}
              >
                {programs.map((prog) => (
                  <option key={prog._id} value={prog._id}>
                    {prog.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Categories (Select multiple with Ctrl/Cmd):
              <select
                name="collegeCategories"
                multiple
                value={collegeForm.collegeCategories}
                onChange={handleMultiSelect}
                size={categories.length > 5 ? 5 : categories.length}
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

        <button className="btn btn-add" onClick={submitCollegeForm}>
          Add College
        </button>
      </main>
    </div>
  );
};

export default AddCollege;
