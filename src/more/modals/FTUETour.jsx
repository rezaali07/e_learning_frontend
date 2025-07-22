// import React, { useState } from "react";
// import axios from "axios";
// import "./FTUETour.css";

// const steps = [
//   "Welcome to Our Platform! Let's get started.",
//   "Step 1: Explore courses and find your favorites.",
//   "Step 2: Enroll and track your progress.",
//   "Step 3: Enjoy learning and grow!",
// ];

// const FTUETour = ({ onFinish, onSkip }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const markTourCompleted = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "/api/v2/update-tour-status",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.setItem("ftueCompleted", "true");
//       setLoading(false);
//       onFinish();
//     } catch (error) {
//       setLoading(false);
//       console.error("Failed to mark tour complete:", error);
//     }
//   };

//   const markTourSkipped = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "/api/v2/update-tour-status",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.setItem("ftueCompleted", "true");
//       setLoading(false);
//       onSkip();
//     } catch (error) {
//       setLoading(false);
//       console.error("Failed to mark tour skipped:", error);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       markTourCompleted();
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const skipTour = () => {
//     markTourSkipped();
//   };

//   return (
//     <div className="ftue-modal" role="dialog" aria-modal="true" aria-labelledby="ftue-title">
//       <div className="ftue-content">
//         <p id="ftue-title" className="ftue-step-text">{steps[currentStep]}</p>

//         <div className="ftue-navigation">
//           <button
//             onClick={skipTour}
//             className="skip-btn"
//             type="button"
//             aria-label="Skip the tour"
//             disabled={loading}
//           >
//             Skip
//           </button>

//           <button
//             onClick={prevStep}
//             disabled={currentStep === 0 || loading}
//             type="button"
//             aria-label="Previous step"
//             className="prev-btn"
//           >
//             Previous
//           </button>

//           {currentStep === steps.length - 1 ? (
//             <button
//               onClick={markTourCompleted}
//               className="finish-btn"
//               type="button"
//               aria-label="Finish the tour"
//               disabled={loading}
//             >
//               {loading ? "Finishing..." : "Finish"}
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               type="button"
//               aria-label="Next step"
//               className="next-btn"
//               disabled={loading}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FTUETour;


import React, { useState } from "react";
import axios from "axios";
import "./FTUETour.css";

const steps = [
  "Welcome to Our Platform! Let's get started.",
  "Step 1: Explore courses and find your favorites.",
  "Step 2: Enroll and track your progress.",
  "Step 3: Enjoy learning and grow!",
];

const FTUETour = ({ onFinish, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const markTourCompleted = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/v2/update-tour-status",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("ftueCompleted", "true");
      onFinish();
    } catch (error) {
      console.error("Failed to mark tour complete:", error);
    } finally {
      setLoading(false);
    }
  };

  const markTourSkipped = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/v2/update-tour-status",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("ftueCompleted", "true");
      onSkip();
    } catch (error) {
      console.error("Failed to mark tour skipped:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      markTourCompleted();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="ftue-modal">
      <div className="ftue-content" role="dialog" aria-modal="true" aria-labelledby="ftue-title">
        <p id="ftue-title" className="ftue-step-text">{steps[currentStep]}</p>

        <div className="ftue-navigation">
          <button onClick={markTourSkipped} className="skip-btn" disabled={loading}>
            Skip
          </button>
          <button onClick={prevStep} disabled={currentStep === 0 || loading}>
            Previous
          </button>
          {currentStep === steps.length - 1 ? (
            <button onClick={markTourCompleted} disabled={loading}>
              {loading ? "Finishing..." : "Finish"}
            </button>
          ) : (
            <button onClick={nextStep} disabled={loading}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FTUETour;
