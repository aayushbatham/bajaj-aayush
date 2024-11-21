import React, { useState } from "react";
import Select from "react-select";

const ResponseView = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
  ];

  // Function to render the response data
  const renderResponse = () => {
    return selectedOptions.map((option) => {
      const data = response[option.value];
      if (!data || data.length === 0) return null;

      return (
        <div key={option.value} className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {option.label}
          </h3>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-gray-800 dark:text-gray-200">
            {Array.isArray(data) ? (
              <div className="flex space-x-4 flex-wrap">
                {data.map((item, index) => (
                  <div key={index} className="py-1 px-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p>{data}</p> // For single value fields
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Filtered Response
      </h2>
      <Select
        options={options}
        isMulti
        onChange={setSelectedOptions}
        placeholder="Select filters"
        className="mb-6"
      />
      <div>{renderResponse()}</div>
    </div>
  );
};

export default ResponseView;
