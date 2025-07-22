
import React from "react";

const fixImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  const clean = img.replace(/\\/g, "/").replace(/^.*?\/uploads/, "/uploads");
  return "http://localhost:4000" + clean;
};

const ExamRoutineCard = ({ exam, routines }) => {
  return (
    <div className="exam-card">
      <div className="exam-meta">
        <h2>{exam.title}</h2>
        <p><strong>Date:</strong> {new Date(exam.examDate).toLocaleDateString()}</p>
      </div>
      <table className="routine-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {routines.map((r, idx) => (
            <tr key={idx}>
              <td>{r.subject}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.time}</td>
              <td>{r.venue || "Will update shortly"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="exam-images">
        {exam.officialRoutineImage?.url && (
          <div className="img-block">
            <button onClick={() => window.open(fixImageUrl(exam.officialRoutineImage.url), "_blank")}>
              Official Exam Routine Image
            </button>
          </div>
        )}
        {exam.examNoticeImage?.url && (
          <div className="img-block">
            <button onClick={() => window.open(fixImageUrl(exam.examNoticeImage.url), "_blank")}>
              Exam Notice Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamRoutineCard;
