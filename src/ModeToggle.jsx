// src/component/mode/ModeToggle.jsx
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // ✅ import context
import "./ModeToggle.css"; // Optional styling

const ModeToggle = () => {
  const { mode, setMode } = useContext(ThemeContext); // ✅ use global state
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", position: "fixed", top: 10, right: 20, zIndex: 100 }}>
      <div
        onClick={toggleOptions}
        style={{
          cursor: "pointer",
          fontSize: "24px",
          marginRight: "10px",
        }}
        title="Toggle Accessibility Mode"
      >
        👁️
      </div>
      {showOptions && (
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            background: "#fff",
          }}
        >
          <option value="default">Default</option>
          <option value="visual-aid">Visual Aid</option>
          <option value="dark">Dark Mode</option>
        </select>
      )}
    </div>
  );
};

export default ModeToggle;
