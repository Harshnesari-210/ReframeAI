import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ChatInterface = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedModel, setSelectedModel] = useState("ml"); // "ml" or "gemini"

  const handleInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleSendPrompt = async () => {
    if (!chatInput.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { sender: "You", message: chatInput, model: selectedModel },
    ]);
    setChatInput("");
    setLoading(true);

    try {
      let response;
      if (selectedModel === "ml") {
        // Use ML model API
        response = await axios.post(
          "http://localhost:3000/chat/generate",
          { prompt: chatInput },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const generatedResponse = response.data?.output || "No response received.";
        setChatHistory((prev) => [
          ...prev,
          { 
            sender: "ML Model", 
            message: generatedResponse,
            model: "ml"
          },
        ]);
      } else {
        // Use Gemini API
        response = await axios.post(
          "http://localhost:8001/enhance",
          { text: chatInput },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        
        if (!response.data || !response.data.response) {
          throw new Error("Invalid response from Gemini API");
        }
        
        setChatHistory((prev) => [
          ...prev,
          { 
            sender: "Gemini", 
            message: response.data.response,
            model: "gemini"
          },
        ]);
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = error.response?.data?.detail || error.message || "An error occurred";
      setChatHistory((prev) => [
        ...prev,
        { 
          sender: "Error", 
          message: `Error: ${errorMessage}. Please try again.`,
          model: selectedModel
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[800px] h-[500px] p-4 flex flex-col bg-white border shadow-lg">
        <header className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Prompt-Pilot</div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedModel} 
              onChange={handleModelChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ml">ML Model</option>
              <option value="gemini">LLM</option>
            </select>
            <a href="./history" className="text-blue-500">History</a>
            <Link to="/profile" className="text-blue-500">Profile</Link>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto mb-4 bg-gray-50 p-2 rounded-md border border-gray-300">
          <div id="chat-output" className="space-y-2">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  chat.sender === "You"
                    ? "bg-blue-100 text-blue-800"
                    : chat.model === "gemini"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{chat.sender}:</strong> {chat.message}
                  </div>
                  {chat.sender !== "You" && chat.sender !== "Error" && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(chat.message, index)}
                        className="ml-4 text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-2 rounded"
                      >
                        Copy
                      </button>
                      {copiedIndex === index && (
                        <span className="text-green-500 text-sm">Copied!</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="w-full h-8 bg-gray-300 animate-pulse"></div>}
          </div>
        </main>

        <footer className="flex space-x-2 mt-4">
          <input
            type="text"
            id="chat-input"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Type your prompt here... (Using ${selectedModel === "ml" ? "ML Model" : "LLM"})`}
            value={chatInput}
            onChange={handleInputChange}
          />
          <button
            id="generate-btn"
            className={`${
              selectedModel === "ml" 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-purple-500 hover:bg-purple-600"
            } text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50`}
            onClick={handleSendPrompt}
          >
            Generate
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChatInterface;
