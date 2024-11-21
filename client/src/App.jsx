import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResponseView from "./components/ResponseView";
import axios from "axios";
import "./App.css";

const App = () => {
  const [response, setResponse] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const fetchResponse = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/bfhl", data);
      if (res.data && res.data.roll_number) {
        document.title = res.data.roll_number;
      }
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-slate-100"} transition-colors duration-300`}>
      <div className="w-full max-w-2xl p-4 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
            Input Form
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-white bg-gray-800 dark:bg-gray-200 rounded-full focus:outline-none"
          >
            {isDarkMode ? "🌙" : "🌞"}
          </button>
        </div>
        <InputForm setResponse={fetchResponse} />
        {response && <ResponseView response={response} />}
      </div>
    </div>
  );
};

export default App;
