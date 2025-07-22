// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import MetaData from "../../more/MetaData";
// import Loading from "../../more/Loader";
// import Footer from "../../more/Footer";
// import Header from "../Home/Header";
// import "react-toastify/dist/ReactToastify.css";
// import "./Payment.css";

// const Payment = () => {
//   const { id } = useParams(); // courseId from URL
//   const [course, setCourse] = useState(null);
//   const [pricing, setPricing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [coupon, setCoupon] = useState("");
//   const [applyingCoupon, setApplyingCoupon] = useState(false);

//   const transactionUUID = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//   const successUrl = `http://localhost:3000/payment/success/${transactionUUID}`;
//   const failureUrl = `http://localhost:3000/payment/failure`;

//   // Load course and calculate price
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`/api/v2/courses/${id}`);
//         if (!res.data || !res.data._id) {
//           toast.error("Course not found.");
//           setLoading(false);
//           return;
//         }
//         setCourse(res.data);
//         await fetchPrice(res.data._id, "");
//       } catch (err) {
//         toast.error("Failed to load course.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   // Get pricing from backend
//   const fetchPrice = async (courseId, couponCode = "") => {
//     setApplyingCoupon(true);
//     try {
//       const token = localStorage.getItem("token");
//       const config = token
//         ? { headers: { Authorization: `Bearer ${token}` } }
//         : {};

//       const res = await axios.post(
//         "/api/checkout/price",
//         { courseId, couponCode },
//         config
//       );

//       if (res.data && res.data.finalPrice >= 0) {
//         setPricing({
//           originalPrice: parseFloat(res.data.originalPrice.toFixed(2)),
//           offerPrice:
//             res.data.offerPrice !== null
//               ? parseFloat(res.data.offerPrice.toFixed(2))
//               : null,
//           discountApplied: parseFloat(res.data.discountApplied.toFixed(2)),
//           finalPrice: parseFloat(res.data.finalPrice.toFixed(2)),
//         });
//       } else {
//         toast.error(res.data.error || "Failed to calculate price.");
//         setPricing(null);
//       }
//     } catch (err) {
//       toast.error("Error calculating price.");
//       console.error("Price error:", err);
//       setPricing(null);
//     } finally {
//       setApplyingCoupon(false);
//     }
//   };

//   const handleApplyCoupon = async (e) => {
//     e.preventDefault();
//     if (!coupon.trim()) {
//       toast.info("Enter a coupon code.");
//       return;
//     }
//     if (!course) return;
//     await fetchPrice(course._id, coupon.trim());
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!pricing || pricing.finalPrice <= 0) {
//       toast.error("Invalid price for payment.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/v2/payment/generate-signature", {
//         total_amount: pricing.finalPrice,
//         transaction_uuid: transactionUUID,
//         product_code: "EPAYTEST",
//       });

//       const signature = data.signature;
//       if (!signature) throw new Error("Signature not received");

//       localStorage.setItem("courseIdForPayment", course._id);

//       const form = document.createElement("form");
//       form.method = "POST";
//       form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

//       const fields = {
//         amount: pricing.finalPrice,
//         tax_amount: 0,
//         total_amount: pricing.finalPrice,
//         transaction_uuid: transactionUUID,
//         product_code: "EPAYTEST",
//         product_service_charge: 0,
//         product_delivery_charge: 0,
//         success_url: successUrl,
//         failure_url: failureUrl,
//         signed_field_names: "total_amount,transaction_uuid,product_code",
//         signature,
//       };

//       for (let key in fields) {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = fields[key];
//         form.appendChild(input);
//       }

//       document.body.appendChild(form);
//       form.submit();
//     } catch (err) {
//       toast.error("Failed to initiate payment.");
//       console.error("Payment error:", err);
//     }
//   };

//   if (loading || !course || !pricing) return <Loading />;

//   return (
//     <>
//       <MetaData title="Buy Course" />
//       <Header />

//       <div className="paymentContainer">
//         <h2>Confirm Payment via eSewa</h2>
//         <p>
//           Course: <strong>{course.title}</strong>
//         </p>

//         <div className="priceSection">
//           <p>
//             Original Price:{" "}
//             <span
//               style={{
//                 textDecoration:
//                   pricing.offerPrice && pricing.offerPrice !== pricing.originalPrice
//                     ? "line-through"
//                     : "none",
//                 color:
//                   pricing.offerPrice && pricing.offerPrice !== pricing.originalPrice
//                     ? "#999"
//                     : "#000",
//               }}
//             >
//               ₹{pricing.originalPrice}
//             </span>
//           </p>

//           {pricing.offerPrice !== null &&
//             pricing.offerPrice !== pricing.originalPrice && (
//               <p>Offer Price: ₹{pricing.offerPrice}</p>
//             )}

//           {pricing.discountApplied > 0 && (
//             <p>Coupon Discount: -₹{pricing.discountApplied}</p>
//           )}

//           <p>
//             <strong>Final Price: ₹{pricing.finalPrice}</strong>
//           </p>
//         </div>

//         <form className="couponForm" onSubmit={handleApplyCoupon}>
//           <input
//             type="text"
//             placeholder="Enter coupon code"
//             value={coupon}
//             onChange={(e) => setCoupon(e.target.value)}
//             disabled={applyingCoupon}
//           />
//           <button type="submit" disabled={applyingCoupon}>
//             {applyingCoupon ? "Applying..." : "Apply Coupon"}
//           </button>
//         </form>

//         <form className="paymentForm" onSubmit={handlePayment}>
//           <input
//             type="submit"
//             value={`Pay ₹${pricing.finalPrice} with eSewa`}
//             className="paymentFormBtn"
//           />
//         </form>
//       </div>

//       <Footer />
//       <ToastContainer position="bottom-center" autoClose={4000} />
//     </>
//   );
// };

// export default Payment;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";

const Payment = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const transactionUUID = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const successUrl = `http://localhost:3000/payment/success/${transactionUUID}`;
  const failureUrl = `http://localhost:3000/payment/failure`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/v2/courses/${id}`);
        if (!res.data || !res.data._id) {
          toast.error("Course not found.");
          setLoading(false);
          return;
        }
        setCourse(res.data);
        await fetchPrice(res.data._id, "");
      } catch (err) {
        toast.error("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fetchPrice = async (courseId, couponCode = "") => {
    setApplyingCoupon(true);
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const res = await axios.post(
        "/api/checkout/price",
        { courseId, couponCode },
        config
      );

      if (res.data && res.data.finalPrice >= 0) {
        setPricing({
          originalPrice: parseFloat(res.data.originalPrice.toFixed(2)),
          offerPrice:
            res.data.offerPrice !== null
              ? parseFloat(res.data.offerPrice.toFixed(2))
              : null,
          discountApplied: parseFloat(res.data.discountApplied.toFixed(2)),
          finalPrice: parseFloat(res.data.finalPrice.toFixed(2)),
        });
      } else {
        toast.error(res.data.error || "Failed to calculate price.");
        setPricing(null);
      }
    } catch (err) {
      toast.error("Error calculating price.");
      console.error("Price error:", err);
      setPricing(null);
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!coupon.trim()) {
      toast.info("Enter a coupon code.");
      return;
    }
    if (!course) return;
    await fetchPrice(course._id, coupon.trim());
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!pricing || pricing.finalPrice <= 0) {
      toast.error("Invalid price for payment.");
      return;
    }

    try {
      const { data } = await axios.post("/api/v2/payment/generate-signature", {
        total_amount: pricing.finalPrice,
        transaction_uuid: transactionUUID,
        product_code: "EPAYTEST",
      });

      const signature = data.signature;
      if (!signature) throw new Error("Signature not received");

      localStorage.setItem("courseIdForPayment", course._id);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: pricing.finalPrice,
        tax_amount: 0,
        total_amount: pricing.finalPrice,
        transaction_uuid: transactionUUID,
        product_code: "EPAYTEST",
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: successUrl,
        failure_url: failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature,
      };

      for (let key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      toast.error("Failed to initiate payment.");
      console.error("Payment error:", err);
    }
  };

  if (loading || !course || !pricing) return <Loading />;

  return (
    <>
      <MetaData title="Buy Course" />
      <Header />

      <div className="paymentCardContainer">
        <div className="paymentCard">
          <img
            src={require('../../Assets/icons/esewa-logo.png')}
            alt="eSewa Logo"
            className="esewaLogo"
          />
          <h2>Confirm Payment via eSewa</h2>
          <p>
            Course: <strong>{course.title}</strong>
          </p>

          <div className="priceSection">
            <p>
              Original Price:{" "}
              <span
                style={{
                  textDecoration:
                    pricing.offerPrice &&
                    pricing.offerPrice !== pricing.originalPrice
                      ? "line-through"
                      : "none",
                  color:
                    pricing.offerPrice &&
                    pricing.offerPrice !== pricing.originalPrice
                      ? "#999"
                      : "#000",
                }}
              >
                ₹{pricing.originalPrice}
              </span>
            </p>
            {pricing.offerPrice !== null &&
              pricing.offerPrice !== pricing.originalPrice && (
                <p>Offer Price: ₹{pricing.offerPrice}</p>
              )}
            {pricing.discountApplied > 0 && (
              <p>Coupon Discount: -₹{pricing.discountApplied}</p>
            )}
            <p>
              <strong>Final Price: ₹{pricing.finalPrice}</strong>
            </p>
          </div>

          <form className="couponForm" onSubmit={handleApplyCoupon}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={applyingCoupon}
            />
            <button type="submit" disabled={applyingCoupon}>
              {applyingCoupon ? "Applying..." : "Apply Coupon"}
            </button>
          </form>

          <form className="paymentForm" onSubmit={handlePayment}>
            <input
              type="submit"
              value={`Pay ₹${pricing.finalPrice} with eSewa`}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer position="bottom-center" autoClose={4000} />
    </>
  );
};

export default Payment;
