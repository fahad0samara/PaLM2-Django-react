import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaTrashAlt, FaComments } from "react-icons/fa";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem("conversations");
    return savedConversations ? JSON.parse(savedConversations) : [];
  });
  const [currentConversation, setCurrentConversation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    fetch("http://127.0.0.1:8000/api/generate-text/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: `prompt=${encodeURIComponent(prompt)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        const responseText = data.text || "No text generated";
        const newConversation = { prompt, response: responseText };
        setConversations([...conversations, newConversation]);
        setCurrentConversation(newConversation);
        setPrompt("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        // Clear error message after 5 seconds
        if (error) {
          setTimeout(() => setError(null), 5000);
        }
      });
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all conversations?")) {
      setConversations([]);
      setCurrentConversation(null);
    }
  };

  const getConversationTitle = (prompt) => {
    const words = prompt.split(" ");
    return words.slice(0, 3).join(" ") || "Untitled Conversation";
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <button
        id="toggle-sidebar"
        className="btn-icon"
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <button
          id="new-chat"
          className="btn-icon"
          onClick={() => setCurrentConversation(null)}
        >
          <FaComments /> New Chat
        </button>
        <h2>Conversation History</h2>
        <ul id="history">
          {conversations.map((conv, index) => (
            <li key={index} onClick={() => setCurrentConversation(conv)}>
              {getConversationTitle(conv.prompt)}
              <button
                className="btn-icon-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  setConversations(conversations.filter((_, i) => i !== index));
                }}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
        <button
          id="delete-history"
          className="btn-icon btn-delete-all"
          onClick={handleDeleteAll}
        >
          <FaTrashAlt /> Delete All History
        </button>
      </div>
      <div className="main-content">
        <div className="chat-window">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {currentConversation ? (
            <>
              <div className="message user">
                <p>{currentConversation.prompt}</p>
              </div>
              <div className="message ai">
                <p>{currentConversation.response}</p>
              </div>
            </>
          ) : (
            !loading && <p>Start a new conversation!</p>
          )}
        </div>
        <form id="text-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              required
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Function to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default App;
