// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ExamRoutine.css";
// import Header from "../Home/Header";
// import MetaData from "../../more/MetaData";
// import Footer from "../../more/Footer";
// import ExamRoutineCard from "./ExamRoutineCard";

// const BACKEND_URL = "http://localhost:4000";

// const fixImageUrl = (img) => {
//   if (!img) return null;
//   if (img.startsWith("http")) return img;
//   let cleanPath = img.replace(/\\/g, "/");
//   const idx = cleanPath.indexOf("/uploads");
//   if (idx !== -1) cleanPath = cleanPath.substring(idx);
//   if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
//   return BACKEND_URL + cleanPath;
// };

// const ExamRoutine = () => {
//   const [groupedExams, setGroupedExams] = useState({});

//   useEffect(() => {
//     const fetchRoutines = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/user/exams/exam-routines");
//         const { routines } = res.data;

//         const grouped = {};
//         routines.forEach((routine) => {
//           const examId = routine.exam?._id;
//           if (!grouped[examId]) {
//             grouped[examId] = { exam: routine.exam, routines: [] };
//           }
//           grouped[examId].routines.push({
//             subject: routine.subject,
//             date: routine.date,
//             time: routine.time,
//             venue: routine.venue,
//             officialRoutineImage: routine.officialRoutineImage,
//             examNoticeImage: routine.examNoticeImage,
//           });
//         });

//         setGroupedExams(grouped);
//       } catch (err) {
//         console.error("Failed to load exam routines:", err);
//       }
//     };
//     fetchRoutines();
//   }, []);

//   return (
//     <>
//       <MetaData title="Exam Routines" />
//       <Header />
//       <div className="exam-routines-page">
//         <header className="exam-routines-header">
//           <h1>Exam Routines</h1>
//           <p>Browse all exam routines.</p>
//         </header>

//         <div className="exam-routines-list">
//           {Object.keys(groupedExams).length === 0 ? (
//             <p>No exam routines found.</p>
//           ) : (
//             Object.values(groupedExams).map((examGroup, index) => (
//               <ExamRoutineCard key={index} exam={examGroup.exam} routines={examGroup.routines} />
//             ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ExamRoutine;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExamRoutine.css";
import Header from "../Home/Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import ExamRoutineCard from "./ExamRoutineCard";

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

const ExamRoutine = () => {
  const [groupedExams, setGroupedExams] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/exams/exam-routines");
        const { routines } = res.data;

        const grouped = {};
        routines.forEach((routine) => {
          const examId = routine.exam?._id;
          if (!grouped[examId]) {
            grouped[examId] = { exam: routine.exam, routines: [] };
          }
          grouped[examId].routines.push({
            subject: routine.subject,
            date: routine.date,
            time: routine.time,
            venue: routine.venue,
            officialRoutineImage: routine.officialRoutineImage,
            examNoticeImage: routine.examNoticeImage,
          });
        });

        setGroupedExams(grouped);
      } catch (err) {
        console.error("Failed to load exam routines:", err);
      }
    };
    fetchRoutines();
  }, []);

  const filteredExams = Object.values(groupedExams).filter(exam => {
    const examTitle = exam.exam?.title?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
    return examTitle.includes(search);
  });

  return (
    <>
      <MetaData title="Exam Routines" />
      <Header />
      <div className="exam-routines-page">
        <header className="exam-routines-header">
          <h1>Exam Routines</h1>
          <p>Browse all exam routines.</p>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam routines..."
            className="search-bar"
          />
        </header>

        <div className="exam-routines-list">
          {filteredExams.length === 0 ? (
            <p>No exam routines found.</p>
          ) : (
            filteredExams.map((examGroup, index) => (
              <ExamRoutineCard key={index} exam={examGroup.exam} routines={examGroup.routines} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamRoutine;