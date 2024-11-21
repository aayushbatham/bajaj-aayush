import React, { useState } from "react";
import Select from "react-select";

const ResponseView = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
  ];

  const renderResponse = () => {
    return selectedOptions.map((option) => {
      const data = response[option.value];

      // Generate horizontal values only (without keys)
      const renderPrettyList = (data) => {
        return Object.values(data).map((value, index) => (
          <span key={index} className="inline-block mr-6 mb-2">
            <span className="text-gray-600 dark:text-gray-400">{JSON.stringify(value)}</span>
          </span>
        ));
      };

      return (
        <div key={option.value} className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {option.label}
          </h3>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex flex-wrap">
            {renderPrettyList(data)}
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
