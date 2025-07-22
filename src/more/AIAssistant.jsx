import React, { useState } from "react";
import axios from "axios";
import "./AIAssistant.css";
import { FaRobot, FaTimes } from "react-icons/fa";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Replace this with your actual token logic
  const token = localStorage.getItem("token"); // Or use Redux/AuthContext

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/ai/ask",
        { question: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiReply = res.data.answer;
      setMessages([...updatedMessages, { role: "assistant", content: aiReply }]);
    } catch (err) {
      console.error("AI Ask Error:", err);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "❌ Error getting answer." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="ai-toggle-button" onClick={toggleChat}>
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div className="ai-assistant-container">
          <div className="ai-header">AI Assistant</div>

          <div className="ai-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <div className="message assistant">🤖 Thinking...</div>}
          </div>

          <div className="ai-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
