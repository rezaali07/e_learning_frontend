import React, { useEffect, useState } from "react";
import "./ArrowGuide.css";

const ArrowGuide = ({ onHide, targetId = "nav-courses-btn" }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (target) {
      const rect = target.getBoundingClientRect();
      const offset = 10;
      setPosition({
        top: rect.bottom + offset + window.scrollY,
        left: rect.left + rect.width / 2 - 10 + window.scrollX,
      });
    }

    const timer = setTimeout(() => {
      onHide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [targetId, onHide]);

  return (
    <div
      className="arrow-guide"
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
    >
      <div className="arrow-bounce">⬇</div>
      <div className="arrow-label">Start here</div>
    </div>
  );
};

export default ArrowGuide;
