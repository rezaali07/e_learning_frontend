// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import "./AdminGlobalSettings.css";

// const AdminGlobalSettings = () => {
//   const [settings, setSettings] = useState(null);
//   const [formData, setFormData] = useState({
//     globalOfferPercentage: 0,
//     globalOfferStart: "",
//     globalOfferEnd: "",
//     globalCoupon: {
//       code: "",
//       discountType: "percentage",
//       discountValue: 0,
//       expiry: "",
//     },
//   });

//   const token = localStorage.getItem("token");

//   const fetchSettings = async () => {
//     try {
//       const { data } = await axios.get("/api/global-settings");
//       setSettings(data.settings);
//       if (data.settings) {
//         setFormData({
//           ...formData,
//           globalOfferPercentage: data.settings.globalOfferPercentage || 0,
//           globalOfferStart: data.settings.globalOfferStart?.substr(0, 10) || "",
//           globalOfferEnd: data.settings.globalOfferEnd?.substr(0, 10) || "",
//           globalCoupon: {
//             ...formData.globalCoupon,
//             ...data.settings.globalCoupon,
//             expiry: data.settings.globalCoupon?.expiry?.substr(0, 10) || "",
//           },
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch settings", err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["code", "discountType", "discountValue", "expiry"].includes(name)) {
//       setFormData({
//         ...formData,
//         globalCoupon: {
//           ...formData.globalCoupon,
//           [name]: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         "/api/admin/global-settings",
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Settings updated!");
//       fetchSettings();
//     } catch (err) {
//       alert("Error updating settings");
//     }
//   };

//   const deleteOffer = async () => {
//     try {
//       await axios.delete("/api/admin/global-settings/offer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Offer deleted");
//       fetchSettings();
//     } catch (err) {
//       alert("Error deleting offer");
//     }
//   };

//   const deleteCoupon = async () => {
//     try {
//       await axios.delete("/api/admin/global-settings/coupon", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Coupon deleted");
//       fetchSettings();
//     } catch (err) {
//       alert("Error deleting coupon");
//     }
//   };

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <Sidebar />
//       <div className="settings-content">
//         <h2>Global Offer & Coupon Settings</h2>
//         <form onSubmit={handleSubmit}>
//           <h3>Offer Settings</h3>
//           <input type="number" name="globalOfferPercentage" placeholder="Offer %" value={formData.globalOfferPercentage} onChange={handleChange} />
//           <input type="date" name="globalOfferStart" value={formData.globalOfferStart} onChange={handleChange} />
//           <input type="date" name="globalOfferEnd" value={formData.globalOfferEnd} onChange={handleChange} />
//           <button type="button" onClick={deleteOffer}>Delete Offer</button>

//           <h3>Coupon Settings</h3>
//           <input type="text" name="code" placeholder="Coupon Code" value={formData.globalCoupon.code} onChange={handleChange} />
//           <select name="discountType" value={formData.globalCoupon.discountType} onChange={handleChange}>
//             <option value="percentage">Percentage</option>
//             <option value="fixed">Fixed Amount</option>
//           </select>
//           <input type="number" name="discountValue" placeholder="Discount Value" value={formData.globalCoupon.discountValue} onChange={handleChange} />
//           <input type="date" name="expiry" value={formData.globalCoupon.expiry} onChange={handleChange} />
//           <button type="button" onClick={deleteCoupon}>Delete Coupon</button>

//           <br /><br />
//           <button type="submit">Save Settings</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminGlobalSettings;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./AdminGlobalSettings.css";

const AdminGlobalSettings = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    globalOfferPercentage: 0,
    globalOfferStart: "",
    globalOfferEnd: "",
    globalCoupon: {
      code: "",
      discountType: "percentage",
      discountValue: 0,
      expiry: "",
    },
  });

  const token = localStorage.getItem("token");

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get("/api/global-settings");
      setSettings(data.settings);
      if (data.settings) {
        setFormData({
          ...formData,
          globalOfferPercentage: data.settings.globalOfferPercentage || 0,
          globalOfferStart: data.settings.globalOfferStart?.substr(0, 10) || "",
          globalOfferEnd: data.settings.globalOfferEnd?.substr(0, 10) || "",
          globalCoupon: {
            ...formData.globalCoupon,
            ...data.settings.globalCoupon,
            expiry: data.settings.globalCoupon?.expiry?.substr(0, 10) || "",
          },
        });
      }
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["code", "discountType", "discountValue", "expiry"].includes(name)) {
      setFormData({
        ...formData,
        globalCoupon: {
          ...formData.globalCoupon,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/admin/global-settings",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Settings updated!");
      fetchSettings();
    } catch (err) {
      alert("Error updating settings");
    }
  };

  const deleteOffer = async () => {
    try {
      await axios.delete("/api/admin/global-settings/offer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Offer deleted");
      fetchSettings();
    } catch (err) {
      alert("Error deleting offer");
    }
  };

  const deleteCoupon = async () => {
    try {
      await axios.delete("/api/admin/global-settings/coupon", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Coupon deleted");
      fetchSettings();
    } catch (err) {
      alert("Error deleting coupon");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="settings-content">
        <h2>Offer & Coupon Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="settings-grid">
            <div className="settings-box">
              <h3>Offer Settings</h3>
              <div className="form-inner">
                <input
                  type="number"
                  name="globalOfferPercentage"
                  placeholder="Offer %"
                  value={formData.globalOfferPercentage}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="globalOfferStart"
                  value={formData.globalOfferStart}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="globalOfferEnd"
                  value={formData.globalOfferEnd}
                  onChange={handleChange}
                />
                <button type="button" onClick={deleteOffer}>Delete Offer</button>
              </div>
            </div>

            <div className="settings-box">
              <h3>Coupon Settings</h3>
              <div className="form-inner">
                <input
                  type="text"
                  name="code"
                  placeholder="Coupon Code"
                  value={formData.globalCoupon.code}
                  onChange={handleChange}
                />
                <select
                  name="discountType"
                  value={formData.globalCoupon.discountType}
                  onChange={handleChange}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
                <input
                  type="number"
                  name="discountValue"
                  placeholder="Discount Value"
                  value={formData.globalCoupon.discountValue}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="expiry"
                  value={formData.globalCoupon.expiry}
                  onChange={handleChange}
                />
                <button type="button" onClick={deleteCoupon}>Delete Coupon</button>
              </div>
            </div>
          </div>

          <br />

          <div className="button-center">
            <button type="submit">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGlobalSettings;
