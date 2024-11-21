import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ setResponse }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON: 'data' should be an array");
      }

      await setResponse(parsedInput);
    } catch (err) {
      setError(err.message || "Invalid input");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Enter JSON Input
      </h2>
      <textarea
        className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
        rows="5"
        placeholder='{"data": ["A", "C", "z"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
    </div>
  );
};

export default InputForm;
